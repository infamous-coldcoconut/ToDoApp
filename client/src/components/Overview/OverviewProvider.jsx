import { useState, useMemo, useContext } from "react";
import OverviewToolBar from "./OverviewToolBar";
import OverviewList from "./OverviewList";
import { UserContext } from "../User/UserProvider";

function OverviewProvider() {
  const [showArchive, setShowArchive] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const [listOverviewCard, setListOverviewCard] = useState([
    {
      id: "fs01",
      name: "First shoppingList",
      state: "active",
      owner: "1",
      memberList: ["2"],
    },
    {
      id: "fs02",
      name: "second shoppingList",
      state: "archived",
      owner: "1",
      memberList: ["2", "3"],
    },
    {
      id: "fs03",
      name: "third shoppingList",
      state: "active",
      owner: "3",
      memberList: [],
    },
    {
      id: "fs04",
      name: "forth shoppingList",
      state: "archived",
      owner: "3",
      memberList: ["1"],
    },
  ]);

  function handleCreate() {
    setListOverviewCard((current) => {
      const newList = {
        id: Math.random().toString(),
        name: "New List",
        state: "active",
        owner: loggedInUser,
        memberList: [],
        itemList: [],
      };
      return [...current, newList];
    });
  }

  function handleArchive(dtoIn) {
    setListOverviewCard((current) => {
      const itemIndex = current.findIndex((item) => item.id === dtoIn.id);
      current[itemIndex] = { ...current[itemIndex], state: "archived" };
      return current.slice();
    });
  }

  function handleDelete(dtoIn) {
    setListOverviewCard((current) => {
      const itemIndex = current.findIndex((item) => item.id === dtoIn.id);
      current.splice(itemIndex, 1);
      return current.slice();
    });
  }

  function handleNameChange(dtoIn) {
    setListOverviewCard((current) =>
      current.map((item) =>
        item.id === dtoIn.id ? { ...item, name: dtoIn.name } : item
      )
    );
  }

  const filteredToDoListList = useMemo(() => {
    if (showArchive) {
      return listOverviewCard.filter(
        (item) =>
          item.owner === loggedInUser || item.memberList?.includes(loggedInUser)
      );
    } else {
      return listOverviewCard.filter(
        (item) =>
          item.state === "active" &&
          (item.owner === loggedInUser ||
            item.memberList?.includes(loggedInUser))
      );
    }
  }, [showArchive, listOverviewCard, loggedInUser]);

  return (
    <>
      <OverviewToolBar
        handleCreate={handleCreate}
        showArchive={showArchive}
        setShowArchive={setShowArchive}
      />
      <OverviewList
        OverviewList={filteredToDoListList}
        handleArchive={handleArchive}
        handleDelete={handleDelete}
        handleNameChange={handleNameChange}
        currentUserId={loggedInUser}
      />
    </>
  );
}

export default OverviewProvider;
