import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  getTasks, createTask, updateTask, toggleTaskComplete, cancelTask, deleteTask,
} from "../controllers/taskController.js";

const router = Router();
router.use(protect);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/toggle", toggleTaskComplete);
router.patch("/:id/cancel", cancelTask);
router.delete("/:id", deleteTask);

export default router;