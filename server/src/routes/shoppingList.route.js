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

router.get("/list", getShoppingLists);
router.get("/get/:id", getShoppingList);
router.post("/create", createShoppingList);
router.post("/update/:id", updateShoppingList);
router.post("/archive/:id", archiveShoppingList);
router.post("/delete/:id", deleteShoppingList);

router.post("/:listId/invite/:id", inviteUser);
router.delete("/:listId/remove/:id", removeUser);
router.delete("/:listId/remove", removeYourSelf);

export default router;
