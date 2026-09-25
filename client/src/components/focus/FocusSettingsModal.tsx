import { useState } from "react";
import { Bell, Clock3, Volume2, X } from "lucide-react";

interface FocusSettings {
  focusDuration: number;
  shortBreak: number;
  longBreak: number;
  autoStartBreak: boolean;
  soundEnabled: boolean;
}

interface FocusSettingsModalProps {
  open: boolean;
  settings: FocusSettings;
  onClose: () => void;
  onSave: (settings: FocusSettings) => void;
}

const FocusSettingsModal = ({
  open,
  settings,
  onClose,
  onSave,
}: FocusSettingsModalProps) => {
  const [form, setForm] = useState<FocusSettings>(settings);

  if (!open) {
    return null;
  }

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      {/* Modal */}
      <div className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">

        {/* Header - Fixed */}
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Focus Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Customize your focus sessions and breaks.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body - Scrollable */}
        <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6">

          {/* Focus Duration */}
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-indigo-500/10 p-2">
                <Clock3 className="h-5 w-5 text-indigo-400" />
              </div>

              <div>
                <h3 className="text-sm font-medium text-white">
                  Focus Duration
                </h3>

                <p className="text-xs text-slate-500">
                  How long should a focus session last?
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[25, 50, 90].map((duration) => (
                <button
                  key={duration}
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      focusDuration: duration,
                    }))
                  }
                  className={`rounded-xl border px-4 py-3 text-sm transition ${
                    form.focusDuration === duration
                      ? "border-indigo-500 bg-indigo-500/15 text-indigo-400"
                      : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                  }`}
                >
                  {duration} min
                </button>
              ))}
            </div>
          </div>

          {/* Short Break */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Short Break
            </label>

            <select
              value={form.shortBreak}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  shortBreak: Number(e.target.value),
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50"
            >
              <option value={5}>5 minutes</option>
              <option value={10}>10 minutes</option>
              <option value={15}>15 minutes</option>
            </select>
          </div>

          {/* Long Break */}
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Long Break
            </label>

            <select
              value={form.longBreak}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  longBreak: Number(e.target.value),
                }))
              }
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500/50"
            >
              <option value={15}>15 minutes</option>
              <option value={20}>20 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>

          {/* Auto Start Break */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <Bell className="h-5 w-5 text-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Auto-start breaks
                </p>

                <p className="text-xs text-slate-500">
                  Automatically start your break after focus.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  autoStartBreak: !prev.autoStartBreak,
                }))
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                form.autoStartBreak
                  ? "bg-indigo-500"
                  : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  form.autoStartBreak
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Volume2 className="h-5 w-5 text-purple-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  Sound notification
                </p>

                <p className="text-xs text-slate-500">
                  Play a sound when the timer finishes.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  soundEnabled: !prev.soundEnabled,
                }))
              }
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                form.soundEnabled
                  ? "bg-indigo-500"
                  : "bg-white/10"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                  form.soundEnabled
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer - Fixed */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-white/10 p-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 transition hover:bg-white/5"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default FocusSettingsModal;