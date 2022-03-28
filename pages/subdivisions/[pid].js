import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Subdivision() {
  const [subdivision, setSubdivision] = useState({});
  const router = useRouter();
  const { pid } = router.query;
  const [deps, setDeps] = useState(null);

  useEffect(() => {
    pid &&
      axios
        .get(`/subdivisions/${pid}`)
        .then((res) => {
          setSubdivision(res.data);
        })
        .catch((err) => {});
  }, [deps, pid]);

  return (
    <Layout>
      <div className="card card-shadow">
        <div className="card-body">
          <h3 className="card-title mb-5">Subdivision Details</h3>
          <p>
            <strong>Heading:</strong>
            <span className="ms-3">{subdivision.heading}</span>
          </p>
          <p>
            <strong>Location:</strong>
            <span className="ms-3">{subdivision.location}</span>
          </p>
          <p>
            <strong>Photo:</strong>[click on the image to view full size]
            <br />
            <Link href={process.env.NEXT_PUBLIC_IMAGE_URL + subdivision.photo}>
              <a target="_blank">
                <img
                  height="200px"
                  src={process.env.NEXT_PUBLIC_IMAGE_URL + subdivision.photo}
                />
              </a>
            </Link>
          </p>
          <p>
            <strong>Description:</strong>
            <p className="small">{subdivision.description}</p>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Subdivision);
