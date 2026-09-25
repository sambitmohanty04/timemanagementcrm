import { useMemo, useState } from "react";

import HabitsHeader from "../components/habits/HabitsHeader";
import HabitStats from "../components/habits/HabitStats";
import HabitFilters from "../components/habits/HabitFilters";
import HabitCard from "../components/habits/HabitCard";
import CreateHabitModal from "../components/habits/CreateHabitModal";
import HabitDetailsModal from "../components/habits/HabitDetailsModal";

import { HABITS } from "../data/habits";

import type {
  Habit,
  HabitCategory,
  HabitFrequency,
  HabitStatus,
} from "../types/habits";

const Habits = () => {
  const [habits, setHabits] = useState<Habit[]>(HABITS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<HabitCategory | "all">("all");
  const [frequency, setFrequency] = useState<HabitFrequency | "all">("all");
  const [status, setStatus] = useState<HabitStatus | "all">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const today = getToday();

  const calculateCurrentStreak = (history: Habit["history"]) => {
    const completedDates = new Set(
      history.filter((item) => item.completed).map((item) => item.date)
    );

    let streak = 0;
    const date = new Date();

    while (true) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      if (!completedDates.has(dateString)) break;

      streak++;
      date.setDate(date.getDate() - 1);
    }

    return streak;
  };

  const filteredHabits = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return habits.filter((habit) => {
      const matchesSearch =
        searchValue === "" ||
        habit.name.toLowerCase().includes(searchValue) ||
        habit.description.toLowerCase().includes(searchValue);

      const matchesCategory = category === "all" || habit.category === category;
      const matchesFrequency = frequency === "all" || habit.frequency === frequency;
      const matchesStatus = status === "all" || habit.status === status;

      return matchesSearch && matchesCategory && matchesFrequency && matchesStatus;
    });
  }, [habits, search, category, frequency, status]);

  const activeHabits = useMemo(
    () => habits.filter((habit) => habit.status === "active").length,
    [habits]
  );

  const completedToday = useMemo(
    () =>
      habits.filter((habit) =>
        habit.history.some((item) => item.date === today && item.completed)
      ).length,
    [habits, today]
  );

  const bestStreak = useMemo(
    () => Math.max(0, ...habits.map((habit) => habit.bestStreak)),
    [habits]
  );

  const handleCreateHabit = (habit: Habit) => {
    setHabits((previous) => [habit, ...previous]);
    setCreateOpen(false);
  };

  const handleToggleToday = (habitId: string) => {
    setHabits((previous) => {
      const updated = previous.map((habit) => {
        if (habit.id !== habitId) return habit;

        const existingTodayEntry = habit.history.find(
          (item) => item.date === today
        );
        const alreadyCompleted = existingTodayEntry?.completed === true;

        let updatedHistory;

        if (alreadyCompleted) {
          updatedHistory = habit.history.map((item) =>
            item.date === today ? { ...item, completed: false } : item
          );
        } else if (existingTodayEntry) {
          updatedHistory = habit.history.map((item) =>
            item.date === today ? { ...item, completed: true } : item
          );
        } else {
          updatedHistory = [
            ...habit.history,
            { date: today, completed: true },
          ];
        }

        const updatedCompletedCount = updatedHistory.filter(
          (item) => item.completed
        ).length;
        const updatedCurrentStreak = calculateCurrentStreak(updatedHistory);
        const updatedBestStreak = Math.max(habit.bestStreak, updatedCurrentStreak);

        const updatedHabit = {
          ...habit,
          history: updatedHistory,
          completedCount: updatedCompletedCount,
          totalCount: Math.max(habit.totalCount, updatedHistory.length),
          currentStreak: updatedCurrentStreak,
          bestStreak: updatedBestStreak,
        };

        setSelectedHabit((prevSelected) =>
          prevSelected && prevSelected.id === habitId ? updatedHabit : prevSelected
        );

        return updatedHabit;
      });

      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <HabitsHeader
        search={search}
        onSearchChange={setSearch}
        onCreate={() => setCreateOpen(true)}
      />

      <HabitStats
        total={habits.length}
        active={activeHabits}
        completedToday={completedToday}
        bestStreak={bestStreak}
      />

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <HabitFilters
          category={category}
          frequency={frequency}
          status={status}
          onCategoryChange={setCategory}
          onFrequencyChange={setFrequency}
          onStatusChange={setStatus}
        />

        <p className="text-sm text-slate-500">
          {filteredHabits.length}{" "}
          {filteredHabits.length === 1 ? "habit" : "habits"}
        </p>
      </div>

      {filteredHabits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
          <h3 className="text-lg font-medium text-white">No habits found</h3>
          <p className="mt-2 text-sm text-slate-500">
            Try changing your filters or create a new habit.
          </p>
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="mt-5 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400"
          >
            Create Habit
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {filteredHabits.map((habit) => {
            const completedTodayFlag = habit.history.some(
              (item) => item.date === today && item.completed
            );

            return (
              <HabitCard
                key={habit.id}
                habit={habit}
                completedToday={completedTodayFlag}
                onToggleToday={() => handleToggleToday(habit.id)}
                onClick={() => setSelectedHabit(habit)}
              />
            );
          })}
        </div>
      )}

      <CreateHabitModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateHabit}
      />

      <HabitDetailsModal
        habit={selectedHabit}
        onClose={() => setSelectedHabit(null)}
      />
    </div>
  );
};

export default Habits;