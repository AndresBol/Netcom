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

export default function TicketsRatingReport() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchAndProcessRatings();
  }, []);

  const fetchAndProcessRatings = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await TicketService.getAll();
      const tickets = response.data || [];

      // Filter only rated tickets (rating 1-5, exclude rating = 0)
      const ratedTickets = tickets.filter((ticket) => {
        const rating = parseInt(ticket.rating);
        return rating >= 1 && rating <= 5;
      });

      // Initialize rating counts (1 to 5 stars)
      const ratingCounts = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };

      let totalRating = 0;

      // Process rated tickets and count by rating
      ratedTickets.forEach((ticket) => {
        const rating = parseInt(ticket.rating);
        ratingCounts[rating]++;
        totalRating += rating;
      });

      // Calculate average rating
      const avgRating =
        ratedTickets.length > 0
          ? (totalRating / ratedTickets.length).toFixed(2)
          : 0;

      setAverageRating(avgRating);

      const ratingLabels = [
        "1 Star",
        "2 Stars",
        "3 Stars",
        "4 Stars",
        "5 Stars",
      ];

      // Map data to chart format
      const data = {
        labels: ratingLabels,
        datasets: [
          {
            label: "Number of Ratings",
            data: [
              ratingCounts[1],
              ratingCounts[2],
              ratingCounts[3],
              ratingCounts[4],
              ratingCounts[5],
            ],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    } catch (err) {
      console.error("Error fetching ratings:", err);
      setError("Failed to load rating data");
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
        text: `Overall Ticket Ratings (Average: ${averageRating} / 5)`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          backgroundColor: "rgba(54, 162, 235, 0.6)",
          borderColor: "rgba(54, 162, 235, 1)",
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
    <div style={{ height: 275 }}>
      <h2>Ticket Ratings Distribution</h2>
      {chartData && <Bar data={chartData} options={options} />}
    </div>
  );
}
