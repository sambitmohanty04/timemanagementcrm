import { Response, NextFunction, RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import * as ai from "../services/aiService";
import { ChatBodySchema, SettingsBodySchema } from "../schemas/ai";
import { AuthRequest } from "../middlewares/auth"; // Adjust path to your auth middleware

// Safely pull user ID from AuthRequest
const uid = (req: AuthRequest): string => {
  const id = req.user?.id ?? req.user?._id;
  if (!id) {
    throw new Error("User authentication context missing on request");
  }
  return String(id);
};

// Typed async wrapper for route handlers expecting AuthRequest
type AsyncAuthHandler = (req: AuthRequest, res: Response) => Promise<unknown>;

const wrap =
  (fn: AsyncAuthHandler): RequestHandler =>
  (req, res, next) => {
    fn(req as AuthRequest, res).catch(next);
  };

const badId = (res: Response) =>
  res.status(400).json({ message: "Invalid ID format" });

/* ---------- Overview & Settings ---------- */

export const getOverview = wrap(async (req, res) => {
  const data = await ai.overview(uid(req));
  return res.json(data);
});

export const updateSettings = wrap(async (req, res) => {
  const parsed = SettingsBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid request payload", errors: parsed.error.issues });
  }
  const updated = await ai.setAutoReorganize(uid(req), parsed.data.autoReorganize);
  return res.json(updated);
});

/* ---------- Prioritization & Suggestions ---------- */

export const runPrioritize = wrap(async (req, res) => {
  const result = await ai.prioritize(uid(req));
  return res.json(result);
});

export const getSuggestions = wrap(async (req, res) => {
  const suggestions = await ai.listSuggestions(uid(req));
  return res.json(suggestions);
});

export const acceptSuggestion = wrap(async (req, res) => {

  const id = String(req.params.id);

  if (!isValidObjectId(req.params.id)) return badId(res);
  const suggestion = await ai.acceptSuggestion(uid(req), id);
  if (!suggestion) {
    return res.status(404).json({ message: "Suggestion not found" });
  }
  return res.json(suggestion);
});

export const acceptAllSuggestions = wrap(async (req, res) => {
  const count = await ai.acceptAll(uid(req));
  return res.json({ accepted: count });
});

export const dismissSuggestion = wrap(async (req, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(req.params.id)) return badId(res);
  const dismissed = await ai.dismissSuggestion(uid(req), id);
  if (!dismissed) {
    return res.status(404).json({ message: "Suggestion not found" });
  }
  return res.status(204).end();
});

/* ---------- Chat & Conversations ---------- */

export const sendChat = wrap(async (req, res) => {
  const parsed = ChatBodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid request payload", errors: parsed.error.issues });
  }
  const { message, pageContext, conversationId } = parsed.data;
  const result = await ai.chat(uid(req), message, pageContext, conversationId);
  return res.json(result);
});

export const getConversations = wrap(async (req, res) => {
  const conversations = await ai.listConversations(uid(req));
  return res.json(conversations);
});

export const getConversation = wrap(async (req, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(req.params.id)) return badId(res);
  const conversation = await ai.getConversation(uid(req), id);
  if (!conversation) {
    return res.status(404).json({ message: "Conversation not found" });
  }
  return res.json(conversation);
});

export const deleteConversation = wrap(async (req, res) => {
  const id = String(req.params.id);
  if (!isValidObjectId(req.params.id)) return badId(res);
  const deleted = await ai.deleteConversation(uid(req), id);
  if (!deleted) {
    return res.status(404).json({ message: "Conversation not found" });
  }
  return res.status(204).end();
});