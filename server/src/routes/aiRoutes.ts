import { Router } from "express";
import * as aiController from "../controllers/aiController";
import { protect } from "../middlewares/auth"; // Imports your protect middleware

const router = Router();

// Protect all AI routes with JWT authentication
router.use(protect);

router.get("/overview", aiController.getOverview);
router.patch("/settings", aiController.updateSettings);
router.post("/prioritize", aiController.runPrioritize);
router.get("/suggestions", aiController.getSuggestions);
router.post("/suggestions/:id/accept", aiController.acceptSuggestion);
router.post("/suggestions/accept-all", aiController.acceptAllSuggestions);
router.delete("/suggestions/:id", aiController.dismissSuggestion);
router.post("/chat", aiController.sendChat);
router.get("/conversations", aiController.getConversations);
router.get("/conversations/:id", aiController.getConversation);
router.delete("/conversations/:id", aiController.deleteConversation);

export default router;