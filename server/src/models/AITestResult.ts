import mongoose, { Document, Schema, Types } from "mongoose";

export type AITestType =
  | "prompt"
  | "response"
  | "security"
  | "hallucination"
  | "performance";

export type AITestStatus = "passed" | "failed";

export interface IAITestResult extends Document {
  userId?: Types.ObjectId;

  testName: string;

  testType: AITestType;

  prompt: string;

  expectedOutput?: string;

  actualOutput?: string;

  status: AITestStatus;

  score: number;

  latencyMs: number;

  errorMessage?: string;

  model?: string;

  createdAt: Date;

  updatedAt: Date;
}

const AITestResultSchema = new Schema<IAITestResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      index: true,
    },

    testName: {
      type: String,
      required: true,
      trim: true,
    },

    testType: {
      type: String,
      enum: [
        "prompt",
        "response",
        "security",
        "hallucination",
        "performance",
      ],
      required: true,
    },

    prompt: {
      type: String,
      required: true,
      trim: true,
    },

    expectedOutput: {
      type: String,
      trim: true,
    },

    actualOutput: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["passed", "failed"],
      required: true,
    },

    score: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    latencyMs: {
      type: Number,
      min: 0,
      default: 0,
    },

    errorMessage: {
      type: String,
      trim: true,
    },

    model: {
      type: String,
      default: "claude",
    },
  },
  {
    timestamps: true,
  }
);

const AITestResult = mongoose.model<IAITestResult>(
  "AITestResult",
  AITestResultSchema
);

export default AITestResult;