import express from "express";
import {
  createUser,
  // getUserById,
  loginUser,
} from "../controllers/userController/user.controller.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
// router.get("/:userid", getUserById);
export default router;
