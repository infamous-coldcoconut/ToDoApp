import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../User/UserProvider";
import Icon from "@mdi/react";
import {
  mdiAccount,
  mdiToggleSwitchOffOutline,
  mdiToggleSwitch,
} from "@mdi/js";

function NavBar() {
  const navigation = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const { loggedInUser } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("appUser");
    navigation("/login");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    const htmlElement = document.querySelector("html");
    htmlElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
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
              {loggedInUser ? (
                <NavDropdown
                  title={
                    loggedInUser.name || <Icon path={mdiAccount} size={1.2} />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <span>Please log in</span>
                  <Nav.Link onClick={() => navigation("/login")}>
                    Login
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>

          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
