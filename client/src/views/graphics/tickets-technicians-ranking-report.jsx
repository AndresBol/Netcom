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
import UserTicketService from "@services/user-ticket";
import UserService from "@services/user";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RESOLVED_STATUS_IDS = [4, 5]; // 4 = Resolved, 5 = Closed

export default function TicketsTechniciansRankingReport() {
  const { t } = useTranslation();
  const [tickets, setTickets] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [ticketsRes, userTicketsRes, usersRes] = await Promise.all([
          TicketService.getAll(),
          UserTicketService.getAll(),
          UserService.getAll(),
        ]);

        setTickets(ticketsRes.data || []);
        setUserTickets(userTicketsRes.data || []);

        // Filter to get only technicians (role_id = 2)
        const techs = (usersRes.data || []).filter(
          (user) => Number(user.role_id) === 2
        );
        setTechnicians(techs);
      } catch (err) {
        console.error("Error loading technician ratings:", err);
        setError(t("reports.failedToLoadTechnicianRatings"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (!technicians.length) return null;

    const resolvedTicketsWithRatings = tickets.filter((ticket) => {
      const statusId = Number(ticket.status_id);
      const rating = parseInt(ticket.rating, 10);
      return (
        RESOLVED_STATUS_IDS.includes(statusId) && rating >= 1 && rating <= 5
      );
    });

    const ticketMap = new Map();
    resolvedTicketsWithRatings.forEach((ticket) => {
      ticketMap.set(Number(ticket.id), ticket);
    });

    const technicianRatings = new Map();
    technicians.forEach((tech) => {
      technicianRatings.set(Number(tech.id), { totalRating: 0, count: 0 });
    });

    const ticketsTechCounted = new Map();

    userTickets.forEach((ut) => {
      const techId = Number(ut.user_id);
      const ticketId = Number(ut.ticket_id);

      if (!technicianRatings.has(techId)) return;

      const ticket = ticketMap.get(ticketId);
      if (!ticket) return;

      const countKey = `${techId}-${ticketId}`;
      if (ticketsTechCounted.has(countKey)) return;
      ticketsTechCounted.set(countKey, true);

      const rating = parseInt(ticket.rating, 10);
      const techData = technicianRatings.get(techId);
      techData.totalRating += rating;
      techData.count++;
    });

    const labels = [];
    const values = [];
    const backgroundColors = [];

    technicians.forEach((tech) => {
      const data = technicianRatings.get(Number(tech.id));
      const avgRating =
        data.count > 0 ? (data.totalRating / data.count).toFixed(2) : 0;

      labels.push(`${tech.name} (${data.count})`);
      values.push(parseFloat(avgRating));

      const rating = parseFloat(avgRating);
      if (rating >= 4) {
        backgroundColors.push("rgba(75, 192, 192, 0.6)");
      } else if (rating >= 3) {
        backgroundColors.push("rgba(255, 205, 86, 0.6)");
      } else if (rating > 0) {
        backgroundColors.push("rgba(255, 99, 132, 0.6)");
      } else {
        backgroundColors.push("rgba(201, 203, 207, 0.6)");
      }
    });

    return {
      labels,
      datasets: [
        {
          label: t("reports.averageRating"),
          data: values,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((c) => c.replace("0.6", "1")),
          borderWidth: 1,
        },
      ],
    };
  }, [tickets, userTickets, technicians]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: t("reports.techniciansAverageRating"),
      },
      tooltip: {
        callbacks: {
          label: (context) => `${t("reports.averageRating")}: ${context.raw}/5`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: t("reports.averageRatingStars"),
        },
      },
      y: {
        title: {
          display: true,
          text: t("reports.technicianRatedTickets"),
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

  if (!chartData || !technicians.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 275,
        }}
      >
        <Typography>{t("reports.noTechnicianDataAvailable")}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 275 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {t("reports.techniciansRating")}
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}
