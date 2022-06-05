import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Applications() {
  const [data, setData] = useState({});
  const [applications, setApplications] = useState([]);
  const [deps, setDeps] = useState(0);
  const [queries, setQueries] = useState(null);
  const router = useRouter();

  const { register, watch, handleSubmit } = useForm();
  const watchedSearchByField = watch("search_by");
  let resetSearchBy = false;

  const handleFilter = async (data) => {
    router.push(
      `/applications?search_by=${data.search_by || ""}&search_query=${
        data.search_query || ""
      }`
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/applications/${id}`);
      setDeps(Math.random());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    axios
      .get(router.asPath)
      .then((res) => {
        setData(res.data);
        setApplications(res.data.data);
      })
      .catch((err) => {});
  }, [deps, router.isReady, router.asPath]);

  useEffect(() => {
    [
      "housing_models",
      "subdivisions",
      "industries",
      "islands",
      "statuses",
    ].includes(watchedSearchByField) &&
      axios
        .get("/applications/filter-queries")
        .then((res) => setQueries(res.data))
        .catch((err) => {});
  }, [watchedSearchByField]);

  return (
    <Layout>
      <h1>Applications</h1>
      {applications && (
        <div className="card">
          <div className="card body">
            {router.isReady && (
              <div className="row p-3">
                <div className="col">
                  <form onSubmit={handleSubmit(handleFilter)}>
                    <select
                      className="form-control mb-2"
                      {...register("search_by")}
                      defaultValue={router.query.search_by}
                    >
                      <option value="">Search By</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="nib_no">NIB NO</option>
                      <option value="housing_models">Housing Model</option>
                      <option value="subdivisions">Subdivision</option>
                      <option value="islands">Islands</option>
                      <option value="industries">Industries</option>
                      <option value="statuses">Application Status</option>
                    </select>
                    {watchedSearchByField &&
                      ["email", "phone", "nib_no"].includes(
                        watchedSearchByField
                      ) && (
                        <input
                          className="form-control"
                          defaultValue={router.query.search_query}
                          {...register("search_query")}
                          type="text"
                          placeholder="Your search query here"
                        />
                      )}
                    {watchedSearchByField &&
                      queries &&
                      [
                        "housing_models",
                        "subdivisions",
                        "industries",
                        "islands",
                        "statuses",
                      ].includes(watchedSearchByField) && (
                        <select
                          className="form-control my-2"
                          {...register("search_query")}
                          defaultValue={router.query.search_query}
                        >
                          <option value="">Select an option</option>
                          {queries[watchedSearchByField].map((query, index) => (
                            <option key={index} value={query.key}>
                              {query.value}
                            </option>
                          ))}
                        </select>
                      )}

                    <input
                      className="btn btn-primary mt-2"
                      type="submit"
                      value="Search"
                    />
                  </form>
                </div>
                <div className="col"></div>
              </div>
            )}
            <table className="table mt-3">
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
                <button
                  onClick={() =>
                    router.push({
                      query: {
                        ...router.query,
                        page: data.current_page - 1,
                      },
                    })
                  }
                >
                  {"<< prev "}
                </button>
              )}
              {data.next_page_url && (
                <button
                  onClick={() =>
                    router.push({
                      query: {
                        ...router.query,
                        page: data.current_page + 1,
                      },
                    })
                  }
                >
                  {" next >>"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Applications);
