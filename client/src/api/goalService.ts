import { api } from "../config/api";

import type {
  Goal,
  GoalStats,
  GoalFilters,
  GoalMilestone,
  CreateGoalData,
  UpdateGoalData,
} from "../types/goals";

/* ---------- Helpers ---------- */

type RawRecord = Record<string, any>;

const normalizeGoal = (raw: RawRecord): Goal => ({
  ...(raw as Goal),
  id: raw.id ?? raw._id,
  description: raw.description ?? "",
  milestones: (raw.milestones ?? []).map((m: RawRecord) => ({
    ...m,
    id: m.id ?? m._id,
  })),
});

// Accepts { data: goal }, { data: { goal } }, { goal }, or the goal itself
const unwrapGoal = (body: RawRecord): Goal =>
  normalizeGoal(body?.data?.goal ?? body?.data ?? body?.goal ?? body);

/* ---------- Goals ---------- */

export const getGoals = async (
  filters?: GoalFilters,
  signal?: AbortSignal
): Promise<Goal[]> => {
  const { data } = await api.get("/goals", { params: filters, signal });

  // Accepts { data: [...] }, { data: { goals: [...] } }, { goals: [...] }, or [...]
  const list = data?.data?.goals ?? data?.data ?? data?.goals ?? data;

  return Array.isArray(list) ? list.map(normalizeGoal) : [];
};

export const getGoalById = async (
  id: string,
  signal?: AbortSignal
): Promise<Goal> => {
  const { data } = await api.get(`/goals/${id}`, { signal });
  return unwrapGoal(data);
};

export const getGoalStats = async (signal?: AbortSignal): Promise<GoalStats> => {
  const { data } = await api.get("/goals/stats", { signal });
  return data?.data ?? data;
};

export const createGoal = async (payload: CreateGoalData): Promise<Goal> => {
  const { data } = await api.post("/goals", payload);
  return unwrapGoal(data);
};

export const updateGoal = async (
  id: string,
  payload: UpdateGoalData
): Promise<Goal> => {
  const { data } = await api.patch(`/goals/${id}`, payload);
  return unwrapGoal(data);
};

export const deleteGoal = async (id: string): Promise<void> => {
  await api.delete(`/goals/${id}`);
};

/* ---------- Progress ---------- */

export const updateGoalProgress = async (
  id: string,
  currentValue: number
): Promise<Goal> => {
  const { data } = await api.patch(`/goals/${id}/progress`, { currentValue });
  return unwrapGoal(data);
};

/* ---------- Milestones ---------- */

export const addMilestone = async (
  goalId: string,
  title: string
): Promise<Goal> => {
  const { data } = await api.post(`/goals/${goalId}/milestones`, { title });
  return unwrapGoal(data);
};

export const updateMilestone = async (
  goalId: string,
  milestoneId: string,
  payload: Partial<Pick<GoalMilestone, "title" | "completed">>
): Promise<Goal> => {
  const { data } = await api.patch(
    `/goals/${goalId}/milestones/${milestoneId}`,
    payload
  );
  return unwrapGoal(data);
};

export const deleteMilestone = async (
  goalId: string,
  milestoneId: string
): Promise<Goal> => {
  const { data } = await api.delete(
    `/goals/${goalId}/milestones/${milestoneId}`
  );
  return unwrapGoal(data);
};