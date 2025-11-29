import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useLoggedUser } from "@components/user/user-provider.jsx";

export function Auth({ requiredRoles }) {
  const { loggedUser } = useLoggedUser();

  if (!loggedUser) return <Navigate to="/" replace />;
  if (!requiredRoles.includes(loggedUser.role)) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
