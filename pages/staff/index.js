import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Staff() {
  const [data, setData] = useState({});
  const [staff, setStaff] = useState([]);
  const [deps, setDeps] = useState(0);
  const router = useRouter();

  const { paginate } = router.query;
  const current_page = paginate || 1;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/staff/${id}`);
      toast.warning("Staff Deleted");
      setDeps(Math.random());
    } catch (err) {}
  };

  useEffect(() => {
    axios
      .get(`/staff?page=${current_page}`)
      .then((res) => {
        setData(res.data);
        setStaff(res.data.data);
      })
      .catch();
  }, [deps, current_page]);

  return (
    <Layout>
      <h1>Staff</h1>

      {staff && (
        <div className="card">
          <div className="card body">
            <div className="row">
              <div className="d-flex justify-content-end py-2 px-4">
                <Link href="/staff/create">
                  <a className="btn btn-primary">Add New</a>
                </Link>
              </div>
            </div>
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {staff &&
                  staff.map((st) => (
                    <tr key={st.id}>
                      <td>{st.name}</td>
                      <td>{st.email}</td>
                      <td>
                        <Link href={`/staff/${st.id}`}>
                          <a className="btn btn-sm btn-info">
                            <i className="fas fa-eye"></i>
                          </a>
                        </Link>
                        <Link href={`/staff/edit?id=${st.id}`}>
                          <a className="ms-3 btn btn-sm btn-success">
                            <i className="fas fa-edit"></i>
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(st.id)}
                          className="ms-3 btn btn-sm btn-danger"
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
                <Link href={`/staff?paginate=${data.current_page - 1}`}>
                  <a>{"<< prev"}</a>
                </Link>
              )}
              {data.next_page_url && (
                <Link href={`/staff?paginate=${data.current_page + 1}`}>
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

export default withAuth(Staff);
