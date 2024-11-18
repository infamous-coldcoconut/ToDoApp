import Card from "react-bootstrap/Card";
import { UserContext } from "../User/UserProvider";
import { useState } from "react";

function ItemDetailCard({ shoppingList, itemList, toggleItemStatus }) {
  const handleCheckboxChange = (itemId) => {
    toggleItemStatus(shoppingList.id, itemId);
  };

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
              {itemList.map((item) => (
                <div key={item.id}>
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

      {/* <Card style={{ width: "30 rem" }}>
        <div>
          <Card.Body>
            <h1>User</h1>
            <div
              style={{
                display: "grid",
                gap: "2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {user.map((user) => (
                <div key={user.id}>{user.name}</div>
              ))}
            </div>
          </Card.Body>
        </div>
      </Card> */}
    </div>
  );
}

export default ItemDetailCard;