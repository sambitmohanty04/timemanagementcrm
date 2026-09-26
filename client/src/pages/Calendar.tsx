import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  XCircle,
} from "lucide-react";

import type { CalendarTask } from "../types/calendar";
import CalendarGrid from "../components/calendar/CalendarGrid";
import { fetchTasks } from "../api/tasks";

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatTime = (dueDate: string): string => {
  const date = new Date(dueDate);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const Calendar = () => {
  const today = useMemo(() => new Date(), []);

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selectedDate, setSelectedDate] = useState(today);

  const [tasks, setTasks] = useState<CalendarTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks()
      .then((apiTasks) => {
        const mapped: CalendarTask[] = apiTasks
          .filter((t) => !!t.dueDate)
          .map((t) => ({
            id: t.id,
            title: t.title,
            dueDate: formatDate(new Date(t.dueDate!)),
            dueTime: t.dueDate, // keep full ISO string for time formatting
            priority: t.priority,
            status: t.status,
          }));
        setTasks(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  const monthName = currentDate.toLocaleString("en-US", { month: "long" });
  const year = currentDate.getFullYear();

  const selectedDateTasks = tasks.filter(
    (task) => task.dueDate === formatDate(selectedDate)
  );

  const handlePreviousMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
    );
  };

  const handleToday = () => {
    const now = new Date();
    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelectedDate(now);
  };

  const statusIcon = (status: string) => {
    if (status === "completed") return <CheckCircle2 size={18} />;
    if (status === "cancelled") return <XCircle size={18} />;
    return <Clock size={18} />;
  };

  const statusIconBg = (status: string) => {
    if (status === "completed") return "bg-emerald-500/10 text-emerald-400";
    if (status === "cancelled") return "bg-slate-500/10 text-slate-400";
    return "bg-indigo-500/10 text-indigo-400";
  };

  const statusBadgeClass = (status: string) => {
    if (status === "completed") return "bg-emerald-500/10 text-emerald-400";
    if (status === "cancelled") return "bg-slate-500/10 text-slate-400";
    return "bg-amber-500/10 text-amber-400";
  };

  const statusLabel = (status: string) => {
    if (status === "completed") return "Completed";
    if (status === "cancelled") return "Cancelled";
    return "Pending";
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-950 p-6 text-slate-400">Loading calendar...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white md:p-6">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10">
            <CalendarDays size={24} className="text-indigo-400" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">Calendar</h1>
            <p className="text-sm text-slate-500">Manage your schedule and tasks</p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          Add Event
        </button>
      </div>

      {/* Calendar */}
      <div className="rounded-xl border border-slate-800 bg-slate-900">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 border-b border-slate-800 p-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePreviousMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <h2 className="min-w-[180px] text-center text-lg font-semibold">
              {monthName} {year}
            </h2>

            <button
              type="button"
              onClick={handleNextMonth}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleToday}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Today
          </button>
        </div>

        {/* Grid */}
        <CalendarGrid
          currentDate={currentDate}
          selectedDate={selectedDate}
          tasks={tasks}
          onSelectDate={setSelectedDate}
        />
      </div>

      {/* Selected Date Tasks */}
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {selectedDateTasks.length === 0
                ? "No tasks scheduled"
                : `${selectedDateTasks.length} task${
                    selectedDateTasks.length > 1 ? "s" : ""
                  } scheduled`}
            </p>
          </div>

          <CalendarDays size={22} className="text-indigo-400" />
        </div>

        {selectedDateTasks.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-800 py-10 text-center">
            <CalendarDays size={32} className="mx-auto mb-3 text-slate-700" />
            <p className="text-sm text-slate-500">No tasks for this date.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {selectedDateTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${statusIconBg(task.status)}`}>
                    {statusIcon(task.status)}
                  </div>

                  <div>
                    <h3
                      className={`text-sm font-medium ${
                        task.status === "completed" || task.status === "cancelled"
                          ? "text-slate-500 line-through"
                          : "text-white"
                      }`}
                    >
                      {task.title}
                    </h3>

                    <p className="mt-1 text-xs capitalize text-slate-500">
                      {task.priority} priority
                      {task.dueTime && (
                        <span className="ml-2 normal-case text-slate-600">
                          • {formatTime(task.dueTime)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusBadgeClass(task.status)}`}>
                  {statusLabel(task.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;