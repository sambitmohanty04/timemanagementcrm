import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { TimeDistribution } from "../../types/analytics";

interface TimeDistributionChartProps {
  data: TimeDistribution[];
}

const COLORS = [
  "#1e8ef7",
  "#ab07d9",
  "#0de0c9",
  "#5174a6",
];

const TimeDistributionChart = ({
  data,
}: TimeDistributionChartProps) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="mb-4">
        <h3 className="font-medium text-white">
          Time Distribution
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          How your tracked time is distributed.
        </p>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="hours"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div
            key={item.category}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor:
                    COLORS[index % COLORS.length],
                }}
              />

              <span className="text-sm text-slate-400">
                {item.category}
              </span>
            </div>

            <span className="text-sm text-white">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeDistributionChart;