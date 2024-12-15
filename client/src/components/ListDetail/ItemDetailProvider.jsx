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
import AuthServices from "../Services/authServices";
import { useParams } from "react-router-dom";

export const ItemDetailContext = createContext();

function ItemDetailProvider() {
  const [showResolved, setShowResolved] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const [filterOption, setFilterOption] = useState("Not resolved");
  const [items, setItems] = useState([]);
  const [shoppingList, setShoppingList] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchShoppingListData = async () => {
      try {
        const res = await ShoppingListServices.getShoppingList(id);
        setShoppingList(res.data);
      } catch (error) {
        console.error("Error fetching shopping list", error);
      }
    };

    const fetchItemsData = async () => {
      try {
        const res = await ItemServices.getItems(id);
        console.log("Items Data:", res.data);
        setItems(res.data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchShoppingListData()
      .then(() => {
        return fetchItemsData();
      })
      .finally(() => {
        setLoading(false);
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
      ItemServices.getItems(id)
        .then((res) => {
          setItems(res.data);
        })
        .catch((error) =>
          console.error("Error fetching updated shopping list items", error)
        );
    } catch (error) {
      console.log(error);
    }
  };
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
      {!loading && shoppingList && items ? (
        <>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </ItemDetailContext.Provider>
  );
}

export default ItemDetailProvider;
