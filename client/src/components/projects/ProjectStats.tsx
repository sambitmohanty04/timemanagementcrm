import { useState, useEffect } from "react";
import { FolderKanban, CheckCircle2, Clock3, Activity } from "lucide-react";

import type { ProjectStats as ProjectStatsType } from "../../types/project";
import { getProjectStats } from "../../api/projectService";

interface ProjectStatsProps {
  refreshKey?: number; // change this value to trigger a refetch
}

const ProjectStats = ({ refreshKey = 0 }: ProjectStatsProps) => {
  const [stats, setStats] = useState<ProjectStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        setError(false);
        const data = await getProjectStats(controller.signal);
        setStats(data);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("Failed to fetch project statistics:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchStats();

    return () => controller.abort();
  }, [refreshKey]);

  const items = [
    { label: "Total Projects", value: stats?.totalProjects, icon: FolderKanban },
    { label: "Active Projects", value: stats?.activeProjects, icon: Activity },
    {
      label: "Completed Projects",
      value: stats?.completedProjects,
      icon: CheckCircle2,
    },
    {
      label: "Tracked Time",
      value:
        typeof stats?.trackedHours === "number"
          ? `${stats.trackedHours}h`
          : undefined,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">{label}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {loading ? "..." : error || value === undefined ? "—" : value}
              </h3>
            </div>

            <div className="rounded-xl bg-indigo-500/10 p-3">
              <Icon className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;