import Container from "react-bootstrap/esm/Container";
import ItemDetailCard from "./ItemDetailCard";
import { useLocation } from "react-router-dom";

function ItemDetailList({ ItemList, currentUserId, toggleItemStatus }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const listId = queryParams.get("id");
  const filteredList = ItemList.filter((list) => list.id === listId);

  return (
    <Container>
      <div style={gridContainerStyle}>
        {filteredList.map((shoppingList) => (
          <ItemDetailCard
            key={shoppingList.id}
            shoppingList={shoppingList}
            itemList={shoppingList.itemList}
            toggleItemStatus={toggleItemStatus}
            currentUserId={currentUserId}
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

export default ItemDetailList;
