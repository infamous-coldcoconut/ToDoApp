import Icon from "@mdi/react";
import {
  mdiPencilPlus,
  mdiAccountPlus,
  mdiAccountRemove,
  mdiFilter,
} from "@mdi/js";
import Button from "react-bootstrap/Button";
import { useState, useContext } from "react";

import { useLocation } from "react-router-dom";

import AddItemForm from "../Form/AddItemForm";
import AddForm from "./AddForm";
import RemoveForm from "./RemoveForm";
import { UserContext } from "../User/UserProvider";
import { ItemDetailContext } from "./ItemDetailProvider";

function ItemDetailToolBar({
  // isUserOwner,
  handleAddItem,
  handleAddMember,
  handleRemoveMember,
  handleSelfRemove,
  setShowResolved,
  shoppingList,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const { userList, loggedInUser } = useContext(UserContext);

  const { isUserOwner } = useContext(ItemDetailContext);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const listId = params.get("id");
  const selectedList = isUserOwner(listId);
  const isOwner = selectedList?.owner === loggedInUser;

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
      <Button onClick={() => setShowAddItemModal(true)} variant="primary">
        <Icon path={mdiPencilPlus} size={1} />
        Add item
      </Button>

      {isOwner && (
        <>
          <Button onClick={() => setShowAddModal(true)} variant="primary">
            <Icon path={mdiAccountPlus} size={1} />
            Add member
          </Button>
          <Button onClick={() => setShowRemoveModal(true)} variant="danger">
            <Icon path={mdiAccountRemove} size={1} />
            Remove member
          </Button>
        </>
      )}

      {!isOwner && (
        <Button onClick={() => handleSelfRemove(listId)} variant="danger">
          <Icon path={mdiAccountRemove} size={1} />
          Remove yourself from the list
        </Button>
      )}

      <Button
        variant="primary"
        onClick={() => {
          setShowResolved((current) => !current);
        }}
      >
        <Icon path={mdiFilter} size={1} />
        Filter
      </Button>

      {/* <AddForm
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        userList={userList}
        handlerMap={{
          addMember: (user) =>
            handleAddMember({ id: shoppingList.id, name: user }),
        }}
      /> */}

      <AddItemForm
        show={showAddItemModal}
        handleClose={() => setShowAddItemModal(false)}
        handlerMap={{
          addItem: (item) => handleAddItem(listId, item),
        }}
      />
      <AddForm
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        userList={userList}
        handlerMap={{
          addMember: (user) => handleAddMember(listId, user),
        }}
      />

      <RemoveForm
        show={showRemoveModal}
        handleClose={() => setShowRemoveModal(false)}
        userList={userList}
        handlerMap={{
          removeMember: (user) => handleRemoveMember(listId, user),
        }}
      />
    </div>
  );
}

export default ItemDetailToolBar;
