import { ErrorMessage } from "@hookform/error-message";
import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditSubdivision() {
  const [subdivision, setSubdivision] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("_method", "PUT");
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.gallery.length > 0) {
      Array.from(data.gallery).forEach((file) => {
        formData.append("gallery[]", file);
      });
    } else {
      formData.delete("gallery");
    }

    try {
      const res = await axios.post(`/subdivisions/${id}`, formData);
      toast.success("Subdivision updated");
      router.replace("/subdivisions");
    } catch (err) {
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

  useEffect(() => {
    id &&
      axios
        .get(`subdivisions/${id}`)
        .then((res) => setSubdivision(res.data))
        .catch((err) => {});
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {subdivision && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label>Category</label>
                <select
                  defaultValue={subdivision.category}
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
                  defaultValue={subdivision.heading}
                  {...register("heading")}
                />
                {showError("heading")}
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  defaultValue={subdivision.location}
                  {...register("location")}
                />
                {showError("location")}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={5}
                  defaultValue={subdivision.description}
                  className="form-control"
                  id="description"
                  {...register("description")}
                />
                {showError("description")}
              </div>
              <div className="form-group">
                <label htmlFor="description">Photo</label>
                <input
                  multiple
                  type="file"
                  className="form-control"
                  {...register("gallery")}
                />
                {showError("gallery")}
              </div>
              <div className="form-check my-3">
                <input
                  {...register("include_in_application")}
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={subdivision.include_in_application}
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Include in application form
                </label>
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

export default withAuth(EditSubdivision);
