import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const PostAdComp = () => {
  const [state, setState] = useState({
    applicantName: "",
    applicantContact: "",
    applicantCnic: "",
    applicantHomeAdd: "",
    houseOwner: "",
    applicantJobOcc: "",
    applicantSalary: "",
    guardianName: "",
    // guardianContact: "",
    guardianRelation: "",
    guardianCnic: "",
    guardianJobOcc: "",
    guardianSalary: "",
    adDeliveryDate: new Date(),
    itemsNeeded: [],
    CNICImage: "",
    electricityBillImage: "",
    totalAmount: 39082,
  });

  const [isLoading, setisLoading] = useState();

  const navigate = useNavigate();
  //=========================== Image HANDLERS =========================================================

  const handleElectricityImage = (e) => {
    const file = e.target.files[0];
    setFiletoBase(file);
  };
  const handleCNICImage = (e) => {
    const file = e.target.files[0];
    setFileCNICBase(file);
  };
  const setFiletoBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setState((prev) => ({ ...prev, electricityBillImage: reader.result }));
    };
  };
  const setFileCNICBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setState((prev) => ({ ...prev, CNICImage: reader.result }));
    };
  };
  //===========================================================================

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      applicantName: state.applicantName,
      applicantContactNo: state.applicantContact,
      applicantCNIC: state.applicantCnic,
      applicantAddress: state.applicantHomeAdd,
      houseOwnership: state.houseOwner,
      applicantJobOccupation: state.applicantJobOcc,
      applicantSalary: state.applicantSalary,
      guardianName: state.guardianName,
      guardianRelationWithApplicant: state.guardianRelation,
      guardianCNIC: state.guardianCnic,
      guardianJobOccupation: state.guardianJobOcc,
      guardianSalary: state.guardianSalary,
      deliveryDate: state.adDeliveryDate,
      itemsNeeded: state.itemsNeeded,
      totalAmount: state.totalAmount,
      CNICImage: state.CNICImage,
      electricityBillImage: state.electricityBillImage,
    };

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    setisLoading(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/v1/ad`, data, config)
      .then((data) => {
        console.log("Added Successfully", data.data);
        toast.success(`Successfully Posted the Ad.`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/status");
        }, 4000);
      })
      .then(() => setisLoading(false))
      .catch((err) => {
        setisLoading(false);
        toast.error(`${err.response.data.error}`, {
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

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setState((prev) => ({
        ...prev,
        itemsNeeded: [...prev.itemsNeeded, value],
      }));
    }
  };

  return (
    <div className="flex justify-center items-center bg-postAd bg-cover  ">
      <form
        className=" w-[1000px]  bg-transparent backdrop-blur-lg shadow-2xl my-20 rounded-md p-8"
        onSubmit={submitHandler}
      >
        <span className="text-2xl font-medium text-black underline">
          Enter your Credentials for Posting Ads
        </span>
        <div className="grid  grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8">
          <div className="mr-3">
            <input
              onChange={(e) =>
                setState({ ...state, applicantName: e.target.value })
              }
              placeholder="Applicant's Name*"
              required
              type="text"
              className="outline-none mt-10 rounded-md my-4 w-[250px] h-9 p-2 border text-slate-700"
            />
            <input
              onChange={(e) =>
                setState({ ...state, applicantContact: e.target.value })
              }
              placeholder="Applicant's Contact No.*"
              required
              type="text"
              className="outline-none  rounded-md  w-[250px] h-9 p-2 border text-slate-700"
            />{" "}
            <input
              onChange={(e) =>
                setState({ ...state, applicantCnic: e.target.value })
              }
              placeholder="Applicant's Cnic No.*"
              type="text"
              className="outline-none rounded-md my-4 w-[250px] h-9 p-2 border text-slate-700"
              required
            />
            <input
              onChange={(e) =>
                setState({ ...state, applicantHomeAdd: e.target.value })
              }
              placeholder="Applicant's Home Address"
              type="text"
              className="outline-none  rounded-md  w-[250px] h-9 p-2 border text-slate-700"
            />{" "}
            <select
              className="select select-ghost max-w-xs w-[250px] h-4 my-3 focus:bg-slate-200 "
              onChange={(e) =>
                setState({ ...state, houseOwner: e.target.value })
              }
            >
              <option disabled selected>
                House Ownership
              </option>
              <option value={"Own"}>Own</option>
              <option value={"Rent"}>Rent</option>
            </select>
            <input
              onChange={(e) =>
                setState({ ...state, applicantJobOcc: e.target.value })
              }
              placeholder="Applicant's Job Occupation"
              type="text"
              className="outline-none  rounded-md  w-[250px] h-9 p-2 border text-slate-700"
            />{" "}
            <input
              onChange={(e) =>
                setState({ ...state, applicantSalary: e.target.value })
              }
              placeholder="Applicant's Salary"
              type="text"
              className="outline-none  rounded-md my-4 w-[250px] h-9 p-2 border text-slate-700"
            />
            {/*==================  CNIC IMAGE ================== */}
            <div>
              <label htmlFor="" className="text-black">
                Applicant's Cnic picture
              </label>
              <input
                placeholder=""
                type="file"
                className="outline-none  rounded-md  w-[250px] h-9 p-2 text-slate-700"
                name="CNICImage"
                onChange={handleCNICImage}
              />
            </div>
          </div>
          <div className="mr-3">
            <input
              onChange={(e) =>
                setState({ ...state, guardianName: e.target.value })
              }
              placeholder=" Guardian's Name"
              required
              type="text"
              className="outline-none mt-10 rounded-md my-4 w-[250px] h-9 p-2 border text-slate-700"
            />
            <input
              onChange={(e) =>
                setState({ ...state, guardianContact: e.target.value })
              }
              placeholder="Guardian's Contact No."
              required
              type="text"
              className="border outline-none  rounded-md  w-[250px] h-9 p-2 text-slate-700"
            />{" "}
            <input
              onChange={(e) =>
                setState({ ...state, guardianRelation: e.target.value })
              }
              placeholder="Guardian's Relationship with applicant."
              type="text"
              className="outline-none rounded-md my-4 w-[250px] h-9 p-2 border text-slate-700"
              required
            />
            <input
              onChange={(e) =>
                setState({ ...state, guardianCnic: e.target.value })
              }
              placeholder="Guardian's Cnic"
              type="text"
              className="outline-none  rounded-md  w-[250px] h-9 p-2 border text-slate-700"
            />{" "}
            <input
              onChange={(e) =>
                setState({ ...state, guardianJobOcc: e.target.value })
              }
              placeholder="Guardian's Job Occupation"
              type="text"
              required
              className="outline-none  rounded-md my-4 w-[250px] h-9 p-2 border text-slate-700"
            />
            <input
              onChange={(e) =>
                setState({ ...state, guardianSalary: e.target.value })
              }
              placeholder="Guardian's Salary"
              type="text"
              className="outline-none  rounded-md w-[250px] h-9 p-2 border text-slate-700"
            />
            {/*==================  ELECTRICITY IMAGE ================== */}
            <div className="mt-3 text-slate-500">
              <label htmlFor="" className="text-black">
                Electricity Bill Picture
              </label>
              <input
                placeholder=""
                type="file"
                className="outline-none  rounded-md  w-[250px] h-9 p-2 "
                name="electricityBillImage"
                onChange={handleElectricityImage}
              />
            </div>
            <div className=" flex flex-col my-3">
              <label htmlFor="" className="text-slate-700">
                Delivery Date
              </label>
              <input
                onChange={(e) =>
                  setState({ ...state, adDeliveryDate: e.target.value })
                }
                placeholder="Delivery Date"
                type="date"
                className="outline-none  rounded-md w-[250px] h-9 p-2 border"
              />
            </div>
          </div>
          {/* =========================== ITEMS NEEDED ======================== */}

          <div className="mt-10 flex flex-col mr-3 ">
            <input
              placeholder="Item's Needed"
              type="text"
              className="outline-none  rounded-md w-[250px] h-9 p-2 border"
              disabled
            />
            <div className="my-3">
              <input
                type="checkbox"
                name="Bed set (Bed, Mattress, Wardrobe)"
                id="bed"
                value="Bed set (Bed, Mattress, Wardrobe)"
                onChange={handleCheckBox}
                // checked={languages["Bed set (Bed, Mattress, Wardrobe)"]}
              />
              <label htmlFor="bed" className="ml-3 text-slate-700">
                Bed set (Bed, Matress, Wardrobe)
              </label>
            </div>{" "}
            <div className="my-3">
              <input
                type="checkbox"
                name="Washing machine"
                id="machine"
                value="Washing machine"
                onChange={handleCheckBox}
              />
              <label htmlFor="machine" className="ml-3 text-slate-700">
                Washing Machine
              </label>
            </div>{" "}
            <div className="my-3">
              <input
                type="checkbox"
                name="ref"
                id="ref"
                value="Refrigerator"
                onChange={handleCheckBox}
              />
              <label htmlFor="ref" className="ml-3 text-slate-700">
                Refrigerator
              </label>
            </div>{" "}
            <div className="my-3">
              <input
                type="checkbox"
                name="cock"
                id="cock"
                value="Crockery"
                onChange={handleCheckBox}
              />
              <label htmlFor="cock" className="ml-3 text-slate-700">
                Crockery
              </label>
            </div>{" "}
            <div className="my-3">
              <input
                type="checkbox"
                name="grinder"
                id="grinder"
                value="Grinder"
                onChange={handleCheckBox}
              />
              <label htmlFor="grinder" className="ml-3 text-slate-700">
                Grinder
              </label>
            </div>{" "}
            <div className="my-3">
              <input
                type="checkbox"
                name="juice"
                id="juice"
                value="Juicer"
                onChange={handleCheckBox}
              />
              <label htmlFor="juice" className="ml-3 text-slate-700">
                Juicer
              </label>
            </div>{" "}
            <div className="my-3">
              <input
                type="checkbox"
                name="iron"
                id="iron"
                value="Iron"
                onChange={handleCheckBox}
              />
              <label htmlFor="iron" className="ml-3 text-slate-700">
                Iron
              </label>
            </div>
          </div>
        </div>
        <button
          className={` btn ${
            isLoading && "loading"
          } outline-none border-none w-full p-3 my-3 bg-indigo-500 hover:bg-indigo-700 rounded-md  text-white px-8 text-center`}
        >
          {isLoading ? "Uploading" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostAdComp;
