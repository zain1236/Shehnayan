import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FsLightbox from "fslightbox-react";
import { useNavigate } from "react-router-dom";

// import FsLightbox from "fslightbox-react";

const DonateComp = () => {
  const [ads, setAds] = useState();
  const [isLoading, setisLoading] = useState();
  const [toggler, setToggle] = useState();
  const [method, setMethod] = useState();
  const [paymentInfo, setPaymentinfo] = useState({
    step: 1,
    paymentMethod: "",
    amountImg: "",
    phNumber: "",
    donationAmount: 0,
  });

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchData = useCallback(() => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/ad/live`, config)
      .then((data) => {
        setAds(data.data);
      });
  }, [token]);

  const handleAmountimg = (e) => {
    const file = e.target.files[0];
    setFiletoBase(file);
  };
  const setFiletoBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPaymentinfo((prev) => ({ ...prev, amountImg: reader.result }));
    };
  };

  const donateHandler = (id) => {
    setisLoading(true);
    const data = {
      donationProof: paymentInfo.amountImg,
      method: method,
    };

    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/v1/donation/makeDonation/${id}`,
        data,
        config
      )
      .then((data) => {
        setisLoading(false);

        navigate("/");
        toast.success("Successfully Donated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        setisLoading(false);
        toast.error(err.response.data.error, {
          position: "top-right",
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
    <div className="w-full h-auto flex justify-center items-center mt-10 mb-5">
      {/* Container */}
      <div className="w-full h-auto bg-slate-300 rounded-md p-10">
        <span className="text-3xl font-medium text-slate-600  ">
          Donate Here
        </span>
        <div className="w-full h-auto mt-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {ads?.map(
            (ads, i) =>
              ads.status === "Live" && (
                <div
                  className=" place-self-center w-[300px] h-auto rounded-md bg-white flex flex-col items-center p-5 mt-9"
                  key={i}
                >
                  <h2 className="text-2xl font-medium text-slate-800">
                    Ad no {i + 1}
                  </h2>
                  <div className="flex items-center mt-2">
                    <label htmlFor="" className="text-black">
                      {" "}
                      Total Amount:{" "}
                    </label>
                    <span className="p-1 px-8 w-32 text-center border-2 rounded-[1rem] ml-3 text-slate-700">
                      {ads.totalAmount}
                    </span>
                  </div>
                  <div className="flex items-center mt-2  ">
                    <label htmlFor="" className="text-black mr-4">
                      Remaining:{" "}
                    </label>
                    <span className=" p-1 px-8 w-32 text-center border-2 rounded-[1rem] ml-3 text-slate-700">
                      {ads.totalAmount - ads.amountPaid}
                    </span>
                  </div>
                  <div className="flex items-center my-2">
                    <label htmlFor="" className="text-black">
                      Delivery Date{" "}
                    </label>
                    <span className="p-1 px-5 w-32 border-2 rounded-[1rem] ml-3 text-slate-700">
                      {ads.deliveryDate.slice(0, 10)}
                    </span>
                  </div>

                  <label
                    htmlFor={`my-modal-${i}`}
                    className=" btn border-none  mt-auto bg-slate-300 w-full rounded-[1rem] hover:bg-slate-400 text-black"
                  >
                    {" "}
                    Donate{" "}
                  </label>

                  {/* ==================================== MODAL ================================= */}

                  <input
                    type="checkbox"
                    id={`my-modal-${i}`}
                    className="modal-toggle"
                  />
                  <div className="modal ">
                    <div className="modal-box w-11/12 max-w-5xl min-h-[400px] flex flex-col bg-white">
                      {paymentInfo.step === 1 && (
                        <>
                          <form
                            className="flex flex-col items-center p-4 h-full "
                            onSubmit={donateHandler.bind(null, ads._id)}
                          >
                            <h1 className="text-2xl text-black font-medium">
                              Enter your {paymentInfo.paymentMethod} Account
                              Details
                            </h1>
                            <br />
                            <h1 className="text-2xl font-medium text-slate-700">
                              Total Amount {ads.totalAmount} PKR
                            </h1>
                            <h1 className="text-2xl font-medium text-slate-700">
                              Donation Need {ads.totalAmount - ads.amountPaid}{" "}
                              PKR
                            </h1>

                            <select
                              className="select select-info w-full max-w-xs bg-slate-100 text-black mt-5"
                              onChange={(e) => setMethod(e.target.value)}
                            >
                              <option disabled selected>
                                Select Payment Method
                              </option>
                              <option>HBL Bank </option>
                              <option>JazzCash</option>
                              <option>EasyPaisa</option>
                            </select>

                            {method === "HBL Bank" ? (
                              <>
                                <span className="my-4 text-slate-700">
                                  {" "}
                                  HBL Account Number : 453984952382657{" "}
                                </span>
                              </>
                            ) : method === "JazzCash" ? (
                              <>
                                <span className="my-4 text-slate-700">
                                  {" "}
                                  JazzCash Acc : 03472834683
                                </span>
                              </>
                            ) : (
                              <>
                                {" "}
                                <span className="my-4 text-slate-700">
                                  {" "}
                                  EasyPaisa Acc: 03238426384{" "}
                                </span>{" "}
                              </>
                            )}

                            <label htmlFor="donate" className="m-2">
                              Attach the Screenshot of your Sent Amount{" "}
                            </label>
                            <input
                              type="file"
                              name=""
                              id="donate"
                              className="my-2"
                              onChange={handleAmountimg}
                              required
                            />
                            <br />
                            <img
                              onClick={() => setToggle(!toggler)}
                              src={paymentInfo.amountImg}
                              alt=""
                              className=" object-cover w-[200px] h-[200px] rounded-2xl bg-contain mb-10"
                            />
                            <FsLightbox
                              toggler={toggler}
                              sources={[paymentInfo.amountImg]}
                              key={1}
                              className=""
                            />
                            <div className="mt-auto  modal-action ">
                              <label
                                htmlFor={`my-modal-${i}`}
                                className="btn mr-3"
                              >
                                Close
                              </label>
                              <button
                                className={`btn ${
                                  isLoading && "loading"
                                } bg-indigo-500 w-[200px] border-none text-white hover:bg-indigo-700`}
                              >
                                {isLoading ? "Donating" : "Donate"}
                              </button>
                            </div>
                          </form>
                          {/* =========================== Modal End =============== */}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default DonateComp;
