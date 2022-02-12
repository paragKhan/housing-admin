import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function User() {
  const [message, setMessage] = useState({});
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    pid &&
      axios
        .get(`/messages/${pid}`)
        .then((res) => {
          setMessage(res.data);
        })
        .catch((err) => {});
  }, [pid]);

  return (
    <Layout>
      <div className="card card-shadow">
        <div className="card-body">
          <h3 className="card-title mb-5">Message Details</h3>
          <p>
            <strong>Name:</strong>
            <span className="ms-3">{message.name}</span>
          </p>
          <p>
            <strong>Email Address:</strong>
            <span className="ms-3">{message.email}</span>
          </p>
          <p>
            <strong>Message Details:</strong>
            <span className="ms-3">{message.details}</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
