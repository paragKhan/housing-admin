import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Users() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [deps, setDeps] = useState(0);
  const router = useRouter();

  const { paginate } = router.query;
  const current_page = paginate || 1;

  useEffect(() => {
    console.log(current_page);
    axios
      .get(`/users?page=${current_page}`)
      .then((res) => {
        setData(res.data);
        setUsers(res.data.data);
        console.log(res.data);
      })
      .catch();
  }, [deps, current_page]);

  return (
    <Layout>
      <h1>Users</h1>
      {users && (
        <div className="card">
          <div className="card body">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.fname}</td>
                      <td>{user.lname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <Link href={`/users/${user.id}`}>
                          <a className="btn btn-sm btn-info">
                            <i className="fas fa-eye"></i>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="p-3 d-flex justify-content-end">
              {data.prev_page_url && (
                <Link href={`/users?paginate=${data.current_page - 1}`}>
                  <a>{"<< prev"}</a>
                </Link>
              )}
              {data.next_page_url && (
                <Link href={`/users?paginate=${data.current_page + 1}`}>
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

export default withAuth(Users);
