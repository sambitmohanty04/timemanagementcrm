import mongoose, { Document, Model, Schema, Types } from "mongoose";

export type AIMessageRole = "user" | "assistant" | "system";

export interface IAIMessage {
  role: AIMessageRole;
  content: string;
  timestamp: Date;
}

export interface IAIConversation extends Document {
  userId: Types.ObjectId; 
  title: string;
  messages: IAIMessage[];
  llmModel?: string; 
  totalMessages: number;
  createdAt: Date;
  updatedAt: Date;
}

const AIMessageSchema = new Schema<IAIMessage>(
  {
    role: {
      type: String,
      enum: ["user", "assistant", "system"],
      required: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 20000, // guards against oversized documents
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const AIConversationSchema = new Schema<IAIConversation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Conversation",
      trim: true,
      maxlength: 100,
    },
    messages: {
      type: [AIMessageSchema],
      default: [],
    },
    llmModel: {
      type: String,
      trim: true,
    },
    totalMessages: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Main query: a user's most recently updated conversations
AIConversationSchema.index({ userId: 1, updatedAt: -1 });

// Keep totalMessages correct automatically, whatever code pushes messages
// No `next` parameter: Mongoose 9 removed it, and the hook still works on older versions.
AIConversationSchema.pre("save", async function (this: IAIConversation) {
  this.totalMessages = this.messages.length;
});

// Reuse the model if it already exists (avoids OverwriteModelError on hot reload)
const AIConversation: Model<IAIConversation> =
  (mongoose.models.AIConversation as Model<IAIConversation>) ||
  mongoose.model<IAIConversation>("AIConversation", AIConversationSchema);

export default AIConversation;