import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { AuthManager } from "@components/auth-manager";
import Button from "@mui/material/Button";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
                Home
              </Typography>
            </Box>
            <Button href="/ticket/index" color="secondary.main" variant="text">
              Tickets
            </Button>
            <Button href="/ticket/index" color="secondary.main" variant="text">
              Assignations
            </Button>
            <Button href="/user/index" color="secondary.main" variant="text">
              Technicians
            </Button>
            <Button
              href="/category/index"
              color="secondary.main"
              variant="text"
            >
              Categories
            </Button>
          </Box>
          <AuthManager />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
