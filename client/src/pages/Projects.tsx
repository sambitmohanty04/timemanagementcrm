import { useMemo, useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import ProjectCard from "../components/projects/ProjectCard";
import ProjectStats from "../components/projects/ProjectStats";
import ProjectFilters from "../components/projects/ProjectFilters";
import CreateProjectModal from "../components/projects/CreateProjectModal";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../api/projectService";

import type {
  Project,
  ProjectStatus,
  CreateProjectData,
} from "../types/project";

const Projects = () => {
  const navigate = useNavigate();

  // --------------------------------
  // Data
  // --------------------------------
  const [projects, setProjects] = useState<Project[]>([]);
  const [statsRefreshKey, setStatsRefreshKey] = useState(0);

  // --------------------------------
  // Filters
  // --------------------------------
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<ProjectStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // --------------------------------
  // Project Modal
  // --------------------------------
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchProjects = useCallback(async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const data = await getProjects(signal);
      setProjects(data);
    } catch (err) {
      if (signal?.aborted) return;

      console.error("Failed to fetch projects:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load projects."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProjects(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchProjects]);

  // --------------------------------
  // Filter Projects
  // --------------------------------
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesStatus = status === "all" || project.status === status;

      const matchesSearch =
        query === "" ||
        [project.name, project.client, project.description].some((field) =>
          field?.toLowerCase().includes(query)
        );

      return matchesStatus && matchesSearch;
    });
  }, [projects, searchQuery, status]);

  // --------------------------------
  // CREATE PROJECT
  // --------------------------------
  const handleCreateProject = async (data: CreateProjectData) => {
    const created = await createProject(data);

    // A new project has no tasks yet
    const newProject: Project = {
      ...created,
      tasks: [],
      totalTasks: 0,
      completedTasks: 0,
      progress: 0,
    };

    setProjects((prev) => [newProject, ...prev]);
    setStatsRefreshKey((key) => key + 1);
    setProjectModalOpen(false);
    setSelectedProject(null);
  };

  // --------------------------------
  // UPDATE PROJECT
  // --------------------------------
  const handleUpdateProject = async (
    id: string,
    data: Partial<CreateProjectData>
  ) => {
    const updatedProject = await updateProject(id, data);

    setProjects((prev) =>
      prev.map((project) =>
        project.id === id
          ? {
              ...project,
              ...updatedProject,
              // Computed by getProjects, not returned by the update endpoint,
              // so keep what the card already has.
              tasks: project.tasks,
              totalTasks: project.totalTasks,
              completedTasks: project.completedTasks,
              progress: project.progress,
            }
          : project
      )
    );

    setStatsRefreshKey((key) => key + 1);
    setProjectModalOpen(false);
    setSelectedProject(null);
  };

  // --------------------------------
  // OPEN CREATE MODAL
  // --------------------------------
  const handleNewProject = () => {
    setSelectedProject(null);
    setProjectModalOpen(true);
  };

  // --------------------------------
  // OPEN EDIT MODAL
  // --------------------------------
  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectModalOpen(true);
  };

  // --------------------------------
  // PROJECT CLICK
  // --------------------------------
  const handleProjectClick = (project: Project) => {
    navigate(`/projects/${project.id}`);
  };

  // --------------------------------
  // DELETE PROJECT
  // --------------------------------
  const handleDeleteProject = async (project: Project) => {
    if (
      !window.confirm(`Delete "${project.name}"? This can't be undone.`)
    ) {
      return;
    }

    try {
      await deleteProject(project.id);

      setProjects((prev) => prev.filter((p) => p.id !== project.id));
      setStatsRefreshKey((key) => key + 1);
    } catch (err) {
      console.error("Delete failed:", err);
      alert(
        err instanceof Error ? err.message : "Failed to delete project"
      );
    }
  };

  // --------------------------------
  // CLOSE MODAL
  // --------------------------------
  const handleCloseModal = () => {
    setProjectModalOpen(false);
    setSelectedProject(null);
  };

  // --------------------------------
  // UI
  // --------------------------------
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your projects, tasks and tracked time.
          </p>
        </div>

        <button
          type="button"
          onClick={handleNewProject}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}

          <button
            type="button"
            onClick={() => fetchProjects()}
            className="ml-3 underline hover:text-red-300"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats */}
      <ProjectStats refreshKey={statsRefreshKey} />

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
      {loading ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
          <p className="text-slate-400">Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        !error && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
            <p className="text-slate-400">
              {projects.length === 0
                ? "No projects yet. Create your first one."
                : "No projects match your filters."}
            </p>
          </div>
        )
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-3"
          }
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={handleProjectClick}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              variant={viewMode}
            />
          ))}
        </div>
      )}

      {/* Create / Update Modal */}
      <CreateProjectModal
        open={projectModalOpen}
        project={selectedProject}
        onClose={handleCloseModal}
        onCreate={handleCreateProject}
        onUpdate={handleUpdateProject}
      />
    </div>
  );
};

export default Projects;
