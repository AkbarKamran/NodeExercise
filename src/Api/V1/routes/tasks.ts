import { Router } from "express";
import taskController from "../controllers/task";

import { authenticateToken } from "../middleware/middleware";
const router = Router();
router.post("/create-task", authenticateToken, taskController.createTask);
router.get("/tasks", authenticateToken, taskController.getAllTasks);

export default router;
