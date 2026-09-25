import {
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

import type { ProjectAnalytics as ProjectAnalyticsType } from "../../types/analytics";

interface ProjectAnalyticsProps {
  projects: ProjectAnalyticsType[];
}

const ProjectAnalytics = ({
  projects,
}: ProjectAnalyticsProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-6">
        <h3 className="font-medium text-white">
          Project Performance
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Productivity across your projects.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project) => {
          const progress =
            project.totalTasks > 0
              ? Math.round(
                  (project.completedTasks /
                    project.totalTasks) *
                    100
                )
              : 0;

          return (
            <div key={project.projectId}>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">
                    {project.projectName}
                  </h4>

                  <div className="mt-1 flex flex-wrap gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock3 className="h-3 w-3" />
                      {project.trackedHours}h
                    </span>

                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {project.completedTasks}/
                      {project.totalTasks}
                    </span>

                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {project.productivity}%
                    </span>
                  </div>
                </div>

                <span className="text-sm font-medium text-white">
                  {progress}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectAnalytics;