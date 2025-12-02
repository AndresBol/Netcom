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
  Chip,
  Avatar,
  Paper,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
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
        <Box
          sx={{
            width: 380,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2.5,
              background: "linear-gradient(135deg, #1d5b79 0%, #5ac5d7 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}
            >
              <NotificationsIcon sx={{ fontSize: 28 }} />
              <Typography variant="h5" fontWeight="600">
                Notifications
              </Typography>
            </Box>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} unread`}
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  fontWeight: "500",
                  backdropFilter: "blur(10px)",
                }}
              />
            )}
          </Box>

          {/* Notifications List */}
          <List sx={{ flexGrow: 1, overflow: "auto", p: 1 }}>
            {notifications.length === 0 ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  py: 8,
                }}
              >
                <MailIcon
                  sx={{ fontSize: 64, color: "text.disabled", mb: 2 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  fontWeight="500"
                >
                  No notifications yet
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  You're all caught up!
                </Typography>
              </Box>
            ) : (
              notifications.map((notification, index) => (
                <React.Fragment key={notification.id || index}>
                  <Paper
                    elevation={notification.is_read ? 0 : 2}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      border: notification.is_read
                        ? "1px solid rgba(0, 0, 0, 0.08)"
                        : "2px solid",
                      borderColor: notification.is_read
                        ? "divider"
                        : "primary.main",
                      backgroundColor: notification.is_read
                        ? "background.paper"
                        : "rgba(102, 126, 234, 0.04)",
                      "&:hover": {
                        transform: "translateX(4px)",
                        boxShadow: 3,
                        cursor: "pointer",
                      },
                    }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <ListItem
                      sx={{
                        py: 1.5,
                        px: 2,
                        position: "relative",
                      }}
                    >
                      {/* Unread indicator dot */}
                      {!notification.is_read && (
                        <Box
                          sx={{
                            position: "absolute",
                            left: 8,
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        >
                          <FiberManualRecordIcon
                            sx={{
                              fontSize: 12,
                              color: "primary.main",
                              animation: "pulse 2s infinite",
                              "@keyframes pulse": {
                                "0%, 100%": { opacity: 1 },
                                "50%": { opacity: 0.5 },
                              },
                            }}
                          />
                        </Box>
                      )}

                      {/* Avatar with icon */}
                      <Avatar
                        sx={{
                          mr: 1.5,
                          ml: notification.is_read ? 0 : 2,
                          bgcolor: notification.is_read
                            ? "grey.300"
                            : "primary.main",
                          width: 40,
                          height: 40,
                        }}
                      >
                        {notification.is_read ? (
                          <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <MailIcon sx={{ fontSize: 20 }} />
                        )}
                      </Avatar>

                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: notification.is_read ? 500 : 700,
                                color: notification.is_read
                                  ? "text.primary"
                                  : "primary.dark",
                                fontSize: "0.95rem",
                              }}
                            >
                              {notification.subject}
                            </Typography>
                            {!notification.is_read && (
                              <Chip
                                label="NEW"
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.65rem",
                                  fontWeight: "700",
                                  backgroundColor: "primary.main",
                                  color: "white",
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 0.5 }}>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                mb: 0.5,
                                lineHeight: 1.4,
                              }}
                            >
                              {notification.body}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: notification.is_read
                                  ? "text.disabled"
                                  : "primary.main",
                                fontWeight: notification.is_read ? 400 : 500,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              {new Date(notification.created_at).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </Paper>
                </React.Fragment>
              ))
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
