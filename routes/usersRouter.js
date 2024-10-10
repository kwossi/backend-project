import { Router } from "express";
import {
  getUser,
  login,
  logout,
  protect,
  register,
} from "../controllers/usersController.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.use(protect);
//! TODO in frontend: make User profile page, for overview and update
router.route("/profile").get(getUser);

export default router;
