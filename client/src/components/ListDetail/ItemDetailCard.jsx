import Card from "react-bootstrap/Card";

function ItemDetailCard({
  filteredItems,
  shoppingList,
  handleUpdate,
  handleDelete,
  handleResolved,
}) {
  const handleCheckboxChange = (itemId) => {
    handleResolved(itemId);
  };

  return (
    <div style={{ display: "grid" }}>
      <Card style={{ width: "20rem", height: "25rem" }}>
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
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={item.resolved || false}
                    onChange={() => handleCheckboxChange(item._id)}
                  />

                  <span
                    style={{
                      textDecoration: item.crossedOut ? "line-through" : "none",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default ItemDetailCard;
