import type { Request, Response } from 'express';
import { Goal } from '../models/Goal';
import { Task } from '../models/Task';
import { syncGoalProgress } from '../utils/syncGoalProgress';

const UPDATABLE_FIELDS = [
  'title',
  'description',
  'category',
  'period',
  'status',
  'priority',
  'progressMode',
  'currentValue',
  'targetValue',
  'unit',
  'startDate',
  'dueDate',
  'projectId',
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

const notFound = (res: Response, what = 'Goal') =>
  res.status(404).json({ success: false, message: `${what} not found` });

/**
 * Scope every query to the logged-in user.
 * Adjust `req.user?.id` to match however your auth middleware attaches the user.
 * If no user is attached (e.g. auth not wired yet) the scope is empty.
 */
const scope = (req: Request): Record<string, unknown> => {
  const userId = (req as any).user?.id ?? (req as any).user?._id;
  return userId ? { userId } : {};
};

/**
 * Bring stored statuses in line with reality:
 *  1. finished goals (current >= target) become completed, even if past due
 *  2. remaining active goals past their due date become overdue
 */
const syncStatuses = async (req: Request) => {
  const base = scope(req);

  await Goal.updateMany(
    {
      ...base,
      status: { $in: ['active', 'overdue'] },
      targetValue: { $gt: 0 },
      $expr: { $gte: ['$currentValue', '$targetValue'] },
    },
    { $set: { status: 'completed', completedAt: new Date() } }
  );

  await Goal.updateMany(
    { ...base, status: 'active', dueDate: { $lt: new Date() } },
    { $set: { status: 'overdue' } }
  );
};

/* ---------- Goals ---------- */

export const getGoals = async (req: Request, res: Response): Promise<void> => {
  try {
    await syncStatuses(req);

    const { status, category, period, priority, projectId, search } = req.query;
    const filter: Record<string, unknown> = { ...scope(req) };

    if (status) filter.status = status;
    if (category) filter.category = category;
    if (period) filter.period = period;
    if (priority) filter.priority = priority;
    if (projectId) filter.projectId = projectId;
    if (typeof search === 'string' && search.trim()) {
      const escaped = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.title = { $regex: escaped, $options: 'i' };
    }

    const goals = await Goal.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: goals });
  } catch (error) {
    handleError(res, error);
  }
};

export const getGoalStats = async (req: Request, res: Response): Promise<void> => {
  try {
    await syncStatuses(req);

    const base = scope(req);
    const [total, active, completed, overdue, onHold] = await Promise.all([
      Goal.countDocuments(base),
      Goal.countDocuments({ ...base, status: 'active' }),
      Goal.countDocuments({ ...base, status: 'completed' }),
      Goal.countDocuments({ ...base, status: 'overdue' }),
      Goal.countDocuments({ ...base, status: 'on-hold' }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        active,
        completed,
        overdue,
        onHold,
        completionRate: total ? Math.round((completed / total) * 100) : 0,
      },
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getGoalById = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!goal) return void notFound(res);

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    handleError(res, error);
  }
};

export const createGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const { milestones } = req.body;

    const goal = await Goal.create({
      ...pickFields(req.body),
      ...scope(req),
      milestones: Array.isArray(milestones)
        ? milestones
            .filter((m: { title?: string }) => m?.title?.trim())
            .map((m: { title: string }) => ({ title: m.title.trim() }))
        : [],
    });

    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!goal) return void notFound(res);

    goal.set(pickFields(req.body));
    await goal.save(); // save() so validators and the pre-save hook run

    // Switching a goal to tasks mode should recount immediately
    if (goal.progressMode === 'tasks') {
      await syncGoalProgress(goal._id);
      const fresh = await Goal.findById(goal._id);
      res.status(200).json({ success: true, data: fresh });
      return;
    }

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteGoal = async (req: Request, res: Response): Promise<void> => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: String(req.params.id), ...scope(req) });
    if (!goal) return void notFound(res);

    // Keep the tasks, just detach them from the deleted goal
    await Task.updateMany({ goalId: goal._id }, { $unset: { goalId: '' } });

    res.status(200).json({ success: true, data: { id: String(req.params.id) } });
  } catch (error) {
    handleError(res, error);
  }
};

/* ---------- Progress ---------- */

export const updateGoalProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const value = Number(req.body.currentValue);
    if (!Number.isFinite(value) || value < 0) {
      res.status(400).json({
        success: false,
        message: 'currentValue must be a non-negative number',
      });
      return;
    }

    const goal = await Goal.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!goal) return void notFound(res);

    if (goal.progressMode !== 'manual') {
      res.status(400).json({
        success: false,
        message: `Progress is driven by ${goal.progressMode} for this goal`,
      });
      return;
    }

    goal.currentValue = value; // hook clamps to target and updates status
    await goal.save();

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    handleError(res, error);
  }
};

/* ---------- Milestones ---------- */

export const addMilestone = async (req: Request, res: Response): Promise<void> => {
  try {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (!title) {
      res.status(400).json({ success: false, message: 'Milestone title is required' });
      return;
    }

    const goal = await Goal.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!goal) return void notFound(res);

    goal.milestones.push({ title } as any);
    await goal.save();

    res.status(201).json({ success: true, data: goal });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateMilestone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const goal = await Goal.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!goal) return void notFound(res);

    const milestone = goal.milestones.id(String(req.params.milestoneId));
    if (!milestone) return void notFound(res, 'Milestone');

    if (req.body.title !== undefined) milestone.title = req.body.title;

    if (req.body.completed !== undefined) {
      milestone.completed = Boolean(req.body.completed);
      milestone.completedAt = milestone.completed ? new Date() : undefined;
    }

    await goal.save(); // hook recalculates progress in milestones mode

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteMilestone = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const goal = await Goal.findOne({ _id: String(req.params.id), ...scope(req) });
    if (!goal) return void notFound(res);

    const milestone = goal.milestones.id(String(req.params.milestoneId));
    if (!milestone) return void notFound(res, 'Milestone');

    milestone.deleteOne();
    await goal.save();

    res.status(200).json({ success: true, data: goal });
  } catch (error) {
    handleError(res, error);
  }
};