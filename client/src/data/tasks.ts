import type { Task } from "../types/task";

export const TASKS: Task[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Prepare the project proposal",
    priority: "high",
    status: "in-progress",
    dueDate: "2026-09-21",
    project: "Marketing",
    createdAt: "2026-09-20",
  },
  {
    id: "2",
    title: "Review React components",
    description: "Review reusable React components",
    priority: "medium",
    status: "todo",
    dueDate: "2026-09-22",
    project: "Development",
    createdAt: "2026-09-20",
  },
  {
    id: "3",
    title: "Update documentation",
    priority: "low",
    status: "completed",
    dueDate: "2026-09-20",
    project: "Documentation",
    createdAt: "2026-09-19",
  },
  {
    id: "4",
    title: "Fix authentication issue",
    priority: "high",
    status: "todo",
    dueDate: "2026-09-18",
    project: "Development",
    createdAt: "2026-09-17",
  },
];