import { useState } from "react";
import { X } from "lucide-react";

interface CreateProjectForm {
  name: string;
  description: string;
  client: string;
  status: "active" | "completed" | "on-hold" | "archived";
  priority: "low" | "medium" | "high";
  startDate: string;
  dueDate: string;
  color: string;
}

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (project: CreateProjectForm) => void;
}

const CreateProjectModal = ({
  open,
  onClose,
  onCreate,
}: CreateProjectModalProps) => {
  const [form, setForm] = useState<CreateProjectForm>({
    name: "",
    description: "",
    client: "",
    status: "active",
    priority: "medium",
    startDate: "",
    dueDate: "",
    color: "#6366f1",
  });

  if (!open) {
    return null;
  }

  const handleChange = (
    field: keyof CreateProjectForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      return;
    }

    onCreate(form);

    setForm({
      name: "",
      description: "",
      client: "",
      status: "active",
      priority: "medium",
      startDate: "",
      dueDate: "",
      color: "#6366f1",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      {/* Modal */}
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Create Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create a new project and start managing your work.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto p-6">

          {/* Project Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Project Name
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              placeholder="Enter project name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
              placeholder="Describe your project"
              rows={4}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50"
            />
          </div>

          {/* Client */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Client
            </label>

            <input
              type="text"
              value={form.client}
              onChange={(e) =>
                handleChange("client", e.target.value)
              }
              placeholder="Enter client name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-indigo-500/50"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  handleChange("status", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Priority
              </label>

              <select
                value={form.priority}
                onChange={(e) =>
                  handleChange("priority", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Start Date
              </label>

              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  handleChange("startDate", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Due Date
              </label>

              <input
                type="date"
                value={form.dueDate}
                onChange={(e) =>
                  handleChange("dueDate", e.target.value)
                }
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
              />
            </div>

          </div>

          {/* Project Color */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Project Color
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={form.color}
                onChange={(e) =>
                  handleChange("color", e.target.value)
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
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!form.name.trim()}
            className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Create Project
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateProjectModal;