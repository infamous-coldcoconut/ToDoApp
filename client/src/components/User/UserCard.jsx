import Card from "react-bootstrap/Card";

function UserCard({ memberList, userMap }) {
  const users = memberList
    .map((userId) => {
      const userKey = `user${userId}`;
      return userMap[userKey];
    })
    .filter((user) => user !== undefined);
  console.log("hello", users);

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
              {users.map((user) => (
                <div key={user.id}>{user.name}</div>
              ))}
            </div>
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}

export default UserCard;
