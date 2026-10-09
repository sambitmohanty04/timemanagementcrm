import Task from "../models/Task.js";

export const withTaskStats = async <T extends { _id: unknown }>(projects: T[]) => {
  const tasks = await Task.find({
    project: { $in: projects.map((p) => p._id) },
  })
    .sort({ createdAt: -1 })
    .lean();

  const byProject = new Map<string, typeof tasks>();
  for (const task of tasks) {
    const key = String(task.project);
    byProject.set(key, [...(byProject.get(key) ?? []), task]);
  }

  return projects.map((p) => {
    const list = (byProject.get(String(p._id)) ?? []).filter(
      (t) => t.status !== "cancelled"
    );
    const completed = list.filter((t) => t.status === "completed").length;

    return {
      ...p,
      totalTasks: list.length,
      completedTasks: completed,
      progress: list.length ? Math.round((completed / list.length) * 100) : 0,
      tasks: list.map((t) => ({
        id: String(t._id),
        title: t.title,
        status: t.status,
      })),
    };
  });
};