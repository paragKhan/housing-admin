import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Executives() {
  const [data, setData] = useState({});
  const [executives, setExecutives] = useState([]);
  const [deps, setDeps] = useState(0);
  const router = useRouter();

  const { paginate } = router.query;
  const current_page = paginate || 1;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/executives/${id}`);
      toast.warning("Executive Deleted");
      setDeps(Math.random());
    } catch (err) {}
  };

  useEffect(() => {
    axios
      .get(`/executives?page=${current_page}`)
      .then((res) => {
        setData(res.data);
        setExecutives(res.data.data);
      })
      .catch();
  }, [deps, current_page]);

  return (
    <Layout>
      <h1>Executives</h1>

      {executives && (
        <div className="card">
          <div className="card body">
            <div className="row">
              <div className="d-flex justify-content-end py-2 px-4">
                <Link href="/executives/create">
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
                {executives &&
                  executives.map((executive) => (
                    <tr key={executive.id}>
                      <td>{executive.name}</td>
                      <td>{executive.email}</td>
                      <td>
                        <Link href={`/executives/${executive.id}`}>
                          <a className="btn btn-sm btn-info">
                            <i className="fas fa-eye"></i>
                          </a>
                        </Link>
                        <Link href={`/executives/edit?id=${executive.id}`}>
                          <a className="ms-3 btn btn-sm btn-success">
                            <i className="fas fa-edit"></i>
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(executive.id)}
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
                <Link href={`/executives?paginate=${data.current_page - 1}`}>
                  <a>{"<< prev"}</a>
                </Link>
              )}
              {data.next_page_url && (
                <Link href={`/executives?paginate=${data.current_page + 1}`}>
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

export default withAuth(Executives);
