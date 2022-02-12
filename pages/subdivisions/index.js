import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Subdivisions() {
  const [data, setData] = useState({});
  const [subdivisions, setSubdivisions] = useState([]);
  const [deps, setDeps] = useState(0);
  const router = useRouter();

  const { paginate } = router.query;
  const current_page = paginate || 1;

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/subdivisions/${id}`);
      toast.warning("Subdivision Deleted");
      setDeps(Math.random());
    } catch (err) {}
  };

  useEffect(() => {
    axios
      .get(`/subdivisions?page=${current_page}`)
      .then((res) => {
        setData(res.data);
        setSubdivisions(res.data.data);
      })
      .catch();
  }, [deps, current_page]);

  return (
    <Layout>
      <h1>Subdivisions</h1>

      {subdivisions && (
        <div className="card">
          <div className="card body">
            <div className="row">
              <div className="d-flex justify-content-end py-2 px-4">
                <Link href="/subdivisions/create">
                  <a className="btn btn-primary">Add New</a>
                </Link>
              </div>
            </div>
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">Heading</th>
                  <th scope="col">Location</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subdivisions &&
                  subdivisions.map((subdivision) => (
                    <tr key={subdivision.id}>
                      <td>{subdivision.heading}</td>
                      <td>{subdivision.location}</td>
                      <td>
                        <Link href={`/subdivisions/${subdivision.id}`}>
                          <a className="btn btn-sm btn-info">
                            <i className="fas fa-eye"></i>
                          </a>
                        </Link>
                        <Link href={`/subdivisions/edit?id=${subdivision.id}`}>
                          <a className="ms-3 btn btn-sm btn-success">
                            <i className="fas fa-edit"></i>
                          </a>
                        </Link>
                        <button
                          onClick={() => handleDelete(subdivision.id)}
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
                <Link href={`/subdivisions?paginate=${data.current_page - 1}`}>
                  <a>{"<< prev"}</a>
                </Link>
              )}
              {data.next_page_url && (
                <Link href={`/subdivisions?paginate=${data.current_page + 1}`}>
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

export default withAuth(Subdivisions);
