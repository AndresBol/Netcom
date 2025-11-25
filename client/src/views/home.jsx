import React from "react";
import { useLoggedUser } from "@contexts/UserContext";
import { View } from "@components/view";
import { Box } from "@mui/material";
import { Title1, Title2, Title3 } from "@components/typography";
import Button from "@mui/material/Button";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { useTranslation } from "react-i18next";

export function Home() {
  const { loggedUser } = useLoggedUser();
  const { t } = useTranslation();

  return (
    <View
      styles={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundImage: "url(/network_banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, py: 4 }}>
          {loggedUser && (
            <Title1 color="white">
              {t("home.welcome", { name: loggedUser.name })}
            </Title1>
          )}
          <Title2 color="white">{t("home.title")}</Title2>
        </Box>
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title3 color="white">
            {loggedUser ? t("home.createTicket") : t("home.signInFirst")}
          </Title3>
          {loggedUser && (
            <Button
              href="/ticket/new"
              variant="contained"
              sx={{
                marginTop: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "white",
                backgroundColor: "#015171",
              }}
            >
              <PostAddIcon />
              {t("common.here")}
            </Button>
          )}
        </Box>
      </Box>

      <Title3>{t("home.poweredBy")}</Title3>
      <Box
        key={"netcom-logo"}
        component="img"
        src={"/netcom-imagotipo.png"}
        alt={""}
        sx={{
          width: "100%",
          maxHeight: 400,
          objectFit: "contain",
          mb: 2,
          borderRadius: 2,
        }}
      />
    </View>
  );
}
