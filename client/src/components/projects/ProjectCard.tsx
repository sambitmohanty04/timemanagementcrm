import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (project: Project) => void;
  variant?: "grid" | "list";
}

const statusClasses: Record<Project["status"], string> = {
  active: "bg-emerald-500/10 text-emerald-400",
  completed: "bg-blue-500/10 text-blue-400",
  "on-hold": "bg-amber-500/10 text-amber-400",
  archived: "bg-slate-500/10 text-slate-400",
};

const priorityClasses: Record<Project["priority"], string> = {
  low: "text-slate-400",
  medium: "text-amber-400",
  high: "text-red-400",
};

const formatDate = (value?: string) => {
  if (!value) return "No due date";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? "No due date"
    : d.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
};

const ProjectCard = ({
  project,
  onClick,
  onEdit,
  onDelete,
  variant = "grid",
}: ProjectCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const progress = Math.min(100, Math.max(0, project.progress ?? 0));
  const color = project.color || "#6366f1";
  const isList = variant === "list";

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ignore key presses coming from the inner menu buttons
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick(project);
    }
  };

  const optionsMenu = (
    <div
      className={`relative ${isList ? "shrink-0" : "ml-auto"}`}
      onMouseEnter={() => setMenuOpen(true)}
      onMouseLeave={() => setMenuOpen(false)}
    >
      <button
        type="button"
        aria-label="Project options"
        aria-expanded={menuOpen}
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen((open) => !open);
        }}
        className="rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-white"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full z-20 pt-1">
          <div className="w-32 overflow-hidden rounded-xl border border-white/10 bg-slate-900 py-1 shadow-xl">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onEdit?.(project);
              }}
              className="flex w-full flex-row items-center gap-2 px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <Pencil className="h-4 w-4 shrink-0" />
              <span>Edit</span>
            </button>

            <div className="mx-2 h-px bg-white/10" />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete?.(project);
              }}
              className="flex w-full flex-row items-center gap-2 px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4 shrink-0" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(project)}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-indigo-500/30 hover:bg-white/[0.07] ${isList ? "flex items-center gap-6" : "hover:-translate-y-0.5"
        }`}
    >
      {/* Identity */}
      <div className={`flex items-center gap-3 ${isList ? "w-64 shrink-0" : ""}`}>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-semibold"
          style={{ backgroundColor: `${color}26`, color }}
        >
          {project.name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">{project.name}</h3>
          <p className="truncate text-sm text-slate-500">{project.client}</p>
        </div>

        {!isList && optionsMenu}
      </div>

      {/* Description (grid only) */}
      {!isList && (
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
          {project.description}
        </p>
      )}

      {/* Status + priority */}
      <div
        className={`flex items-center gap-3 ${isList ? "" : "mt-5 justify-between"
          }`}
      >
        <span
          className={`rounded-full px-2.5 py-1 text-xs capitalize ${statusClasses[project.status]
            }`}
        >
          {project.status.replace("-", " ")}
        </span>

        <span
          className={`text-xs font-medium capitalize ${priorityClasses[project.priority]
            }`}
        >
          {project.priority} priority
        </span>
      </div>

      {/* Progress */}
      <div className={isList ? "min-w-40 flex-1" : "mt-5"}>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">Progress</span>
          <span className="text-xs font-medium text-white">{progress}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all"
            style={{ width: `${progress}%`, backgroundColor: color }}
          />
        </div>
      </div>

      {/* Tasks + time */}
      <div className={isList ? "flex gap-6" : "mt-5 grid grid-cols-2 gap-3"}>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="h-4 w-4" />
          {project.completedTasks ?? 0}/{project.totalTasks ?? 0} tasks
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock3 className="h-4 w-4" />
          {project.trackedHours ?? 0}h
        </div>
      </div>

      {/* Due date */}
      <div
        className={`flex items-center gap-2 text-xs text-slate-500 ${isList ? "shrink-0" : "mt-4 border-t border-white/10 pt-4"
          }`}
      >
        <CalendarDays className="h-4 w-4" />
        Due {formatDate(project.dueDate)}
      </div>

      {/* Options menu (list view: end of the row) */}
      {isList && optionsMenu}
    </div>
  );
};

export default ProjectCard;