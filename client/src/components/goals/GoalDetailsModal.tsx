import { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import type { Goal } from "../../types/goals";
import { formatDate } from "../../utils/formatDate";

import GoalProgress from "./GoalProgress";

interface GoalDetailsModalProps {
  goal: Goal | null;
  onClose: () => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
  onToggleMilestone: (
    goalId: string,
    milestoneId: string,
    completed: boolean
  ) => void;
  onAddMilestone: (goalId: string, title: string) => Promise<void>;
  onUpdateProgress: (goalId: string, value: number) => Promise<void>;
}

const GoalDetailsModal = ({
  goal,
  onClose,
  onEdit,
  onDelete,
  onToggleMilestone,
  onAddMilestone,
  onUpdateProgress,
}: GoalDetailsModalProps) => {
  const [newMilestone, setNewMilestone] = useState("");
  const [adding, setAdding] = useState(false);

  const [progressInput, setProgressInput] = useState("");
  const [savingProgress, setSavingProgress] = useState(false);

  const goalId = goal?.id;
  const currentValue = goal?.currentValue;

  // Clear the milestone input when a different goal is opened (or the modal closes)
  useEffect(() => {
    setNewMilestone("");
  }, [goalId]);

  // Keep the progress input in sync with the goal's saved value
  useEffect(() => {
    setProgressInput(currentValue !== undefined ? String(currentValue) : "");
  }, [goalId, currentValue]);

  if (!goal) {
    return null;
  }

  const handleAdd = async () => {
    const title = newMilestone.trim();

    if (!title || adding) return;

    try {
      setAdding(true);
      await onAddMilestone(goal.id, title);
      setNewMilestone("");
    } catch {
      // The page's ErrorModal shows the message; keep the text so the user can retry
    } finally {
      setAdding(false);
    }
  };

  const handleSaveProgress = async () => {
    const value = Number(progressInput);

    if (
      progressInput.trim() === "" ||
      Number.isNaN(value) ||
      value < 0 ||
      value === goal.currentValue ||
      savingProgress
    ) {
      return;
    }

    try {
      setSavingProgress(true);
      await onUpdateProgress(goal.id, value);
    } catch {
      // The page's ErrorModal shows the message
    } finally {
      setSavingProgress(false);
    }
  };

  const progressUnchanged = progressInput === String(goal.currentValue);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 p-6">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-white">
              {goal.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Goal details and milestones
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              aria-label="Edit goal"
              onClick={() => onEdit(goal)}
              className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white"
            >
              <Pencil className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Delete goal"
              onClick={() => onDelete(goal.id)}
              className="rounded-lg p-2 text-slate-500 hover:bg-red-500/10 hover:text-red-400"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">
          <p className="text-sm leading-6 text-slate-400">
            {goal.description}
          </p>

          {/* Progress */}
          <div className="space-y-3">
            <GoalProgress
              current={goal.currentValue}
              target={goal.targetValue}
              unit={goal.unit}
            />

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                value={progressInput}
                onChange={(e) => setProgressInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSaveProgress();
                  }
                }}
                className="w-32 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500/50"
              />

              <span className="text-sm text-slate-500">
                of {goal.targetValue} {goal.unit}
              </span>

              <button
                type="button"
                onClick={handleSaveProgress}
                disabled={savingProgress || progressUnchanged}
                className="ml-auto rounded-xl bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingProgress ? "Saving..." : "Update progress"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ["Category", goal.category],
              ["Period", goal.period],
              ["Priority", goal.priority],
              ["Status", goal.status],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-4"
              >
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-1 text-sm capitalize text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Milestones */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-white">Milestones</h3>

              <span className="text-xs text-slate-500">
                {goal.milestones.filter((item) => item.completed).length} /{" "}
                {goal.milestones.length}
              </span>
            </div>

            <div className="space-y-3">
              {goal.milestones.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-500">
                  No milestones added yet.
                </div>
              ) : (
                goal.milestones.map((milestone) => (
                  <button
                    key={milestone.id}
                    type="button"
                    onClick={() =>
                      onToggleMilestone(
                        goal.id,
                        milestone.id,
                        !milestone.completed
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 text-left transition hover:bg-white/[0.06]"
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-slate-600" />
                    )}

                    <span
                      className={
                        milestone.completed
                          ? "text-sm text-slate-500 line-through"
                          : "text-sm text-white"
                      }
                    >
                      {milestone.title}
                    </span>
                  </button>
                ))
              )}
            </div>

            {/* Add milestone */}
            <div className="mt-4 flex gap-2">
              <input
                value={newMilestone}
                onChange={(e) => setNewMilestone(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAdd();
                  }
                }}
                placeholder="Add a milestone..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
              />

              <button
                type="button"
                onClick={handleAdd}
                disabled={!newMilestone.trim() || adding}
                className="flex shrink-0 items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-4 w-4" />
                {adding ? "Adding..." : "Add"}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Due {formatDate(goal.dueDate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailsModal;