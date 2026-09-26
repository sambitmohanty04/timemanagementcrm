import type { Response } from "express";
import Task from "../models/Task.js";
import type { AuthRequest } from "../middlewares/auth.js";

export const getTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort({ dueDate: 1, createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, project, priority, dueDate, dueTime } = req.body;

    if (!title) {
      res.status(400).json({ success: false, message: "Title is required" });
      return;
    }

    const task = await Task.create({
      title, description, project, priority, dueDate, dueTime,
      status: "todo",
      user: req.userId,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, project, priority, dueDate, dueTime, status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, project, priority, dueDate, dueTime, status },
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

export const toggleTaskComplete = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    task.status = task.status === "completed" ? "todo" : "completed";
    await task.save();
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      res.status(404).json({ success: false, message: "Task not found" });
      return;
    }
    task.status = task.status === "cancelled" ? "todo" : "cancelled";
    await task.save();
    res.status(200).json({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

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