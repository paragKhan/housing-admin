import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function HousingModel() {
  const [housingModel, setHousingModel] = useState({});
  const router = useRouter();
  const { pid } = router.query;
  const [deps, setDeps] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    pid &&
      axios
        .get(`/housing_models/${pid}`)
        .then((res) => {
          setHousingModel(res.data);
        })
        .catch((err) => {});
  }, [deps, pid]);

  return (
    <Layout>
      <div className="card card-shadow">
        <div className="card-body px-3">
          <h3 className="card-title mb-5">Housing Model Details</h3>
          {housingModel.gallery && (
            <Slider {...settings}>
              {housingModel.gallery.split("|").map((image, index) => (
                <div className="d-flex justify-content-center" key={index}>
                  <Image
                    height={600}
                    width={600}
                    objectFit="cover"
                    objectPosition="center"
                    src={process.env.IMAGE_URL + image}
                    alt="Housing Model"
                    className="img-fluid"
                  />
                </div>
              ))}
            </Slider>
          )}
          <p className="mt-5">
            <strong>Heading:</strong>
            <span className="ms-3">{housingModel.heading}</span>
          </p>
          <p>
            <strong>Location:</strong>
            <span className="ms-3">{housingModel.location}</span>
          </p>

          <p>
            <strong>Description:</strong>
            <br />
            <span className="small">{housingModel.description}</span>
          </p>

          <p>
            <strong>Bedrooms:</strong>
            <span className="small ms-3">
              {housingModel.bedrooms || "No Data provided"}
            </span>
          </p>
          <p>
            <strong>Bathrooms:</strong>
            <span className="small ms-3">
              {housingModel.bathrooms || "No Data provided"}
            </span>
          </p>
          <p>
            <strong>Area:</strong>
            <span className="small ms-3">
              {housingModel.width || "No Data provided"}
            </span>
          </p>
          <p>
            <strong>Garages:</strong>
            <span className="small ms-3">
              {housingModel.garages || "No Data provided"}
            </span>
          </p>
          <p>
            <strong>Patios:</strong>
            <span className="small ms-3">
              {housingModel.patios || "No Data provided"}
            </span>
          </p>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Master Plan
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Basic Plan
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <img
                className="img-fluid"
                src={process.env.IMAGE_URL + housingModel.master_plan_photo}
              />
            </div>
            <div
              className="tab-pane fade"
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
            >
              <img
                className="img-fluid"
                src={process.env.IMAGE_URL + housingModel.basic_plan_photo}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
