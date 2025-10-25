import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  // Initialize state from localStorage if available
  const [loggedUser, setLoggedUserState] = useState(() => {
    const savedUser = localStorage.getItem("loggedUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // update both state and localStorage
  const setLoggedUser = (user) => {
    setLoggedUserState(user);
    if (user) {
      localStorage.setItem("loggedUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("loggedUser");
    }
  };

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useLoggedUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useLoggedUser must be used within UserProvider");
  }
  return context;
}
