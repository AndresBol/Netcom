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
import { useLoggedUser } from "@components/user/user-provider.jsx"; 
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useTranslation } from "react-i18next";

export default function LoginDialog({ open, onClose }) {
  const { setLoggedUser } = useLoggedUser();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await UserService.login(email, password);
      const { success, token, user } = response.data;

      if (success) {
        
        setLoggedUser({ ...user, token });

      
        localStorage.setItem("loggedUser", JSON.stringify({ ...user, token }));

        onClose();
      } else {
        setError(response.data.message || t("auth.invalidCredentials"));
      }
    } catch (err) {
      setError(t("auth.serverError"));
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
            {t("auth.welcomeToNetcom")}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {t("auth.signInMessage")}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label={t("fields.email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label={t("fields.password")}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlineIcon color="action" />
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
          {t("common.cancel")}
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
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            t("auth.signIn")
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
