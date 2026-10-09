import type { Request, Response } from 'express';
import { Task } from '../models/Task';
import { Goal } from '../models/Goal';
import { syncGoalProgress } from '../utils/syncGoalProgress';

const VALID_STATUSES = ['todo', 'in-progress', 'completed', 'cancelled'] as const;

const UPDATABLE_FIELDS = [
  'title',
  'description',
  'status',
  'priority',
  'dueDate',
  'dueTime',
  'project',
  'projectId',
  'goalId',
] as const;

const pickFields = (body: Record<string, any>) =>
  Object.fromEntries(
    UPDATABLE_FIELDS.filter((key) => body[key] !== undefined).map((key) => [
      key,
      body[key],
    ])
  );

const handleError = (res: Response, error: unknown) => {
  const err = error as Error;
  const isClientError =
    err.name === 'ValidationError' || err.name === 'CastError';

  res
    .status(isClientError ? 400 : 500)
    .json({ success: false, message: err.message });
};

const notFound = (res: Response) =>
  res.status(404).json({ success: false, message: 'Task not found' });

const scope = (req: Request): Record<string, unknown> => {
  const userId = (req as any).user?.id ?? (req as any).user?._id;
  return userId ? { userId } : {};
};

/** Empty string from a "No goal" dropdown means "unlink". */
const normalizeGoalId = (body: Record<string, any>) => {
  if (body.goalId === '' || body.goalId === null) body.goalId = undefined;
};

/** Make sure the goal exists (and belongs to this user) before linking. */
const goalExists = async (req: Request, goalId: unknown): Promise<boolean> => {
  if (!goalId) return true;
  const goal = await Goal.findOne({ _id: String(goalId), ...scope(req) });
  return !!goal;
};

/* ---------- CRUD ---------- */

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, priority, projectId, goalId, search } = req.query;
    const filter: Record<string, unknown> = { ...scope(req) };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (projectId) filter.projectId = projectId;
    if (goalId) filter.goalId = goalId;
    if (typeof search === 'string' && search.trim()) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.title = { $regex: escaped, $options: 'i' };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    handleError(res, error);
  }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!task) return void notFound(res);

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error);
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    normalizeGoalId(req.body);

    if (!(await goalExists(req, req.body.goalId))) {
      res.status(400).json({ success: false, message: 'Goal not found' });
      return;
    }

    const task = await Task.create({ ...pickFields(req.body), ...scope(req) });
    await syncGoalProgress(task.goalId);

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    normalizeGoalId(req.body);

    const task = await Task.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!task) return void notFound(res);

    if (req.body.goalId !== undefined && !(await goalExists(req, req.body.goalId))) {
      res.status(400).json({ success: false, message: 'Goal not found' });
      return;
    }

    const previousGoalId = task.goalId;

    task.set(pickFields(req.body));
    // `goalId: undefined` must clear the link, so handle it explicitly
    if ('goalId' in req.body && req.body.goalId === undefined) {
      task.goalId = undefined;
    }
    await task.save();

    // Recount the new goal, and the old one if the task moved
    await syncGoalProgress(task.goalId);
    if (previousGoalId && String(previousGoalId) !== String(task.goalId ?? '')) {
      await syncGoalProgress(previousGoalId);
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({
      _id: String(req.params.id),
      ...scope(req),
    });
    if (!task) return void notFound(res);

    await syncGoalProgress(task.goalId);

    res.status(200).json({ success: true, data: { id: String(req.params.id) } });
  } catch (error) {
    handleError(res, error);
  }
};

/* ---------- Status / completion ---------- */

/** PATCH /:id/status   body: { status: 'todo' | 'in-progress' | 'completed' } */
export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      res.status(400).json({
        success: false,
        message: `status must be one of: ${VALID_STATUSES.join(', ')}`,
      });
      return;
    }

    const task = await Task.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!task) return void notFound(res);

    task.status = status;
    await task.save();
    await syncGoalProgress(task.goalId);

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error);
  }
};

/** PATCH /:id/cancel   cancels a task (cancelled tasks don't count toward goal progress) */
export const cancelTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!task) return void notFound(res);

    task.status = 'cancelled';
    await task.save();
    await syncGoalProgress(task.goalId);

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error);
  }
};

/** PATCH /:id/toggle   flips between completed and todo */
export const toggleTaskComplete = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!task) return void notFound(res);

    task.status = task.status === 'completed' ? 'todo' : 'completed';
    await task.save();
    await syncGoalProgress(task.goalId);

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    handleError(res, error);
  }
};

// Aliases so common route imports resolve to a real function.
// Delete any you don't use once your taskRoutes.ts imports match.
export const toggleTask = toggleTaskComplete;
export const toggleTaskStatus = toggleTaskComplete;
export const completeTask = toggleTaskComplete;
export const updateStatus = updateTaskStatus;