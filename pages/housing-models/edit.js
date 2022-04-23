import { ErrorMessage } from "@hookform/error-message";
import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditHousingModel() {
  const [housingModel, setHousingModel] = useState(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { id } = router.query;

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

    if (data.master_plan.length > 0) {
      formData.append("master_plan", data.master_plan[0]);
    } else {
      formData.delete("master_plan");
    }

    if (data.basic_plan.length > 0) {
      formData.append("basic_plan", data.basic_plan[0]);
    } else {
      formData.delete("basic_plan");
    }

    try {
      const res = await axios.post(`/housing_models/${id}`, formData);
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

  useEffect(() => {
    id &&
      axios
        .get(`/housing_models/${id}`)
        .then((res) => {
          setHousingModel(res.data);
        })
        .catch((err) => {});
  }, [id]);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {housingModel && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="heading">Heading</label>
                <input
                  type="text"
                  className="form-control"
                  id="heading"
                  defaultValue={housingModel.heading}
                  {...register("heading")}
                />
                {showError("heading")}
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  rows={5}
                  className="form-control"
                  id="description"
                  defaultValue={housingModel.description}
                  {...register("description")}
                />
                {showError("description")}
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  defaultValue={housingModel.location}
                  {...register("location")}
                />
                {showError("location")}
              </div>
              <div className="form-group">
                <label htmlFor="bedrooms">Bed Rooms</label>
                <input
                  type="text"
                  className="form-control"
                  id="bedrooms"
                  defaultValue={housingModel.bedrooms}
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
                  defaultValue={housingModel.bathrooms}
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
                  defaultValue={housingModel.width}
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
                  defaultValue={housingModel.garages}
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
                  defaultValue={housingModel.patios}
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
                  {...register("gallery")}
                />
                {showError("gallery")}
              </div>

              <div className="form-group">
                <label htmlFor="master_plan">Master Plan</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("master_plan")}
                />
              </div>

              <div className="form-group">
                <label htmlFor="basic_plan">Basic Plan</label>
                <input
                  type="file"
                  className="form-control"
                  {...register("basic_plan")}
                />
              </div>

              <div className="form-check my-3">
                <input
                  {...register("include_in_application")}
                  className="form-check-input"
                  type="checkbox"
                  defaultChecked={housingModel.include_in_application}
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

export default withAuth(EditHousingModel);
