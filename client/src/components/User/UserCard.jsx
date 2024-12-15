import Card from "react-bootstrap/Card";

function UserCard({ shoppingList }) {
  console.log("Member List:", shoppingList.memberList);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Card style={{ width: "30 rem" }}>
        <div>
          <Card.Body>
            <h1>Users</h1>
            <div
              style={{
                display: "grid",
                gap: "2px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <strong>Owner:</strong> {shoppingList.owner}
              </div>
              {shoppingList.memberList.length > 0 ? (
                shoppingList.memberList.map((user, index) => (
                  <div key={index}>{user.name}</div>
                ))
              ) : (
                <div>No members</div>
              )}
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default UserCard;
