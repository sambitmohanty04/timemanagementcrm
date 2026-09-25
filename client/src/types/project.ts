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
  startDate: string;
  dueDate: string;
  color: string;
  taskCount: number;
  completedTasks: number;
  trackedSeconds: number;
  createdAt: string;
}