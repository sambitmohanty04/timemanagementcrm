import { Router } from "express";

import {
    getProjects,
    getProjectStats,
    createProject,
    updateProject,
    deleteProject
} from "../controllers/projectController"

const router = Router();

router.get('/', getProjects);
router.get('/stats', getProjectStats);
router.post('/', createProject);
router.patch("/:id", updateProject);
router.delete('/:id', deleteProject);

export default router;