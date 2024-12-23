import Icon from "@mdi/react";
import {
  mdiPencilPlus,
  mdiAccountPlus,
  mdiAccountRemove,
  mdiFilter,
} from "@mdi/js";
import Button from "react-bootstrap/Button";
import { useState } from "react";

import { useTranslation } from "react-i18next";

import AddItemForm from "../Form/AddItemForm";
import AddForm from "../Form/AddForm";
import RemoveForm from "../Form/RemoveForm";

function ItemDetailToolBar({
  shoppingList,
  user,
  loggedInUser,
  handleAdd,
  handleInvite,
  handleRemove,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const { t, i18n } = useTranslation();

  const isOwner = shoppingList.owner._id === loggedInUser.id;

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
      <Button onClick={() => setShowAddItemModal(true)} variant="primary">
        <Icon path={mdiPencilPlus} size={1} />
        {t("itemToolbar.add")}
      </Button>
      {isOwner && (
        <>
          <Button onClick={() => setShowAddModal(true)} variant="primary">
            <Icon path={mdiAccountPlus} size={1} />
            {t("itemToolbar.addmember")}
          </Button>
          <Button onClick={() => setShowRemoveModal(true)} variant="danger">
            <Icon path={mdiAccountRemove} size={1} />
            {t("itemToolbar.removemember")}
          </Button>
        </>
      )}
      {!isOwner && (
        <Button onClick={() => handleRemove(loggedInUser.id)} variant="danger">
          <Icon path={mdiAccountRemove} size={1} />
          {t("itemToolbar.removeuser")}
        </Button>
      )}
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
