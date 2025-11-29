import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useLoggedUser } from "@components/user/user-provider";
import UserService from "@services/user";
import LoginDialog from "@components/user/login-dialog.jsx";
import LanguageSelector from "@components/language-selector";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { loggedUser, setLoggedUser } = useLoggedUser();
  const [openLogin, setOpenLogin] = React.useState(false);
  const { t } = useTranslation();

  const role = loggedUser?.role;

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
              alignItems: "center",
              gap: 5,
              flexGrow: 1,
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="home"
              href="/"
            >
              <HomeIcon />
            </IconButton>

            <Typography variant="h6" color="secondary.main">
              {t("header.home")}
            </Typography>

         
            {loggedUser && (
              <>
            
                {role === "Client" && (
                  <Button href="/ticket/index/by-user" color="secondary" variant="text">
                    {t("header.myTickets")}
                  </Button>
                )}

            
                {role === "Technician" && (
                  <>
                    <Button href="/ticket/index/by-user" color="secondary" variant="text">
                      {t("header.myTickets")}
                    </Button>
                    <Button href="/ticket/index/all" color="secondary" variant="text">
                      {t("header.allTickets")}
                    </Button>
                  </>
                )}

              
                {role === "Administrator" && (
                  <>
                    <Button href="/ticket/index/all" color="secondary" variant="text">
                      {t("header.allTickets")}
                    </Button>
                    <Button href="/user/index" color="secondary" variant="text">
                      {t("header.users")}
                    </Button>
                    <Button href="/category/index" color="secondary" variant="text">
                      {t("header.categories")}
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>


          <LanguageSelector />

        
          {loggedUser ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1">👤 {loggedUser.name}</Typography>
              <Button color="inherit" onClick={handleLogout}>
                {t("header.logout")}
              </Button>
            </Box>
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
