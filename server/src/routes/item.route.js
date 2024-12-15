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
router.post("/:listId/update/:itemId", updateItem);
router.post("/:listId/:itemId/", setItemResolved);
router.post("/:listId/delete/:itemId", deleteItem);

export default router;
