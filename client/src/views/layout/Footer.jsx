import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  Button,
  Tooltip,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import NotificationService from "@services/notification.js";

export function Footer() {
  const { t } = useTranslation();
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

          // Count unread notifications (is_read === false or is_read === 0)
          const unread = sortedNotifications.filter(
            (n) => n.is_read === false || n.is_read === 0 || n.is_read === "0"
          ).length;
          setUnreadCount(unread);
        })
        .catch((error) => {
          console.error("Error fetching notifications:", error);
        });
    }
  };

  useEffect(() => {
    fetchNotifications();

    // Poll for new notifications every 5 seconds (instead of 30)
    const interval = setInterval(fetchNotifications, 5000);
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

  const handleMarkAsRead = (notification, event) => {
    event.stopPropagation();
    if (
      notification.is_read === false ||
      notification.is_read === 0 ||
      notification.is_read === "0"
    ) {
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
            {t("footer.projectCode")}
          </Typography>
          <Typography align="center" color="secondary.main" variant="body1">
            {`${new Date().getFullYear()}`}
          </Typography>
        </Box>
        <Typography align="center" color="secondary.main" variant="body1">
          {t("footer.credits")}
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
                {t("footer.notifications")}
              </Typography>
            </Box>
            {unreadCount > 0 && (
              <Chip
                label={t("footer.unread", { count: unreadCount })}
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
                  {t("footer.noNotifications")}
                </Typography>
                <Typography variant="body2" color="text.disabled">
                  {t("footer.allCaughtUp")}
                </Typography>
              </Box>
            ) : (
              notifications.map((notification, index) => (
                <React.Fragment key={notification.id || index}>
                  <Paper
                    elevation={
                      notification.is_read === false ||
                      notification.is_read === 0 ||
                      notification.is_read === "0"
                        ? 2
                        : 0
                    }
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      border:
                        notification.is_read === false ||
                        notification.is_read === 0 ||
                        notification.is_read === "0"
                          ? "2px solid"
                          : "1px solid rgba(0, 0, 0, 0.08)",
                      borderColor:
                        notification.is_read === false ||
                        notification.is_read === 0 ||
                        notification.is_read === "0"
                          ? "#1d5b79"
                          : "divider",
                      backgroundColor:
                        notification.is_read === false ||
                        notification.is_read === 0 ||
                        notification.is_read === "0"
                          ? "rgba(29, 91, 121, 0.08)"
                          : "background.paper",
                      "&:hover": {
                        transform: "translateX(4px)",
                        boxShadow: 3,
                      },
                    }}
                  >
                    <ListItem
                      sx={{
                        py: 1.5,
                        px: 2,
                        position: "relative",
                        display: "flex",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* Unread indicator dot */}
                      {(notification.is_read === false ||
                        notification.is_read === 0 ||
                        notification.is_read === "0") && (
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
                              color: "#1d5b79",
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
                          ml:
                            notification.is_read === false ||
                            notification.is_read === 0 ||
                            notification.is_read === "0"
                              ? 2
                              : 0,
                          bgcolor:
                            notification.is_read === false ||
                            notification.is_read === 0 ||
                            notification.is_read === "0"
                              ? "#1d5b79"
                              : "grey.300",
                          width: 40,
                          height: 40,
                        }}
                      >
                        {notification.is_read === false ||
                        notification.is_read === 0 ||
                        notification.is_read === "0" ? (
                          <MailIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <CheckCircleOutlineIcon sx={{ fontSize: 20 }} />
                        )}
                      </Avatar>

                      <ListItemText
                        sx={{
                          mr: 0.5,
                          flex: "1 1 auto",
                          minWidth: 0,
                        }}
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight:
                                  notification.is_read === false ||
                                  notification.is_read === 0 ||
                                  notification.is_read === "0"
                                    ? 700
                                    : 500,
                                color:
                                  notification.is_read === false ||
                                  notification.is_read === 0 ||
                                  notification.is_read === "0"
                                    ? "#1d5b79"
                                    : "text.primary",
                                fontSize: "0.95rem",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "180px",
                              }}
                            >
                              {notification.subject}
                            </Typography>
                            {(notification.is_read === false ||
                              notification.is_read === 0 ||
                              notification.is_read === "0") && (
                              <Chip
                                label="UNREAD"
                                size="small"
                                sx={{
                                  height: 18,
                                  fontSize: "0.65rem",
                                  fontWeight: "700",
                                  backgroundColor: "#5ac5d7",
                                  color: "white",
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <Box
                            component="span"
                            sx={{ mt: 0.5, display: "block" }}
                          >
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                mb: 0.5,
                                lineHeight: 1.4,
                              }}
                            >
                              {notification.body}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              sx={{
                                color:
                                  notification.is_read === false ||
                                  notification.is_read === 0 ||
                                  notification.is_read === "0"
                                    ? "#1d5b79"
                                    : "text.disabled",
                                fontWeight:
                                  notification.is_read === false ||
                                  notification.is_read === 0 ||
                                  notification.is_read === "0"
                                    ? 500
                                    : 400,
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

                      {/* Mark as Read Button */}
                      {(notification.is_read === false ||
                        notification.is_read === 0 ||
                        notification.is_read === "0") && (
                        <Tooltip title={t("footer.markAsRead")}>
                          <IconButton
                            size="small"
                            onClick={(e) => handleMarkAsRead(notification, e)}
                            sx={{
                              ml: 1,
                              color: "#1d5b79",
                              "&:hover": {
                                backgroundColor: "rgba(29, 91, 121, 0.1)",
                              },
                            }}
                          >
                            <MarkEmailReadIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
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
