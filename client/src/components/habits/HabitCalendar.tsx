import { Check } from "lucide-react";

import type { HabitHistory } from "../../types/habits";

interface HabitCalendarProps {
  history: HabitHistory[];
}

const HabitCalendar = ({
  history,
}: HabitCalendarProps) => {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {history.map((item) => {
        const date = new Date(item.date);

        return (
          <div
            key={item.date}
            title={item.date}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs ${
              item.completed
                ? "bg-emerald-500/20 text-emerald-400"
                : "bg-white/5 text-slate-600"
            }`}
          >
            {item.completed ? (
              <Check className="h-3.5 w-3.5" />
            ) : (
              date.getDate()
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HabitCalendar;