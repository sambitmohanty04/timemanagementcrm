import { useState } from "react";

import type { UserProfile } from "../../types/settings";

interface ProfileSettingsProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
}

const ProfileSettings = ({
  profile,
  onSave,
}: ProfileSettingsProps) => {
  const [form, setForm] =
    useState<UserProfile>(profile);

  const updateField = (
    field: keyof UserProfile,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-white">
          Profile
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-sm text-slate-400">
            Name
          </label>

          <input
            value={form.name}
            onChange={(e) =>
              updateField(
                "name",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Email
          </label>

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              updateField(
                "email",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Phone
          </label>

          <input
            value={form.phone}
            onChange={(e) =>
              updateField(
                "phone",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
          />
        </div>

        <div>
          <label className="text-sm text-slate-400">
            Bio
          </label>

          <input
            value={form.bio}
            onChange={(e) =>
              updateField(
                "bio",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSave(form)}
        className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
      >
        Save Changes
      </button>
    </div>
  );
};

export default ProfileSettings;