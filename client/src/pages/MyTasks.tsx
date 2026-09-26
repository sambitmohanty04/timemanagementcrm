import { useEffect, useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import type { Task, TaskFilter, TaskPriority } from "../types/task";
import TaskTabs from "../components/tasks/TaskTabs";
import TaskList from "../components/tasks/TaskList";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import { fetchTasks, createTaskApi, updateTaskApi, toggleTaskApi, cancelTaskApi, deleteTaskApi } from "../api/tasks";

const MyTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [createTaskOpen, setCreateTaskOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: "", description: "", priority: "medium" as TaskPriority,
    dueDate: "", dueTime: "", project: "",
  });

  useEffect(() => {
    fetchTasks().then(setTasks).finally(() => setLoading(false));
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const isDone = (task: Task) => task.status === "completed" || task.status === "cancelled";

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);

      let matchesFilter = true;
      switch (activeFilter) {
        case "today": matchesFilter = taskDate.getTime() === today.getTime() && !isDone(task); break;
        case "upcoming": matchesFilter = taskDate > today && !isDone(task); break;
        case "completed": matchesFilter = task.status === "completed"; break;
        case "overdue": matchesFilter = taskDate < today && !isDone(task); break;
        default: matchesFilter = true;
      }

      const search = searchQuery.trim().toLowerCase();
      const matchesSearch = !search ||
        task.title.toLowerCase().includes(search) ||
        task.description?.toLowerCase().includes(search) ||
        task.project?.toLowerCase().includes(search);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, activeFilter, searchQuery, today]);

  const counts = useMemo(() => ({
    all: tasks.length,
    today: tasks.filter((t) => {
      const d = new Date(t.dueDate); d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime() && !isDone(t);
    }).length,
    upcoming: tasks.filter((t) => {
      const d = new Date(t.dueDate); d.setHours(0, 0, 0, 0);
      return d > today && !isDone(t);
    }).length,
    completed: tasks.filter((t) => t.status === "completed").length,
    overdue: tasks.filter((t) => {
      const d = new Date(t.dueDate); d.setHours(0, 0, 0, 0);
      return d < today && !isDone(t);
    }).length,
  }), [tasks, today]);

  const handleToggleTask = async (id: string) => {
    setTasks((cur) => cur.map((t) => t.id === id ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t));
    try {
      await toggleTaskApi(id);
    } catch (error) {
      console.error(error);
      setTasks((cur) => cur.map((t) => t.id === id ? { ...t, status: t.status === "completed" ? "todo" : "completed" } : t));
    }
  };

  const handleCancelTask = async (id: string) => {
    const previous = tasks;
    setTasks((cur) => cur.map((t) => t.id === id ? { ...t, status: t.status === "cancelled" ? "todo" : "cancelled" } : t));
    try {
      await cancelTaskApi(id);
    } catch (error) {
      console.error(error);
      setTasks(previous);
    }
  };

  const handleDeleteTask = async (id: string) => {
    const previous = tasks;
    setTasks((cur) => cur.filter((t) => t.id !== id));
    try {
      await deleteTaskApi(id);
    } catch (error) {
      console.error(error);
      setTasks(previous);
    }
  };

  const handleUpdateTask = async (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
    const previous = tasks;
    setTasks((cur) => cur.map((t) => t.id === id ? { ...t, ...updates } : t));
    try {
      const updated = await updateTaskApi(id, updates);
      setTasks((cur) => cur.map((t) => t.id === id ? updated : t));
    } catch (error) {
      console.error(error);
      setTasks(previous);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTask((cur) => ({ ...cur, [name]: value }));
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.dueDate) return;

    try {
      const created = await createTaskApi({
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        dueTime: newTask.dueTime,
        project: newTask.project.trim(),
      });
      setTasks((cur) => [created, ...cur]);
      setNewTask({ title: "", description: "", priority: "medium", dueDate: "", dueTime: "", project: "" });
      setCreateTaskOpen(false);
      setActiveFilter("all");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-6 text-gray-400">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-slate-800 p-4 dark:bg-[#0b1120] sm:p-6 rounded-2xl">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-200 dark:text-white">My Tasks</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Organize and manage your tasks</p>
          </div>
          <button type="button" onClick={() => setCreateTaskOpen(true)}
            className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
            <Plus size={18} /> Create Task
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-sm dark:border-white/10 dark:bg-[#111827]">
          <TaskTabs activeFilter={activeFilter} setActiveFilter={setActiveFilter} counts={counts} />

          <div className="border-b border-gray-800 p-4 dark:border-white/10">
            <div className="relative max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-lg border border-gray-800 bg-slate-800 py-2.5 pl-10 pr-4 text-sm text-gray-400 outline-none transition focus:border-blue-500 dark:border-white/10 dark:bg-white/5 dark:text-white" />
            </div>
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onCancel={handleCancelTask}
            onEdit={(task) => console.log("Edit requested for:", task)}
          />
        </div>
      </div>

      <CreateTaskModal
        open={createTaskOpen}
        task={newTask}
        onClose={() => setCreateTaskOpen(false)}
        onChange={handleInputChange}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default MyTasks;