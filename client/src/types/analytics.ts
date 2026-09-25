export interface AnalyticsStats {
  focusTime: number;
  tasksCompleted: number;
  productivity: number;
  sessions: number;
}

export interface ProductivityData {
  date: string;
  day: string;
  focusHours: number;
  tasksCompleted: number;
}

export interface TimeDistribution {
  category: string;
  hours: number;
  percentage: number;
}

export interface ProjectAnalytics {
  projectId: string;
  projectName: string;
  trackedHours: number;
  completedTasks: number;
  totalTasks: number;
  productivity: number;
}

export interface TaskAnalyticsData {
  completed: number;
  inProgress: number;
  todo: number;
  overdue: number;
}

export interface FocusAnalyticsData {
  day: string;
  sessions: number;
  focusHours: number;
}

export interface ProductivityInsight {
  title: string;
  description: string;
}