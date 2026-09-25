import type { Habit } from "../types/habits";

export const HABITS: Habit[] = [
  {
    id: "habit-1",
    name: "Morning Exercise",
    description:
      "Start the day with 30 minutes of exercise.",

    category: "fitness",
    frequency: "daily",
    targetPerWeek: 7,

    status: "active",

    currentStreak: 8,
    bestStreak: 14,

    completedCount: 24,
    totalCount: 28,

    reminderEnabled: true,
    reminderTime: "07:00",

    color: "indigo",

    history: [
      {
        date: "2026-09-18",
        completed: true,
      },
      {
        date: "2026-09-19",
        completed: true,
      },
      {
        date: "2026-09-20",
        completed: true,
      },
      {
        date: "2026-09-21",
        completed: true,
      },
      {
        date: "2026-09-22",
        completed: true,
      },
      {
        date: "2026-09-23",
        completed: true,
      },
      {
        date: "2026-09-24",
        completed: true,
      },
    ],

    createdAt: "2026-08-01",
  },

  {
    id: "habit-2",
    name: "Read 30 Minutes",
    description:
      "Read technical or personal development books.",

    category: "learning",
    frequency: "daily",
    targetPerWeek: 7,

    status: "active",

    currentStreak: 5,
    bestStreak: 11,

    completedCount: 20,
    totalCount: 28,

    reminderEnabled: true,
    reminderTime: "21:00",

    color: "purple",

    history: [
      {
        date: "2026-09-18",
        completed: true,
      },
      {
        date: "2026-09-19",
        completed: true,
      },
      {
        date: "2026-09-20",
        completed: false,
      },
      {
        date: "2026-09-21",
        completed: true,
      },
      {
        date: "2026-09-22",
        completed: true,
      },
      {
        date: "2026-09-23",
        completed: true,
      },
      {
        date: "2026-09-24",
        completed: true,
      },
    ],

    createdAt: "2026-08-05",
  },

  {
    id: "habit-3",
    name: "Deep Work",
    description:
      "Complete at least one focused work session.",

    category: "productivity",
    frequency: "weekdays",
    targetPerWeek: 5,

    status: "active",

    currentStreak: 6,
    bestStreak: 10,

    completedCount: 18,
    totalCount: 22,

    reminderEnabled: true,
    reminderTime: "10:00",

    color: "emerald",

    history: [
      {
        date: "2026-09-18",
        completed: true,
      },
      {
        date: "2026-09-19",
        completed: false,
      },
      {
        date: "2026-09-20",
        completed: false,
      },
      {
        date: "2026-09-21",
        completed: true,
      },
      {
        date: "2026-09-22",
        completed: true,
      },
      {
        date: "2026-09-23",
        completed: true,
      },
      {
        date: "2026-09-24",
        completed: true,
      },
    ],

    createdAt: "2026-08-10",
  },

  {
    id: "habit-4",
    name: "Meditation",
    description:
      "Practice mindfulness for 10 minutes.",

    category: "mindfulness",
    frequency: "daily",
    targetPerWeek: 7,

    status: "active",

    currentStreak: 4,
    bestStreak: 9,

    completedCount: 16,
    totalCount: 28,

    reminderEnabled: true,
    reminderTime: "06:30",

    color: "orange",

    history: [
      {
        date: "2026-09-18",
        completed: true,
      },
      {
        date: "2026-09-19",
        completed: true,
      },
      {
        date: "2026-09-20",
        completed: false,
      },
      {
        date: "2026-09-21",
        completed: true,
      },
      {
        date: "2026-09-22",
        completed: true,
      },
      {
        date: "2026-09-23",
        completed: true,
      },
      {
        date: "2026-09-24",
        completed: true,
      },
    ],

    createdAt: "2026-08-15",
  },

  {
    id: "habit-5",
    name: "Weekly Planning",
    description:
      "Review tasks and plan the upcoming week.",

    category: "productivity",
    frequency: "weekly",
    targetPerWeek: 1,

    status: "active",

    currentStreak: 3,
    bestStreak: 6,

    completedCount: 5,
    totalCount: 7,

    reminderEnabled: true,
    reminderTime: "18:00",

    color: "blue",

    history: [
      {
        date: "2026-09-18",
        completed: true,
      },
      {
        date: "2026-09-24",
        completed: true,
      },
    ],

    createdAt: "2026-08-20",
  },
];