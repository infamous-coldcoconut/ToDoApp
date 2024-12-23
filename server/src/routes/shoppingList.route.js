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
} from "../controllers/shoppingListController/shoppingList.controller.js";
const router = express.Router();

router.post("/list", getShoppingLists);
router.get("/get/:id", getShoppingList);
router.post("/create", createShoppingList);
router.post("/update/:id", updateShoppingList);
router.post("/archive/:id", archiveShoppingList);
router.post("/delete/:id", deleteShoppingList);

router.post("/:listId/invite", inviteUser);
router.post("/:listId/remove", removeUser);

export default router;
