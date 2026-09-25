import {
  Bell,
  CalendarDays,
  Flame,
  X,
} from "lucide-react";

import type { Habit } from "../../types/habits";

import HabitCalendar from "./HabitCalendar";

interface HabitDetailsModalProps {
  habit: Habit | null;
  onClose: () => void;
}

const HabitDetailsModal = ({
  habit,
  onClose,
}: HabitDetailsModalProps) => {
  if (!habit) {
    return null;
  }

  const completionRate =
    habit.totalCount > 0
      ? Math.round(
          (habit.completedCount /
            habit.totalCount) *
            100
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {habit.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Habit details and progress
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

        {/* Body */}
        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">

          <p className="text-sm leading-6 text-slate-400">
            {habit.description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Current Streak
              </p>

              <p className="mt-1 flex items-center gap-1 text-lg font-semibold text-white">
                <Flame className="h-4 w-4 text-orange-400" />
                {habit.currentStreak}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Best Streak
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {habit.bestStreak}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Completion
              </p>

              <p className="mt-1 text-lg font-semibold text-white">
                {completionRate}%
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <p className="text-xs text-slate-500">
                Frequency
              </p>

              <p className="mt-1 text-lg font-semibold capitalize text-white">
                {habit.frequency}
              </p>
            </div>
          </div>

          {/* Calendar */}
          <div>
            <h3 className="mb-4 font-medium text-white">
              Habit History
            </h3>

            <HabitCalendar
              history={habit.history}
            />
          </div>

          {/* Reminder */}
          {habit.reminderEnabled && (
            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <Bell className="h-5 w-5 text-indigo-400" />

              <div>
                <p className="text-sm text-white">
                  Reminder enabled
                </p>

                <p className="text-xs text-slate-500">
                  Every day at {habit.reminderTime}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" />

            Created{" "}
            {new Date(
              habit.createdAt
            ).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitDetailsModal;