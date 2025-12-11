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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function isResponseSlaCompliant(createdOn, assignedOn, responseTime) {
  if (!createdOn || !assignedOn || !responseTime) {
    return null;
  }

  const created = new Date(createdOn);
  const assigned = new Date(assignedOn);
  const diffMinutes = (assigned - created) / (1000 * 60);

  return diffMinutes <= responseTime;
}

export default function TicketsSLAResponseReport() {
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
        console.error("Error fetching SLA response data:", err);
        setError(t("reports.failedToLoadSlaResponseData"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { chartData, complianceRate } = useMemo(() => {
    let withinCount = 0;
    let breachedCount = 0;

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

    tickets.forEach((ticket) => {
      const ticketId = Number(ticket.id);
      const createdOn = ticket.created_on;
      const responseTime = ticket.response_time;
      const firstAssignment = firstAssignmentMap.get(ticketId);

      if (!firstAssignment || !responseTime) return;

      const isCompliant = isResponseSlaCompliant(
        createdOn,
        firstAssignment,
        responseTime
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
        labels: [t("reports.withinSla"), t("reports.slaBreached")],
        datasets: [
          {
            label: t("header.tickets"),
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
        text: `${t("reports.slaResponseCompliance")}: ${complianceRate}%`,
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
        {t("reports.slaResponseCompliance")}
      </Typography>
      <Bar data={chartData} options={options} />
    </Box>
  );
}
