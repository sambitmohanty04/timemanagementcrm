export type HabitFrequency =
  | "daily"
  | "weekly"
  | "weekdays"
  | "custom";

export type HabitCategory =
  | "health"
  | "productivity"
  | "learning"
  | "personal"
  | "fitness"
  | "mindfulness";

export type HabitStatus =
  | "active"
  | "paused"
  | "completed";

export interface HabitHistory {
  date: string;
  completed: boolean;
}

export interface Habit {
  id: string;
  name: string;
  description: string;

  category: HabitCategory;
  frequency: HabitFrequency;

  targetPerWeek: number;

  status: HabitStatus;

  currentStreak: number;
  bestStreak: number;

  completedCount: number;
  totalCount: number;

  reminderEnabled: boolean;
  reminderTime?: string;

  color: string;
  icon?: string;

  history: HabitHistory[];

  createdAt: string;
}