import ShoppingList from "../../models/shoppingList.model.js";

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
    const { isActive } = req.body;

    const shoppingList = await ShoppingList.findByIdAndUpdate(
      id,
      { isActive },
      { new: true, runValidators: true }
    );
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }
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

export {
  getShoppingLists,
  getShoppingList,
  createShoppingList,
  updateShoppingList,
  archiveShoppingList,
  deleteShoppingList,
};
