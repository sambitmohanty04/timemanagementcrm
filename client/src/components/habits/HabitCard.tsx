import {
  CalendarDays,
  Check,
  MoreVertical,
} from "lucide-react";

import type { Habit } from "../../types/habits";

import HabitCalendar from "./HabitCalendar";
import HabitStreak from "./HabitStreak";

interface HabitCardProps {
  habit: Habit;
  completedToday: boolean;
  onToggleToday: () => void;
  onClick: () => void;
}

const HabitCard = ({
  habit,
  completedToday,
  onToggleToday,
  onClick,
}: HabitCardProps) => {
  const completionRate =
    habit.totalCount > 0
      ? Math.round(
          (habit.completedCount /
            habit.totalCount) *
            100
        )
      : 0;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-indigo-500/30 hover:bg-white/[0.07]">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <button
          type="button"
          onClick={onClick}
          className="flex min-w-0 items-start gap-3 text-left"
        >
          <div className="rounded-xl bg-indigo-500/10 p-3">
            <CalendarDays className="h-5 w-5 text-indigo-400" />
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-medium text-white">
              {habit.name}
            </h3>

            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
              {habit.description}
            </p>
          </div>
        </button>

        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-white"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      {/* Streak */}
      <div className="mt-5">
        <HabitStreak
          current={habit.currentStreak}
          best={habit.bestStreak}
        />
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="mb-2 flex justify-between">
          <span className="text-xs text-slate-500">
            Completion
          </span>

          <span className="text-xs text-white">
            {completionRate}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{
              width: `${completionRate}%`,
            }}
          />
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-5">
        <p className="mb-3 text-xs text-slate-500">
          Recent activity
        </p>

        <HabitCalendar
          history={habit.history}
        />
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">

        <div>
          <span className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-400">
            {habit.frequency}
          </span>

          <span className="ml-2 rounded-lg bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-400">
            {habit.category}
          </span>
        </div>

        <button
          type="button"
          onClick={onToggleToday}
          className={`flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition ${
            completedToday
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-indigo-500 text-white hover:bg-indigo-600"
          }`}
        >
          <Check className="h-3.5 w-3.5" />

          {completedToday
            ? "Completed"
            : "Complete"}
        </button>
      </div>
    </div>
  );
};

export default HabitCard;