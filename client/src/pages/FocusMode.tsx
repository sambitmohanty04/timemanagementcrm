import { useEffect, useMemo, useState } from "react";
import { Settings } from "lucide-react";

import FocusTimer from "../components/focus/FocusTimer";
import FocusTaskSelector from "../components/focus/FocusTaskSelector";
import FocusStats from "../components/focus/FocusStats";
import FocusSessionHistory from "../components/focus/FocusSessionHistory";
import FocusSettingsModal from "../components/focus/FocusSettingsModal";

import { FOCUS_SESSIONS } from "../data/focus";

import type {
  FocusMode as FocusModeType,
  FocusSession,
} from "../types/focus";

const FocusMode = () => {
  /* ----------------------------------
     Timer Mode
  ---------------------------------- */

  const [mode, setMode] =
    useState<FocusModeType>("focus");

  /* ----------------------------------
     Timer State
  ---------------------------------- */

  const [elapsedSeconds, setElapsedSeconds] =
    useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const [isPaused, setIsPaused] = useState(false);

  /* ----------------------------------
     Selected Task / Project
  ---------------------------------- */

  const [task, setTask] = useState("");

  const [project, setProject] = useState("");

  /* ----------------------------------
     Focus Sessions
  ---------------------------------- */

  const [sessions, setSessions] =
    useState<FocusSession[]>(FOCUS_SESSIONS);

  /* ----------------------------------
     Settings
  ---------------------------------- */

  const [settingsOpen, setSettingsOpen] =
    useState(false);

  const [focusSettings, setFocusSettings] = useState({
    focusDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    autoStartBreak: false,
    soundEnabled: true,
  });

  /* ----------------------------------
     Calculate Current Timer Duration
  ---------------------------------- */

  const totalSeconds =
    mode === "focus"
      ? focusSettings.focusDuration * 60
      : mode === "short-break"
        ? focusSettings.shortBreak * 60
        : focusSettings.longBreak * 60;

  /* ----------------------------------
     Timer
  ---------------------------------- */

  useEffect(() => {
    if (!isRunning || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setElapsedSeconds((previous) => {
        if (previous >= totalSeconds) {
          return totalSeconds;
        }

        return previous + 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isRunning, isPaused, totalSeconds]);

  /* ----------------------------------
     Automatically Finish Timer
  ---------------------------------- */

  useEffect(() => {
    if (
      isRunning &&
      elapsedSeconds >= totalSeconds
    ) {
      handleFinish();
    }
  }, [
    elapsedSeconds,
    totalSeconds,
    isRunning,
  ]);

  /* ----------------------------------
     Start Timer
  ---------------------------------- */

  const handleStart = () => {
    if (mode === "focus" && !task) {
      alert("Please select a task first.");
      return;
    }

    if (mode === "focus" && !project) {
      alert("Please select a project first.");
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
  };

  /* ----------------------------------
     Pause Timer
  ---------------------------------- */

  const handlePause = () => {
    setIsPaused(true);
  };

  /* ----------------------------------
     Resume Timer
  ---------------------------------- */

  const handleResume = () => {
    setIsPaused(false);
  };

  /* ----------------------------------
     Reset Timer
  ---------------------------------- */

  const handleReset = () => {
    setElapsedSeconds(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  /* ----------------------------------
     Change Focus / Break Mode
  ---------------------------------- */

  const handleModeChange = (
    newMode: FocusModeType
  ) => {
    setMode(newMode);

    setElapsedSeconds(0);

    setIsRunning(false);

    setIsPaused(false);
  };

  /* ----------------------------------
     Finish Session
  ---------------------------------- */

  const handleFinish = () => {
    if (
      mode === "focus" &&
      elapsedSeconds > 0
    ) {
      const newSession: FocusSession = {
        id: `focus-${Date.now()}`,

        taskName: task,

        projectName: project,

        duration: elapsedSeconds,

        completedAt: new Date().toISOString(),

        mode: "focus",
      };

      setSessions((previous) => [
        newSession,
        ...previous,
      ]);
    }

    setElapsedSeconds(0);

    setIsRunning(false);

    setIsPaused(false);

    /*
      Auto-start short break
    */

    if (
      mode === "focus" &&
      focusSettings.autoStartBreak
    ) {
      setMode("short-break");

      setTimeout(() => {
        setIsRunning(true);
      }, 300);
    }
  };

  /* ----------------------------------
     Today's Focus Time
  ---------------------------------- */

  const todaySeconds = useMemo(() => {
    const today = new Date();

    return sessions
      .filter((session) => {
        const sessionDate = new Date(
          session.completedAt
        );

        return (
          sessionDate.getFullYear() ===
            today.getFullYear() &&
          sessionDate.getMonth() ===
            today.getMonth() &&
          sessionDate.getDate() ===
            today.getDate()
        );
      })
      .reduce(
        (total, session) =>
          total + session.duration,
        0
      );
  }, [sessions]);

  /* ----------------------------------
     Completion Rate
  ---------------------------------- */

  const completionRate = useMemo(() => {
    if (sessions.length === 0) {
      return 0;
    }

    const completedSessions =
      sessions.filter(
        (session) =>
          session.duration >=
          focusSettings.focusDuration * 60
      ).length;

    return Math.round(
      (completedSessions / sessions.length) *
        100
    );
  }, [
    sessions,
    focusSettings.focusDuration,
  ]);

  /* ----------------------------------
     Settings Save
  ---------------------------------- */

  const handleSaveSettings = (
    newSettings: typeof focusSettings
  ) => {
    setFocusSettings(newSettings);

    /*
      Reset current timer when settings change
    */

    setElapsedSeconds(0);

    setIsRunning(false);

    setIsPaused(false);
  };

  /* ----------------------------------
     Render
  ---------------------------------- */

  return (
    <div className="space-y-6">
      {/* ==================================
          Header
      ================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Focus Mode
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Eliminate distractions and focus on one
            task at a time.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setSettingsOpen(true)
          }
          className="flex w-fit items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-4 w-4" />

          Settings
        </button>
      </div>

      {/* ==================================
          Timer + Task Selector
      ================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Focus Timer */}

        <FocusTimer
          mode={mode}
          elapsedSeconds={elapsedSeconds}
          totalSeconds={totalSeconds}
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onFinish={handleFinish}
          onReset={handleReset}
          onModeChange={handleModeChange}
        />

        {/* Task Selector */}

        <FocusTaskSelector
          task={task}
          project={project}
          onTaskChange={setTask}
          onProjectChange={setProject}
        />
      </div>

      {/* ==================================
          Focus Statistics
      ================================== */}

      <FocusStats
        todaySeconds={todaySeconds}
        sessions={sessions.length}
        streak={8}
        completionRate={completionRate}
      />

      {/* ==================================
          Recent Sessions
      ================================== */}

      <FocusSessionHistory
        sessions={sessions}
      />

      {/* ==================================
          Settings Modal
      ================================== */}

      <FocusSettingsModal
        open={settingsOpen}
        settings={focusSettings}
        onClose={() =>
          setSettingsOpen(false)
        }
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default FocusMode;