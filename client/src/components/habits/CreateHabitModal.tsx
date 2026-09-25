import { useState } from "react";
import { X } from "lucide-react";

import type {
  Habit,
  HabitCategory,
  HabitFrequency,
} from "../../types/habits";

interface CreateHabitModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (habit: Habit) => void;
}

const CreateHabitModal = ({
  open,
  onClose,
  onCreate,
}: CreateHabitModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState<HabitCategory>("productivity");

  const [frequency, setFrequency] =
    useState<HabitFrequency>("daily");

  const [reminderEnabled, setReminderEnabled] =
    useState(true);

  const [reminderTime, setReminderTime] =
    useState("09:00");

  if (!open) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    const newHabit: Habit = {
      id: `habit-${Date.now()}`,

      name,
      description,

      category,
      frequency,

      targetPerWeek:
        frequency === "daily"
          ? 7
          : frequency === "weekdays"
            ? 5
            : frequency === "weekly"
              ? 1
              : 3,

      status: "active",

      currentStreak: 0,
      bestStreak: 0,

      completedCount: 0,
      totalCount: 0,

      reminderEnabled,
      reminderTime: reminderEnabled
        ? reminderTime
        : undefined,

      color: "indigo",

      history: [],

      createdAt: new Date().toISOString(),
    };

    onCreate(newHabit);

    setName("");
    setDescription("");
    setCategory("productivity");
    setFrequency("daily");
    setReminderEnabled(true);
    setReminderTime("09:00");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Create Habit
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a habit you want to build consistently.
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
        <form
          onSubmit={handleSubmit}
          className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-6"
        >
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Habit Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Read 30 minutes"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows={3}
              placeholder="Describe your habit..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value as HabitCategory
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="health">
                  Health
                </option>

                <option value="productivity">
                  Productivity
                </option>

                <option value="learning">
                  Learning
                </option>

                <option value="personal">
                  Personal
                </option>

                <option value="fitness">
                  Fitness
                </option>

                <option value="mindfulness">
                  Mindfulness
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Frequency
              </label>

              <select
                value={frequency}
                onChange={(e) =>
                  setFrequency(
                    e.target.value as HabitFrequency
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="daily">
                  Daily
                </option>

                <option value="weekly">
                  Weekly
                </option>

                <option value="weekdays">
                  Weekdays
                </option>

                <option value="custom">
                  Custom
                </option>
              </select>
            </div>
          </div>

          {/* Reminder */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">
                  Reminder
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Get reminded about this habit.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setReminderEnabled(
                    (previous) => !previous
                  )
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  reminderEnabled
                    ? "bg-indigo-500"
                    : "bg-white/10"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    reminderEnabled
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            {reminderEnabled && (
              <div className="mt-4">
                <label className="mb-2 block text-xs text-slate-500">
                  Reminder Time
                </label>

                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) =>
                    setReminderTime(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!name.trim()}
              className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Habit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitModal;