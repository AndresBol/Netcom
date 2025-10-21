import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./components/home";
import { NewTicket } from "./views/ticket/new-ticket";
import { TicketIndex } from "./views/ticket/index";
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
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
