import {
  CheckCircle2,
  Clock3,
  Target,
  Timer,
  TrendingUp,
} from "lucide-react";

interface AnalyticsStatsProps {
  focusTime: number;
  tasksCompleted: number;
  productivity: number;
  sessions: number;
}

const AnalyticsStats = ({
  focusTime,
  tasksCompleted,
  productivity,
  sessions,
}: AnalyticsStatsProps) => {
  const stats = [
    {
      title: "Focus Time",
      value: `${focusTime}h`,
      change: "+12.5%",
      icon: Clock3,
      iconClass: "text-indigo-400",
      bgClass: "bg-indigo-500/10",
    },
    {
      title: "Tasks Completed",
      value: tasksCompleted,
      change: "+8.2%",
      icon: CheckCircle2,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
    },
    {
      title: "Productivity",
      value: `${productivity}%`,
      change: "+5.4%",
      icon: Target,
      iconClass: "text-purple-400",
      bgClass: "bg-purple-500/10",
    },
    {
      title: "Focus Sessions",
      value: sessions,
      change: "+10.2%",
      icon: Timer,
      iconClass: "text-orange-400",
      bgClass: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-white">
                  {stat.value}
                </h3>
              </div>

              <div className={`rounded-xl p-3 ${stat.bgClass}`}>
                <Icon className={`h-5 w-5 ${stat.iconClass}`} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1 text-xs text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" />
              {stat.change}

              <span className="text-slate-500">
                vs last week
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnalyticsStats;