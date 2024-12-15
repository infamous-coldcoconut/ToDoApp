import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import Landing from "./Landing.jsx";

import * as React from "react";
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NoPage from "./NoPage.jsx";

import UserProvider from "./components/User/UserProvider.jsx";
import OverviewProvider from "./components/Overview/OverviewProvider.jsx";
import ItemDetailProvider from "./components/ListDetail/ItemDetailProvider.jsx";
import Login from "./components/Auth/login.jsx";
import Register from "./components/Auth/Register.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <OverviewProvider />,
      },
      {
        path: "listDetail/:id",
        element: <ItemDetailProvider />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
]);

ReactDom.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      {/* <ListDetailProvider> */}
      <RouterProvider router={router} />
      {/* </ListDetailProvider> */}
    </UserProvider>
  </StrictMode>
);
