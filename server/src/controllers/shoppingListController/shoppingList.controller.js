import ShoppingList from "../../models/shoppingList.model.js";
import User from "../../models/user.model.js";

const getShoppingLists = async (req, res) => {
  try {
    const shoppingLists = await ShoppingList.find({});
    res.status(200).json(shoppingLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShoppingList = async (req, res) => {
  try {
    const { id } = req.params;
    const shoppingList = await ShoppingList.findById(id);
    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.create(req.body);
    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateShoppingList = async (req, res) => {
  try {
    const { id } = req.params;

    const shoppingList = await ShoppingList.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const archiveShoppingList = async (req, res) => {
  try {
    const { id } = req.params;

    const shoppingList = await ShoppingList.findById(id);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    shoppingList.isActive = !shoppingList.isActive;
    await shoppingList.save();
    res.status(200).json(shoppingList);
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

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
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
    const { listId, userId } = req.params;

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
