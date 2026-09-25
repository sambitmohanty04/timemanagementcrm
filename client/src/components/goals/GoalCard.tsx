import {
  CalendarDays,
  MoreVertical,
  Target,
} from "lucide-react";

import type { Goal } from "../../types/goal";

import GoalProgress from "./GoalProgress";

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
}

const GoalCard = ({
  goal,
  onClick,
}: GoalCardProps) => {
  const completedMilestones =
    goal.milestones.filter(
      (milestone) => milestone.completed
    ).length;

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-indigo-500/30 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-3">
          <div className="rounded-xl bg-indigo-500/10 p-3">
            <Target className="h-5 w-5 text-indigo-400" />
          </div>

          <div>
            <h3 className="font-medium text-white">
              {goal.title}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {goal.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5">
        <GoalProgress
          current={goal.currentValue}
          target={goal.targetValue}
          unit={goal.unit}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-400">
          {goal.category}
        </span>

        <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400">
          {goal.period}
        </span>

        <span
          className={`rounded-lg px-2.5 py-1 text-xs ${
            goal.priority === "high"
              ? "bg-red-500/10 text-red-400"
              : goal.priority === "medium"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-slate-500/10 text-slate-400"
          }`}
        >
          {goal.priority}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <CalendarDays className="h-3.5 w-3.5" />
          Due {goal.dueDate}
        </div>

        {goal.milestones.length > 0 && (
          <span className="text-xs text-slate-500">
            {completedMilestones}/
            {goal.milestones.length} milestones
          </span>
        )}
      </div>
    </div>
  );
};

export default GoalCard;