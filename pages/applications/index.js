import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Applications() {
  const [data, setData] = useState({});
  const [applications, setApplications] = useState([]);
  const [deps, setDeps] = useState(0);
  const router = useRouter();

  const { paginate } = router.query;
  const current_page = paginate || 1;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/applications/${id}`);
      setDeps(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get(`/applications?page=${current_page}`)
      .then((res) => {
        setData(res.data);
        setApplications(res.data.data);
        console.log(res.data);
      })
      .catch();
  }, [deps, current_page]);

  return (
    <Layout>
      <h1>Applications</h1>
      {applications && (
        <div className="card">
          <div className="card body">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {applications &&
                  applications.map((application) => (
                    <tr key={application.id}>
                      <td>{application.fname}</td>
                      <td>{application.lname}</td>
                      <td>{application.email}</td>
                      <td>{application.status}</td>
                      <td>
                        <Link href={`/applications/${application.id}`}>
                          <a className="btn btn-sm btn-info">
                            <i className="fas fa-eye"></i>
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(application.id)}
                          className="btn btn-sm btn-danger ms-3"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="p-3 d-flex justify-content-end">
              {data.prev_page_url && (
                <Link href={`/applications?paginate=${data.current_page - 1}`}>
                  <a>{"<< prev"}</a>
                </Link>
              )}
              {data.next_page_url && (
                <Link href={`/applications?paginate=${data.current_page + 1}`}>
                  <a>{"next >>"}</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Applications);
