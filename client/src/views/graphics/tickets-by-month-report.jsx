import { useState, useEffect, useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import TicketService from "@services/ticket";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TicketsByMonthReport() {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await TicketService.getAll();
        setTickets(response.data || []);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError(t("reports.failedToLoadTicketData"));
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const chartData = useMemo(() => {
    if (!tickets.length) return null;

    const currentYear = new Date().getFullYear();
    const monthCounts = Array(12).fill(0);

    tickets.forEach((ticket) => {
      if (!ticket.created_on) return;

      const date = new Date(ticket.created_on);
      const ticketYear = date.getFullYear();
      const month = date.getMonth();

      if (ticketYear === currentYear) {
        monthCounts[month]++;
      }
    });

    const monthLabels = [
      t("reports.january"),
      t("reports.february"),
      t("reports.march"),
      t("reports.april"),
      t("reports.may"),
      t("reports.june"),
      t("reports.july"),
      t("reports.august"),
      t("reports.september"),
      t("reports.october"),
      t("reports.november"),
      t("reports.december"),
    ];

    return {
      labels: monthLabels,
      datasets: [
        {
          label: t("reports.ticketsCreated"),
          data: monthCounts,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [tickets, t]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: t("reports.ticketsCreatedPerMonth", {
          year: new Date().getFullYear(),
        }),
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
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 275 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {t("reports.monthlyTickets")}
      </Typography>
      {chartData && <Bar data={chartData} options={options} />}
    </Box>
  );
}
