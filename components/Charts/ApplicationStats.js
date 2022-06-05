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

export default function ApplicationStats() {
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
    if (!data) {
      axios
        .get("/dashboard/get-application-stats")
        .then((res) => setData(res.data));
    } else {
      const chartData = {
        labels: data[param].map((item) => item.label),
        datasets: [
          {
            label: "Total Submission",
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
          <h6 className="fw-bold">Application Submissions</h6>
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
        <div className="d-flex justify-content-between my-5">
          <div className="text-center">
            <h5>
              {data ? (
                data.counted.filter((i) => i.status == "submitted")[0]?.count ||
                0
              ) : (
                <Skeleton />
              )}
            </h5>
            <small className="text-teal">Submitted</small>
          </div>
          <div className="text-center">
            <h5>
              {data ? (
                data.counted.filter((i) => i.status == "approved")[0]?.count ||
                0
              ) : (
                <Skeleton />
              )}
            </h5>
            <small className="text-violate">Approved</small>
          </div>
          <div className="text-center">
            <h5>
              {data ? (
                data.counted.filter((i) => i.status == "reviewing")[0]?.count ||
                0
              ) : (
                <Skeleton />
              )}
            </h5>
            <small className="text-green">Reviewing</small>
          </div>
          <div className="text-center">
            <h5>
              {data ? (
                data.counted.filter((i) => i.status == "resubmit")[0]?.count ||
                0
              ) : (
                <Skeleton />
              )}
            </h5>
            <small className="text-blue">Re-Submit</small>
          </div>
          <div className="text-center">
            <h5>
              {data ? (
                data.counted.filter((i) => i.status == "declined")[0]?.count ||
                0
              ) : (
                <Skeleton />
              )}
            </h5>
            <small className="text-red">Declined</small>
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
