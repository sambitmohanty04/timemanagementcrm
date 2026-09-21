import type { ReactNode } from "react";
import {
  Bot,
  CheckSquare,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";

interface DashboardProps {
  activeTab: string;
  activeTaskFilter: string;
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
}

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-[#0F1523]/80 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">
          {title}
        </span>

        {icon}
      </div>

      <p className="text-2xl font-bold text-white">
        {value}
      </p>

      <p className="text-xs text-slate-500">
        {description}
      </p>
    </div>
  );
}

export default function Dashboard({
  activeTab,
  activeTaskFilter,
}: DashboardProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Banner */}

      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-slate-900/60 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white capitalize flex items-center gap-2">
            {activeTab}

            {activeTab === "tasks" && (
              <span className="text-indigo-400">
                ({activeTaskFilter})
              </span>
            )}
          </h1>

          <p className="text-xs text-slate-400 mt-1">
            Manage your workflow, track time, and let AI
            streamline your priority stack.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Focus Time: 3h 45m
          </span>

          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Efficiency +18%
          </span>
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Active Priority"
          value="12 Tasks"
          description="5 high urgency items due today"
          icon={
            <CheckSquare className="w-4 h-4 text-indigo-400" />
          }
        />

        <StatCard
          title="Weekly Progress"
          value="84%"
          description="↑ 12% faster than last week"
          icon={
            <Target className="w-4 h-4 text-emerald-400" />
          }
        />

        <StatCard
          title="AI Assistant Status"
          value="Synchronized"
          description="Next auto-reorganization at 2:00 PM"
          icon={
            <Bot className="w-4 h-4 text-indigo-400" />
          }
        />
      </div>
    </div>
  );
}
