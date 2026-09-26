import type { TaskPriority, TaskStatus } from "./task";

export interface CalendarTask {
  id: string;
  title: string;
  dueDate: string;
  dueTime?: string;
  priority: TaskPriority;
  status: TaskStatus;
}