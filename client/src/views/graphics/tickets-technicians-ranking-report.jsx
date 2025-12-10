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

// Status IDs for resolved/closed tickets
const RESOLVED_STATUS_IDS = [4, 5]; // 4 = Resolved, 5 = Closed

export default function TicketsTechniciansRankingReport() {
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
        setError("Failed to load technician ratings");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = useMemo(() => {
    if (!technicians.length) return null;

    // Get resolved/closed tickets with ratings
    const resolvedTicketsWithRatings = tickets.filter((ticket) => {
      const statusId = Number(ticket.status_id);
      const rating = parseInt(ticket.rating, 10);
      return (
        RESOLVED_STATUS_IDS.includes(statusId) && rating >= 1 && rating <= 5
      );
    });

    // Create a map of ticket_id -> ticket data for quick lookup
    const ticketMap = new Map();
    resolvedTicketsWithRatings.forEach((ticket) => {
      ticketMap.set(Number(ticket.id), ticket);
    });

    // Calculate average rating per technician
    const technicianRatings = new Map();
    technicians.forEach((tech) => {
      technicianRatings.set(Number(tech.id), { totalRating: 0, count: 0 });
    });

    // Track which tickets have been counted for each technician
    const ticketsTechCounted = new Map();

    userTickets.forEach((ut) => {
      const techId = Number(ut.user_id);
      const ticketId = Number(ut.ticket_id);

      if (!technicianRatings.has(techId)) return;

      const ticket = ticketMap.get(ticketId);
      if (!ticket) return;

      // Prevent double counting
      const countKey = `${techId}-${ticketId}`;
      if (ticketsTechCounted.has(countKey)) return;
      ticketsTechCounted.set(countKey, true);

      const rating = parseInt(ticket.rating, 10);
      const techData = technicianRatings.get(techId);
      techData.totalRating += rating;
      techData.count++;
    });

    // Prepare data for chart
    const labels = [];
    const values = [];
    const backgroundColors = [];

    technicians.forEach((tech) => {
      const data = technicianRatings.get(Number(tech.id));
      const avgRating =
        data.count > 0 ? (data.totalRating / data.count).toFixed(2) : 0;

      labels.push(`${tech.name} (${data.count})`);
      values.push(parseFloat(avgRating));

      // Color based on rating
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
          label: "Average Rating",
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
    indexAxis: "y", // Horizontal bar chart for better readability
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Technicians Average Rating (from resolved tickets)",
      },
      tooltip: {
        callbacks: {
          label: (context) => `Average: ${context.raw}/5`,
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
          text: "Average Rating (1-5 stars)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Technician (# of rated tickets)",
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
        <Typography>No technician data available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 275 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Technicians Rating
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}
