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
import AddForm from "../Form/AddForm";
import RemoveForm from "../Form/RemoveForm";
import { UserContext } from "../User/UserProvider";
import { ItemDetailContext } from "./ItemDetailProvider";

function ItemDetailToolBar({
  shoppingList,
  user,
  loggedInUser,
  handleAdd,
  handleInvite,
  handleRemove,
  // handleSelfRemove,
  setShowResolved,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const listId = params.get("id");

  const isOwner = shoppingList.owner._id === loggedInUser.id;

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
      <AddForm
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        userList={user}
        handlerMap={{
          addMember: (userId) => {
            handleInvite(userId);
          },
        }}
      />
      <AddItemForm
        show={showAddItemModal}
        handleClose={() => setShowAddItemModal(false)}
        handlerMap={{
          addItem: (item) => handleAdd(item),
        }}
      />
      <RemoveForm
        show={showRemoveModal}
        handleClose={() => setShowRemoveModal(false)}
        userList={user}
        handlerMap={{
          removeMember: (userId) => {
            handleRemove(userId);
          },
        }}
      />
    </div>
  );
}

export default ItemDetailToolBar;
