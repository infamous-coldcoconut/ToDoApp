import Card from "react-bootstrap/Card";

function UserCard({ shoppingList }) {
  return (
    <div style={{ display: "flex", gap: "20px", gridContainerStyle }}>
      <Card style={{ width: "20rem", height: "25rem" }}>
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
                <strong>Owner:</strong> {shoppingList.owner.name}
              </div>
              {shoppingList.memberList.length > 0 ? (
                shoppingList.memberList.map((user, index) => (
                  <div key={index}> {user.name}</div>
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

const gridContainerStyle = {
  display: "grid",
  padding: "20px",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "16px",
  maxWidth: "960px",
  margin: "0 auto",
};

export default UserCard;
