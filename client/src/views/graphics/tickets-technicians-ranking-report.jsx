import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
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

export default function TicketsTechniciansRankingReport() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);       

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = async () => {
    try {
      setLoading(true);     
      setError(null);       

      const ticketsRes = await TicketService.getAll();
      const tickets = ticketsRes.data || [];

      const resolvedTickets = tickets.filter(
        (ticket) => Number(ticket.status_id) === 4
      );

      const userTicketRes = await UserTicketService.getAll();
      const userTickets = userTicketRes.data || [];

      const usersRes = await UserService.getAll();
      const technicians = (usersRes.data || []).filter(
        (user) => Number(user.role_id) === 2
      );

      const counter = {};

      resolvedTickets.forEach((ticket) => {
        const assignment = userTickets.find(
          (ut) => Number(ut.ticket_id) === Number(ticket.id)
        );

        if (assignment) {
          const techId = Number(assignment.user_id);
          counter[techId] = (counter[techId] || 0) + 1;
        }
      });

      const labels = technicians.map((tech) => tech.name);
      const values = technicians.map(
        (tech) => counter[Number(tech.id)] || 0
      );

      setData({
        labels,
        datasets: [
          {
            label: "Resolved Tickets",
            data: values,
            backgroundColor: "rgba(54, 235, 123, 0.6)",
            borderColor: "rgba(54, 235, 123, 0.6)",
            borderWidth: 1
          }
        ]
      });

    } catch (error) {
      console.error("Error loading ranking:", error);
      setError("Failed to load technicians ranking"); 
    } finally {
      setLoading(false); 
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top"
      },
      title: {
        display: true,
        text: "Technicians Ranking by Resolved Tickets"
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height : 275
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
          height : 275,
          flexDirection: "column",
          gap: 1
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div style={{ height : 275 }}>
      <h2>Technicians Ranking</h2>
      {data && <Bar data={data} options={options} />} 
    </div>
  );
}
