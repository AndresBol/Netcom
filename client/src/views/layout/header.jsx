import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useLoggedUser } from "@contexts/UserContext";
import UserService from "@services/user";
import LoginDialog from "@views/auth/lodingDialog";
import LanguageSelector from "@components/language-selector";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const [openLogin, setOpenLogin] = React.useState(false);
  const { t } = useTranslation();

  const handleLogin = () => setOpenLogin(true);

  const handleClose = () => setOpenLogin(false);

  const handleLogout = async () => {
    try {
      await UserService.logout();
      setLoggedUser(null);
      localStorage.removeItem("loggedUser");
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  console.log("Usuario logeado:", loggedUser);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
              gap: 5,
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="secondary.main"
                aria-label="menu"
                href="/"
              >
                <HomeIcon />
              </IconButton>
              <Typography variant="h6" color="secondary.main">
                {t("header.home")}
              </Typography>
            </Box>

            {loggedUser?.role && (
              <>
                {(loggedUser.role === "Client" ||
                  loggedUser.role === "Technician") && (
                  <Button
                    href="/ticket/index/by-user"
                    color="secondary.main"
                    variant="text"
                  >
                    {t("header.myTickets")}
                  </Button>
                )}

                {(loggedUser.role === "Administrator" ||
                  loggedUser.role === "Technician") && (
                  <Button
                    href="/ticket/index/all"
                    color="secondary.main"
                    variant="text"
                  >
                    {t("header.allTickets")}
                  </Button>
                )}

                {loggedUser.role === "Administrator" && (
                  <>
                    <Button
                      href="/user/index"
                      color="secondary.main"
                      variant="text"
                    >
                      {t("header.users")}
                    </Button>
                    <Button
                      href="/category/index"
                      color="secondary.main"
                      variant="text"
                    >
                      {t("header.categories")}
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
          <LanguageSelector />
          {loggedUser ? (
            <>
              <Typography variant="body1">👤 {loggedUser.name}</Typography>

              <Button color="inherit" onClick={handleLogout}>
                {t("header.logout")}
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogin}>
              {t("header.login")}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <LoginDialog open={openLogin} onClose={handleClose} />
    </Box>
  );
}
