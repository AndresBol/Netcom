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
    if (loggedUser?.token) {
      try {
        const decoded = jwtDecode(loggedUser.token);
        console.log("JWT decodificado:", decoded);   
      } catch (err) {
        console.error("Error decodificando token:", err);
      }
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
  if (!context) throw new Error("useLoggedUser debe usarse dentro de UserProvider");
  return context;
}
