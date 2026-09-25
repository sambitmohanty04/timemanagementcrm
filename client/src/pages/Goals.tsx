import { useMemo, useState } from "react";

import GoalsHeader from "../components/goals/GoalsHeader";
import GoalStats from "../components/goals/GoalStats";
import GoalFilters from "../components/goals/GoalFilters";
import GoalCard from "../components/goals/GoalCard";
import CreateGoalModal from "../components/goals/CreateGoalModal";
import GoalDetailsModal from "../components/goals/GoalDetailsModal";

import { GOALS } from "../data/goals";

import type {
  Goal,
  GoalCategory,
  GoalPeriod,
  GoalStatus,
} from "../types/goal";

const Goals = () => {
  const [goals, setGoals] =
    useState<Goal[]>(GOALS);

  const [search, setSearch] = useState("");

  const [status, setStatus] =
    useState<GoalStatus | "all">("all");

  const [category, setCategory] =
    useState<GoalCategory | "all">("all");

  const [period, setPeriod] =
    useState<GoalPeriod | "all">("all");

  const [createOpen, setCreateOpen] =
    useState(false);

  const [selectedGoal, setSelectedGoal] =
    useState<Goal | null>(null);

  const filteredGoals = useMemo(() => {
    return goals.filter((goal) => {
      const matchesSearch =
        goal.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        goal.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        goal.status === status;

      const matchesCategory =
        category === "all" ||
        goal.category === category;

      const matchesPeriod =
        period === "all" ||
        goal.period === period;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesPeriod
      );
    });
  }, [
    goals,
    search,
    status,
    category,
    period,
  ]);

  const activeGoals = goals.filter(
    (goal) => goal.status === "active"
  ).length;

  const completedGoals = goals.filter(
    (goal) => goal.status === "completed"
  ).length;

  const overdueGoals = goals.filter(
    (goal) => goal.status === "overdue"
  ).length;

  const handleCreateGoal = (goal: Goal) => {
    setGoals((previous) => [
      goal,
      ...previous,
    ]);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <GoalsHeader
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setCreateOpen(true)}
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

        <p className="text-sm text-slate-500">
          {filteredGoals.length} goals
        </p>
      </div>

      {/* Goals */}
      {filteredGoals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
          <h3 className="text-lg font-medium text-white">
            No goals found
          </h3>

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
              onClick={() =>
                setSelectedGoal(goal)
              }
            />
          ))}
        </div>
      )}

      {/* Create Goal */}
      <CreateGoalModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateGoal}
      />

      {/* Goal Details */}
      <GoalDetailsModal
        goal={selectedGoal}
        onClose={() => setSelectedGoal(null)}
      />
    </div>
  );
};

export default Goals;