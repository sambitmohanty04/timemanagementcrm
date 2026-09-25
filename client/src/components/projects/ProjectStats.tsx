import {
  FolderKanban,
  CheckCircle2,
  Clock3,
  Activity,
} from "lucide-react";

import type { Project } from "../../types/project";

interface ProjectStatsProps {
  projects: Project[];
}

const formatHours = (seconds: number) => {
  return `${(seconds / 3600).toFixed(1)}h`;
};

const ProjectStats = ({ projects }: ProjectStatsProps) => {
  const activeProjects = projects.filter(
    (project) => project.status === "active"
  ).length;

  const completedProjects = projects.filter(
    (project) => project.status === "completed"
  ).length;

  const totalTrackedSeconds = projects.reduce(
    (total, project) => total + project.trackedSeconds,
    0
  );

  const totalTasks = projects.reduce(
    (total, project) => total + project.taskCount,
    0
  );

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
    },
    {
      label: "Active Projects",
      value: activeProjects,
      icon: Activity,
    },
    {
      label: "Completed",
      value: completedProjects,
      icon: CheckCircle2,
    },
    {
      label: "Tracked Time",
      value: formatHours(totalTrackedSeconds),
      icon: Clock3,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{stat.label}</p>

                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {stat.value}
                </h3>
              </div>

              <div className="rounded-xl bg-indigo-500/10 p-3">
                <Icon className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectStats;