import Icon from "@mdi/react";
import { mdiArchive, mdiDelete, mdiPencilBox } from "@mdi/js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "react-bootstrap/esm/Button.js";
import Card from "react-bootstrap/Card";
import NameChangeForm from "./ChangeNameForm";
import DeleteConfirmation from "../Form/DeleteConfirmation";

function OverviewCard({
  shoppingList,
  handleNameChange,
  handleArchive,
  handleDelete,
  loggedInUser,
}) {
  const navigate = useNavigate();
  const [showNameChangeForm, setShowNameChangeForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const isOwner = shoppingList.owner === loggedInUser.id;

  return (
    <Card style={{ width: "22rem" }}>
      <div
        onClick={() => {
          navigate(`/listDetail/${shoppingList._id}`);
        }}
        style={{ cursor: "pointer" }}
      >
        <Card.Body>
          <h2>{shoppingList.name}</h2>
          <p
            style={{
              display: "grid",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {shoppingList.description}
          </p>
          <div
            style={{
              display: "flex",
              gap: "2px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isOwner && (
              <Button
                size={"sm"}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNameChangeForm(true);
                }}
              >
                <Icon path={mdiPencilBox} size={1} />
              </Button>
            )}

            <Button
              size={"sm"}
              onClick={(e) => {
                e.stopPropagation();
                handleArchive(shoppingList);
              }}
            >
              <Icon path={mdiArchive} size={1} />
            </Button>
            {isOwner && (
              <Button
                size={"sm"}
                variant="danger"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteConfirmation(true);
                }}
              >
                <Icon path={mdiDelete} size={1} />
              </Button>
            )}
          </div>
        </Card.Body>
      </div>
      <NameChangeForm
        show={showNameChangeForm}
        handleClose={() => setShowNameChangeForm(false)}
        data={shoppingList}
        handlerMap={{
          updateName: (newName, newDescription) =>
            handleNameChange({
              id: shoppingList._id,
              name: newName,
              description: newDescription,
            }),
        }}
      />

      <DeleteConfirmation
        show={showDeleteConfirmation}
        handleClose={() => setShowDeleteConfirmation(false)}
        data={shoppingList}
        handleDelete={(id) => handleDelete(id)}
      />
    </Card>
  );
}

export default OverviewCard;
