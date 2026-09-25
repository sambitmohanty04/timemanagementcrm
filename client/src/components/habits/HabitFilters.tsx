import {
  CheckCircle2,
  Flame,
  Target,
  TrendingUp,
} from "lucide-react";

interface HabitStatsProps {
  total: number;
  active: number;
  completedToday: number;
  bestStreak: number;
}

const HabitStats = ({
  total,
  active,
  completedToday,
  bestStreak,
}: HabitStatsProps) => {
  const stats = [
    {
      title: "Total Habits",
      value: total,
      icon: Target,
      bg: "bg-indigo-500/10",
      color: "text-indigo-400",
    },
    {
      title: "Active Habits",
      value: active,
      icon: TrendingUp,
      bg: "bg-blue-500/10",
      color: "text-blue-400",
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: CheckCircle2,
      bg: "bg-emerald-500/10",
      color: "text-emerald-400",
    },
    {
      title: "Best Streak",
      value: `${bestStreak} days`,
      icon: Flame,
      bg: "bg-orange-500/10",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-2 text-2xl font-semibold text-white">
                  {stat.value}
                </p>
              </div>

              <div className={`rounded-xl p-3 ${stat.bg}`}>
                <Icon
                  className={`h-5 w-5 ${stat.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HabitStats;