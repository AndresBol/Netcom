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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Calculates if a ticket met the SLA resolution time.
 * Resolution SLA is met if the ticket was resolved (notified_on) within the resolution_time (in minutes).
 */
function isResolutionSlaCompliant(createdOn, notifiedOn, resolutionTime) {
  if (!createdOn || !notifiedOn || !resolutionTime) {
    return null;
  }

  const created = new Date(createdOn);
  const resolved = new Date(notifiedOn);
  const diffMinutes = (resolved - created) / (1000 * 60);

  return diffMinutes <= resolutionTime;
}

export default function TicketsSLAResolutionReport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await TicketService.getAll();
        setTickets(response.data || []);
      } catch (err) {
        console.error("Error fetching SLA resolution data:", err);
        setError("Failed to load SLA resolution data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { chartData, complianceRate } = useMemo(() => {
    let withinCount = 0;
    let breachedCount = 0;

    tickets.forEach((ticket) => {
      const createdOn = ticket.created_on;
      const notifiedOn = ticket.notified_on; // Resolution/closure date
      const resolutionTime = ticket.resolution_time;

      // Only count resolved tickets (those with notified_on date) that have SLA defined
      if (!notifiedOn || !resolutionTime) return;

      const isCompliant = isResolutionSlaCompliant(
        createdOn,
        notifiedOn,
        resolutionTime
      );

      if (isCompliant === true) {
        withinCount++;
      } else if (isCompliant === false) {
        breachedCount++;
      }
    });

    const total = withinCount + breachedCount;
    const rate = total > 0 ? ((withinCount / total) * 100).toFixed(1) : "N/A";

    return {
      chartData: {
        labels: ["Within SLA", "SLA Breached"],
        datasets: [
          {
            label: "Tickets",
            data: [withinCount, breachedCount],
            backgroundColor: [
              "rgba(75, 192, 192, 0.6)",
              "rgba(255, 99, 132, 0.6)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      },
      complianceRate: rate,
    };
  }, [tickets]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `SLA Resolution Compliance: ${complianceRate}%`,
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
        SLA Resolution Compliance
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}
