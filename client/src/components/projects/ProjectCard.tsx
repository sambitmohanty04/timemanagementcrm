import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  MoreVertical,
} from "lucide-react";

import type { Project } from "../../types/project";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const progress =
    project.taskCount > 0
      ? Math.round((project.completedTasks / project.taskCount) * 100)
      : 0;

  const trackedHours = (project.trackedSeconds / 3600).toFixed(1);

  const statusClasses = {
    active: "bg-emerald-500/10 text-emerald-400",
    completed: "bg-blue-500/10 text-blue-400",
    "on-hold": "bg-amber-500/10 text-amber-400",
    archived: "bg-slate-500/10 text-slate-400",
  };

  const priorityClasses = {
    low: "text-slate-400",
    medium: "text-amber-400",
    high: "text-red-400",
  };

  return (
    <div
      onClick={() => onClick(project)}
      className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-white/[0.07]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 font-semibold text-indigo-400">
            {project.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {project.name}
            </h3>

            <p className="text-sm text-slate-500">
              {project.client}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => e.stopPropagation()}
          className="rounded-lg p-1.5 text-slate-500 hover:bg-white/10 hover:text-white"
        >
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
        {project.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span
          className={`rounded-full px-2.5 py-1 text-xs capitalize ${
            statusClasses[project.status]
          }`}
        >
          {project.status.replace("-", " ")}
        </span>

        <span
          className={`text-xs font-medium capitalize ${
            priorityClasses[project.priority]
          }`}
        >
          {project.priority} priority
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">Progress</span>

          <span className="text-xs font-medium text-white">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="h-4 w-4" />
          {project.completedTasks}/{project.taskCount} tasks
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock3 className="h-4 w-4" />
          {trackedHours}h
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-500">
        <CalendarDays className="h-4 w-4" />
        Due {project.dueDate}
      </div>
    </div>
  );
};

export default ProjectCard;