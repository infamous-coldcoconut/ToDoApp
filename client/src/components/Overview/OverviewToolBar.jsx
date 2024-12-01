import Icon from "@mdi/react";
import { mdiFilter, mdiPlus } from "@mdi/js";
import Button from "react-bootstrap/esm/Button.js";
import Addlist from "../Form/AddList";
import { useState } from "react";

function OverviewToolBar({ handleCreate, setShowArchive, loggedInUser }) {
  const [showAddListModal, setShowAddListModal] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
      <Button variant="primary" onClick={() => setShowAddListModal(true)}>
        <Icon path={mdiPlus} size={1} />
        Create
      </Button>
      <Button
        variant="primary"
        onClick={() => setShowArchive((current) => !current)}
      >
        <Icon path={mdiFilter} size={1} />
        Filter
      </Button>

      <Addlist
        show={showAddListModal}
        handleClose={() => setShowAddListModal(false)}
        loggedInUser={loggedInUser}
        handlerMap={{ addList: handleCreate }}
      />
    </div>
  );
}
export default OverviewToolBar;
