import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type {
  CreateGoalData,
  UpdateGoalData,
  Goal,
  GoalCategory,
  GoalPeriod,
  GoalPriority,
  GoalStatus,
} from "../../types/goals";

import ErrorModal from "../modals/ErrorModal";
import { getErrorMessage } from "../../utils/getErrorMessage";

interface CreateGoalModalProps {
  open: boolean;
  onClose: () => void;

  // Create
  onCreate?: (goal: CreateGoalData) => Promise<void>;

  // Update
  goal?: Goal | null;
  onUpdate?: (id: string, goal: UpdateGoalData) => Promise<void>;
}

type GoalForm = Omit<
  CreateGoalData,
  "status" | "currentValue" | "milestones"
> & {
  status: GoalStatus;
};

const today = () => new Date().toISOString().split("T")[0];

const getInitialForm = (): GoalForm => ({
  title: "",
  description: "",
  category: "productivity",
  period: "monthly",
  priority: "medium",
  status: "active",
  targetValue: 100,
  unit: "%",
  startDate: today(),
  dueDate: "",
});

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50";

const selectClass =
  "w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50";

const labelClass = "mb-2 block text-sm font-medium text-white";

const CreateGoalModal = ({
  open,
  onClose,
  onCreate,
  goal,
  onUpdate,
}: CreateGoalModalProps) => {
  const [form, setForm] = useState<GoalForm>(getInitialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!goal;

  // Create mode -> reset form, Edit mode -> load the selected goal
  useEffect(() => {
    if (!open) return;

    if (goal) {
      setForm({
        title: goal.title || "",
        description: goal.description || "",
        category: goal.category,
        period: goal.period,
        priority: goal.priority,
        status: goal.status,
        targetValue: goal.targetValue,
        unit: goal.unit || "",
        startDate: goal.startDate ? goal.startDate.substring(0, 10) : today(),
        dueDate: goal.dueDate ? goal.dueDate.substring(0, 10) : "",
        projectId: goal.projectId,
      });
    } else {
      setForm(getInitialForm());
    }

    setError(null);
  }, [open, goal]);

  if (!open) return null;

  const handleChange = <K extends keyof GoalForm>(
    field: K,
    value: GoalForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const datesInvalid =
    !!form.startDate && !!form.dueDate && form.dueDate < form.startDate;

  const canSubmit =
    !!form.title.trim() &&
    !!form.dueDate &&
    form.targetValue > 0 &&
    !datesInvalid &&
    !submitting;

  const handleClose = () => {
    if (submitting) return;

    setForm(getInitialForm());
    setError(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setError(null);

      const { status, ...rest } = form;

      const payload: CreateGoalData = {
        ...rest,
        title: form.title.trim(),
        description: form.description.trim(),
        unit: form.unit.trim(),
      };

      if (isEditMode && goal) {
        if (!onUpdate) {
          throw new Error("Update goal handler is not configured.");
        }

        // status is only editable when updating
        await onUpdate(goal.id, { ...payload, status });
      } else {
        if (!onCreate) {
          throw new Error("Create goal handler is not configured.");
        }

        // currentValue is sent only on create, so editing never resets progress
        await onCreate({ ...payload, currentValue: 0 });
      }

      setForm(getInitialForm());
      onClose();
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          isEditMode ? "Failed to update goal." : "Failed to create goal."
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {isEditMode ? "Update Goal" : "Create Goal"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update your goal details."
                : "Define a goal and start tracking progress."}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            disabled={submitting}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-6">
          {/* Title */}
          <div>
            <label className={labelClass}>Goal Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="e.g. Complete 100 tasks"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Describe your goal..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Category + Period */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Category</label>
              <select
                value={form.category}
                onChange={(e) =>
                  handleChange("category", e.target.value as GoalCategory)
                }
                className={selectClass}
              >
                <option value="productivity">Productivity</option>
                <option value="career">Career</option>
                <option value="personal">Personal</option>
                <option value="health">Health</option>
                <option value="learning">Learning</option>
                <option value="financial">Financial</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Period</label>
              <select
                value={form.period}
                onChange={(e) =>
                  handleChange("period", e.target.value as GoalPeriod)
                }
                className={selectClass}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>

          {/* Target + Unit */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Target</label>
              <input
                type="number"
                min="1"
                value={form.targetValue}
                onChange={(e) =>
                  handleChange("targetValue", Number(e.target.value))
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Unit</label>
              <input
                type="text"
                value={form.unit}
                onChange={(e) => handleChange("unit", e.target.value)}
                placeholder="%, tasks, hours..."
                className={inputClass}
              />
            </div>
          </div>

          {/* Priority + Status (edit only) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Priority</label>
              <select
                value={form.priority}
                onChange={(e) =>
                  handleChange("priority", e.target.value as GoalPriority)
                }
                className={selectClass}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {isEditMode && (
              <div>
                <label className={labelClass}>Status</label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    handleChange("status", e.target.value as GoalStatus)
                  }
                  className={selectClass}
                >
                  <option value="active">Active</option>
                  <option value="on-hold">On Hold</option>
                  <option value="completed">Completed</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            )}
          </div>

          {/* Start Date + Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Start Date</label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                min={form.startDate || undefined}
                onChange={(e) => handleChange("dueDate", e.target.value)}
                className={inputClass}
              />

              {datesInvalid && (
                <p className="mt-1.5 text-xs text-red-400">
                  Due date can't be before the start date.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-white/10 p-6">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Goal"
                : "Create Goal"}
          </button>
        </div>
      </div>

      {/* Error popup (sits above this modal) */}
      {error && (
        <ErrorModal
          title={isEditMode ? "Couldn't update goal" : "Couldn't create goal"}
          message={error}
          onClose={() => setError(null)}
        />
      )}
    </div>
  );
};

export default CreateGoalModal;