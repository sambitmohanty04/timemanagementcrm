import type { TaskFilter } from "../../types/task";

interface TaskTabsProps {
  activeFilter: TaskFilter;
  setActiveFilter: (filter: TaskFilter) => void;
  counts: {
    all: number;
    today: number;
    upcoming: number;
    completed: number;
    overdue: number;
  };
}

const tabs: {
  id: TaskFilter;
  label: string;
}[] = [
  {
    id: "all",
    label: "All Tasks",
  },
  {
    id: "today",
    label: "Today",
  },
  {
    id: "upcoming",
    label: "Upcoming",
  },
  {
    id: "completed",
    label: "Completed",
  },
  {
    id: "overdue",
    label: "Overdue",
  },
];

const TaskTabs = ({
  activeFilter,
  setActiveFilter,
  counts,
}: TaskTabsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto border-b border-gray-200 dark:border-white/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => setActiveFilter(tab.id)}
          className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
            activeFilter === tab.id
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-200 hover:text-gray-500 dark:text-gray-400 dark:hover:text-white"
          }`}
        >
          {tab.label}

          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              activeFilter === tab.id
                ? "bg-slate-700 text-yellow-500"
                : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400"
            }`}
          >
            {counts[tab.id]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskTabs;