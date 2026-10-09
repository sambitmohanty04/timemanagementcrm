interface GoalProgressProps {
  current: number;
  target: number;
  unit?: string;
}

const GoalProgress = ({ current, target, unit }: GoalProgressProps) => {
  const safeCurrent = Number(current) || 0;
  const safeTarget = Number(target) || 0;

  // Guard against divide-by-zero and values outside 0-100
  const percent =
    safeTarget > 0
      ? Math.min(100, Math.max(0, Math.round((safeCurrent / safeTarget) * 100)))
      : 0;

  // Hide the unit when it is empty, or just repeats the percentage
  const cleanUnit = unit?.trim();
  const showUnit = !!cleanUnit && cleanUnit !== '%';

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">
          {safeCurrent} / {safeTarget}
          {showUnit ? ` ${cleanUnit}` : ''}
        </span>
        <span className="font-medium text-white">{percent}%</span>
      </div>

      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-2 w-full overflow-hidden rounded-full bg-white/10"
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            percent >= 100 ? 'bg-emerald-500' : 'bg-indigo-500'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default GoalProgress;