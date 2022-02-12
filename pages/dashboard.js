import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import React from "react";

function Dashboard() {
  return (
    <Layout>
      <h1>Welcome Back</h1>
    </Layout>
  );
}

export default withAuth(Dashboard);
