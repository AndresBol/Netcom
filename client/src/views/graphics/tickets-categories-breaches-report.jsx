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

export default function CategoryBreachesReport() {
  const [dataSet, setDataSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    SlaReportService.getCategoryBreaches()
      .then((res) => {
        setDataSet(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load category breaches:", err);
        setError(err.message);
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
          height : 275,
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
          color: "error.main"
        }}
      >
        <p>Failed to load data: {error}</p>
      </Box>
    );
  }

  if (!dataSet || dataSet.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height : 275,
        }}
      >
        <p>No data available</p>
      </Box>
    );
  }

  const labels = dataSet.map((item) => item.category);
  const values = dataSet.map((item) => item.breaches);

  const data = {
    labels,
    datasets: [
      {
        label: "Breaches",
        data: values,
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
        text: "Categories With Most SLA Breaches"
      }
    }
  };

  return (
    <div style={{ height : 275 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
