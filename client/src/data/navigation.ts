import {
  LayoutDashboard,CheckSquare, Calendar, Clock, Zap, FolderKanban,Target,BarChart3,Bot,Settings,
  ListTodo,CalendarDays,CheckCircle2,AlertCircle,Flame,
} from "lucide-react";

import type { NavItem } from "../types/navigation";

export const NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "tasks",
    label: "My Tasks",
    icon: CheckSquare,
    path: "/tasks",
    badge: 12,
    badgeColor:
      "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    subItems: [
      {
        id: "tasks-all",
        label: "All Tasks",
        icon: ListTodo,
        filter: "all",
        count: 28,
      },
      {
        id: "tasks-today",
        label: "Today",
        icon: CalendarDays,
        filter: "today",
        count: 5,
        highlight: true,
      },
      {
        id: "tasks-upcoming",
        label: "Upcoming",
        icon: Calendar,
        filter: "upcoming",
        count: 14,
      },
      {
        id: "tasks-completed",
        label: "Completed",
        icon: CheckCircle2,
        filter: "completed",
        count: 8,
      },
      {
        id: "tasks-overdue",
        label: "Overdue",
        icon: AlertCircle,
        filter: "overdue",
        count: 1,
        danger: true,
      },
    ],
  },
  {
    id: "calendar",
    label: "Calendar",
    icon: Calendar,
    path: "/calendar",
  },
  {
    id: "time-tracker",
    label: "Time Tracker",
    icon: Clock,
    path: "/time-tracker",
    badge: "LIVE",
    badgeColor:
      "bg-emerald-500/20 text-emerald-400 animate-pulse border border-emerald-500/30",
  },
  {
    id: "focus-mode",
    label: "Focus Mode",
    icon: Zap,
    path: "/focus-mode",
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    id: "goals",
    label: "Goals",
    icon: Target,
    path: "/goals",
  },
  {
    id: "habits",
    label: "Habits",
    icon: Flame,
    path: "/habits",
    badge: "🔥 8",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    icon: Bot,
    path: "/ai-assistant",
    spark: true,
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];
