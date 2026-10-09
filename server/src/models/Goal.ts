import mongoose, { Schema, Document, Types } from 'mongoose';

export type GoalStatus = 'active' | 'completed' | 'overdue' | 'on-hold';

export interface IMilestone {
  _id?: Types.ObjectId;
  title: string;
  completed: boolean;
  completedAt?: Date;
}

export interface IGoal extends Document {
  userId?: Types.ObjectId;
  title: string;
  description?: string;
  category?: string;
  period?: string;
  status: GoalStatus;
  priority?: string;
  progressMode: 'manual' | 'milestones' | 'tasks';
  currentValue: number;
  targetValue: number;
  unit: string;
  startDate?: Date;
  dueDate?: Date;
  completedAt?: Date;
  projectId?: Types.ObjectId;
  milestones: Types.DocumentArray<IMilestone & Document>;
}

const milestoneSchema = new Schema<IMilestone>(
  {
    title: { type: String, required: true, trim: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

const goalSchema = new Schema<IGoal>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, trim: true },
    period: { type: String, trim: true },
    status: {
      type: String,
      enum: ['active', 'completed', 'overdue', 'on-hold'],
      default: 'active',
    },
    priority: { type: String, trim: true },
    // 'manual'     -> you edit currentValue yourself
    // 'milestones' -> currentValue/targetValue are derived from milestones
    progressMode: { type: String, enum: ['manual', 'milestones', 'tasks'], default: 'manual' },
    currentValue: { type: Number, default: 0, min: 0 },
    targetValue: { type: Number, default: 100, min: 0 },
    // Default fixes the stray "100%" label: unit is just a short suffix
    unit: { type: String, default: '%', trim: true, maxlength: 20 },
    startDate: { type: Date },
    dueDate: { type: Date },
    completedAt: { type: Date },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    milestones: { type: [milestoneSchema], default: [] },
  },
  { timestamps: true }
);

goalSchema.pre('save', function () {
  // 1. Derive progress from milestones when that mode is on
  if (this.progressMode === 'milestones' && this.milestones.length > 0) {
    this.targetValue = this.milestones.length;
    this.currentValue = this.milestones.filter((m) => m.completed).length;
    this.unit = 'milestones';
  }

  // 2. Never let a goal's value exceed its target
  if (this.targetValue > 0 && this.currentValue > this.targetValue) {
    this.currentValue = this.targetValue;
  }

  // 3. Keep status in sync with progress (on-hold is left alone)
  const done = this.targetValue > 0 && this.currentValue >= this.targetValue;

  if (this.status !== 'on-hold') {
    if (done) {
      if (this.status !== 'completed') this.completedAt = new Date();
      this.status = 'completed';
    } else {
      const pastDue = this.dueDate && this.dueDate < new Date();
      this.status = pastDue ? 'overdue' : 'active';
      this.completedAt = undefined;
    }
  }
});

export const Goal = mongoose.model<IGoal>('Goal', goalSchema);