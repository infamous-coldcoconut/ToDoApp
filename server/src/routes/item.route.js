import express from "express";
import {
  getItems,
  addItem,
  updateItem,
  setItemResolved,
  deleteItem,
} from "../controllers/itemController/item.controller.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", addItem);
router.put("/:itemId", updateItem);
router.patch("/:itemId", setItemResolved);
router.delete("/:itemId", deleteItem);

export default router;
