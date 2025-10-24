import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./components/home";
import { NewTicket } from "./views/ticket/new";
import { TicketIndex } from "./views/ticket/index";
import { TicketDetail } from "./views/ticket/detail";
import { CategoryIndex } from "./views/category";
import { UserIndex } from "./views/user/index";
import { UserDetail } from "./views/user/detail";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/user/index",
        element: <UserIndex />,
      },

      {
        path: "/user/:id",
        element: <UserDetail />,
      },

      {
        path: "/ticket/new",
        element: <NewTicket />,
      },

      {
        path: "/ticket/:id",
        element: <TicketDetail />,
      },

      {
        path: "/ticket/index",
        element: <TicketIndex />,
      },

      {
        path: "/category/index",
        element: <CategoryIndex />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
