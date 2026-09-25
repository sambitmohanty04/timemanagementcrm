import { useState } from "react";

import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsSidebar from "../components/settings/SettingsSidebar";
import ProfileSettings from "../components/settings/ProfileSettings";

import {
  DEFAULT_PROFILE,
} from "../data/settings";

import type {
  SettingsSection,
  UserProfile,
} from "../types/settings";

const Settings = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("profile");

  const [profile, setProfile] =
    useState<UserProfile>(
      DEFAULT_PROFILE
    );

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <ProfileSettings
            profile={profile}
            onSave={setProfile}
          />
        );

      case "notifications":
        return (
          <div className="text-white">
            Notification Settings
          </div>
        );

      case "security":
        return (
          <div className="text-white">
            Security Settings
          </div>
        );

      case "account":
        return (
          <div className="text-white">
            Account Settings
          </div>
        );

      case "appearance":
        return (
          <div className="text-white">
            Appearance Settings
          </div>
        );

      case "logout":
        return (
          <div className="text-white">
            Logout
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">

      <SettingsHeader
        title="Settings"
        description="Manage your account and application preferences."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">

        {/* Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Content */}
        <div className="min-h-[500px] rounded-2xl border border-white/10 bg-white/5 p-6">
          {renderSection()}
        </div>

      </div>
    </div>
  );
};

export default Settings;