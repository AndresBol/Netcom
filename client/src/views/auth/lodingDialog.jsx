import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
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
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const response = await UserService.login(email, password);
      if (response.data.success) {
        setLoggedUser(response.data.user);
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

  const openResetDialog = () => {
    setResetDialogOpen(true);
    setResetError("");
    setResetSuccess("");
  };

  const closeResetDialog = () => {
    setResetDialogOpen(false);
    setResetEmail("");
    setResetPassword("");
    setResetConfirmPassword("");
    setResetError("");
    setResetSuccess("");
    setResetLoading(false);
  };

  const handleResetPassword = async () => {
    setResetError("");
    setResetSuccess("");

    if (!resetEmail || !resetPassword || !resetConfirmPassword) {
      setResetError(t("auth.resetPasswordRequired"));
      return;
    }

    if (resetPassword !== resetConfirmPassword) {
      setResetError(t("form.passwordMismatch"));
      return;
    }

    setResetLoading(true);
    try {
      const response = await UserService.resetPassword(
        resetEmail,
        resetPassword
      );
      if (response?.data?.success) {
        setResetSuccess(t("auth.resetPasswordSuccess"));
        setTimeout(() => {
          closeResetDialog();
        }, 1500);
      } else {
        setResetError(response?.data?.message || t("auth.resetPasswordError"));
      }
    } catch (err) {
      setResetError(
        err?.response?.data?.message || t("auth.resetPasswordError")
      );
    } finally {
      setResetLoading(false);
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
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button size="small" onClick={openResetDialog}>
              {t("auth.forgotPassword")}
            </Button>
          </Box>
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
      <Dialog
        open={resetDialogOpen}
        onClose={closeResetDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{t("auth.resetPassword")}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="body2" color="text.secondary">
            {t("auth.resetPasswordDescription")}
          </Typography>
          <TextField
            label={t("fields.email")}
            type="email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
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
            label={t("auth.newPassword")}
            type="password"
            value={resetPassword}
            onChange={(e) => setResetPassword(e.target.value)}
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
          <TextField
            label={t("auth.confirmNewPassword")}
            type="password"
            value={resetConfirmPassword}
            onChange={(e) => setResetConfirmPassword(e.target.value)}
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
          {resetError && (
            <Typography color="error" variant="body2">
              {resetError}
            </Typography>
          )}
          {resetSuccess && (
            <Typography color="success.main" variant="body2">
              {resetSuccess}
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between" }}>
          <Button onClick={closeResetDialog} color="secondary">
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleResetPassword}
            disabled={resetLoading}
            variant="contained"
          >
            {resetLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              t("auth.resetPassword")
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
}
