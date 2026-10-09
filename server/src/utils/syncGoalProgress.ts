import { Goal } from '../models/Goal';
import { Task } from '../models/Task';

/**
 * Recount a goal's progress from its linked tasks.
 * Only affects goals whose progressMode is 'tasks'.
 * Call after any task is created, updated or deleted.
 */
export const syncGoalProgress = async (goalId?: unknown): Promise<void> => {
  if (!goalId) return;

  const goal = await Goal.findById(goalId);
  if (!goal || goal.progressMode !== 'tasks') return;

  const [total, done] = await Promise.all([
    Task.countDocuments({ goalId: goal._id, status: { $ne: 'cancelled' } }),
    Task.countDocuments({ goalId: goal._id, status: 'completed' }),
  ]);

  goal.targetValue = total;
  goal.currentValue = done;
  goal.unit = 'tasks';
  await goal.save(); // pre-save hook updates status (completed / overdue / active)
};