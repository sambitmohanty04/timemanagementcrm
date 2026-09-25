export type SettingsSection =
  | "profile"
  | "notifications"
  | "security"
  | "account"
  | "appearance"
  | "logout";

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  avatar?: string;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  taskReminders: boolean;
  habitReminders: boolean;
  focusAlerts: boolean;
  projectNotifications: boolean;
  browserNotifications: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
}

export interface AccountSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  weekStartsOn: "monday" | "sunday";
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  compactLayout: boolean;
  collapsedSidebar: boolean;
}