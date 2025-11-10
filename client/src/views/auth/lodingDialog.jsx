import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import UserService from "@services/user";
import { useLoggedUser } from "@contexts/UserContext";

export default function LoginDialog({ open, onClose }) {
  const { setLoggedUser } = useLoggedUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await UserService.login(email, password);
      if (response.data.success) {
        setLoggedUser(response.data.user);
        onClose(); // cerrar modal
      } else {
        setError(response.data.message || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Iniciar sesión</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleLogin}
          variant="contained"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
