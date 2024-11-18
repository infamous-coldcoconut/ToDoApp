import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import * as React from "react";
import * as ReactDom from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NoPage from "./NoPage.jsx";

import UserProvider from "./components/User/UserProvider.jsx";
import OverviewProvider from "./components/Overview/OverviewProvider.jsx";
import ListDetail from "./components/ListDetail/ItemDetail.jsx";
import ListDetailProvider from "./components/ListDetail/ItemDetailProvider.jsx";

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
        path: "/listDetail",
        // element: <ListDetailProvider />,
        element: (
          <ListDetailProvider>
            <ListDetail />
          </ListDetailProvider>
        ),
      },
    ],
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
