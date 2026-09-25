import type { Response } from "express";
import Task from "../models/Task.js";
import type { AuthRequest } from "../middlewares/auth.js";

// get tasks api
export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { filter = "all", search } = req.query as { filter?: string; search?: string };

    const query: Record<string, unknown> = { user: req.userId };

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    switch (filter) {
      case "today":
        query.completed = false;
        query.dueDate = { $gte: startOfToday, $lte: endOfToday };
        break;
      case "upcoming":
        query.completed = false;
        query.dueDate = { $gt: endOfToday };
        break;
      case "completed":
        query.completed = true;
        break;
      case "overdue":
        query.completed = false;
        query.dueDate = { $lt: startOfToday };
        break;
      // "all" → no extra filter
    }

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query).sort({ dueDate: 1, createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get task counts api
export const getTaskCounts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.userId;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    const [all, today, upcoming, completed, overdue] = await Promise.all([
      Task.countDocuments({ user: userId }),
      Task.countDocuments({
        user: userId,
        completed: false,
        dueDate: { $gte: startOfToday, $lte: endOfToday },
      }),
      Task.countDocuments({
        user: userId,
        completed: false,
        dueDate: { $gt: endOfToday },
      }),
      Task.countDocuments({ user: userId, completed: true }),
      Task.countDocuments({
        user: userId,
        completed: false,
        dueDate: { $lt: startOfToday },
      }),
    ]);

    res.status(200).json({
      success: true,
      counts: { all, today, upcoming, completed, overdue },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// craete task api
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, project, priority, dueDate } = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: "Title is required" });
      return;
    }

    const task = await Task.create({
      title,
      description,
      project,
      priority,
      dueDate,
      user: req.userId,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// update task api
export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// task complete api toggle
export const toggleTaskComplete = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });

    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// delete task api
export const deleteTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }

    res.status(200).json({ success: true, message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};