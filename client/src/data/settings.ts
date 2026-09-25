import type {
  UserProfile,
  NotificationSettings,
  SecuritySettings,
  AccountSettings,
  AppearanceSettings,
} from "../types/settings";

export const DEFAULT_PROFILE: UserProfile = {
  name: "Sambit Mohanty",
  email: "sambit@example.com",
  phone: "",
  bio: "Frontend Developer",
};

export const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  emailNotifications: true,
  taskReminders: true,
  habitReminders: true,
  focusAlerts: true,
  projectNotifications: false,
  browserNotifications: true,
};

export const DEFAULT_SECURITY: SecuritySettings = {
  twoFactorEnabled: false,
};

export const DEFAULT_ACCOUNT: AccountSettings = {
  language: "English",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  weekStartsOn: "monday",
};

export const DEFAULT_APPEARANCE: AppearanceSettings = {
  theme: "dark",
  accentColor: "indigo",
  compactLayout: false,
  collapsedSidebar: false,
};