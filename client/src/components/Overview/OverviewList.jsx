import OverviewCard from "./OverviewCard";
import Container from "react-bootstrap/esm/Container";

function OverviewList({
  OverviewList,
  handleArchive,
  handleDelete,
  handleNameChange,
  loggedInUser,
}) {
  return (
    <Container>
      <div style={gridContainerStyle}>
        {OverviewList.map((shoppingList) => (
          <OverviewCard
            key={shoppingList._id}
            shoppingList={shoppingList}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleNameChange={handleNameChange}
            loggedInUser={loggedInUser}
          />
        ))}
      </div>
    </Container>
  );
}
const gridContainerStyle = {
  display: "grid",
  padding: "20px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  maxWidth: "960px",
  margin: "0 auto",
};

export default OverviewList;
