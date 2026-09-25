import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../components/projects/ProjectCard";
import ProjectStats from "../components/projects/ProjectStats";
import ProjectFilters from "../components/projects/ProjectFilters";
import CreateProjectModal from "../components/projects/CreateProjectModal";

import { PROJECTS } from "../data/projects";

import type {
  Project,
  ProjectPriority,
  ProjectStatus,
} from "../types/project";

const Projects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [createProjectOpen, setCreateProjectOpen] =
    useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus =
        status === "all" || project.status === status;

      const query = searchQuery.toLowerCase();

      const matchesSearch =
        project.name.toLowerCase().includes(query) ||
        project.client.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [projects, searchQuery, status]);

  const handleCreateProject = (data: {
    name: string;
    description: string;
    client: string;
    status: ProjectStatus;
    priority: ProjectPriority;
    startDate: string;
    dueDate: string;
    color: string;
  }) => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      ...data,
      taskCount: 0,
      completedTasks: 0,
      trackedSeconds: 0,
      createdAt: new Date().toISOString(),
    };

    setProjects((prev) => [newProject, ...prev]);

    setCreateProjectOpen(false);
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Projects
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your projects, tasks and tracked time.
          </p>
        </div>

        <button
          onClick={() => setCreateProjectOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Stats */}
      <ProjectStats projects={projects} />

      {/* Filters */}
      <ProjectFilters
        searchQuery={searchQuery}
        status={status}
        viewMode={viewMode}
        onSearchChange={setSearchQuery}
        onStatusChange={setStatus}
        onViewModeChange={setViewMode}
      />

      {/* Projects */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-slate-400">
            No projects found.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateProjectModal
        open={createProjectOpen}
        onClose={() => setCreateProjectOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
};

export default Projects;