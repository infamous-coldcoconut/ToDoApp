import express from "express";

import {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  archiveShoppingList,
  deleteShoppingList,
} from "../controllers/shoppingListController/shoppingList.controller.js";
const router = express.Router();

router.get("/", getShoppingLists);
router.get("/:id", getShoppingList);
router.post("/", createShoppingList);
router.put("/:id", updateShoppingList);
router.patch("/:id/archive", archiveShoppingList);
router.delete("/:id", deleteShoppingList);

export default router;
