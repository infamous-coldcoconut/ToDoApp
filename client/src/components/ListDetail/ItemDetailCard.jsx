import Card from "react-bootstrap/Card";

function ItemDetailCard({
  filteredItems,
  shoppingList,
  handleUpdate,
  handleDelete,
  handleResolved,
}) {
  // const handleCheckboxChange = (itemId) => {
  //   toggleItemStatus(shoppingList.id, itemId);
  // };

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Card style={{ width: "30 rem" }}>
        <div>
          <Card.Body>
            <h1>{shoppingList.name}</h1>
            <div
              style={{
                display: "grid",
                gap: "2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {filteredItems.map((item) => (
                <div key={item._id}>
                  <input
                    type="checkbox"
                    checked={item.resolved || false}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  {item.name}
                </div>
              ))}
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
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

export default ItemDetailCard;
