import { useState } from "react";
import {
  CalendarDays,
  MoreVertical,
  Pencil,
  Target,
  Trash2,
} from "lucide-react";

import type { Goal } from "../../types/goals";
import { formatDate } from "../../utils/formatDate";

import GoalProgress from "./GoalProgress";

interface GoalCardProps {
  goal: Goal;
  onClick: () => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

const GoalCard = ({ goal, onClick, onEdit, onDelete }: GoalCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const completedMilestones = goal.milestones.filter(
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
            <h3 className="font-medium text-white">{goal.title}</h3>

            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {goal.description}
            </p>
          </div>
        </div>

        {/* Actions menu */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            aria-label="Goal actions"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-white"
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {menuOpen && (
            <>
              {/* click-away backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />

              <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-xl border border-white/10 bg-slate-900 py-1 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit(goal);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete(goal.id);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-5">
        <GoalProgress
          current={goal.currentValue}
          target={goal.targetValue}
          unit={goal.unit}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-400 capitalize">
          {goal.category}
        </span>

        <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400 capitalize">
          {goal.period}
        </span>

        <span
          className={`rounded-lg px-2.5 py-1 text-xs capitalize ${
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
          Due {formatDate(goal.dueDate)}
        </div>

        {goal.milestones.length > 0 && (
          <span className="text-xs text-slate-500">
            {completedMilestones}/{goal.milestones.length} milestones
          </span>
        )}
      </div>
    </div>
  );
};

export default GoalCard;