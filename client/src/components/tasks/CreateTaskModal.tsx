import { X } from "lucide-react";
import type { ChangeEvent, FormEvent } from "react";

import type { TaskPriority } from "../../types/task";

interface NewTask {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  project: string;
}

interface CreateTaskModalProps {
  open: boolean;
  task: NewTask;
  onClose: () => void;
  onChange: (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const CreateTaskModal = ({
  open,
  task,
  onClose,
  onChange,
  onSubmit,
}: CreateTaskModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-slate-800 shadow-xl dark:border-white/10 dark:bg-[#111827]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-5 dark:border-white/10">
          <div>
            <h2 className="text-lg font-semibold text-gray-300 dark:text-white">
              Create New Task
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add a new task to your task list
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/10"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="space-y-5 p-5"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="task-title"
              className="mb-2 block text-sm font-medium text-gray-300 dark:text-gray-500"
            >
              Task Title
            </label>

            <input
              id="task-title"
              type="text"
              name="title"
              value={task.title}
              onChange={onChange}
              placeholder="Enter task title"
              autoFocus
              required
              className="w-full rounded-lg border border-gray-700 bg-slate-600 px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="task-description"
              className="mb-2 block text-sm font-medium text-gray-200 dark:text-gray-300"
            >
              Description
            </label>

            <textarea
              id="task-description"
              name="description"
              value={task.description}
              onChange={onChange}
              placeholder="Enter task description"
              rows={3}
              className="w-full resize-none rounded-lg border border-slate-600 bg-slate-600 px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          {/* Priority + Due Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            {/* Priority */}
            <div>
              <label
                htmlFor="task-priority"
                className="mb-2 block text-sm font-medium text-gray-200 dark:text-gray-300"
              >
                Priority
              </label>

              <select
                id="task-priority"
                name="priority"
                value={task.priority}
                onChange={onChange}
                className="w-full rounded-lg border border-slate-600 bg-slate-600 px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label
                htmlFor="task-due-date"
                className="mb-2 block text-sm font-medium text-gray-200 dark:text-gray-300"
              >
                Due Date
              </label>

              <input
                id="task-due-date"
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={onChange}
                required
                className="w-full rounded-lg border border-slate-600 bg-slate-600 px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          {/* Project */}
          <div>
            <label
              htmlFor="task-project"
              className="mb-2 block text-sm font-medium text-gray-200 dark:text-gray-300"
            >
              Project
            </label>

            <input
              id="task-project"
              type="text"
              name="project"
              value={task.project}
              onChange={onChange}
              placeholder="e.g. Website Redesign"
              className="w-full rounded-lg border border-slate-600 bg-slate-600 px-3 py-2.5 text-sm text-gray-200 outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-600 pt-5 dark:border-white/10">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-200 transition hover:bg-gray-100 hover:text-gray-800 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/10"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Create Task
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;