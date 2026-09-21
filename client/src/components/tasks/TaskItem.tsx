import {
  CalendarDays,
  CheckCircle2,
  Circle,
  MoreVertical,
} from "lucide-react";

import type { Task } from "../../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const priorityClass = {
    high: "bg-red-500/10 text-red-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    low: "bg-green-500/10 text-green-500",
  };

  return (
    <div className="group flex items-center gap-4 border-b border-slate-800 p-4 transition hover:bg-slate-900 dark:border-white/10 dark:hover:bg-slate/[0.03]">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className="shrink-0"
      >
        {task.status === "completed" ? (
          <CheckCircle2
            size={22}
            className="text-green-500"
          />
        ) : (
          <Circle
            size={22}
            className="text-gray-400 transition group-hover:text-blue-500"
          />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-medium ${
            task.status === "completed"
              ? "text-gray-100 line-through"
              : "text-gray-100 dark:text-white"
          }`}
        >
          {task.title}
        </h3>

        {task.description && (
          <p className="mt-1 text-sm text-gray-300 dark:text-gray-400">
            {task.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
          {task.project && (
            <span className="text-gray-300 dark:text-gray-400">
              {task.project}
            </span>
          )}

          <span className="flex items-center gap-1 text-gray-300 dark:text-gray-400">
            <CalendarDays size={13} />
            {task.dueDate}
          </span>
        </div>
      </div>

      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
          priorityClass[task.priority]
        }`}
      >
        {task.priority}
      </span>

      <button
        type="button"
        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <MoreVertical size={18} />
      </button>
    </div>
  );
};

export default TaskItem;