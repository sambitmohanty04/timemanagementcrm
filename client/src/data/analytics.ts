import type {
  AnalyticsStats,
  ProductivityData,
  TimeDistribution,
  ProjectAnalytics,
  TaskAnalyticsData,
  FocusAnalyticsData,
} from "../types/analytics";

export const ANALYTICS_STATS: AnalyticsStats = {
  focusTime: 18.75,
  tasksCompleted: 42,
  productivity: 82,
  sessions: 36,
};

export const PRODUCTIVITY_DATA: ProductivityData[] = [
  {
    date: "2026-09-18",
    day: "Mon",
    focusHours: 3.5,
    tasksCompleted: 5,
  },
  {
    date: "2026-09-19",
    day: "Tue",
    focusHours: 4.2,
    tasksCompleted: 7,
  },
  {
    date: "2026-09-20",
    day: "Wed",
    focusHours: 5.1,
    tasksCompleted: 9,
  },
  {
    date: "2026-09-21",
    day: "Thu",
    focusHours: 4.4,
    tasksCompleted: 6,
  },
  {
    date: "2026-09-22",
    day: "Fri",
    focusHours: 6,
    tasksCompleted: 8,
  },
  {
    date: "2026-09-23",
    day: "Sat",
    focusHours: 2.5,
    tasksCompleted: 3,
  },
  {
    date: "2026-09-24",
    day: "Sun",
    focusHours: 3.2,
    tasksCompleted: 4,
  },
];

export const TIME_DISTRIBUTION: TimeDistribution[] = [
  {
    category: "Focus",
    hours: 18.75,
    percentage: 65,
  },
  {
    category: "Meetings",
    hours: 4.33,
    percentage: 15,
  },
  {
    category: "Breaks",
    hours: 3.17,
    percentage: 11,
  },
  {
    category: "Other",
    hours: 2.58,
    percentage: 9,
  },
];

export const PROJECT_ANALYTICS: ProjectAnalytics[] = [
  {
    projectId: "project-1",
    projectName: "Chronos CRM",
    trackedHours: 18,
    completedTasks: 32,
    totalTasks: 40,
    productivity: 88,
  },
  {
    projectId: "project-2",
    projectName: "Cellexa Website",
    trackedHours: 12,
    completedTasks: 18,
    totalTasks: 30,
    productivity: 76,
  },
  {
    projectId: "project-3",
    projectName: "Portfolio Website",
    trackedHours: 7,
    completedTasks: 9,
    totalTasks: 20,
    productivity: 64,
  },
  {
    projectId: "project-4",
    projectName: "Mobile Application",
    trackedHours: 5,
    completedTasks: 5,
    totalTasks: 20,
    productivity: 52,
  },
];

export const TASK_ANALYTICS: TaskAnalyticsData = {
  completed: 42,
  inProgress: 12,
  todo: 18,
  overdue: 4,
};

export const FOCUS_ANALYTICS: FocusAnalyticsData[] = [
  {
    day: "Mon",
    sessions: 5,
    focusHours: 3.5,
  },
  {
    day: "Tue",
    sessions: 6,
    focusHours: 4.2,
  },
  {
    day: "Wed",
    sessions: 8,
    focusHours: 5.1,
  },
  {
    day: "Thu",
    sessions: 7,
    focusHours: 4.4,
  },
  {
    day: "Fri",
    sessions: 10,
    focusHours: 6,
  },
  {
    day: "Sat",
    sessions: 3,
    focusHours: 2.5,
  },
  {
    day: "Sun",
    sessions: 4,
    focusHours: 3.2,
  },
];