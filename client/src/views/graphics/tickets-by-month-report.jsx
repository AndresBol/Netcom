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
import { useState, useEffect } from "react";
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

export default function TicketsByMonthReport() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAndProcessTickets();
  }, []);

  const fetchAndProcessTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await TicketService.getAll();
      const tickets = response.data || [];

     
      const monthCounts = {
        10: 0, // October
        11: 0, // November
        12: 0, // December
      };

      const monthLabels = ["October", "November", "December"];

      // Process tickets and count by month
      tickets.forEach((ticket) => {
        if (ticket.created_on) {
          const date = new Date(ticket.created_on);
          const month = date.getMonth() + 1; // 1 = Jan, 10 = Oct, 11 = Nov, 12 = Dec

          if (monthCounts.hasOwnProperty(month)) {
            monthCounts[month]++;
          }
        }
      });

      // Map data to chart format
      const data = {
        labels: monthLabels,
        datasets: [
          {
            label: "Tickets Created",
            data: [monthCounts[10], monthCounts[11], monthCounts[12]],
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    } catch (err) {
      console.error("Error fetching tickets:", err);
      setError("Failed to load ticket data");
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tickets Created per Month",
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
          height: 300,
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
          height: 300,
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div style={{ height: 300 }}>
      <h2>Monthly Tickets Indicator</h2>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
}
