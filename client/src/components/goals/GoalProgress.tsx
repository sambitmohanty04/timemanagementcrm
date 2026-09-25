interface GoalProgressProps {
  current: number;
  target: number;
  unit: string;
}

const GoalProgress = ({
  current,
  target,
  unit,
}: GoalProgressProps) => {
  const percentage =
    target > 0
      ? Math.min(
          Math.round((current / target) * 100),
          100
        )
      : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-slate-500">
          Progress
        </span>

        <span className="text-sm font-medium text-white">
          {percentage}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-2 text-xs text-slate-500">
        {current} / {target} {unit}
      </div>
    </div>
  );
};

export default GoalProgress;