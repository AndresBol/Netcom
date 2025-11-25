import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/i18n";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./views/home";
import { NewTicket } from "./views/ticket/new";
import { TicketIndex } from "./views/ticket/index";
import { TicketDetail } from "./views/ticket/detail";
import { CategoryIndex } from "./views/category";
import { NewUser } from "./views/user/new";
import { UserIndex } from "./views/user/index";
import { UserDetail } from "./views/user/detail";
import { CategoryDetail } from "./views/category/detail";
import { NewCategory } from "./views/category/new";

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
        path: "/user/new",
        element: <NewUser />,
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
        path: "/ticket/index/:viewType",
        element: <TicketIndex />,
      },

      {
        path: "/category/new",
        element: <NewCategory />,
      },

      {
        path: "/category/:id",
        element: <CategoryDetail />,
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
