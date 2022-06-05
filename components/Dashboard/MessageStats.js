import axios from "apis/axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function MessageStats() {
  const [data, setData] = useState(null);
  const [param, setParam] = useState("today");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!data) {
      axios
        .get("/dashboard/get-message-stats")
        .then((res) => setData(res.data));
    } else {
      const readCount =
        data[param].filter((i) => i.st == "read")[0]?.count || 0;
      const unreadCount =
        data[param].filter((i) => i.st == "unread")[0]?.count || 0;

      setStats({
        read: readCount,
        unread: unreadCount,
        total: readCount + unreadCount,
      });
    }
  }, [data, param]);
  return (
    <div className="card card-shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h6 className="fw-bold">Message</h6>
          <select
            className="border-0 cursor-pointer"
            value={param}
            onChange={(e) => setParam(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="all">All Message</option>
          </select>
        </div>
        <div className="d-flex justify-content-around mt-3 text-center">
          <div>
            <h4>{stats ? stats.read : <Skeleton />}</h4>
            <strong className="text-orange">Total Read</strong>
          </div>
          <div>
            <h4>{stats ? stats.unread : <Skeleton />}</h4>
            <strong className="text-orange-dark">Total Unread</strong>
          </div>
          <div>
            <h4>{stats ? stats.total : <Skeleton />}</h4>
            <strong className="text-blue">Total Messages</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
