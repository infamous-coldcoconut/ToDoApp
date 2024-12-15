import Card from "react-bootstrap/Card";

function UserCard({ shoppingList }) {
  if (!shoppingList) {
    return <div>Loading user data...</div>; // Optional loader message
  }
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
              {shoppingList.memberList && shoppingList.memberList.length > 0 ? (
                shoppingList.memberList.map((user) => (
                  <div key={user.id}>{user.name}</div>
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
