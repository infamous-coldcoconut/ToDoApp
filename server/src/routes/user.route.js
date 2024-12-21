import express from "express";
import {
  createUser,
  getUsers,
  loginUser,
} from "../controllers/userController/user.controller.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/get", getUsers);
export default router;
