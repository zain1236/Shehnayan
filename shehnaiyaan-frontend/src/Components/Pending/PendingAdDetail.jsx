import axios from "axios";
import FsLightbox from "fslightbox-react";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PendingAdDetail = () => {
  const [ad, setAd] = useState();
  const [toggler, setToggler] = useState(false);
  const productIndex = useState(0)[0];
  const [status, setStatus] = useState();
  const [isLoading, setisLoading] = useState();
  const params = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const fetchData = useCallback(() => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/v1/ad/pending/${params.adid}`,
        config
      )
      .then((data) => {
        setAd(data.data);
      })
      .catch((err) => console.log(err));
  }, [params, token]);

  const handleSubmit = () => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    if (status ===  "Pending") return;

    setisLoading(true);
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/v1/ad/${ad._id}`,
        { status },
        config
      )
      .then((data) => {
        setisLoading(false);
        toast.success("Successfully updated status!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/admin/pendingAds");
      })
      .catch((err) => {
        setisLoading(false);
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-teal-300 ">
      <div className="p-10 w-[1000px] min-h-[600px] bg-indigo-300 rounded-md mx-4 my-10 ">
        <span className=" text-violet-700 font-medium  text-2xl">
          Status: <span className="text-pink-600">{ad?.status}.</span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-10 ">
          <div className=" flex flex-col md:place-self-center">
            {" "}
            <span className="text-black text-xl mt-4">
              Applicant's Name: {ad?.applicantName}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Applicant's Contact No: {ad?.applicantContactNo}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Applicant's CNIC: {ad?.applicantCNIC}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Applicant's Salary: {ad?.applicantSalary}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Applicant's Address: {ad?.applicantAddress}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Applicant's Job Occupation: {ad?.applicantJobOccupation}
            </span>{" "}
          </div>
          <div className="flex flex-col md:place-self-center">
            {" "}
            <span className="text-black text-xl mt-4">
              Guardian's Name: {ad?.guardianName}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Guardian's Relationship with Applicant:{" "}
              {ad?.guardianRelationWithApplicant}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Guardian's CNIC: {ad?.guardianCNIC}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Guardian's Salary: {ad?.guardianSalary}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Guardian's Address: {ad?.applicantAddress}
            </span>{" "}
            <span className="text-black text-xl mt-4">
              Guardian's Job Occupation: {ad?.guardianJobOccupation}
            </span>{" "}
            <select
              className="select bg-white mt-4 w-full max-w-xs text-black"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option disabled selected>
                {ad?.status}
              </option>
              <option value={"Live"}>Live</option>
              <option value={"Reject"}>Reject</option>
            </select>
          </div>
          <span className="mt-10 ml-20 text-indigo-600 font-medium text-lg">
            Items Needed:{" "}
            <ul className=" list-disc ">
              {ad?.itemsNeeded.map((a) => (
                <li>{a}</li>
              ))}
            </ul>
          </span>
        </div>

        {/* ==================================== IMAGES ================================= */}
        <div className="carousel w-[400px] mt-10 h-[300px]">
          <div id="slide1" className="carousel-item relative w-full">
            <img
              src={ad?.electricityBillImage}
              className="w-full"
              alt=""
              onClick={() => setToggler(!toggler)}
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-[400px]">
            <img
              src={ad?.CNICImage}
              className="w-full"
              alt=""
              onClick={() => setToggler(!toggler)}
            />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <button
            className=" p-3 rounded-lg  mr-3 bg-red-400 outline-none text-white mt-5"
            onClick={() => navigate("/admin/pendingAds")}
          >
            Cancel
          </button>
          <button
            className={`btn ${
              isLoading && "loading"
            } btn-info outline-none text-white mt-5`}
            onClick={handleSubmit}
          >
            {isLoading ? "Updating Status" : "Submit"}
          </button>
        </div>
      </div>
      <FsLightbox
        toggler={toggler}
        sources={[ad?.electricityBillImage, ad?.CNICImage]}
        key={productIndex}
      />
    </div>
  );
};

export default PendingAdDetail;
