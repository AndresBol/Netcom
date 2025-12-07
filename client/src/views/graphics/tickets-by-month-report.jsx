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


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TicketsByMonthReport() {
  const data = {

    labels: ["October", "November", "December"],
    datasets: [
      {
        label: "Tickets Created",
        data: [12, 19, 8], 
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tickets Created per Month",
      },
    },
  };

  return (
    <div style={{ height: 300 }}>
      <h2>Monthly Tickets Indicator</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
