import { api } from "../config/api";

interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  token?: string;
  user?: T;
  [key: string]: unknown;
}

export async function apiPost<T = unknown>(
  endpoint: string,
  body: object
): Promise<ApiResponse<T>> {
  const res = await fetch(`${api}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res.json();
}