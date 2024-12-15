import React, {
  createContext,
  useState,
  useContext,
  useMemo,
  useEffect,
} from "react";
import ItemDetailToolBar from "./ItemDetailToolBar";
import ItemDetailCard from "./ItemDetailCard";
import UserCard from "../User/UserCard";
import { UserContext } from "../User/UserProvider";
import ShoppingListServices from "../Services/shoppingListServices";
import ItemServices from "../Services/itemServices";
import { useParams } from "react-router-dom";

export const ItemDetailContext = createContext();

function ItemDetailProvider() {
  const [showResolved, setShowResolved] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const [filterOption, setFilterOption] = useState("Not resolved");
  const [items, setItems] = useState([]);
  const [shoppingList, setShoppingList] = useState(null);

  const { id } = useParams();

  console.log("LoggedInUser:", loggedInUser);
  console.log("ID from params:", id, typeof id);

  useEffect(() => {
    if (!loggedInUser || !id) return; // Exit early if dependencies are not ready

    console.log("Fetching shopping list and items for shoppingListId:", id);

    ShoppingListServices.getShoppingList(id)
      .then((res) => {
        console.log("Shopping List Data:", res.data);
        setShoppingList(res.data); // Update shoppingList
      })
      .catch((error) => {
        console.error("Error fetching shopping list", error);
      });

    ItemServices.getItems(id)
      .then((res) => {
        console.log("Items Data:", res.data);
        setItems(res.data);
      })
      .catch((error) => {
        console.error("Error fetching items", error);
      });
  }, [loggedInUser, id]);

  const filteredItems = useMemo(() => {
    if (filterOption === "all") {
      return items;
    } else if (filterOption === "resolved") {
      return items.filter((item) => item.resolved === true);
    } else if (filterOption === "Not resolved") {
      return items.filter((item) => item.resolved === false);
    }
  }, [filterOption, items]);

  const handleAdd = async (data) => {
    try {
      const res = await ItemServices.addItem(id, data);
      setItems((prevItems) => [...prevItems, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      const res = await ItemServices.updateItem(data, id);
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === res.data._id ? res.data : item))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleResolved = async (data) => {
    try {
      await ItemServices.setItemResolved(data, id);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === data ? { ...item, resolved: !item.resolved } : item
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (data) => {
    try {
      await ItemServices.deleteItem(data, id);
      // Refetch items after deletion
      ItemServices.getItems(id)
        .then((res) => {
          setItems(res.data); // Refresh the items
        })
        .catch((error) =>
          console.error("Error fetching updated shopping list items", error)
        );
    } catch (error) {
      console.log(error);
    }
  };

  console.log("pepa", shoppingList);

  return (
    <ItemDetailContext.Provider
      value={{
        items,
        filteredItems,
        handleAdd,
        handleResolved,
        handleUpdate,
        handleDelete,
        showResolved,
        setShowResolved,
        shoppingList,
      }}
    >
      <ItemDetailToolBar
        shoppingList={shoppingList}
        id={id}
        loggedInUser={loggedInUser}
        handleAdd={handleAdd}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        showResolved={showResolved}
        setShowResolved={setShowResolved}
      />
      <ItemDetailCard
        filteredItems={filteredItems}
        shoppingList={shoppingList}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        handleResolved={handleResolved}
      />
      <UserCard shoppingList={shoppingList} />
    </ItemDetailContext.Provider>
  );
}

export default ItemDetailProvider;
