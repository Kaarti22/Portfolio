import express from "express";
import { login, register, logout, getUser, updateProfile, updatePassword, getUserForPortfolio } from "../controller/userController.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/register", register); 
router.post("/login", login); 
router.get("/logout", isAuthenticated, logout);  
router.get("/me", isAuthenticated, getUser);
router.put("/update/me", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/me/portfolio", getUserForPortfolio);

export default router;