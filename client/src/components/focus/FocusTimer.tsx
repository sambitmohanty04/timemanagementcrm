import {
  Pause,
  Play,
  RotateCcw,
  Check,
} from "lucide-react";

import type {
  FocusMode,
  FocusTimerProps,
} from "../../types/focus";

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

const FocusTimer = ({
  mode,
  elapsedSeconds,
  totalSeconds,
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onFinish,
  onReset,
  onModeChange,
}: FocusTimerProps) => {
  const remainingSeconds = Math.max(
    totalSeconds - elapsedSeconds,
    0
  );

  const progress =
    totalSeconds > 0
      ? (elapsedSeconds / totalSeconds) * 100
      : 0;

  const modes: {
    label: string;
    value: FocusMode;
  }[] = [
    {
      label: "Focus",
      value: "focus",
    },
    {
      label: "Short Break",
      value: "short-break",
    },
    {
      label: "Long Break",
      value: "long-break",
    },
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="flex justify-center gap-2">
        {modes.map((item) => (
          <button
            key={item.value}
            onClick={() => onModeChange(item.value)}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              mode === item.value
                ? "bg-indigo-500 text-white"
                : "text-slate-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative mx-auto mt-10 flex h-72 w-72 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-[10px] border-white/5" />

        <div
          className="absolute inset-0 rounded-full border-[10px] border-indigo-500"
          style={{
            clipPath: `inset(${100 - progress}% 0 0 0)`,
          }}
        />

        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-slate-500">
            {mode === "focus" ? "Focus Time" : "Break"}
          </p>

          <div className="mt-3 text-6xl font-semibold tracking-tight text-white">
            {formatTime(remainingSeconds)}
          </div>

          {isRunning && (
            <p className="mt-3 text-sm text-emerald-400">
              {isPaused ? "Paused" : "Focus session active"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-3">
        {!isRunning && (
          <button
            onClick={onStart}
            className="flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white hover:bg-indigo-600"
          >
            <Play className="h-4 w-4" />
            Start Focus
          </button>
        )}

        {isRunning && !isPaused && (
          <button
            onClick={onPause}
            className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-medium text-white"
          >
            <Pause className="h-4 w-4" />
            Pause
          </button>
        )}

        {isRunning && isPaused && (
          <button
            onClick={onResume}
            className="flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white"
          >
            <Play className="h-4 w-4" />
            Resume
          </button>
        )}

        {isRunning && (
          <button
            onClick={onFinish}
            className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-medium text-white"
          >
            <Check className="h-4 w-4" />
            Finish
          </button>
        )}

        <button
          onClick={onReset}
          className="rounded-xl border border-white/10 p-3 text-slate-400 hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;