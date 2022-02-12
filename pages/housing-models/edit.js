import axios from "apis/axios";
import uploader from "apis/uploader";
import Layout from "components/Layout/Layout";
import { errorify } from "helpers";
import { useRouter } from "next/router";
import React, { createRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function EditHousingModel() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [housingModel, setHousingModel] = useState(null);

  const [gallery, setGallery] = useState(null);
  const [basicPlanImage, setBasicPlanImage] = useState(null);
  const [masterPlanImage, setMasterPlanImage] = useState(null);

  const galleryRef = createRef();
  const basicPlanImageRef = createRef();
  const masterPlanImageRef = createRef();

  const router = useRouter();
  const { id } = router.query;

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
    if (masterPlanImage) data.master_plan_image = masterPlanImage;
    if (basicPlanImage) data.basic_plan_image = basicPlanImage;
    if (gallery) data.gallery = gallery;

    try {
      const res = await axios.put(`/housing_models/${id}`, data);
      toast.success("Housing Model Created");
      router.replace("/housing-models");
    } catch (err) {
      errorify(err);
    }
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
              </div>
              <div className="form-group">
                <label htmlFor="gallery">Gallery</label>
                <input
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
                value="Update"
              />
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
