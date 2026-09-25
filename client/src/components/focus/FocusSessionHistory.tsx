import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import type { FocusSession } from "../../types/focus";

interface FocusSessionHistoryProps {
  sessions: FocusSession[];
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);

  return `${minutes} min`;
};

const FocusSessionHistory = ({
  sessions,
}: FocusSessionHistoryProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <div className="border-b border-white/10 p-5">
        <h2 className="font-semibold text-white">
          Recent Focus Sessions
        </h2>
      </div>

      <div className="divide-y divide-white/5">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-sm font-medium text-white">
                {session.taskName}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {session.projectName}
              </p>
            </div>

            <div className="flex items-center gap-5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {formatDuration(session.duration)}
              </span>

              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {new Date(
                  session.completedAt
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusSessionHistory;