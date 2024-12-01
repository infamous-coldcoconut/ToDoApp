import ShoppingList from "../../models/shoppingList.model.js";

const getItems = async (req, res) => {
  try {
    const { listId } = req.params;

    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    res.status(200).json(shoppingList.itemList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addItem = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name } = req.body;

    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    shoppingList.itemList.push({ name, resolved: false });
    await shoppingList.save();

    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const { name, resolved } = req.body;

    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    const item = shoppingList.itemList.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (name !== undefined) {
      item.name = name;
    }
    if (resolved !== undefined) {
      item.resolved = resolved;
    }

    await shoppingList.save();
    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const setItemResolved = async (req, res) => {
  try {
    const { listId, itemId } = req.params;
    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    const item = await ShoppingList.itemList.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.resolved = !item.resolved;
    await shoppingList.save();
    res.status(200).json(shoppingList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { listId, itemId } = req.params;

    const shoppingList = await ShoppingList.findById(listId);
    if (!shoppingList) {
      return res.status(404).json({ message: "ShoppingList not found" });
    }

    const item = shoppingList.itemList.id(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.remove();
    await shoppingList.save();
    res.status(200).json({ message: "ShoppingList deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getItems, addItem, updateItem, setItemResolved, deleteItem };
