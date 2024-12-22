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
import ItemChart from "./ItemChart";

import { useParams } from "react-router-dom";

export const ItemDetailContext = createContext();

function ItemDetailProvider() {
  const [showResolved, setShowResolved] = useState(false);
  const { loggedInUser } = useContext(UserContext);
  const [filterOption, setFilterOption] = useState("Not resolved");
  const [items, setItems] = useState([]);
  const [shoppingList, setShoppingList] = useState(null);
  const [user, setUser] = useState([]);
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
    const fetchUsersData = async () => {
      try {
        const res = await ItemServices.getUsers(loggedInUser.id);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching items", error);
      }
    };

    fetchShoppingListData()
      .then(() => {
        return fetchItemsData();
      })
      .then(() => {
        return fetchUsersData();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const filteredItems = useMemo(() => {
    return items.map((item) => ({
      ...item,
      crossedOut: item.resolved,
    }));
  }, [items]);

  const handleAdd = async (data) => {
    try {
      await ItemServices.addItem(id, data);

      const resItems = await ItemServices.getItems(id);

      setItems(resItems.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await ItemServices.updateItem(id, data);

      const resItems = await ItemServices.getItems(id);
      setItems(resItems.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResolved = async (data) => {
    try {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === data ? { ...item, resolved: !item.resolved } : item
        )
      );

      await ItemServices.setItemResolved(id, data);

      const resItems = await ItemServices.getItems(id);
      setItems(resItems.data);
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

  const handleInvite = async (userId) => {
    console.log("Inviting user with ID:", userId);
    try {
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        memberList: [...prevShoppingList.memberList, userId],
      }));

      await ShoppingListServices.inviteUser(id, userId);

      const res = await ShoppingListServices.getShoppingList(id);
      setShoppingList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (userId) => {
    try {
      setShoppingList((prevShoppingList) => ({
        ...prevShoppingList,
        memberList: prevShoppingList.memberList.filter(
          (member) => member !== userId
        ),
      }));

      await ShoppingListServices.removeUser(id, userId);

      const res = await ShoppingListServices.getShoppingList(id);
      setShoppingList(res.data);
    } catch (error) {
      console.error("Error removing user:", error);
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
        <div>
          <ItemDetailToolBar
            shoppingList={shoppingList}
            loggedInUser={loggedInUser}
            handleAdd={handleAdd}
            handleInvite={handleInvite}
            handleRemove={handleRemove}
            user={user}
          />
          <div style={gridContainerStyle}>
            <ItemDetailCard
              filteredItems={filteredItems}
              shoppingList={shoppingList}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
              handleResolved={handleResolved}
            />
            <UserCard shoppingList={shoppingList} />
            <ItemChart items={items} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </ItemDetailContext.Provider>
  );
}

const gridContainerStyle = {
  display: "grid",
  padding: "10px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  maxWidth: "1200px",
  margin: "0 auto",
};

export default ItemDetailProvider;
