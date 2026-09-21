import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Clock3, Plus } from "lucide-react";

import TimerCard from "../components/time-tracker/TimerCard";
import TimeStats from "../components/time-tracker/TimeStats";
import TimeEntryList from "../components/time-tracker/TimeEntryList";

import type { TimeEntry } from "../types/timeTracker";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(
    2,
    "0"
  );

  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const TimeTracker = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [selectedTask, setSelectedTask] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: "1",
      task: "React Dashboard",
      project: "Chronos CRM",
      date: "Today",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      duration: 5400,
    },
    {
      id: "2",
      task: "API Integration",
      project: "Chronos CRM",
      date: "Today",
      startTime: "11:00 AM",
      endTime: "12:15 PM",
      duration: 4500,
    },
    {
      id: "3",
      task: "UI Design",
      project: "Cellexa",
      date: "Today",
      startTime: "02:00 PM",
      endTime: "03:00 PM",
      duration: 3600,
    },
  ]);

  /*
   * Timer
   */
  useEffect(() => {
    if (!isRunning || isPaused) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setElapsedSeconds((previous) => previous + 1);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isRunning, isPaused]);

  /*
   * Today's total
   */
  const todaySeconds = useMemo(() => {
    return entries.reduce(
      (total, entry) => total + entry.duration,
      0
    );
  }, [entries]);

  /*
   * Weekly total
   *
   * Demo value for now.
   * Later this can be calculated from actual dates.
   */
  const weeklySeconds = 24.5 * 60 * 60;

  /*
   * Average daily time
   */
  const averageSeconds = weeklySeconds / 7;

  /*
   * Daily goal
   */
  const dailyGoalSeconds = 8 * 60 * 60;

  const progress = Math.min(
    (todaySeconds / dailyGoalSeconds) * 100,
    100
  );

  /*
   * Start
   */
  const handleStart = () => {
    if (!selectedTask) {
      alert("Please select a task.");
      return;
    }

    if (!selectedProject) {
      alert("Please select a project.");
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
  };

  /*
   * Pause / Resume
   */
  const handlePause = () => {
    setIsPaused((previous) => !previous);
  };

  /*
   * Stop
   */
  const handleStop = () => {
    if (elapsedSeconds === 0) {
      setIsRunning(false);
      setIsPaused(false);
      return;
    }

    const endDate = new Date();

    const startDate = new Date(
      endDate.getTime() -
        elapsedSeconds * 1000
    );

    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      task: selectedTask,
      project: selectedProject,
      date: "Today",
      startTime: startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endTime: endDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      duration: elapsedSeconds,
    };

    setEntries((previous) => [
      newEntry,
      ...previous,
    ]);

    setElapsedSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
    setSelectedTask("");
    setSelectedProject("");
  };

  /*
   * Reset
   */
  const handleReset = () => {
    setElapsedSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  /*
   * Delete entry
   */
  const handleDeleteEntry = (id: string) => {
    setEntries((previous) =>
      previous.filter((entry) => entry.id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white md:p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
            <Clock3
              size={24}
              className="text-emerald-400"
            />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              Time Tracker
            </h1>

            <p className="text-sm text-slate-500">
              Track how you spend your working time
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Manual Entry
        </button>
      </div>

      {/* Timer + Goal */}
      <div className="grid gap-6 xl:grid-cols-3">
        <TimerCard
          isRunning={isRunning}
          isPaused={isPaused}
          elapsedSeconds={elapsedSeconds}
          selectedTask={selectedTask}
          selectedProject={selectedProject}
          onTaskChange={setSelectedTask}
          onProjectChange={setSelectedProject}
          onStart={handleStart}
          onPause={handlePause}
          onStop={handleStop}
          onReset={handleReset}
        />

        {/* Daily Goal */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Today's Goal
              </p>

              <h2 className="mt-1 text-lg font-semibold text-white">
                8 Hours
              </h2>
            </div>

            <CalendarDays
              size={22}
              className="text-indigo-400"
            />
          </div>

          <div className="mb-3 flex items-end justify-between">
            <span className="text-3xl font-bold">
              {(todaySeconds / 3600).toFixed(1)}h
            </span>

            <span className="text-sm text-slate-500">
              / 8.0h
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="mt-3 text-xs text-slate-500">
            {Math.round(progress)}% of your daily goal
          </p>
        </div>
      </div>

      {/* Statistics */}
      <TimeStats
        todaySeconds={todaySeconds}
        weeklySeconds={weeklySeconds}
        averageSeconds={averageSeconds}
        sessions={entries.length}
      />

      {/* Entries */}
      <TimeEntryList
        entries={entries}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
};

export default TimeTracker;