import type {
  GoalCategory,
  GoalPeriod,
  GoalStatus,
} from "../../types/goals";

interface GoalFiltersProps {
  status: GoalStatus | "all";
  category: GoalCategory | "all";
  period: GoalPeriod | "all";

  onStatusChange: (
    value: GoalStatus | "all"
  ) => void;

  onCategoryChange: (
    value: GoalCategory | "all"
  ) => void;

  onPeriodChange: (
    value: GoalPeriod | "all"
  ) => void;
}

const GoalFilters = ({
  status,
  category,
  period,
  onStatusChange,
  onCategoryChange,
  onPeriodChange,
}: GoalFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      <select
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value as GoalStatus | "all"
          )
        }
        className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="overdue">Overdue</option>
        <option value="on-hold">On Hold</option>
      </select>

      <select
        value={category}
        onChange={(e) =>
          onCategoryChange(
            e.target.value as GoalCategory | "all"
          )
        }
        className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none"
      >
        <option value="all">All Categories</option>
        <option value="productivity">Productivity</option>
        <option value="career">Career</option>
        <option value="personal">Personal</option>
        <option value="health">Health</option>
        <option value="learning">Learning</option>
        <option value="financial">Financial</option>
      </select>

      <select
        value={period}
        onChange={(e) =>
          onPeriodChange(
            e.target.value as GoalPeriod | "all"
          )
        }
        className="rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm text-slate-300 outline-none"
      >
        <option value="all">All Periods</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="quarterly">Quarterly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default GoalFilters;