import axios from "apis/axios";
import uploader from "apis/uploader";
import Layout from "components/Layout/Layout";
import { errorify } from "helpers";
import withAuth from "HOC/withAuth";
import { useRouter } from "next/router";
import React, { createRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function EditSubdivision() {
  const [subdivision, setSubdivision] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  const [image, setImage] = useState(null);
  const imageRef = createRef();

  const handleImageUpload = async () => {
    const file = imageRef.current.files[0];

    toast.info("Uploading image...");
    const photo = await uploader(file);
    setImage(photo);
    toast.success("Image uploaded");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (image) {
      data.photo = image;
    }
    try {
      const res = await axios.put(`/subdivisions/${id}`, data);
      toast.success("Subdivision updated");
      router.replace("/subdivisions");
    } catch (err) {
      errorify(err);
    }
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
              </div>
              <div className="form-group">
                <label htmlFor="description">Photo</label>
                <input
                  ref={imageRef}
                  onChange={handleImageUpload}
                  type="file"
                  className="form-control"
                  id="photo"
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

export default withAuth(EditSubdivision);
