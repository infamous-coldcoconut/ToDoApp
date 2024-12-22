import { useState, useMemo, useContext, useEffect, createContext } from "react";
import OverviewToolBar from "./OverviewToolBar";
import OverviewList from "./OverviewList";
import { UserContext } from "../User/UserProvider";
import ShoppingListServices from "../Services/shoppingListServices";

export const OverviewContext = createContext();

function OverviewProvider() {
  const [showArchive, setShowArchive] = useState();
  const { loggedInUser } = useContext(UserContext);
  const [filterOption, setFilterOption] = useState("active");
  const [shoppingLists, setShoppingLists] = useState([]);

  useEffect(() => {
    console.log("kokot", loggedInUser);
    if (loggedInUser) {
      ShoppingListServices.getShoppingLists(loggedInUser.id)
        .then((res) => {
          setShoppingLists(res.data);
        })
        .catch((error) =>
          console.error("Error fetching shopping lists", error)
        );
    }
  }, [loggedInUser]);

  const filteredToDoListList = useMemo(() => {
    if (filterOption === "all") {
      return shoppingLists;
    } else if (filterOption === "active") {
      return shoppingLists.filter((list) => list.isActive === true);
    } else if (filterOption === "archived") {
      return shoppingLists.filter((list) => list.isActive === false);
    }
  }, [filterOption, shoppingLists]);

  const handleCreate = async (data) => {
    try {
      const res = await ShoppingListServices.createShoppingList(
        data,
        loggedInUser.id
      );
      setShoppingLists((prevLists) => [...prevLists, res.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleNameChange = async (data) => {
    console.log("Updating shopping list with ID:", data.id);
    try {
      await ShoppingListServices.updateShoppingList(
        data.id,
        { name: data.name, description: data.description },
        loggedInUser.id
      );
      ShoppingListServices.getShoppingLists(loggedInUser.id)
        .then((res) => {
          setShoppingLists(res.data);
        })
        .catch((error) =>
          console.error("Error fetching updated shopping lists", error)
        );
    } catch (error) {
      console.log(error);
    }
  };

  const handleArchive = async (data) => {
    try {
      await ShoppingListServices.toggleShoppingListStatus(
        data._id,
        loggedInUser.id
      );

      ShoppingListServices.getShoppingLists(loggedInUser.id)
        .then((res) => {
          setShoppingLists(res.data);
        })
        .catch((error) =>
          console.error("Error fetching updated shopping lists", error)
        );
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (data) => {
    try {
      await ShoppingListServices.deleteShoppingList(data, loggedInUser.id);
      ShoppingListServices.getShoppingLists(loggedInUser.id)
        .then((res) => {
          setShoppingLists(res.data);
        })
        .catch((error) =>
          console.error("Error fetching updated shopping lists", error)
        );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <OverviewToolBar
        handleCreate={handleCreate}
        showArchive={showArchive}
        setShowArchive={setShowArchive}
        loggedInUser={loggedInUser}
        filterOption={filterOption}
        setFilterOption={setFilterOption}
      />
      <OverviewList
        OverviewList={filteredToDoListList}
        handleNameChange={handleNameChange}
        handleDelete={handleDelete}
        handleArchive={handleArchive}
        loggedInUser={loggedInUser}
      />
    </>
  );
}

export default OverviewProvider;
