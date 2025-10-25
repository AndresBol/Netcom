import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import UserService from "@services/user";
import { useLoggedUser } from "@contexts/UserContext";

export function AuthManager() {
  const [users, setUsers] = useState([]);
  const { loggedUser, setLoggedUser } = useLoggedUser();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await UserService.getAll();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };
    loadUsers();
  }, []);

  async function updateUser(id) {
    try {
      const response = await UserService.getById(id);
      setLoggedUser(response.data);
      console.log("Selected User:", response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  }

  return (
    <FormControl sx={{ m: 1, minWidth: 90 }}>
      <InputLabel id="user-label" color="secondary.main">
        Log In
      </InputLabel>
      <Select
        labelId="user-label"
        id="user-select"
        value={loggedUser?.id}
        label="User"
        color="secondary.main"
        autoWidth
        onChange={(e) => updateUser(e.target.value)}
      >
        {users.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name} | {user.role_name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
