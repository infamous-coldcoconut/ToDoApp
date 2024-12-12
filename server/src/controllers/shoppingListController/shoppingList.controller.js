import ShoppingList from "../../models/shoppingList.model.js";
import {
  createShoppingListSchema,
  updateShoppingListSchema,
} from "../../validation/shoppingList.validation.js";

const getShoppingLists = async (req, res) => {
  try {
    const { userId } = req.body;
    const shoppingLists = await ShoppingList.find({
      $or: [{ owner: userId }, { memberList: userId }],
    });
    res.status(200).json(shoppingLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShoppingList = async (req, res) => {
  try {
    const { id } = req.params;
    const shoppingList = await ShoppingList.findById(id);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }
    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createShoppingList = async (req, res) => {
  try {
    const { error, value } = createShoppingListSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const { name, description, owner, memberList, itemList, isActive } = value;
    const newList = new ShoppingList({
      name,
      description,
      owner,
      memberList,
      itemList,
      isActive,
    });

    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateShoppingList = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = updateShoppingListSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "Validation errors.",
        errors: error.details.map((err) => err.message),
      });
    }

    const shoppingList = await ShoppingList.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true,
    });

    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const archiveShoppingList = async (req, res) => {
  try {
    const { id } = req.params;

    const shoppingList = await ShoppingList.findById(id);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    const updatedList = await ShoppingList.findByIdAndUpdate(
      id,
      { isActive: !shoppingList.isActive },
      { new: true }
    );

    res.status(200).json(updatedList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteShoppingList = async (req, res) => {
  try {
    const { id } = req.params;

    const shoppingList = await ShoppingList.findByIdAndDelete(id);

    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    res.status(200).json({ message: "ShoppingList deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const inviteUser = async (req, res) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    if (shoppingList.memberList.includes(userId)) {
      return res.status(400).json({ message: "User is already a member" });
    }

    shoppingList.memberList.push(userId);
    await shoppingList.save();

    res
      .status(200)
      .json({ message: "User invited successfully", shoppingList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeUser = async (req, res) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    if (!shoppingList.memberList.includes(userId)) {
      return res.status(400).json({ message: "User is not already a member" });
    }

    const index = shoppingList.memberList.indexOf(userId);
    if (index === -1) {
      return res.status(404).json({ message: "User not in the member list" });
    }

    shoppingList.memberList.splice(index, 1);
    await shoppingList.save();

    res
      .status(200)
      .json({ message: "User removed successfully", shoppingList });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeYourSelf = async (req, res) => {
  try {
    const { listId } = req.params;
    const { userId } = req.body;

    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "Shopping list not found" });
    }

    const index = shoppingList.memberList.indexOf(userId);
    if (index === -1) {
      return res.status(404).json({ message: "User not in the member list" });
    }

    shoppingList.memberList.splice(index, 1);
    await shoppingList.save();

    res.status(200).json({
      message: "You have successfully removed yourself from the shopping list",
      shoppingList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const removeUserOrYourself = async (req, res) => {
//   try {
//     const { listId } = req.params;
//     let { userId } = req.body;

//     const shoppingList = await ShoppingList.findById(listId);
//     if (!shoppingList) {
//       return res.status(404).json({ message: "Shopping list not found" });
//     }

//     if (!userId || shoppingList.owner !== req.body.currentUserId) {
//       userId = req.body.currentUserId;
//     }

//     if (!shoppingList.memberList.includes(userId)) {
//       return res
//         .status(400)
//         .json({ message: "User is not a member of this list" });
//     }

//     // Remove the user
//     const index = shoppingList.memberList.indexOf(userId);
//     if (index === -1) {
//       return res.status(404).json({ message: "User not in the member list" });
//     }

//     shoppingList.memberList.splice(index, 1);
//     await shoppingList.save();

//     const message =
//       userId === req.body.currentUserId
//         ? "You have successfully removed yourself from the shopping list"
//         : "User removed successfully";

//     res.status(200).json({ message, shoppingList });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export {
  createShoppingList,
  getShoppingLists,
  getShoppingList,
  updateShoppingList,
  archiveShoppingList,
  deleteShoppingList,
  inviteUser,
  removeUser,
  removeYourSelf,
};
