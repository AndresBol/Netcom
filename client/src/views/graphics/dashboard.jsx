import React from "react";
import { useLoggedUser } from "@components/user/user-provider.jsx";
import { View } from "@components/view";
import { Box } from "@mui/material";
import { Title1, Title2, Title3 } from "@components/typography";
import { useTranslation } from "react-i18next";

// IMPORT YOUR CHARTS
import TicketsByMonthReport from "@views/graphics/tickets-by-month-report.jsx";
import TicketsRatingReport from "@views/graphics/tickets-rating-report.jsx";
import TicketsSLAResponseReport from "@views/graphics/tickets-sla-response-report.jsx";
import TicketsSLAResolutionReport from "@views/graphics/tickets-sla-resolution-report.jsx";
import TicketsTechniciansRankingReport from "@views/graphics/tickets-technicians-ranking-report.jsx";
import CategoryBreachesReport from "@views/graphics/tickets-categories-breaches-report.jsx";

export default function Dashboard() {
  const { loggedUser } = useLoggedUser();
  const { t } = useTranslation();

  return (
    <View
      styles={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        width: "100%",
      }}
    >
      {/* HEADER BANNER */}
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
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 1,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 2, py: 4 }}>
          {loggedUser && (
            <Title1 color="white">Reports Dashboard - {loggedUser.name}</Title1>
          )}
          <Title2 color="white">General System Indicators</Title2>
        </Box>
      </Box>

      {/* CHARTS SECTION */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1200,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(550px, 1fr))",
          gap: 4,
          px: 2,
        }}
      >
        {/* CHART 1 */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            height: 380,
          }}
        >
          <TicketsByMonthReport />
        </Box>

        {/* CHART 2 */}
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            height: 380,
          }}
        >
          <TicketsRatingReport />
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            height: 380,
          }}
        >
          <TicketsSLAResponseReport />
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            height: 380,
          }}
        >
          <TicketsSLAResolutionReport />
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            height: 380,
          }}
        >
          <TicketsTechniciansRankingReport />
        </Box>

        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
            height: 380,
          }}
        >
          <CategoryBreachesReport />
        </Box>

        {/* MORE CHARTS CAN BE ADDED HERE */}
      </Box>

      {/* SUBTLE LOGO */}
      <Box
        component="img"
        src={"/netcom-imagotipo.png"}
        alt="Netcom Logo"
        sx={{
          width: 180,
          opacity: 0.5,
          mt: 4,
          mb: 2,
        }}
      />

      <Title3>Administrative Dashboard</Title3>
    </View>
  );
}
