import axios from "apis/axios";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Skeleton from "react-loading-skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

export default function UserJoiningStats() {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [param, setParam] = useState("daily");

  const registerParam = (name, state, setState) => {
    return {
      onClick: () => {
        setState(name);
      },
      className: `btn btn-sm ${
        state == name ? "btn-gradient" : "btn-light"
      } mx-1`,
    };
  };

  useEffect(() => {
    if (!data)
      axios
        .get("/dashboard/get-user-joining-stats")
        .then((res) => setData(res.data));
    else {
      const chartData = {
        labels: data[param].map((item) => item.label),
        datasets: [
          {
            label: "Total Joining",
            data: data[param].map((item) => item.count),
            borderColor: "#3498DB",
            backgroundColor: "#3498DB",
          },
        ],
      };
      setChartData(chartData);
    }
  }, [data, param]);

  return (
    <div className="card card-shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h6 className="fw-bold">User Joining Status</h6>
          <div>
            <button {...registerParam("daily", param, setParam)}>Daily</button>
            <button {...registerParam("weekly", param, setParam)}>
              Weekly
            </button>
            <button {...registerParam("monthly", param, setParam)}>
              Monthly
            </button>
            <button {...registerParam("yearly", param, setParam)}>
              Yearly
            </button>
          </div>
        </div>
        {chartData ? (
          <Line options={options} data={chartData} />
        ) : (
          <Skeleton height={300} />
        )}
      </div>
    </div>
  );
}
