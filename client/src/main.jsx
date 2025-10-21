import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Home } from "./components/home";
import { NewTicket } from "./views/ticket/new-ticket";
import { TicketDetail } from "./views/ticket/ticket-detail";


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
        path: "/ticket/:id",
        element: <TicketDetail/>,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
