import mongoose, { Document, Schema, Types } from "mongoose";

export type TaskPriority = "low" | "medium" | "high";

export interface ITask extends Document {
  title: string;
  description?: string;
  project?: string;
  priority: TaskPriority;
  dueDate?: Date;
  completed: boolean;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    project: { type: String, trim: true },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: { type: Date },
    completed: { type: Boolean, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", taskSchema);