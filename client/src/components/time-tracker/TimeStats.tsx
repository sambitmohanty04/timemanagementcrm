import {
  CalendarDays,
  Clock3,
  Timer,
  TrendingUp,
} from "lucide-react";

import type { TimeStatsProps } from "../../types/timeTracker";

const formatHours = (seconds: number): string => {
  return `${(seconds / 3600).toFixed(1)}h`;
};

const TimeStats = ({
  todaySeconds,
  weeklySeconds,
  averageSeconds,
  sessions,
}: TimeStatsProps) => {
  const stats = [
    {
      label: "Today",
      value: formatHours(todaySeconds),
      description: "Tracked today",
      icon: Clock3,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
    },
    {
      label: "This Week",
      value: formatHours(weeklySeconds),
      description: "Tracked this week",
      icon: CalendarDays,
      iconClass: "text-indigo-400",
      bgClass: "bg-indigo-500/10",
    },
    {
      label: "Average / Day",
      value: formatHours(averageSeconds),
      description: "Last 7 days",
      icon: TrendingUp,
      iconClass: "text-amber-400",
      bgClass: "bg-amber-500/10",
    },
    {
      label: "Sessions",
      value: sessions.toString(),
      description: "Tracked sessions",
      icon: Timer,
      iconClass: "text-purple-400",
      bgClass: "bg-purple-500/10",
    },
  ];

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-slate-800 bg-slate-900 p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-bold text-white">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {stat.description}
                </p>
              </div>

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgClass}`}
              >
                <Icon
                  size={19}
                  className={stat.iconClass}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeStats;