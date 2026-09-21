import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import type {
  Task,
  TaskFilter,
  TaskPriority,
} from "../types/task";

import { TASKS } from "../data/tasks";

import TaskTabs from "../components/tasks/TaskTabs";
import TaskList from "../components/tasks/TaskList";
import CreateTaskModal from "../components/tasks/CreateTaskModal";

const MyTasks = () => {
  // =========================================================
  // TASK STATE
  // =========================================================

  const [tasks, setTasks] = useState<Task[]>(TASKS);

  const [activeFilter, setActiveFilter] =
    useState<TaskFilter>("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  // =========================================================
  // CREATE TASK MODAL
  // =========================================================

  const [createTaskOpen, setCreateTaskOpen] =
    useState(false);

  // =========================================================
  // NEW TASK FORM
  // =========================================================

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium" as TaskPriority,
    dueDate: "",
    project: "",
  });

  // =========================================================
  // TODAY
  // =========================================================

  const today = useMemo(() => {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    return date;
  }, []);

  // =========================================================
  // FILTER TASKS
  // =========================================================

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);

      taskDate.setHours(0, 0, 0, 0);

      let matchesFilter = true;

      switch (activeFilter) {
        case "today":
          matchesFilter =
            taskDate.getTime() === today.getTime();
          break;

        case "upcoming":
          matchesFilter =
            taskDate > today &&
            task.status !== "completed";
          break;

        case "completed":
          matchesFilter =
            task.status === "completed";
          break;

        case "overdue":
          matchesFilter =
            taskDate < today &&
            task.status !== "completed";
          break;

        case "all":
        default:
          matchesFilter = true;
          break;
      }

      // Search
      const search = searchQuery
        .trim()
        .toLowerCase();

      const matchesSearch =
        !search ||
        task.title
          .toLowerCase()
          .includes(search) ||
        task.description
          ?.toLowerCase()
          .includes(search) ||
        task.project
          ?.toLowerCase()
          .includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [
    tasks,
    activeFilter,
    searchQuery,
    today,
  ]);

  // =========================================================
  // TASK COUNTS
  // =========================================================

  const counts = useMemo(() => {
    return {
      // All
      all: tasks.length,

      // Today
      today: tasks.filter((task) => {
        const date = new Date(task.dueDate);

        date.setHours(0, 0, 0, 0);

        return (
          date.getTime() === today.getTime()
        );
      }).length,

      // Upcoming
      upcoming: tasks.filter((task) => {
        const date = new Date(task.dueDate);

        date.setHours(0, 0, 0, 0);

        return (
          date > today &&
          task.status !== "completed"
        );
      }).length,

      // Completed
      completed: tasks.filter(
        (task) =>
          task.status === "completed"
      ).length,

      // Overdue
      overdue: tasks.filter((task) => {
        const date = new Date(task.dueDate);

        date.setHours(0, 0, 0, 0);

        return (
          date < today &&
          task.status !== "completed"
        );
      }).length,
    };
  }, [tasks, today]);

  // =========================================================
  // TOGGLE TASK
  // =========================================================

  const handleToggleTask = (id: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "completed"
                  ? "todo"
                  : "completed",
            }
          : task
      )
    );
  };

  // =========================================================
  // HANDLE FORM INPUT
  // =========================================================

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setNewTask((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================================================
  // CREATE TASK
  // =========================================================

  const handleCreateTask = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validate title
    if (!newTask.title.trim()) {
      return;
    }

    // Validate due date
    if (!newTask.dueDate) {
      return;
    }

    // Create task object
    const task: Task = {
      id: Date.now().toString(),

      title: newTask.title.trim(),

      description:
        newTask.description.trim(),

      priority: newTask.priority,

      status: "todo",

      dueDate: newTask.dueDate,

      project: newTask.project.trim(),

      createdAt:
        new Date().toISOString(),
    };

    // Add new task at beginning
    setTasks((currentTasks) => [
      task,
      ...currentTasks,
    ]);

    // Reset form
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      project: "",
    });

    // Close modal
    setCreateTaskOpen(false);

    // Show newly created task
    setActiveFilter("all");
  };

  // =========================================================
  // OPEN CREATE MODAL
  // =========================================================

  const handleOpenCreateTask = () => {
    setCreateTaskOpen(true);
  };

  // =========================================================
  // CLOSE CREATE MODAL
  // =========================================================

  const handleCloseCreateTask = () => {
    setCreateTaskOpen(false);
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-800 p-4 dark:bg-[#0b1120] sm:p-6 rounded-2xl">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-200 dark:text-white">
              My Tasks
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Organize and manage your tasks
            </p>
          </div>

          {/* Create Task */}
          <button
            type="button"
            onClick={handleOpenCreateTask}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />

            Create Task
          </button>
        </div>

        {/* =====================================================
            MAIN CARD
        ===================================================== */}

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm dark:border-white/10 dark:bg-[#111827]">

          {/* ===================================================
              TASK TABS
          =================================================== */}

          <TaskTabs
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            counts={counts}
          />

          {/* ===SEARCH=== */}

          <div className="border-b border-gray-800 p-4 dark:border-white/10">

            <div className="relative max-w-md">

              {/* Search Icon */}
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              {/* Search Input */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                placeholder="Search tasks..."
                className="w-full rounded-lg border border-gray-800 bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-gray-400 outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white"
              />
            </div>
          </div>

          {/* ===================================================
              TASK LIST
          =================================================== */}

          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
          />
        </div>
      </div>

      {/* =======================================================
          CREATE TASK MODAL
      ======================================================= */}

      <CreateTaskModal
        open={createTaskOpen}
        task={newTask}
        onClose={handleCloseCreateTask}
        onChange={handleInputChange}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default MyTasks;