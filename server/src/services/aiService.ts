import AIConversation from "../models/AIConversation"; // Adjust path as needed

/* ---------- Overview & Settings ---------- */

export async function overview(userId: string) {
  const totalConversations = await AIConversation.countDocuments({ userId });
  return { userId, totalConversations };
}

export async function setAutoReorganize(userId: string, autoReorganize: boolean) {
  // Update user preferences in database (e.g., in a User model)
  return { userId, autoReorganize, updated: true };
}

/* ---------- Prioritization & Suggestions ---------- */

export async function prioritize(userId: string) {
  // Run prioritization analysis
  return { userId, priorityList: [] };
}

export async function listSuggestions(userId: string) {
  // Fetch active suggestions for user
  return [];
}

export async function acceptSuggestion(userId: string, suggestionId: string) {
  // Perform action to accept suggestion
  return { id: suggestionId, accepted: true };
}

export async function acceptAll(userId: string): Promise<number> {
  // Bulk accept user suggestions
  return 0; // Return count of accepted suggestions
}

export async function dismissSuggestion(userId: string, suggestionId: string): Promise<boolean> {
  // Dismiss suggestion logic
  return true;
}

/* ---------- Chat & Conversations ---------- */

export async function chat(
  userId: string,
  message: string,
  pageContext?: string,
  conversationId?: string
) {
  let conversation;

  if (conversationId) {
    conversation = await AIConversation.findOne({ _id: conversationId, userId });
  }

  if (!conversation) {
    conversation = new AIConversation({
      userId,
      messages: [],
    });
  }

  // 1. Push user message
  conversation.messages.push({
    role: "user",
    content: message,
    timestamp: new Date(),
  });

  // 2. Call your LLM API here (e.g., OpenAI API)
  const aiReplyText = `This is a mockup response to: "${message}"`;

  // 3. Push AI response
  conversation.messages.push({
    role: "assistant",
    content: aiReplyText,
    timestamp: new Date(),
  });

  await conversation.save();

  return {
    reply: aiReplyText,
    conversationId: conversation._id,
  };
}

export async function listConversations(userId: string) {
  return AIConversation.find({ userId })
    .select("-messages") // Exclude heavy message arrays in list view
    .sort({ updatedAt: -1 })
    .lean();
}

export async function getConversation(userId: string, conversationId: string) {
  return AIConversation.findOne({ _id: conversationId, userId }).lean();
}

export async function deleteConversation(userId: string, conversationId: string): Promise<boolean> {
  const result = await AIConversation.deleteOne({ _id: conversationId, userId });
  return result.deletedCount > 0;
}