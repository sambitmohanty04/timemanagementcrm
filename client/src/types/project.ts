export type ProjectStatus =
  | "active"
  | "completed"
  | "on-hold"
  | "archived";

export type ProjectPriority =
  | "low"
  | "medium"
  | "high";

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate?: string;
  dueDate?: string;
  color: string;
  totalTasks: number;      // was taskCount
  completedTasks: number;
  trackedSeconds: number;
  trackedHours: number;    // sent by the API
  progress: number;        // sent by the API
  createdAt: string;
}

export interface ProjectStats {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  trackedHours: number;
}

export interface CreateProjectData {
  name: string;
  description: string;
  client: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  startDate?: string;
  dueDate?: string;
  color: string;
}

export type ProjectTask = {
  id: string;
  title: string;
  status: string; 
};