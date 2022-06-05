import axios from "apis/axios";
import React, { useEffect, useState } from "react";

export default function SubdivisionStats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/dashboard/get-subdivision-stats")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="card card-shadow">
      <div className="card-body">
        <div>
          <h6 className="fw-bold">Government Subdivisions and Lots</h6>
        </div>
        {data &&
          data.map((item, index) => (
            <div className="row" key={index}>
              <div className="col fw-semibold">{item.location}</div>
              <div className="col">{item.count}</div>
              <div className="col">
                <div
                  style={{
                    width: `
                      ${
                        (item.count /
                          Math.max(...data.map((item) => item.count))) *
                        100
                      }%`,
                  }}
                  className="progress bg-blue"
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
