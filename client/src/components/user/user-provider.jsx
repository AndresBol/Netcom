import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "@contexts/user-context";
import { jwtDecode } from "jwt-decode";

export function UserProvider({ children }) {
  const [loggedUser, setLoggedUserState] = useState(() => {
    const savedUser = localStorage.getItem("loggedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const setLoggedUser = (user) => {
    setLoggedUserState(user);
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedUser");
    }
  };

  useEffect(() => {
    if (!loggedUser?.token) return;

    try {
      jwtDecode(loggedUser.token);
    } catch (err) {
      console.error("Invalid token detected, clearing session", err);
      setLoggedUser(null);
    }
  }, [loggedUser]);

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useLoggedUser() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useLoggedUser debe usarse dentro de UserProvider");
  return context;
}
