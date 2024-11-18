import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { UserContext } from "../User/UserProvider";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiToggleSwitchOffOutline,
  mdiToggleSwitch,
} from "@mdi/js";

function NavBar() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  };

  const { userList, loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState(loggedInUser);
  const handleSelectUser = (user) => {
    setLoggedInUser(user.id);
    setSelectedUser(user.name);
  };

  return (
    <div className={`App ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Navbar className="navbar bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">ToDoApp</Navbar.Brand>

          <Navbar.Collapse className="justify-content-end">
            <Nav className="ml-auto">
              <Navbar.Brand>
                <Icon
                  path={darkMode ? mdiToggleSwitchOffOutline : mdiToggleSwitch}
                  size={2}
                  onClick={toggleTheme}
                />
              </Navbar.Brand>
              <NavDropdown
                title={
                  selectedUser ? (
                    selectedUser
                  ) : (
                    <Icon path={mdiAccount} size={2} />
                  )
                }
                id="basic-nav-dropdown"
              >
                {userList.map((user) => (
                  <NavDropdown.Item
                    key={user.id}
                    onClick={() => handleSelectUser(user)}
                  >
                    {user.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
