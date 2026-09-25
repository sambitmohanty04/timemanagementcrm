import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { FocusAnalyticsData } from "../../types/analytics";

interface FocusAnalyticsProps {
  data: FocusAnalyticsData[];
}

const FocusAnalytics = ({
  data,
}: FocusAnalyticsProps) => {
  const totalSessions = data.reduce(
    (total, item) => total + item.sessions,
    0
  );

  const totalHours = data.reduce(
    (total, item) => total + item.focusHours,
    0
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-medium text-white">
              Focus Analytics
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Focus sessions and hours during the week.
            </p>
          </div>

          <div className="flex gap-5">
            <div>
              <p className="text-xs text-slate-500">
                Sessions
              </p>

              <p className="text-lg font-semibold text-white">
                {totalSessions}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Focus Hours
              </p>

              <p className="text-lg font-semibold text-white">
                {totalHours.toFixed(1)}h
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />

            <XAxis
              dataKey="day"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="focusHours"
              fill="#14b8a6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FocusAnalytics;