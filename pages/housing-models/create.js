import { ErrorMessage } from "@hookform/error-message";
import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CreateHousingModel() {
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

    if (data.master_plan.length > 0) {
      formData.append("master_plan", data.master_plan[0]);
    }

    if (data.basic_plan.length > 0) {
      formData.append("basic_plan", data.basic_plan[0]);
    }

    try {
      const res = await axios.post("/housing_models", formData);
      toast.success("Housing Model Created");
      router.replace("/housing-models");
    } catch (err) {
      errorify(err);
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
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                className="form-control"
                id="heading"
                defaultValue=""
                {...register("heading", { required: "Heading is requried" })}
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
              <label htmlFor="bedrooms">Bed Rooms</label>
              <input
                type="text"
                className="form-control"
                id="bedrooms"
                defaultValue=""
                {...register("bedrooms")}
              />
              {showError("bedrooms")}
            </div>
            <div className="form-group">
              <label htmlFor="bathrooms">Bathrooms</label>
              <input
                type="text"
                className="form-control"
                id="bathrooms"
                defaultValue=""
                {...register("bathrooms")}
              />
              {showError("bathrooms")}
            </div>
            <div className="form-group">
              <label htmlFor="width">Area</label>
              <input
                type="text"
                className="form-control"
                id="width"
                defaultValue=""
                {...register("width")}
              />
              {showError("width")}
            </div>
            <div className="form-group">
              <label htmlFor="garages">Garages</label>
              <input
                type="text"
                className="form-control"
                id="garages"
                defaultValue=""
                {...register("garages")}
              />
              {showError("garages")}
            </div>
            <div className="form-group">
              <label htmlFor="patios">Patios</label>
              <input
                type="text"
                className="form-control"
                id="patios"
                defaultValue=""
                {...register("patios")}
              />
              {showError("patios")}
            </div>
            <div className="form-group">
              <label htmlFor="gallery">Gallery</label>
              <input
                type="file"
                multiple
                className="form-control"
                {...register("gallery", {
                  required: "Please select one or more photos",
                })}
              />
              {showError("gallery")}
            </div>

            <div className="form-group">
              <label htmlFor="master_plan">Master Plan</label>
              <input
                type="file"
                className="form-control"
                {...register("master_plan", {
                  required: "Master Plan is required",
                })}
              />
              {showError("master_plan")}
            </div>

            <div className="form-group">
              <label htmlFor="basic_plan">Basic Plan</label>
              <input
                type="file"
                className="form-control"
                {...register("basic_plan", {
                  required: "Basic Plan is required",
                })}
              />
              {showError("basic_plan")}
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

export default withAuth(CreateHousingModel);
