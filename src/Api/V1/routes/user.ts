import { Router } from "express";
import userController from "../controllers/user/user";

import { authenticateToken } from "../middleware/middleware";
const router = Router();
router.get("/user", authenticateToken, userController.getUser);

export default router;
