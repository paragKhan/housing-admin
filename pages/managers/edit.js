import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import { errorify } from "helpers";
import withAuth from "HOC/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditManager() {
  const [manager, setManager] = useState(null);
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
      const res = await axios.put(`/managers/${id}`, data);
      toast.success("Manager updated");
      router.replace("/managers");
    } catch (err) {
      errorify(err);
    }
  };

  useEffect(() => {
    id &&
      axios
        .get(`managers/${id}`)
        .then((res) => setManager(res.data))
        .catch();
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {manager && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  defaultValue={manager.name}
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
                  defaultValue={manager.email}
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
export default withAuth(EditManager);
