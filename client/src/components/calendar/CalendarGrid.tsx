import type { CalendarTask } from "../../types/calendar";

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  tasks: CalendarTask[];
  onSelectDate: (date: Date) => void;
}

const CalenderGrid = ({
  currentDate,
  selectedDate,
  tasks,
  onSelectDate,
}: CalendarGridProps) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of current month
  const firstDay = new Date(year, month, 1).getDay();

  // Number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Format date as YYYY-MM-DD
  const formatDate = (date: Date) => {
    const dateYear = date.getFullYear();
    const dateMonth = String(date.getMonth() + 1).padStart(2, "0");
    const dateDay = String(date.getDate()).padStart(2, "0");

    return `${dateYear}-${dateMonth}-${dateDay}`;
  };

  // Get tasks for a particular day
  const getTasksForDay = (day: number) => {
    const date = new Date(year, month, day);
    const formattedDate = formatDate(date);

    return tasks.filter((task) => task.dueDate === formattedDate);
  };

  // Check whether a day is today
  const isToday = (day: number) => {
    const today = new Date();

    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  };

  // Check whether a day is selected
  const isSelected = (day: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  // Priority styles
  const getPriorityStyle = (
    priority: CalendarTask["priority"]
  ) => {
    switch (priority) {
      case "high":
        return "bg-rose-500/20 text-rose-300 border border-rose-500/20";

      case "medium":
        return "bg-amber-500/20 text-amber-300 border border-amber-500/20";

      case "low":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20";

      default:
        return "bg-slate-500/20 text-slate-300 border border-slate-500/20";
    }
  };

  // Generate calendar cells
  const calendarDays: (number | null)[] = [];

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  // Actual days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Add trailing empty cells so the final row is complete
  const remainingCells = calendarDays.length % 7;

  if (remainingCells !== 0) {
    for (let i = remainingCells; i < 7; i++) {
      calendarDays.push(null);
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
      {/* Week Header */}
      <div className="grid grid-cols-7 border-b border-slate-800">
        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <div
            key={day}
            className="border-r border-slate-800 px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Body */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          // Empty calendar cell
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="min-h-[130px] border-b border-r border-slate-800/70 bg-slate-950/50"
              />
            );
          }

          const dayTasks = getTasksForDay(day);
          const today = isToday(day);
          const selected = isSelected(day);

          return (
            <button
              type="button"
              key={`${year}-${month}-${day}`}
              onClick={() =>
                onSelectDate(new Date(year, month, day))
              }
              className={`
                group
                min-h-[130px]
                border-b
                border-r
                border-slate-800/70
                p-2
                text-left
                transition
                hover:bg-slate-900
                focus:outline-none
                focus:ring-1
                focus:ring-indigo-500/50
                ${
                  selected
                    ? "bg-indigo-500/10"
                    : "bg-slate-950"
                }
              `}
            >
              {/* Date Header */}
              <div className="mb-2 flex items-center justify-between">
                <span
                  className={`
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-sm
                    font-medium
                    transition
                    ${
                      today
                        ? "bg-indigo-600 font-bold text-white shadow-lg shadow-indigo-600/20"
                        : selected
                          ? "bg-indigo-500/20 text-indigo-300"
                          : "text-slate-400 group-hover:bg-slate-800 group-hover:text-white"
                    }
                  `}
                >
                  {day}
                </span>

                {dayTasks.length > 0 && (
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-500">
                    {dayTasks.length}
                  </span>
                )}
              </div>

              {/* Tasks */}
              <div className="space-y-1.5">
                {dayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className={`
                      truncate
                      rounded-md
                      px-2
                      py-1
                      text-[10px]
                      font-medium
                      ${getPriorityStyle(task.priority)}
                      ${
                        task.status === "completed"
                          ? "opacity-50 line-through"
                          : ""
                      }
                    `}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}

                {/* More tasks */}
                {dayTasks.length > 3 && (
                  <div className="px-2 pt-0.5 text-[10px] font-medium text-slate-500">
                    +{dayTasks.length - 3} more
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalenderGrid;