import React, { createContext, useState, useContext, useMemo } from "react";
import ItemDetailToolBar from "./ItemDetailToolBar";
import ItemDetailList from "./ItemDetailList";
import { UserContext } from "../User/UserProvider";

export const ItemDetailContext = createContext();

function ItemDetailProvider() {
  const [showResolved, setShowResolved] = useState(false);
  const { loggedInUser } = useContext(UserContext);

  const [data, setLists] = useState([
    {
      id: "fs01",
      name: "First shoppingList",
      owner: "1",
      memberList: ["2", "3"],
      itemList: [
        {
          id: "item01",
          name: "první úkol",
          resolved: false,
        },
        {
          id: "item02",
          name: "druhý úkol",
          resolved: true,
        },
      ],
    },
    {
      id: "fs02",
      name: "Second shoppingList",
      owner: "1",
      memberList: ["2"],
      itemList: [
        {
          id: "item01",
          name: "první úkol",
          resolved: false,
        },
        {
          id: "item02",
          name: "druhý úkol",
          resolved: true,
        },
      ],
    },
  ]);

  // function isUserOwner(listId) {
  //   const list = data.find((list) => list.id === listId);
  //   return list?.owner === loggedInUser;
  // }

  const isUserOwner = (id) => {
    const list = data.find((list) => String(list.id) === String(id));
    return list;
  };

  function handleAddItem(listId, newItem) {
    setLists((prevData) =>
      prevData.map((list) =>
        list.id === listId
          ? { ...list, itemList: [...list.itemList, newItem] }
          : list
      )
    );
  }

  function toggleItemStatus(listId, itemId) {
    setLists((prevData) =>
      prevData.map((list) =>
        list.id === listId
          ? {
              ...list,
              itemList: list.itemList.map((item) =>
                item.id === itemId
                  ? { ...item, resolved: !item.resolved }
                  : item
              ),
            }
          : list
      )
    );
  }

  function handleAddMember(listId, memberId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, memberList: [...list.memberList, memberId] }
          : list
      )
    );
  }

  function handleRemoveMember(listId, memberId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              memberList: list.memberList.filter((id) => id !== memberId),
            }
          : list
      )
    );
  }

  function handleSelfRemove(listId) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? {
              ...list,
              memberList: list.memberList.filter((id) => id !== loggedInUser),
            }
          : list
      )
    );
  }

  const filteredItems = useMemo(
    () =>
      data.map((list) => ({
        ...list,
        itemList: list.itemList.filter((item) =>
          showResolved ? true : !item.resolved
        ),
      })),
    [showResolved, data]
  );

  // function updateMemberList(id, newMemberList) {
  //   setLists((prevLists) =>
  //     prevLists.map((list) =>
  //       list.id === id ? { ...list, memberList: newMemberList } : list
  //     )
  //   );
  // }

  return (
    <ItemDetailContext.Provider
      value={{
        filteredItems,
        handleAddItem,
        toggleItemStatus,
        handleAddMember,
        handleRemoveMember,
        showResolved,
        setShowResolved,
        isUserOwner,
      }}
    >
      <ItemDetailToolBar
        // isOwner={isUserOwner}
        shoppingList={data}
        handleAddItem={handleAddItem}
        handleAddMember={handleAddMember}
        handleRemoveMember={handleRemoveMember}
        handleSelfRemove={handleSelfRemove}
        ///////////
        showResolved={showResolved}
        setShowResolved={setShowResolved}
      />
      <ItemDetailList
        ItemList={filteredItems}
        toggleItemStatus={toggleItemStatus}
        currentUserId={loggedInUser}
      />
    </ItemDetailContext.Provider>
  );
}

export default ItemDetailProvider;
