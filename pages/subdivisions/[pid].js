import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

function Subdivision() {
  const [subdivision, setSubdivision] = useState({});
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
        .get(`/subdivisions/${pid}`)
        .then((res) => {
          setSubdivision(res.data);
          console.log(res.data);
        })
        .catch((err) => {});
  }, [deps, pid]);

  return (
    <Layout>
      <div className="card card-shadow">
        <div className="card-body">
          <h3 className="card-title mb-5">Subdivision Details</h3>
          <div>
            <strong>Heading:</strong>
            <span className="ms-3">{subdivision.heading}</span>
          </div>
          <div>
            <strong>Location:</strong>
            <span className="ms-3">{subdivision.location}</span>
          </div>
          <div>
            <strong>Gallery:</strong>
            {subdivision.gallery && (
              <Slider {...settings}>
                {subdivision.gallery.map((photo, index) => (
                  <div className="d-flex justify-content-center" key={index}>
                    <Image
                      height={600}
                      width={600}
                      objectFit="cover"
                      objectPosition="center"
                      src={photo.original}
                      alt="Housing Model"
                      className="img-fluid"
                    />
                  </div>
                ))}
              </Slider>
            )}
          </div>
          <div>
            <strong>Description:</strong>
            <p className="small">{subdivision.description}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Subdivision);
