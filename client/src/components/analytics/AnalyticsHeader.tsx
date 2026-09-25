import { CalendarDays, Download } from "lucide-react";

export type AnalyticsRange =
  | "today"
  | "week"
  | "month"
  | "year";

interface AnalyticsHeaderProps {
  range: AnalyticsRange;
  onRangeChange: (range: AnalyticsRange) => void;
  onExport?: () => void;
}

const AnalyticsHeader = ({
  range,
  onRangeChange,
  onExport,
}: AnalyticsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Understand your productivity, focus time, and
          project performance.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3">
          <CalendarDays className="h-4 w-4 text-slate-400" />

          <select
            value={range}
            onChange={(event) =>
              onRangeChange(
                event.target.value as AnalyticsRange
              )
            }
            className="bg-transparent py-2.5 text-sm text-slate-300 outline-none"
          >
            <option value="today" className="bg-slate-900">
              Today
            </option>

            <option value="week" className="bg-slate-900">
              This Week
            </option>

            <option value="month" className="bg-slate-900">
              This Month
            </option>

            <option value="year" className="bg-slate-900">
              This Year
            </option>
          </select>
        </div>

        <button
          type="button"
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;