export type GoalStatus = "active" | "completed" | "overdue" | "on-hold";

export type GoalPriority = "low" | "medium" | "high";

export type GoalCategory =
  | "productivity"
  | "career"
  | "personal"
  | "health"
  | "learning"
  | "financial";

export type GoalPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

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

/* ---------- API types ---------- */

export interface GoalStats {
  total: number;
  active: number;
  completed: number;
  overdue: number;
  onHold: number;
  completionRate: number;
}

export type CreateGoalData = Omit<
  Goal,
  "id" | "createdAt" | "projectName" | "milestones" | "status" | "currentValue"
> & {
  status?: GoalStatus;
  currentValue?: number;
  milestones?: Pick<GoalMilestone, "title">[];
};

export type UpdateGoalData = Partial<CreateGoalData>;

export interface GoalFilters {
  status?: GoalStatus;
  priority?: GoalPriority;
  category?: GoalCategory;
  period?: GoalPeriod;
  projectId?: string;
}