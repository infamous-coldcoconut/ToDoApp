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
      description: "Ahoj",
      isActive: true,
      owner: "1",
      memberList: ["2"],
    },
    {
      id: "fs02",
      name: "second shoppingList",
      description: "Ahoj2",
      isActive: false,
      owner: "1",
      memberList: ["2", "3"],
    },
    {
      id: "fs03",
      name: "third shoppingList",
      description: "Ahoj2",
      isActive: false,
      owner: "3",
      memberList: "Ahoj2",
    },
    {
      id: "fs04",
      name: "forth shoppingList",
      description: "Ahoj2",
      isActive: true,
      owner: "3",
      memberList: ["1"],
    },
  ]);

  // function handleCreate() {
  //   setListOverviewCard((current) => {
  //     const newList = {
  //       id: Math.random().toString(),
  //       name: "New List",
  //       description: "",
  //       isActive: true,
  //       owner: loggedInUser,
  //       memberList: [],
  //       itemList: [],
  //     };
  //     return [...current, newList];
  //   });
  // }

  function handleCreate(dtoIn) {
    setListOverviewCard((current) => {
      return [...current, dtoIn]; // Directly add the new list passed from the form
    });
  }

  function handleArchive(dtoIn) {
    setListOverviewCard((current) => {
      const itemIndex = current.findIndex((item) => item.id === dtoIn.id);
      current[itemIndex] = { ...current[itemIndex], isActive: false };
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
          item.isActive === true &&
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
        loggedInUser={loggedInUser}
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
