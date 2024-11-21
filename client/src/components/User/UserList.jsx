import Container from "react-bootstrap/esm/Container";
import UserCard from "./UserCard";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { UserContext } from "../User/UserProvider";
import { ItemDetailContext } from "../ListDetail/ItemDetailProvider";

function UserList({ currentUserId }) {
  const { userMap } = useContext(UserContext);
  const { data } = useContext(ItemDetailContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const listId = queryParams.get("id");
  console.log(data);
  const selectedList = data.find((list) => list.id === listId);

  return (
    <Container>
      <div style={gridContainerStyle}>
        <UserCard
          memberList={selectedList.memberList || []}
          userMap={userMap}
          currentUserId={currentUserId}
        />
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

export default UserList;
