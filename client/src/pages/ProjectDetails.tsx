import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ListTodo,
  Users,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { PROJECTS } from "../data/projects";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const project = PROJECTS.find(
    (item) => item.id === projectId
  );

  if (!project) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
        <h2 className="text-xl font-semibold text-white">
          Project not found
        </h2>

        <button
          onClick={() => navigate("/projects")}
          className="mt-5 rounded-xl bg-indigo-500 px-4 py-2 text-sm text-white"
        >
          Back to Projects
        </button>
      </div>
    );
  }

  const progress =
    project.taskCount > 0
      ? Math.round(
          (project.completedTasks / project.taskCount) * 100
        )
      : 0;

  const trackedHours = (
    project.trackedSeconds / 3600
  ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 text-sm text-slate-400 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </button>

      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-xl font-semibold text-indigo-400">
              {project.name.charAt(0)}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold text-white">
                  {project.name}
                </h1>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  {project.status.replace("-", " ")}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-400">
                {project.description}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Client: {project.client}
              </p>
            </div>
          </div>

          <button className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-600">
            Edit Project
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <ListTodo className="h-5 w-5 text-indigo-400" />

            <div>
              <p className="text-xs text-slate-500">
                Tasks
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {project.completedTasks}/{project.taskCount}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />

            <div>
              <p className="text-xs text-slate-500">
                Progress
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {progress}%
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <Clock3 className="h-5 w-5 text-amber-400" />

            <div>
              <p className="text-xs text-slate-500">
                Tracked Time
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {trackedHours}h
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-purple-400" />

            <div>
              <p className="text-xs text-slate-500">
                Due Date
              </p>

              <p className="mt-1 text-xl font-semibold text-white">
                {project.dueDate}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-white">
            Project Progress
          </h2>

          <span className="text-sm text-indigo-400">
            {progress}%
          </span>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Tabs / Future sections */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <button className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/[0.08]">
          <ListTodo className="h-6 w-6 text-indigo-400" />

          <h3 className="mt-4 font-semibold text-white">
            Project Tasks
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            View and manage project tasks.
          </p>
        </button>

        <button className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/[0.08]">
          <Clock3 className="h-6 w-6 text-emerald-400" />

          <h3 className="mt-4 font-semibold text-white">
            Time Tracking
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            View tracked time for this project.
          </p>
        </button>

        <button className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:bg-white/[0.08]">
          <Users className="h-6 w-6 text-purple-400" />

          <h3 className="mt-4 font-semibold text-white">
            Team
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Manage project members.
          </p>
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;