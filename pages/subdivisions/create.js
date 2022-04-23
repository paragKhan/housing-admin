import { ErrorMessage } from "@hookform/error-message";
import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CreateSubdivision() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.gallery.length > 0) {
      Array.from(data.gallery).forEach((file) => {
        formData.append("gallery[]", file);
      });
    }

    try {
      const res = await axios.post("/subdivisions", formData);
      toast.success("Subdivision added");
      router.replace("/subdivisions");
    } catch (err) {
      toast.error("Check your inputs and try again");
      errorify(err.response.data.errors);
    }
  };

  const errorify = (err) => {
    Object.entries(err).forEach(([key, value]) => {
      setError(
        key,
        { type: "custom", message: value[0] },
        { shouldFocus: true }
      );
    });
  };

  const showError = (fieldName) => {
    return (
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => (
          <small className="text-danger">{message}</small>
        )}
      />
    );
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Category</label>
              <select
                {...register("category")}
                className="form-control"
                name="category"
              >
                <option value="">Select category</option>
                <option value="featured">Featured</option>
                <option value="new_arrival">New Arrival</option>
              </select>
              {showError("category")}
            </div>
            <div className="form-group">
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                className="form-control"
                id="heading"
                defaultValue=""
                {...register("heading", { required: "Heading is required" })}
              />
              {showError("heading")}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows={5}
                className="form-control"
                id="description"
                defaultValue=""
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {showError("description")}
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                defaultValue=""
                {...register("location", { required: "Location is required" })}
              />
              {showError("location")}
            </div>
            <div className="form-group">
              <label htmlFor="photo">Gallery</label>
              <input
                multiple
                type="file"
                className="form-control"
                {...register("gallery", {
                  required: "Please select one or more photos",
                })}
              />
              {showError("gallery")}
            </div>

            <div className="form-check my-3">
              <input
                {...register("include_in_application")}
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Include in application form
              </label>
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

export default withAuth(CreateSubdivision);
