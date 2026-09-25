import {
  Flame,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";

const ProductivityInsights = () => {
  const insights = [
    {
      title: "Best Focus Day",
      description:
        "Friday was your strongest focus day with 6 hours of focused work.",
      icon: Trophy,
      iconClass: "text-yellow-400",
      bgClass: "bg-yellow-500/10",
    },
    {
      title: "Focus Streak",
      description:
        "You have maintained an 8-day productivity streak.",
      icon: Flame,
      iconClass: "text-orange-400",
      bgClass: "bg-orange-500/10",
    },
    {
      title: "Task Completion",
      description:
        "You completed 42 tasks during the selected period.",
      icon: Target,
      iconClass: "text-indigo-400",
      bgClass: "bg-indigo-500/10",
    },
    {
      title: "Productivity Growth",
      description:
        "Your productivity increased compared with the previous period.",
      icon: TrendingUp,
      iconClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-5">
        <h3 className="font-medium text-white">
          Productivity Insights
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Highlights from your recent activity.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex gap-4 rounded-xl border border-white/5 bg-white/[0.03] p-4"
            >
              <div
                className={`h-fit rounded-xl p-3 ${item.bgClass}`}
              >
                <Icon
                  className={`h-5 w-5 ${item.iconClass}`}
                />
              </div>

              <div>
                <h4 className="text-sm font-medium text-white">
                  {item.title}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductivityInsights;