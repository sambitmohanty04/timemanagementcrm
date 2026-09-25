import { useState } from "react";
import { X } from "lucide-react";

import type {
  Goal,
  GoalCategory,
  GoalPeriod,
  GoalPriority,
} from "../../types/goal";

interface CreateGoalModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (goal: Goal) => void;
}

const CreateGoalModal = ({
  open,
  onClose,
  onCreate,
}: CreateGoalModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState<GoalCategory>("productivity");

  const [period, setPeriod] =
    useState<GoalPeriod>("monthly");

  const [priority, setPriority] =
    useState<GoalPriority>("medium");

  const [targetValue, setTargetValue] =
    useState(100);

  const [unit, setUnit] = useState("%");

  const [dueDate, setDueDate] =
    useState("");

  if (!open) {
    return null;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newGoal: Goal = {
      id: `goal-${Date.now()}`,
      title,
      description,
      category,
      period,
      status: "active",
      priority,
      currentValue: 0,
      targetValue,
      unit,
      startDate: new Date()
        .toISOString()
        .split("T")[0],
      dueDate,
      milestones: [],
      createdAt: new Date().toISOString(),
    };

    onCreate(newGoal);

    setTitle("");
    setDescription("");
    setCategory("productivity");
    setPeriod("monthly");
    setPriority("medium");
    setTargetValue(100);
    setUnit("%");
    setDueDate("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Create Goal
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Define a goal and start tracking progress.
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
              Goal Title
            </label>

            <input
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="e.g. Complete 100 tasks"
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
              placeholder="Describe your goal..."
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
                    e.target.value as GoalCategory
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="productivity">
                  Productivity
                </option>

                <option value="career">
                  Career
                </option>

                <option value="personal">
                  Personal
                </option>

                <option value="health">
                  Health
                </option>

                <option value="learning">
                  Learning
                </option>

                <option value="financial">
                  Financial
                </option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Period
              </label>

              <select
                value={period}
                onChange={(e) =>
                  setPeriod(
                    e.target.value as GoalPeriod
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">
                  Quarterly
                </option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Target
              </label>

              <input
                type="number"
                min="1"
                value={targetValue}
                onChange={(e) =>
                  setTargetValue(
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Unit
              </label>

              <input
                value={unit}
                onChange={(e) =>
                  setUnit(e.target.value)
                }
                placeholder="%, tasks, hours..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500/50"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(
                  e.target.value as GoalPriority
                )
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) =>
                setDueDate(e.target.value)
              }
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
            />
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
              disabled={!title.trim()}
              className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGoalModal;