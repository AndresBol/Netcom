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

const RATING_COLORS = [
  "rgba(255, 99, 132, 0.6)", // Red for 1 star
  "rgba(255, 159, 64, 0.6)", // Orange for 2 stars
  "rgba(255, 205, 86, 0.6)", // Yellow for 3 stars
  "rgba(75, 192, 192, 0.6)", // Teal for 4 stars
  "rgba(54, 162, 235, 0.6)", // Blue for 5 stars
];

export default function TicketsRatingReport() {
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
        console.error("Error fetching ratings:", err);
        setError(t("reports.failedToLoadRatingData"));
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const { chartData, averageRating, totalRated } = useMemo(() => {
    const ratingCounts = [0, 0, 0, 0, 0];
    let totalRating = 0;
    let ratedCount = 0;

    tickets.forEach((ticket) => {
      const rating = parseInt(ticket.rating, 10);
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating - 1]++;
        totalRating += rating;
        ratedCount++;
      }
    });

    const avgRating =
      ratedCount > 0 ? (totalRating / ratedCount).toFixed(2) : "N/A";

    const ratingLabels = [
      `1 ${t("reports.star")}`,
      `2 ${t("reports.stars")}`,
      `3 ${t("reports.stars")}`,
      `4 ${t("reports.stars")}`,
      `5 ${t("reports.stars")}`,
    ];

    return {
      chartData: {
        labels: ratingLabels,
        datasets: [
          {
            label: t("reports.numberOfTickets"),
            data: ratingCounts,
            backgroundColor: RATING_COLORS,
            borderColor: RATING_COLORS.map((c) => c.replace("0.6", "1")),
            borderWidth: 1,
          },
        ],
      },
      averageRating: avgRating,
      totalRated: ratedCount,
    };
  }, [tickets, t]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${t("reports.ticketRatingsDistribution")} (${t("reports.avg")}: ${averageRating}/5, ${t("reports.total")}: ${totalRated})`,
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
        {t("reports.ticketRatingsDistribution")}
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}
