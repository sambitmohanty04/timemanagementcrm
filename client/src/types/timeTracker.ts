export interface TimeEntry {
  id: string;
  task: string;
  project: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface TimerCardProps {
  isRunning: boolean;
  isPaused: boolean;
  elapsedSeconds: number;
  selectedTask: string;
  selectedProject: string;
  onTaskChange: (task: string) => void;
  onProjectChange: (project: string) => void;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onReset: () => void;
}

export interface TimeStatsProps {
  todaySeconds: number;
  weeklySeconds: number;
  averageSeconds: number;
  sessions: number;
}

export interface TimeEntryListProps {
  entries: TimeEntry[];
  onDelete: (id: string) => void;
}