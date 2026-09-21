import { Clock3, Trash2 } from "lucide-react";

import type { TimeEntryListProps } from "../../types/timeTracker";

const formatTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }

  return `${seconds}s`;
};

const TimeEntryList = ({
  entries,
  onDelete,
}: TimeEntryListProps) => {
  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-800 p-5">
        <h2 className="text-lg font-semibold text-white">
          Recent Time Entries
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your recently tracked sessions
        </p>
      </div>

      {/* Entries */}
      {entries.length === 0 ? (
        <div className="p-10 text-center">
          <Clock3
            size={32}
            className="mx-auto mb-3 text-slate-700"
          />

          <p className="text-sm text-slate-500">
            No time entries yet.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-800">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex flex-col gap-4 p-5 transition hover:bg-slate-950/50 md:flex-row md:items-center md:justify-between"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10">
                  <Clock3
                    size={19}
                    className="text-indigo-400"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-medium text-white">
                    {entry.task}
                  </h3>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>{entry.project}</span>

                    <span>•</span>

                    <span>{entry.date}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center justify-between gap-6 md:justify-end">
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    {formatTime(entry.duration)}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {entry.startTime} - {entry.endTime}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onDelete(entry.id)}
                  className="rounded-lg p-2 text-slate-600 transition hover:bg-rose-500/10 hover:text-rose-400"
                  title="Delete entry"
                  aria-label={`Delete ${entry.task}`}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TimeEntryList;