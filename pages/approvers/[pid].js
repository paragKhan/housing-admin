import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Approver() {
  const [approver, setApprover] = useState({});
  const router = useRouter();
  const { pid } = router.query;
  const [deps, setDeps] = useState(null);

  const toggleStatus = async () => {
    try {
      await axios.put(`/approvers/${approver.id}`, {
        is_active: !approver.is_active,
      });
      toast.success("Status updated.");
      setDeps(Math.random());
    } catch (err) {}
  };

  useEffect(() => {
    pid &&
      axios
        .get(`/approvers/${pid}`)
        .then((res) => {
          console.log(res.data);
          setApprover(res.data);
        })
        .catch();
  }, [deps, pid]);

  return (
    <Layout>
      <div className="card card-shadow">
        <div className="card-body">
          <h3 className="card-title mb-5">Approver Details</h3>
          <p>
            <strong>Full Name:</strong>
            <span className="ms-3">{approver.name}</span>
          </p>
          <p>
            <strong>Email Address:</strong>
            <span className="ms-3">{approver.email}</span>
          </p>
          <p>
            <strong>Active Status:</strong>
            <span className="ms-3">
              {approver.is_active ? "active" : "inactive"}
            </span>
          </p>

          <button onClick={toggleStatus} className="btn btn-primary">
            Toggle Active Status
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default withAuth(Approver);
