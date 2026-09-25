import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { TaskAnalyticsData } from "../../types/analytics";

interface TaskAnalyticsProps {
  data: TaskAnalyticsData;
}

const TaskAnalytics = ({
  data,
}: TaskAnalyticsProps) => {
  const chartData = [
    {
      status: "Completed",
      count: data.completed,
    },
    {
      status: "In Progress",
      count: data.inProgress,
    },
    {
      status: "To Do",
      count: data.todo,
    },
    {
      status: "Overdue",
      count: data.overdue,
    },
  ];

  const total =
    data.completed +
    data.inProgress +
    data.todo +
    data.overdue;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white">
              Task Analytics
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Current task status breakdown.
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">
              Total Tasks
            </p>

            <p className="text-lg font-semibold text-white">
              {total}
            </p>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
            />

            <XAxis
              dataKey="status"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              fontSize={12}
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
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
              dataKey="count"
              fill="#8b5cf6"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskAnalytics;