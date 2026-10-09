import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  getGoals,
  getGoalStats,
  getGoalById,
  createGoal,
  updateGoal,
  deleteGoal,
  updateGoalProgress,
  addMilestone,
  updateMilestone,
  deleteMilestone,
} from "../controllers/goalController.js";

const router = Router();

// Same auth as taskRoutes, so req.user exists and goals get a userId
router.use(protect);

router.route("/").get(getGoals).post(createGoal);

// must stay before "/:id"
router.get("/stats", getGoalStats);

router
  .route("/:id")
  .get(getGoalById)
  .put(updateGoal)
  .patch(updateGoal)
  .delete(deleteGoal);

router.patch("/:id/progress", updateGoalProgress);

router.post("/:id/milestones", addMilestone);

router
  .route("/:id/milestones/:milestoneId")
  .patch(updateMilestone)
  .delete(deleteMilestone);

export default router;