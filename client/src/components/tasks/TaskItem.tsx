import { useState, useRef, useEffect } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Circle,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Task } from "../../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const priorityClass = {
    high: "bg-red-500/10 text-red-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    low: "bg-green-500/10 text-green-500",
  };

  const handleMenuToggle = () => {
    if (!menuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeightEstimate = 90; // roughly 2 items tall

      // If not enough space below, open upward instead
      setOpenUpward(spaceBelow < menuHeightEstimate);
    }
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const formatDueDate = (dueDate: string | Date): string => {
    const date = new Date(dueDate);

    if (isNaN(date.getTime())) return "";

    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group flex items-center gap-4 border-b border-slate-800 p-4 transition hover:bg-slate-900 dark:border-white/10 dark:hover:bg-slate/[0.03]">
      <button
        type="button"
        onClick={() => onToggle(task.id)}
        className="shrink-0"
      >
        {task.status === "completed" ? (
          <CheckCircle2 size={22} className="text-green-500" />
        ) : (
          <Circle
            size={22}
            className="text-gray-400 transition group-hover:text-blue-500"
          />
        )}
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`font-medium ${task.status === "completed"
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
            {formatDueDate(task.dueDate)}
          </span>
        </div>
      </div>

      <span
        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${priorityClass[task.priority]
          }`}
      >
        {task.priority}
      </span>

      {/* 3-dot menu */}
      <div className="relative" ref={menuRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={handleMenuToggle}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <MoreVertical size={18} />
        </button>

        {menuOpen && (
          <div
            className={`absolute right-0 z-50 w-36 overflow-hidden rounded-lg border border-slate-700 bg-slate-800 shadow-lg dark:border-white/10 dark:bg-[#1a2332] ${openUpward ? "bottom-full mb-1" : "top-full mt-1"
              }`}
          >
            <button
              type="button"
              onClick={() => {
                onEdit(task);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-200 hover:bg-white/5"
            >
              <Pencil size={14} />
              Edit
            </button>

            <button
              type="button"
              onClick={() => {
                onDelete(task.id);
                setMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-400 hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;