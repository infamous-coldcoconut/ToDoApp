import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState("");
  const userMap = {
    user1: {
      id: "1",
      name: "Dan",
    },
    user2: {
      id: "2",
      name: "Pepa",
    },
    user3: {
      id: "3",
      name: "Jahoda",
    },
    user4: {
      id: "4",
      name: "Mango",
    },
  };

  const value = {
    userMap,
    userList: Object.keys(userMap).map((userId) => userMap[userId]),
    loggedInUser,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserProvider;
