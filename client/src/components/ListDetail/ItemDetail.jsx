import ItemDetailProvider from "./ItemDetailProvider";
import UserProvider from "../User/UserProvider";
function ItemDetail() {
  return (
    <UserProvider>
      <ItemDetailProvider />
    </UserProvider>
  );
}

export default ItemDetail;
