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
import { UserProvider } from "@components/user/user-provider";
import { Auth } from "@components/user/auth";
import Dashboard from "@views/graphics/dashboard";
import Logout from "@components/user/logout.jsx";
import LoginDialog from "@components/user/login-dialog.jsx";
import Unauthorized from "@components/user/unauthorized.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/unauthorized", element: <Unauthorized /> },
      { path: "/user/logout", element: <Logout /> },
      { path: "/ticket/new", element: <NewTicket /> },
      { path: "/ticket/:id", element: <TicketDetail /> },
      {
        path: "/ticket/index/:viewType",
        element: <TicketIndex />,
      },

      {
        element: <Auth requiredRoles={["Administrator"]} />,
        children: [
          { path: "/user/index", element: <UserIndex /> },
          { path: "/user/:id", element: <UserDetail /> },
          { path: "/user/new", element: <NewUser /> },

          { path: "/category/index", element: <CategoryIndex /> },
          { path: "/category/:id", element: <CategoryDetail /> },
          { path: "/category/new", element: <NewCategory /> },
          {
            path: "/graphics/dashboard",
            element: <Dashboard/>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
