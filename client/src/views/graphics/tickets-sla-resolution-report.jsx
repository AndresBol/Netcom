import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import SlaReportService from "@services/sla-report.js";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function TicketsSLAResolutionReport() {
  const [dataSet, setDataSet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SlaReportService.getResolutionReport().then((res) => {
      setDataSet(res.data);
      setLoading(false);
    });
  }, []);

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

  const data = {
    labels: ["Within SLA", "SLA Breached"],
    datasets: [
      {
        label: "Tickets",
        data: [dataSet.within_sla, dataSet.breached_sla],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "SLA Resolution Compliance"
      }
    }
  };

  return (
    <div style={{ height: 300 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
