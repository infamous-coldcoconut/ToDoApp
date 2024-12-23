import Icon from "@mdi/react";
import { mdiFilter, mdiPlus } from "@mdi/js";
import Button from "react-bootstrap/esm/Button.js";
import Dropdown from "react-bootstrap/Dropdown";
import Addlist from "../Form/AddList";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function OverviewToolBar({
  handleCreate,
  showArchive,
  setShowArchive,
  loggedInUser,
  filterOption,
  setFilterOption,
}) {
  const [showAddListModal, setShowAddListModal] = useState(false);
  const { t, i18n } = useTranslation();

  const handleFilterSelect = (selected) => {
    setFilterOption(selected);
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
      <Button variant="primary" onClick={() => setShowAddListModal(true)}>
        <Icon path={mdiPlus} size={1} />
        {t("overviewToolbar.create")}
      </Button>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {t(`overviewToolbar.${filterOption}`)}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleFilterSelect("all")}>
            {t("overviewToolbar.all")}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterSelect("active")}>
            {t("overviewToolbar.active")}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFilterSelect("archived")}>
            {t("overviewToolbar.archived")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
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
