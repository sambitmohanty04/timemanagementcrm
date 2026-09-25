import {
  User,
  Bell,
  Shield,
  Settings2,
  Palette,
  LogOut,
} from "lucide-react";

import type { SettingsSection } from "../../types/settings";

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (
    section: SettingsSection
  ) => void;
}

const SETTINGS_ITEMS: {
  id: SettingsSection;
  label: string;
  icon: typeof User;
}[] = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "account",
    label: "Account",
    icon: Settings2,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "logout",
    label: "Logout",
    icon: LogOut,
  },
];

const SettingsSidebar = ({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) => {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-3">
      <nav className="space-y-1">
        {SETTINGS_ITEMS.map((item) => {
          const Icon = item.icon;

          const active =
            activeSection === item.id;

          const isLogout =
            item.id === "logout";

          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onSectionChange(item.id)
              }
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? "bg-indigo-500/10 text-indigo-400"
                  : isLogout
                    ? "text-red-400 hover:bg-red-500/10"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default SettingsSidebar;