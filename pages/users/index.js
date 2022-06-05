import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Users() {
  const [data, setData] = useState({});
  const [users, setUsers] = useState([]);
  const [deps, setDeps] = useState(0);
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const { paginate, search_by, search_query } = router.query;
  const current_page = paginate || 1;
  const current_search_by = search_by || "";
  const current_search_query = search_query || "";

  const handleFilter = async (data) => {
    router.push(
      `/users?paginate=${current_page}&search_by=${
        data.search_by || ""
      }&search_query=${data.search_query}`
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setDeps(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log(current_page);
    axios
      .get(
        `/users?page=${current_page}&search_by=${current_search_by}&search_query=${current_search_query}`
      )
      .then((res) => {
        setData(res.data);
        setUsers(res.data.data);
      })
      .catch();
  }, [deps, current_page, current_search_by, current_search_query]);

  return (
    <Layout>
      <h1>Users</h1>
      {users && (
        <div className="card">
          <div className="card body">
            <form onSubmit={handleSubmit(handleFilter)}>
              <div className="row p-3">
                <div className="col">
                  <select
                    className="me-2"
                    {...register("search_by")}
                    defaultValue={current_search_by}
                  >
                    <option>Search By</option>
                    <option value="email">Email</option>
                    <option value="nib">NIB No</option>
                    <option value="phone">Phone</option>
                  </select>
                  <input
                    className="me-2"
                    defaultValue={current_search_query}
                    {...register("search_query")}
                    type="text"
                    placeholder="Your search query here"
                  />
                  <input type="submit" value="Search" />
                </div>
                <div className="col"></div>
              </div>
            </form>
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
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="btn btn-sm btn-danger ms-3"
                        >
                          <i className="fas fa-trash" />
                        </button>
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
