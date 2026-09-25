import { Flame } from "lucide-react";

interface HabitStreakProps {
  current: number;
  best: number;
}

const HabitStreak = ({
  current,
  best,
}: HabitStreakProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-xl bg-orange-500/10 p-2.5">
        <Flame className="h-5 w-5 text-orange-400" />
      </div>

      <div>
        <p className="text-sm font-medium text-white">
          {current} day streak
        </p>

        <p className="text-xs text-slate-500">
          Best: {best} days
        </p>
      </div>
    </div>
  );
};

export default HabitStreak;