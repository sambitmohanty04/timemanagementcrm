import type { Goal } from "../types/goal";

export const GOALS: Goal[] = [
  {
    id: "goal-1",
    title: "Complete Chronos CRM",
    description:
      "Finish the core modules of the Chronos CRM application.",
    category: "productivity",
    period: "monthly",
    status: "active",
    priority: "high",
    currentValue: 72,
    targetValue: 100,
    unit: "%",
    startDate: "2026-09-01",
    dueDate: "2026-09-30",

    projectId: "project-1",
    projectName: "Chronos CRM",

    milestones: [
      {
        id: "m1",
        title: "Projects module",
        completed: true,
        completedAt: "2026-09-10",
      },
      {
        id: "m2",
        title: "Focus Mode",
        completed: true,
        completedAt: "2026-09-15",
      },
      {
        id: "m3",
        title: "Analytics",
        completed: false,
      },
      {
        id: "m4",
        title: "Goals",
        completed: false,
      },
    ],

    createdAt: "2026-09-01",
  },

  {
    id: "goal-2",
    title: "Complete 100 Tasks",
    description:
      "Complete 100 important tasks during this month.",
    category: "productivity",
    period: "monthly",
    status: "active",
    priority: "high",
    currentValue: 68,
    targetValue: 100,
    unit: "tasks",
    startDate: "2026-09-01",
    dueDate: "2026-09-30",

    milestones: [],

    createdAt: "2026-09-01",
  },

  {
    id: "goal-3",
    title: "Focus for 50 Hours",
    description:
      "Complete 50 hours of focused work this month.",
    category: "productivity",
    period: "monthly",
    status: "active",
    priority: "medium",
    currentValue: 32,
    targetValue: 50,
    unit: "hours",
    startDate: "2026-09-01",
    dueDate: "2026-09-30",

    milestones: [],

    createdAt: "2026-09-01",
  },

  {
    id: "goal-4",
    title: "Learn TypeScript",
    description:
      "Complete advanced TypeScript learning and practice.",
    category: "learning",
    period: "quarterly",
    status: "active",
    priority: "medium",
    currentValue: 60,
    targetValue: 100,
    unit: "%",
    startDate: "2026-07-01",
    dueDate: "2026-09-30",

    milestones: [
      {
        id: "m1",
        title: "Generics",
        completed: true,
      },
      {
        id: "m2",
        title: "Utility Types",
        completed: true,
      },
      {
        id: "m3",
        title: "Advanced Types",
        completed: false,
      },
    ],

    createdAt: "2026-07-01",
  },

  {
    id: "goal-5",
    title: "Build Portfolio",
    description:
      "Complete and publish the personal portfolio website.",
    category: "career",
    period: "monthly",
    status: "completed",
    priority: "high",
    currentValue: 100,
    targetValue: 100,
    unit: "%",
    startDate: "2026-08-01",
    dueDate: "2026-08-31",

    projectName: "Portfolio Website",

    milestones: [],

    createdAt: "2026-08-01",
  },
];