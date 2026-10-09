import { api } from "../config/api";

import type { Project, ProjectStats, CreateProjectData } from "../types/project";

export const getProjects = async (signal?: AbortSignal): Promise<Project[]> => {
  const { data } = await api.get("/projects", { signal });
  return data.data;
};

export const getProjectStats = async (signal?: AbortSignal): Promise<ProjectStats> => {
  const { data } = await api.get("/projects/stats", { signal });
  return data.data;
};

export const createProject = async (payload: CreateProjectData): Promise<Project> => {
  const { data } = await api.post("/projects", payload);
  return data.data;
};

export const updateProject = async (
  id: string,
  payload: Partial<CreateProjectData>
): Promise<Project> => {
  const { data } = await api.patch(
    `/projects/${id}`,
    payload
  );

  return data.data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await api.delete(`/projects/${id}`);
};