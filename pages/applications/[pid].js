import axios from "apis/axios";
import Layout from "components/Layout/Layout";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function Application() {
  const [application, setApplication] = useState({});
  const router = useRouter();
  const { pid } = router.query;
  const [deps, setDeps] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.put(`/applications/${pid}`, data);
      toast.success("Application updated");
      setDeps(Math.random());
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    pid &&
      axios
        .get(`/applications/${pid}`)
        .then((res) => {
          console.log(res.data);
          setApplication(res.data);
        })
        .catch((err) => {});
  }, [pid, deps]);

  return (
    <Layout>
      <div className="card card-shadow">
        <div className="card-body">
          <h3 className="card-title mb-5">Application Details</h3>
          <p>
            <strong>First Name:</strong>
            <span className="ms-3">{application.fname}</span>
          </p>
          <p>
            <strong>Last Name:</strong>
            <span className="ms-3">{application.lname}</span>
          </p>
          <p>
            <strong>NIB No:</strong>
            <span className="ms-3">{application.nib_no}</span>
          </p>
          <p>
            <strong>Email Address:</strong>
            <span className="ms-3">{application.email}</span>
          </p>
          <p>
            <strong>Phone No:</strong>
            <span className="ms-3">{application.phone}</span>
          </p>
          <p>
            <strong>Country of Birth:</strong>
            <span className="ms-3">{application.country_of_birth}</span>
          </p>
          <p>
            <strong>Island of Birth:</strong>
            <span className="ms-3">{application.island_of_birth}</span>
          </p>
          <p>
            <strong>Country of Citizenship:</strong>
            <span className="ms-3">{application.country_of_citizenship}</span>
          </p>
          <p>
            <strong>Gender:</strong>
            <span className="ms-3">{application.gender}</span>
          </p>
          <p>
            <strong>DOB:</strong>
            <span className="ms-3">{application.dob}</span>
          </p>
          <p>
            <strong>House No:</strong>
            <span className="ms-3">{application.house_no}</span>
          </p>
          <p>
            <strong>Street Address:</strong>
            <span className="ms-3">{application.street_address}</span>
          </p>
          <p>
            <strong>PO Box:</strong>
            <span className="ms-3">{application.po_box}</span>
          </p>
          <p>
            <strong>Island:</strong>
            <span className="ms-3">{application.island}</span>
          </p>
          <p>
            <strong>Country:</strong>
            <span className="ms-3">{application.country}</span>
          </p>
          <p>
            <strong>Home Phone:</strong>
            <span className="ms-3">{application.home_phone}</span>
          </p>
          <p>
            <strong>Passport No:</strong>
            <span className="ms-3">{application.passport_no}</span>
          </p>
          <p>
            <strong>Passport Expiry:</strong>
            <span className="ms-3">{application.passport_expiry}</span>
          </p>
          <p>
            <strong>Driving Licence No:</strong>
            <span className="ms-3">{application.driving_licence_no}</span>
          </p>
          <p>
            <strong>NIB Photo:</strong>
            <Link
              href={process.env.NEXT_PUBLIC_IMAGE_URL + application.nib_photo}
            >
              <a className="ms-3" target="_blank">
                View Attachment
              </a>
            </Link>
          </p>
          <p>
            <strong>Passport Photo:</strong>
            <Link
              href={
                process.env.NEXT_PUBLIC_IMAGE_URL + application.passport_photo
              }
            >
              <a className="ms-3" target="_blank">
                View Attachment
              </a>
            </Link>
          </p>
          <p>
            <strong>Employer:</strong>
            <span className="ms-3">{application.employer}</span>
          </p>
          <p>
            <strong>Industry:</strong>
            <span className="ms-3">{application.industry}</span>
          </p>
          <p>
            <strong>Position:</strong>
            <span className="ms-3">{application.position}</span>
          </p>
          <p>
            <strong>Work Phone:</strong>
            <span className="ms-3">{application.work_phone}</span>
          </p>
          <p>
            <strong>Payment Slip Photo:</strong>

            <Link
              href={
                process.env.NEXT_PUBLIC_IMAGE_URL + application.payment_slip
              }
            >
              <a className="ms-3" target="_blank">
                View Attachment
              </a>
            </Link>
          </p>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label>Application Status:</label>

              <select
                defaultValue={application.status}
                {...register("status")}
                className="ms-3"
              >
                <option value="submitted">Submitted</option>
                <option value="reviewing">Reviewing</option>
                <option value="approved">Approved</option>
                <option value="declined">Declined</option>
                <option value="resubmit">Resubmit</option>
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Comments:</label>
              <textarea
                {...register("comments")}
                rows={5}
                className="form-control"
              />
            </div>
            <input
              className="btn btn-primary mt-3"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Application);
