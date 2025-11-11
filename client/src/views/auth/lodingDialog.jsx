import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import UserService from "@services/user";
import { useLoggedUser } from "@contexts/UserContext";
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


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
        onClose();
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
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          backgroundColor: "#fafafa",
          boxShadow: "0 6px 24px rgba(0,0,0,0.1)",
          minWidth: 360,
        },
      }}
    >
      <DialogContent>
   
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src="/netcom-imagotipo.png"
            alt="Logo"
            sx={{ width: 80, height: 80, mb: 1 }}
          />
          <Typography variant="h6" fontWeight="bold" color="primary">
            Bienvenido a Netcom
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Inicia sesión con tu cuenta
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <MailOutlineIcon color="action"/>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
              InputProps={{
              startAdornment:(
                <InputAdornment position="start">
                  <LockOutlineIcon color="action"/>
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>


      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancelar
        </Button>
        <Button
          onClick={handleLogin}
          variant="contained"
          disabled={loading}
          sx={{
            minWidth: 120,
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "primary.dark" },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Ingresar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
