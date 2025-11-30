import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Toolbar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import NotificationService from "@services/notification.js";

export function Footer() {
  const { loggedUser } = useLoggedUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (drawerOpen && loggedUser?.id) {
      NotificationService.getByUserId(loggedUser.id)
        .then((response) => {
          const sortedNotifications = response.data.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setNotifications(sortedNotifications);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  }, [drawerOpen, loggedUser]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <Toolbar
        sx={{
          px: 2,
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: "4.5rem",
          backgroundColor: "primary.main",
          zIndex: 1200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1,
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="MailIcon"
            onClick={toggleDrawer}
          >
            <MailIcon />
          </IconButton>
          <Typography align="center" color="white" variant="subtitle1">
            ISW-613
          </Typography>
          <Typography align="center" color="secondary.main" variant="body1">
            {`${new Date().getFullYear()}`}
          </Typography>
        </Box>
        <Typography align="center" color="secondary.main" variant="body1">
          Netcom SA
        </Typography>
      </Toolbar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List sx={{ width: 300 }}>
          {notifications.length === 0 ? (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          ) : (
            notifications.map((notification, index) => (
              <React.Fragment key={notification.id || index}>
                <ListItem>
                  <ListItemText
                    primary={notification.subject}
                    secondary={
                      <>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          component="span"
                        >
                          {notification.body}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(notification.created_at).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
          )}
        </List>
      </Drawer>
    </>
  );
}
