import { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TicketService from "@services/ticket";
import UserTicketService from "@services/user-ticket";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Checks if a ticket breached either response or resolution SLA
 */
function hasSlaBreach(ticket, firstAssignment) {
  let breached = false;

  // Check response SLA breach
  if (firstAssignment && ticket.response_time && ticket.created_on) {
    const created = new Date(ticket.created_on);
    const assigned = new Date(firstAssignment);
    const diffMinutes = (assigned - created) / (1000 * 60);
    if (diffMinutes > ticket.response_time) {
      breached = true;
    }
  }

  // Check resolution SLA breach
  if (ticket.notified_on && ticket.resolution_time && ticket.created_on) {
    const created = new Date(ticket.created_on);
    const resolved = new Date(ticket.notified_on);
    const diffMinutes = (resolved - created) / (1000 * 60);
    if (diffMinutes > ticket.resolution_time) {
      breached = true;
    }
  }

  return breached;
}

export default function CategoryBreachesReport() {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [ticketsRes, userTicketsRes] = await Promise.all([
          TicketService.getAll(),
          UserTicketService.getAll(),
        ]);

        setTickets(ticketsRes.data || []);
        setUserTickets(userTicketsRes.data || []);
      } catch (err) {
        console.error("Failed to load category breaches:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    // Create a map of ticket_id -> first assignment date
    const firstAssignmentMap = new Map();

    userTickets.forEach((ut) => {
      const ticketId = Number(ut.ticket_id);
      const assignedOn = ut.assigned_on ? new Date(ut.assigned_on) : null;

      if (!assignedOn) return;

      const existing = firstAssignmentMap.get(ticketId);
      if (!existing || assignedOn < existing) {
        firstAssignmentMap.set(ticketId, assignedOn);
      }
    });

    // Count breaches per category
    const categoryBreaches = new Map();

    tickets.forEach((ticket) => {
      const categoryName = ticket.category_name || "Unknown";
      const ticketId = Number(ticket.id);
      const firstAssignment = firstAssignmentMap.get(ticketId);

      if (hasSlaBreach(ticket, firstAssignment)) {
        categoryBreaches.set(
          categoryName,
          (categoryBreaches.get(categoryName) || 0) + 1
        );
      }
    });

    // Convert to array and sort by breach count
    const sortedData = Array.from(categoryBreaches.entries())
      .map(([category, breaches]) => ({ category, breaches }))
      .sort((a, b) => b.breaches - a.breaches);

    if (sortedData.length === 0) {
      return null;
    }

    return {
      labels: sortedData.map((item) => item.category),
      datasets: [
        {
          label: t("reports.slaBreaches"),
          data: sortedData.map((item) => item.breaches),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [tickets, userTickets]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t("reports.categoriesWithMostBreaches"),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 275,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 275,
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography color="error">
          {t("reports.failedToLoadData")}: {error}
        </Typography>
      </Box>
    );
  }

  if (!chartData) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 275,
        }}
      >
        <Typography>{t("reports.noBreachDataAvailable")}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 275 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {t("reports.categoriesWithMostBreaches")}
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}
