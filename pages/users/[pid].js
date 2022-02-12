import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function User() {
  const [user, setUser] = useState({});
  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    pid &&
      axios
        .get(`/users/${pid}`)
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
        })
        .catch();
  }, [pid]);

  return (
    <Layout>
      <div className="card card-shadow">
        <div className="card-body">
          <h3 className="card-title mb-5">User Details</h3>
          <p>
            <strong>First Name:</strong>
            <span className="ms-3">{user.fname}</span>
          </p>
          <p>
            <strong>Last Name:</strong>
            <span className="ms-3">{user.lname}</span>
          </p>
          <p>
            <strong>Email Address:</strong>
            <span className="ms-3">{user.email}</span>
          </p>
          <p>
            <strong>Phone Name:</strong>
            <span className="ms-3">{user.phone}</span>
          </p>
          <p>
            <strong>Country of Birth:</strong>
            <span className="ms-3">{user.country_of_birth}</span>
          </p>
          <p>
            <strong>Country of Citizenship:</strong>
            <span className="ms-3">{user.country_of_citizenship}</span>
          </p>
          <p>
            <strong>Gender:</strong>
            <span className="ms-3">{user.gender}</span>
          </p>
          <p>
            <strong>DOB:</strong>
            <span className="ms-3">{user.dob}</span>
          </p>
        </div>
      </div>
    </Layout>
  );
}
