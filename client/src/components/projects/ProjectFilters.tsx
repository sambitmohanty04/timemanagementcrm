import { Search, LayoutGrid, List } from "lucide-react";

import type { ProjectStatus } from "../../types/project";

interface ProjectFiltersProps {
  searchQuery: string;
  status: ProjectStatus | "all";
  viewMode: "grid" | "list";

  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProjectStatus | "all") => void;
  onViewModeChange: (value: "grid" | "list") => void;
}

const ProjectFilters = ({
  searchQuery,
  status,
  viewMode,
  onSearchChange,
  onStatusChange,
  onViewModeChange,
}: ProjectFiltersProps) => {
  const filters: {
    label: string;
    value: ProjectStatus | "all";
  }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "On Hold", value: "on-hold" },
    { label: "Archived", value: "archived" },
  ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onStatusChange(filter.value)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              status === filter.value
                ? "bg-indigo-500 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500/50 sm:w-64"
          />
        </div>

        <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={`rounded-lg p-2 ${
              viewMode === "grid"
                ? "bg-indigo-500 text-white"
                : "text-slate-400"
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>

          <button
            onClick={() => onViewModeChange("list")}
            className={`rounded-lg p-2 ${
              viewMode === "list"
                ? "bg-indigo-500 text-white"
                : "text-slate-400"
            }`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectFilters;