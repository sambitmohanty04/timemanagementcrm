import {
  CalendarDays,
  CheckCircle2,
  Circle,
  X,
} from "lucide-react";

import type { Goal } from "../../types/goal";

import GoalProgress from "./GoalProgress";

interface GoalDetailsModalProps {
  goal: Goal | null;
  onClose: () => void;
}

const GoalDetailsModal = ({
  goal,
  onClose,
}: GoalDetailsModalProps) => {
  if (!goal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">

        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {goal.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Goal details and milestones
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">

          <p className="text-sm leading-6 text-slate-400">
            {goal.description}
          </p>

          <GoalProgress
            current={goal.currentValue}
            target={goal.targetValue}
            unit={goal.unit}
          />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Category
              </p>

              <p className="mt-1 text-sm text-white">
                {goal.category}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Period
              </p>

              <p className="mt-1 text-sm text-white">
                {goal.period}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Priority
              </p>

              <p className="mt-1 text-sm text-white">
                {goal.priority}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Status
              </p>

              <p className="mt-1 text-sm text-white">
                {goal.status}
              </p>
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-white">
                Milestones
              </h3>

              <span className="text-xs text-slate-500">
                {
                  goal.milestones.filter(
                    (item) => item.completed
                  ).length
                }{" "}
                / {goal.milestones.length}
              </span>
            </div>

            <div className="space-y-3">
              {goal.milestones.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-sm text-slate-500">
                  No milestones added yet.
                </div>
              ) : (
                goal.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4"
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-600" />
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
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Due {goal.dueDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetailsModal;