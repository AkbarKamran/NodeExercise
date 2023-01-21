import { Router } from "express";
import loginController from "../controllers/login/login";

const router = Router();
router.post("/login", loginController.login);

export default router;
