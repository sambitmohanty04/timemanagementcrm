export type FocusMode =
  | "focus"
  | "short-break"
  | "long-break";

export interface FocusSession {
  id: string;
  taskId?: string;
  taskName: string;
  projectId?: string;
  projectName: string;
  duration: number;
  completedAt: string;
  mode: FocusMode;
}

export interface FocusTimerProps {
  mode: FocusMode;
  elapsedSeconds: number;
  totalSeconds: number;
  isRunning: boolean;
  isPaused: boolean;

  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onFinish: () => void;
  onReset: () => void;
  onModeChange: (mode: FocusMode) => void;
}