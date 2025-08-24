import express from "express";
import { register, login, logout, getCurrentUser } from "../controller/userController.js";
import auth from "../middleware/auth.js"


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", auth, getCurrentUser);

export default router;