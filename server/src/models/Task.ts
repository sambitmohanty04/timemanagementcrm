export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in-progress" | "completed" | "cancelled";
export type TaskFilter = "all" | "today" | "upcoming" | "completed" | "overdue";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  dueTime: string;
  project?: string;
  createdAt: string;
}