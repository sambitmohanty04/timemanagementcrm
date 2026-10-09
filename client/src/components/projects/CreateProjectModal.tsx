import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type {
  CreateProjectData,
  Project,
} from "../../types/project";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;

  // Create
  onCreate?: (project: CreateProjectData) => Promise<void>;

  // Update
  project?: Project | null;
  onUpdate?: (
    id: string,
    project: Partial<CreateProjectData>
  ) => Promise<void>;
}

const initialForm: CreateProjectData = {
  name: "",
  description: "",
  client: "",
  status: "active",
  priority: "medium",
  startDate: "",
  dueDate: "",
  color: "#6366f1",
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50";

const selectClass =
  "w-full rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50";

const labelClass =
  "mb-2 block text-sm font-medium text-white";

const CreateProjectModal = ({
  open,
  onClose,
  onCreate,
  project,
  onUpdate,
}: CreateProjectModalProps) => {
  const [form, setForm] =
    useState<CreateProjectData>(initialForm);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditMode = !!project;

  /*
   * When modal opens:
   * - Create mode -> reset form
   * - Edit mode -> load selected project
   */
  useEffect(() => {
    if (!open) return;

    if (project) {
      setForm({
        name: project.name || "",
        description: project.description || "",
        client: project.client || "",
        status: project.status,
        priority: project.priority,
        startDate: project.startDate
          ? project.startDate.substring(0, 10)
          : "",
        dueDate: project.dueDate
          ? project.dueDate.substring(0, 10)
          : "",
        color: project.color || "#6366f1",
      });
    } else {
      setForm(initialForm);
    }

    setError(null);
  }, [open, project]);

  if (!open) return null;

  const handleChange = (
    field: keyof CreateProjectData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const datesInvalid =
    !!form.startDate &&
    !!form.dueDate &&
    form.dueDate < form.startDate;

  const canSubmit =
    !!form.name.trim() &&
    !datesInvalid &&
    !submitting;

  const handleClose = () => {
    if (submitting) return;

    setForm(initialForm);
    setError(null);
    onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;

    try {
      setSubmitting(true);
      setError(null);

      const payload: CreateProjectData = {
        ...form,
        name: form.name.trim(),
        client: form.client.trim(),
        description: form.description.trim(),
        startDate: form.startDate || undefined,
        dueDate: form.dueDate || undefined,
      };

      if (isEditMode && project) {
        // UPDATE PROJECT
        if (!onUpdate) {
          throw new Error(
            "Update project handler is not configured."
          );
        }

        await onUpdate(project.id, payload);
      } else {
        // CREATE PROJECT
        if (!onCreate) {
          throw new Error(
            "Create project handler is not configured."
          );
        }

        await onCreate(payload);
      }

      setForm(initialForm);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : isEditMode
            ? "Failed to update project."
            : "Failed to create project."
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
              {isEditMode
                ? "Update Project"
                : "Create Project"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditMode
                ? "Update your project details."
                : "Create a new project and start managing your work."}
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

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Project Name */}
          <div>
            <label className={labelClass}>
              Project Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              placeholder="Enter project name"
              className={inputClass}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
              placeholder="Describe your project"
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Client */}
          <div>
            <label className={labelClass}>
              Client
            </label>

            <input
              type="text"
              value={form.client}
              onChange={(e) =>
                handleChange("client", e.target.value)
              }
              placeholder="Enter client name"
              className={inputClass}
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Status */}
            <div>
              <label className={labelClass}>
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  handleChange("status", e.target.value)
                }
                className={selectClass}
              >
                <option value="active">
                  Active
                </option>

                <option value="completed">
                  Completed
                </option>

                <option value="on-hold">
                  On Hold
                </option>

                <option value="archived">
                  Archived
                </option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className={labelClass}>
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) =>
                  handleChange(
                    "priority",
                    e.target.value
                  )
                }
                className={selectClass}
              >
                <option value="low">
                  Low
                </option>

                <option value="medium">
                  Medium
                </option>

                <option value="high">
                  High
                </option>
              </select>
            </div>
          </div>

          {/* Start Date + Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Start Date */}
            <div>
              <label className={labelClass}>
                Start Date
              </label>

              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  handleChange(
                    "startDate",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            {/* Due Date */}
            <div>
              <label className={labelClass}>
                Due Date
              </label>

              <input
                type="date"
                value={form.dueDate}
                min={form.startDate || undefined}
                onChange={(e) =>
                  handleChange(
                    "dueDate",
                    e.target.value
                  )
                }
                className={inputClass}
              />

              {datesInvalid && (
                <p className="mt-1.5 text-xs text-red-400">
                  Due date can't be before the
                  start date.
                </p>
              )}
            </div>
          </div>

          {/* Project Color */}
          <div>
            <label className={labelClass}>
              Project Color
            </label>

            <div className="flex items-center gap-3">

              <input
                type="color"
                value={form.color}
                onChange={(e) =>
                  handleChange(
                    "color",
                    e.target.value
                  )
                }
                className="h-10 w-14 cursor-pointer rounded-lg border border-white/10 bg-transparent"
              />

              <span className="text-sm text-slate-400">
                {form.color}
              </span>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-white/10 p-6">

          {/* Cancel */}
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>

          {/* Submit */}
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
                ? "Update Project"
                : "Create Project"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
