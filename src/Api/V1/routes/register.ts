import { Router } from "express";
import { RegisterController } from "../controllers/register/register";
let registerLogin = new RegisterController();

const router = Router();

router.post("/register", registerLogin.registerUser);

export default router;
