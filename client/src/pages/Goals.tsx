import { useEffect, useMemo, useState } from "react";

import GoalsHeader from "../components/goals/GoalsHeader";
import GoalStats from "../components/goals/GoalStats";
import GoalFilters from "../components/goals/GoalFilters";
import GoalCard from "../components/goals/GoalCard";
import CreateGoalModal from "../components/goals/CreateGoalModal";
import GoalDetailsModal from "../components/goals/GoalDetailsModal";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";
import ErrorModal from "../components/modals/ErrorModal";

import {
  getGoals,
  createGoal,
  updateGoal,
  updateGoalProgress,
  deleteGoal,
  addMilestone,
  updateMilestone,
} from "../api/goalService";

import { getErrorMessage } from "../utils/getErrorMessage";

import type {
  Goal,
  GoalCategory,
  GoalPeriod,
  GoalStatus,
  CreateGoalData,
  UpdateGoalData,
} from "../types/goals";

const isCanceled = (err: unknown) => {
  const e = err as { name?: string; code?: string };
  return e?.name === "CanceledError" || e?.code === "ERR_CANCELED";
};

const Goals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<GoalStatus | "all">("all");
  const [category, setCategory] = useState<GoalCategory | "all">("all");
  const [period, setPeriod] = useState<GoalPeriod | "all">("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* ---------- Load goals ---------- */

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const data = await getGoals(undefined, controller.signal);
        setGoals(data);
      } catch (err) {
        if (isCanceled(err)) return;
        setLoadError(getErrorMessage(err, "Failed to load goals."));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, []);

  /* ---------- Filtering & stats ---------- */

  const filteredGoals = useMemo(() => {
    const query = search.toLowerCase();

    return goals.filter((goal) => {
      const matchesSearch =
        goal.title.toLowerCase().includes(query) ||
        goal.description.toLowerCase().includes(query);

      return (
        matchesSearch &&
        (status === "all" || goal.status === status) &&
        (category === "all" || goal.category === category) &&
        (period === "all" || goal.period === period)
      );
    });
  }, [goals, search, status, category, period]);

  const activeGoals = goals.filter((g) => g.status === "active").length;
  const completedGoals = goals.filter((g) => g.status === "completed").length;
  const overdueGoals = goals.filter((g) => g.status === "overdue").length;

  /* ---------- Helpers ---------- */

  // Replace a goal everywhere it's held in state
  const applyUpdatedGoal = (updated: Goal) => {
    setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    setSelectedGoal((prev) => (prev?.id === updated.id ? updated : prev));
  };

  /* ---------- Modal controls ---------- */

  const openCreate = () => {
    setEditingGoal(null);
    setModalOpen(true);
  };

  const openEdit = (goal: Goal) => {
    setSelectedGoal(null);
    setEditingGoal(goal);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingGoal(null);
  };

  const requestDeleteGoal = (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (goal) setGoalToDelete(goal);
  };

  /* ---------- API handlers ---------- */

  // Create/update throw on failure on purpose: the modal catches and shows the error.
  const handleCreateGoal = async (data: CreateGoalData) => {
    const created = await createGoal(data);
    setGoals((prev) => [created, ...prev]);
  };

  const handleUpdateGoal = async (id: string, data: UpdateGoalData) => {
    const updated = await updateGoal(id, data);
    applyUpdatedGoal(updated);
  };

  const handleConfirmDelete = async () => {
    if (!goalToDelete) return;

    const { id } = goalToDelete;

    try {
      setDeleting(true);
      await deleteGoal(id);

      setGoals((prev) => prev.filter((g) => g.id !== id));
      setSelectedGoal((prev) => (prev?.id === id ? null : prev));
      setGoalToDelete(null);
    } catch (err) {
      setGoalToDelete(null);
      setErrorMessage(getErrorMessage(err, "Failed to delete goal."));
    } finally {
      setDeleting(false);
    }
  };

  // Shows the error AND rethrows so the details modal knows it failed
  const handleUpdateProgress = async (goalId: string, value: number) => {
    try {
      const updated = await updateGoalProgress(goalId, value);
      applyUpdatedGoal(updated);
    } catch (err) {
      setErrorMessage(getErrorMessage(err, "Failed to update progress."));
      throw err;
    }
  };

  const handleToggleMilestone = async (
    goalId: string,
    milestoneId: string,
    completed: boolean
  ) => {
    try {
      const updated = await updateMilestone(goalId, milestoneId, { completed });
      applyUpdatedGoal(updated);
    } catch (err) {
      setErrorMessage(getErrorMessage(err, "Failed to update milestone."));
    }
  };

  // Shows the error AND rethrows so the details modal keeps the typed text
  const handleAddMilestone = async (goalId: string, title: string) => {
    try {
      const updated = await addMilestone(goalId, title);
      applyUpdatedGoal(updated);
    } catch (err) {
      setErrorMessage(getErrorMessage(err, "Failed to add milestone."));
      throw err;
    }
  };

  /* ---------- Render ---------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <GoalsHeader
        search={search}
        onSearchChange={setSearch}
        onCreate={openCreate}
      />

      {/* Stats */}
      <GoalStats
        total={goals.length}
        active={activeGoals}
        completed={completedGoals}
        overdue={overdueGoals}
      />

      {/* Filters */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <GoalFilters
          status={status}
          category={category}
          period={period}
          onStatusChange={setStatus}
          onCategoryChange={setCategory}
          onPeriodChange={setPeriod}
        />

        <p className="text-sm text-slate-500">{filteredGoals.length} goals</p>
      </div>

      {/* Goals */}
      {loading ? (
        <p className="text-sm text-slate-500">Loading goals...</p>
      ) : loadError ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-sm text-red-400">
          {loadError}
        </div>
      ) : filteredGoals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
          <h3 className="text-lg font-medium text-white">No goals found</h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your filters or create a new goal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onClick={() => setSelectedGoal(goal)}
              onEdit={openEdit}
              onDelete={requestDeleteGoal}
            />
          ))}
        </div>
      )}

      {/* Create / Edit Goal */}
      <CreateGoalModal
        open={modalOpen}
        goal={editingGoal}
        onClose={closeModal}
        onCreate={handleCreateGoal}
        onUpdate={handleUpdateGoal}
      />

      {/* Goal Details */}
      <GoalDetailsModal
        goal={selectedGoal}
        onClose={() => setSelectedGoal(null)}
        onEdit={openEdit}
        onDelete={requestDeleteGoal}
        onToggleMilestone={handleToggleMilestone}
        onAddMilestone={handleAddMilestone}
        onUpdateProgress={handleUpdateProgress}
      />

      {/* Delete confirmation */}
      {goalToDelete && (
        <DeleteConfirmModal
          title="Delete goal"
          itemName={goalToDelete.title}
          loading={deleting}
          onConfirm={handleConfirmDelete}
          onCancel={() => setGoalToDelete(null)}
        />
      )}

      {/* Errors (rendered last so they sit on top) */}
      {errorMessage && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      )}
    </div>
  );
};

export default Goals;