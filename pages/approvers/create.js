import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import { errorify } from "helpers";
import withAuth from "HOC/withAuth";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CreateApprover() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/approvers", data);
      toast.success("Approver added");
      router.replace("/approvers");
    } catch (err) {
      errorify(err);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                defaultValue=""
                {...register("name", { required: true })}
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
                defaultValue=""
                {...register("email", { required: true })}
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
                defaultValue=""
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <input
              className="mt-2 btn btn-primary"
              type="submit"
              value="Create"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
export default withAuth(CreateApprover);
