import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./components/home";
import { NewTicket } from "./views/ticket/new-ticket";
import { TicketIndex } from "./views/ticket/index";
import { TicketDetail } from "./views/ticket/ticket";
import { CategoryIndex } from "./views/category/categoryindex";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ticket/new",
        element: <NewTicket />,
      },
      {
        path: "/ticket/index",
        element: <TicketIndex />,
      },
      {
        path: "/ticket/:id",
        element: <TicketDetail />,
      },

         {
        path: "/category/index",
        element: <CategoryIndex/>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
