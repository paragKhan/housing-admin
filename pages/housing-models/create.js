import axios from "apis/axios";
import uploader from "apis/uploader";
import Layout from "components/Layout/Layout";
import { errorify } from "helpers";
import router from "next/router";
import React, { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateHousingModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [gallery, setGallery] = useState(null);
  const [basicPlanImage, setBasicPlanImage] = useState(null);
  const [masterPlanImage, setMasterPlanImage] = useState(null);

  const galleryRef = createRef();
  const basicPlanImageRef = createRef();
  const masterPlanImageRef = createRef();

  const handleUploadBasicPlan = async () => {
    const file = basicPlanImageRef.current.files[0];
    if (!file) return setBasicPlanImage(null);

    toast.info("Uploading image...");
    const photo = await uploader(file);
    toast.success("Image uploaded");

    setBasicPlanImage(photo);
  };

  const handleUploadMasterPlan = async () => {
    const file = masterPlanImageRef.current.files[0];
    if (!file) return setMasterPlanImage(null);

    toast.info("Uploading image...");
    const photo = await uploader(file);
    toast.success("Image uploaded");

    setMasterPlanImage(photo);
  };

  const handleUploadGallery = async () => {
    const files = galleryRef.current.files;
    if (!files.length) return setGallery(null);

    const uploaded = [];

    for (let i = 0; i < files.length; i++) {
      toast.info(`Uploading gallery ${i + 1} of ${files.length}...`);
      const photo = await uploader(files[i]);

      console.log(uploaded);
      uploaded.push(photo);
    }

    setGallery(uploaded.join("|"));
  };

  const onSubmit = async (data) => {
    data.master_plan_photo = masterPlanImage;
    data.basic_plan_photo = basicPlanImage;
    data.gallery = gallery;

    try {
      const res = await axios.post("/housing_models", data);
      toast.success("Housing Model Created");
      router.replace("/housing-models");
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
              <label htmlFor="heading">Heading</label>
              <input
                type="text"
                className="form-control"
                id="heading"
                defaultValue=""
                {...register("heading", { required: true })}
              />
              {errors.heading && (
                <span className="text-danger">This field is required</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                rows={5}
                className="form-control"
                id="description"
                defaultValue=""
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                defaultValue=""
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-danger">This field is required</span>
              )}
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
              {errors.bedrooms && (
                <span className="text-danger">This field is required</span>
              )}
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
              {errors.bathrooms && (
                <span className="text-danger">This field is required</span>
              )}
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
              {errors.width && (
                <span className="text-danger">This field is required</span>
              )}
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
              {errors.garages && (
                <span className="text-danger">This field is required</span>
              )}
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
              {errors.patios && (
                <span className="text-danger">This field is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="gallery">Gallery</label>
              <input
                required
                type="file"
                multiple={true}
                className="form-control"
                id="gallery"
                ref={galleryRef}
                onChange={handleUploadGallery}
              />
            </div>

            <div className="form-group">
              <label htmlFor="master_plan">Master Plan</label>
              <input
                required
                type="file"
                className="form-control"
                id="master_plan"
                ref={masterPlanImageRef}
                onChange={handleUploadMasterPlan}
              />
            </div>

            <div className="form-group">
              <label htmlFor="basic_plan">Basic Plan</label>
              <input
                required
                type="file"
                className="form-control"
                id="basic_plan"
                ref={basicPlanImageRef}
                onChange={handleUploadBasicPlan}
              />
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
