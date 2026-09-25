import {
  Clock3,
  Flame,
  Target,
  Trophy,
} from "lucide-react";

interface FocusStatsProps {
  todaySeconds: number;
  sessions: number;
  streak: number;
  completionRate: number;
}

const formatHours = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
};

const FocusStats = ({
  todaySeconds,
  sessions,
  streak,
  completionRate,
}: FocusStatsProps) => {
  const stats = [
    {
      label: "Today's Focus",
      value: formatHours(todaySeconds),
      icon: Clock3,
    },
    {
      label: "Sessions",
      value: sessions,
      icon: Target,
    },
    {
      label: "Focus Streak",
      value: `${streak} days`,
      icon: Flame,
    },
    {
      label: "Completion",
      value: `${completionRate}%`,
      icon: Trophy,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <Icon className="h-5 w-5 text-indigo-400" />

            <p className="mt-4 text-xs text-slate-500">
              {stat.label}
            </p>

            <p className="mt-1 text-xl font-semibold text-white">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FocusStats;