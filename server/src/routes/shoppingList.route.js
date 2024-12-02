import express from "express";

import {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  archiveShoppingList,
  deleteShoppingList,
  inviteUser,
  removeUser,
  removeYourSelf,
} from "../controllers/shoppingListController/shoppingList.controller.js";
const router = express.Router();

router.get("/", getShoppingLists);
router.get("/:id", getShoppingList);
router.post("/", createShoppingList);
router.put("/:id", updateShoppingList);
router.patch("/:id/archive", archiveShoppingList);
router.delete("/:id", deleteShoppingList);

router.post("/:listId/invite", inviteUser);
router.delete("/:listId/remove/:userId", removeUser);
router.delete("/:listId/remove", removeYourSelf);

export default router;
