import Icon from "@mdi/react";
import { mdiFilter, mdiPlus } from "@mdi/js";
import Button from "react-bootstrap/esm/Button.js";

function OverviewToolBar({ handleCreate, setShowArchive }) {
  return (
    <div style={{ display: "flex", justifyContent: "flex-start", gap: "10px" }}>
      <Button variant="primary" onClick={handleCreate}>
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
    </div>
  );
}
export default OverviewToolBar;
