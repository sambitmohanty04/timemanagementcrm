import {
  Plus,
  Search,
} from "lucide-react";

interface HabitsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
  onCreate: () => void;
}

const HabitsHeader = ({
  search,
  onSearchChange,
  onCreate,
}: HabitsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Habits
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Build consistent habits and maintain your streaks.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search habits..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-indigo-500/50 sm:w-64"
          />
        </div>

        <button
          type="button"
          onClick={onCreate}
          className="flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
        >
          <Plus className="h-4 w-4" />
          Create Habit
        </button>
      </div>
    </div>
  );
};

export default HabitsHeader;