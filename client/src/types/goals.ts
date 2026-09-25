export type GoalStatus =
  | "active"
  | "completed"
  | "overdue"
  | "on-hold";

export type GoalPriority =
  | "low"
  | "medium"
  | "high";

export type GoalCategory =
  | "productivity"
  | "career"
  | "personal"
  | "health"
  | "learning"
  | "financial";

export type GoalPeriod =
  | "daily"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly";

export interface GoalMilestone {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  period: GoalPeriod;
  status: GoalStatus;
  priority: GoalPriority;

  currentValue: number;
  targetValue: number;
  unit: string;

  startDate: string;
  dueDate: string;

  projectId?: string;
  projectName?: string;

  milestones: GoalMilestone[];

  createdAt: string;
}