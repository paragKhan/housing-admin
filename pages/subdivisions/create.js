import axios from "apis/axios";
import uploader from "apis/uploader";
import Layout from "components/Layout/Layout";
import { errorify } from "helpers";
import router from "next/router";
import React, { createRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateSubdivision() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const imageRef = createRef();

  const handleImageUpload = async () => {
    const file = imageRef.current.files[0];

    toast.info("Uploading image...");
    const photo = await uploader(file);
    toast.success("Image uploaded");

    setImage(photo);
  };

  const onSubmit = async (data) => {
    if (!image) {
      toast.error("Please upload an image");
      return;
    }
    try {
      const res = await axios.post("/subdivisions", { ...data, photo: image });
      toast.success("Subdivision added");
      router.replace("/subdivisions");
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
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                className="form-control"
                id="photo"
                defaultValue=""
                required
                ref={imageRef}
                onChange={handleImageUpload}
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
