import { API_URL } from "../config/api";
import type { Task } from "../types/task";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const fetchTasks = async (): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks`, { headers: authHeaders() });
  const data = await res.json();
  return data.tasks || [];
};

export const createTaskApi = async (
  task: Omit<Task, "id" | "createdAt" | "status">
): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(task),
  });
  const data = await res.json();
  if (!data.success || !data.task) {
    throw new Error(data.message || "Failed to create task");
  }
  return data.task;
};

export const updateTaskApi = async (
  id: string,
  updates: Partial<Omit<Task, "id" | "createdAt" | "status">>
): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(updates),
  });
  const data = await res.json();
  return data.task;
};

export const toggleTaskApi = async (id: string): Promise<Task> => {
  const res = await fetch(`${API_URL}/tasks/${id}/toggle`, {
    method: "PATCH",
    headers: authHeaders(),
  });
  const data = await res.json();
  return data.task;
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
};