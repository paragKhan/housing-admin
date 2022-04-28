import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import { errorify } from "helpers";
import withAuth from "HOC/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditExecutive() {
  const [executive, setExecutive] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.password.length < 1) delete data.password;

    try {
      const res = await axios.put(`/executives/${id}`, data);
      toast.success("Executive updated");
      router.replace("/executives");
    } catch (err) {
      errorify(err);
    }
  };

  useEffect(() => {
    id &&
      axios
        .get(`executives/${id}`)
        .then((res) => setExecutive(res.data))
        .catch();
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {executive && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  defaultValue={executive.name}
                  {...register("name")}
                />
                {errors.name && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  defaultValue={executive.email}
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>
              <input
                className="mt-2 btn btn-primary"
                type="submit"
                value="Update"
              />
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(EditExecutive);
