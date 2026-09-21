import {
  Clock3,
  Pause,
  Play,
  Square,
  TimerReset,
} from "lucide-react";

import type { TimerCardProps } from "../../types/timeTracker";

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");
};

const TimerCard = ({
  isRunning,
  isPaused,
  elapsedSeconds,
  selectedTask,
  selectedProject,
  onTaskChange,
  onProjectChange,
  onStart,
  onPause,
  onStop,
  onReset,
}: TimerCardProps) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            Current session
          </p>

          <h2 className="mt-1 text-lg font-semibold text-white">
            {isRunning
              ? isPaused
                ? "Timer Paused"
                : "Currently Tracking"
              : "Ready to Track"}
          </h2>
        </div>

        {isRunning && !isPaused && (
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            LIVE
          </div>
        )}
      </div>

      {/* Timer */}
      <div className="mb-8 flex justify-center">
        <div className="text-center">
          <div className="font-mono text-6xl font-bold tracking-wider text-white md:text-7xl">
            {formatTime(elapsedSeconds)}
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {isRunning
              ? isPaused
                ? "Timer is paused"
                : "Tracking time..."
              : "Start your timer"}
          </p>
        </div>
      </div>

      {/* Task and Project */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Task */}
        <div>
          <label
            htmlFor="timer-task"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Task
          </label>

          <select
            id="timer-task"
            value={selectedTask}
            onChange={(event) =>
              onTaskChange(event.target.value)
            }
            disabled={isRunning}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select task</option>

            <option value="React Dashboard">
              React Dashboard
            </option>

            <option value="API Integration">
              API Integration
            </option>

            <option value="UI Design">
              UI Design
            </option>

            <option value="Testing">
              Testing
            </option>

            <option value="Code Review">
              Code Review
            </option>
          </select>
        </div>

        {/* Project */}
        <div>
          <label
            htmlFor="timer-project"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Project
          </label>

          <select
            id="timer-project"
            value={selectedProject}
            onChange={(event) =>
              onProjectChange(event.target.value)
            }
            disabled={isRunning}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select project</option>

            <option value="Chronos CRM">
              Chronos CRM
            </option>

            <option value="Cellexa">
              Cellexa
            </option>

            <option value="Personal">
              Personal
            </option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {!isRunning ? (
          <button
            type="button"
            onClick={onStart}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Play size={18} />
            Start Timer
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onPause}
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
            >
              {isPaused ? (
                <Play size={18} />
              ) : (
                <Pause size={18} />
              )}

              {isPaused ? "Resume" : "Pause"}
            </button>

            <button
              type="button"
              onClick={onStop}
              className="flex items-center gap-2 rounded-lg bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              <Square size={17} />
              Stop
            </button>
          </>
        )}

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-5 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          <TimerReset size={18} />
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerCard;