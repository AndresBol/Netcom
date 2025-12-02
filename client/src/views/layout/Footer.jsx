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
  Badge,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import NotificationService from "@services/notification.js";

export function Footer() {
  const { loggedUser } = useLoggedUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = () => {
    if (loggedUser?.id) {
      NotificationService.getByUserId(loggedUser.id)
        .then((response) => {
          const sortedNotifications = response.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setNotifications(sortedNotifications);

          // Count unread notifications
          const unread = sortedNotifications.filter((n) => !n.is_read).length;
          setUnreadCount(unread);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [loggedUser]);

  useEffect(() => {
    if (drawerOpen && loggedUser?.id) {
      fetchNotifications();
    }
  }, [drawerOpen]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      NotificationService.markAsRead(notification.id)
        .then(() => {
          fetchNotifications();
        })
        .catch((error) => {
          console.error("Error marking notification as read:", error);
        });
    }
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
            <Badge badgeContent={unreadCount} color="error">
              <MailIcon />
            </Badge>
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
                <ListItem
                  button
                  onClick={() => handleNotificationClick(notification)}
                  sx={{
                    backgroundColor: notification.is_read
                      ? "transparent"
                      : "action.hover",
                    "&:hover": {
                      backgroundColor: "action.selected",
                    },
                  }}
                >
                  <ListItemText
                    primary={notification.subject}
                    primaryTypographyProps={{
                      fontWeight: notification.is_read ? "normal" : "bold",
                    }}
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
