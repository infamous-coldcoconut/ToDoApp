import express from "express";
import {
  getItems,
  addItem,
  updateItem,
  setItemResolved,
  deleteItem,
} from "../controllers/itemController/item.controller.js";

const router = express.Router();

router.get("/:listId/list", getItems);
router.post("/:listId/add", addItem);
router.post("/:listId/update", updateItem);
router.post("/:listId/resolved", setItemResolved);
router.post("/:listId/delete", deleteItem);

export default router;
