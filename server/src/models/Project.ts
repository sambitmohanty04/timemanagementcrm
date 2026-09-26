import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
    name: string;
    description: string;
    client: string;

    status: "active" | "completed" | "on-hold" | "archived";

    priority: "low" | "medium" | "high";

    startDate?: Date;
    dueDate?: Date;

    totalTasks: number;
    completedTasks: number;
    trackedSeconds: number;

    createdAt: Date;
    updatedDate: Date;
}

const projectSchema = new Schema<IProject>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        client: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: ["active", "completed", "on-hold", "archived"],
            default: "active",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium",
        },
        startDate: Date,
        dueDate: Date,
        totalTasks: {
            type: Number,
            default: 0
        },
        completedTasks: {
            type: Number,
            default: 0
        },
        trackedSeconds: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.model<IProject>("Project", projectSchema);