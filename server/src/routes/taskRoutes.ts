import { Router } from "express";
import { protect } from "../middlewares/auth.js";

import {
    getTasks,
    getTaskCounts,
    createTask,
    updateTask,
    toggleTaskComplete,
    deleteTask
} from '../controllers/taskController.js'

const router = Router();

router.use(protect);
router.get("/", getTasks);
router.get("/counts", getTaskCounts);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/toggle", toggleTaskComplete);
router.delete("/:id",deleteTask);

export default router;