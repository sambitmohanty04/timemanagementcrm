export type CalendarTaskPriority = "low" | "medium" | "high";
export type CalendarTaskStatus = "todo" | "completed";

export interface CalendarTask {
  id: string;
  title: string;
  dueDate: string;
  priority: CalendarTaskPriority;
  status: CalendarTaskStatus;
}