import mongoose, { Schema, Document, Types } from 'mongoose';

export type TaskStatus = 'todo' | 'in-progress' | 'completed' | 'cancelled';

export interface ITask extends Document {
  userId?: Types.ObjectId;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: string;
  dueDate?: Date;
  dueTime?: string;
  project?: string; // free-text project name sent by CreateTaskModal
  completedAt?: Date;
  projectId?: Types.ObjectId;
  goalId?: Types.ObjectId; // links the task to a goal
}

const taskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'completed', 'cancelled'],
      default: 'todo',
    },
    priority: { type: String, trim: true },
    dueDate: { type: Date },
    dueTime: { type: String, trim: true },
    project: { type: String, trim: true },
    completedAt: { type: Date },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    goalId: { type: Schema.Types.ObjectId, ref: 'Goal', index: true },
  },
  { timestamps: true }
);

taskSchema.pre('save', function () {
  if (this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  if (this.status !== 'completed') {
    this.completedAt = undefined;
  }
});

export const Task = mongoose.model<ITask>('Task', taskSchema);