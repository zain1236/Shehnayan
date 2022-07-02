import axios from "axios";
import FsLightbox from "fslightbox-react";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
import { toast } from "react-toastify";

const DonationAds = () => {
  const [donations, setDonations] = useState();
  const [toggler, setToggler] = useState();
  const [isLoading, setIsLoading] = useState();

  const donationRef = useRef();
  const token = localStorage.getItem("token");
  const fetchData = useCallback(() => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/donation`, config)
      .then((data) => {
        setDonations(data.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const approveDonationHandler = (donationId, adId) => {
    setIsLoading(true);
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/v1/donation/${donationId}`,
        {},
        config
      )
      .then((data) => console.log("Donation Accepted = true", data.data))
      .catch((err) => {
        setIsLoading(false);
      });

    const data = {
      donation: donationRef.current.value,
    };

    axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/v1/ad/approveDonation/${adId}`,
        data,
        config
      )
      .then((data) => {
        setIsLoading(false);
        console.log("Donation approved", data.data);
        toast.success("Successfully Approved", {
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
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex justify-center p-10">
      <div className="overflow-x-auto w-full">
        <table className="table table-zebra w-full bg-slate-600">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Donation Amount</th>
              <th>Total Amount</th>
              <th>Remaining Amount</th>
              <th>Donation Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}

            {donations?.length > 0 ? (
              donations?.map((donation, i) => (
                <React.Fragment key={i}>
                  {!donation.acceptance && (
                    <tr>
                      <th>{i + 1}</th>
                      <td>{donation.donationAmount}</td>
                      <td>{donation.ad.totalAmount}</td>
                      <td>
                        {donation.ad.totalAmount - donation.ad.amountPaid}
                      </td>
                      <td>{donation.date.slice(0, 10)}</td>
                      <th>
                        <label
                          htmlFor={`my-modal-${i}`}
                          className="btn btn-ghost btn-xs"
                          // onClick={detailBtnHandler.bind(null, ad._id)}
                        >
                          details
                        </label>

                        {/* <!-- Put this part before </body> tag --> */}
                        <input
                          type="checkbox"
                          id={`my-modal-${i}`}
                          className="modal-toggle"
                        />

                        {/* ================================= MODAL ================================= */}
                        <div className="modal ">
                          <div className="modal-box w-3/6 max-w-5xl min-h-4/6 bg-white ">
                            <div className="flex flex-col w-full h-full items-center">
                              <h1 className="font-bold text-3xl text-slate-800">
                                {" "}
                                Doantion Verification:
                              </h1>
                              <br />

                              <div className=" mt-10 flex flex-col font-medium text-xl text-slate-600">
                                <span className="text-slate-700  ">
                                  Donation Method : {donation?.method}
                                </span>
                                <span>
                                  Total Amount : {donation.ad.totalAmount}
                                </span>
                                <span>
                                  Remaining Amount :{" "}
                                  {donation.ad.totalAmount -
                                    donation.ad.amountPaid}
                                </span>
                                <input
                                  ref={donationRef}
                                  required
                                  type="number"
                                  placeholder="Donation Amount"
                                  className="input w-full max-w-xs mt-5 bg-slate-100 text-md text-slate-600"
                                />

                                <img
                                  src={donation.donationProof}
                                  alt=""
                                  className=" object-cover mt-3 w-[200px] h-[200px] my-5 text-center rounded-lg"
                                  onClick={() => setToggler(!toggler)}
                                />
                                <FsLightbox
                                  toggler={toggler}
                                  sources={[donation.donationProof]}
                                  key={i}
                                />
                              </div>

                              <div className="modal-action mt-auto">
                                <label
                                  htmlFor={`my-modal-${i}`}
                                  className="btn btn-error text-white"
                                >
                                  Close
                                </label>
                                <label
                                  htmlFor={`my-modal-${i}`}
                                  className="btn btn-error text-white"
                                >
                                  Reject
                                </label>
                                <label
                                  className={`btn ${
                                    isLoading && "loading"
                                  } text-white`}
                                  onClick={approveDonationHandler.bind(
                                    null,
                                    donation._id,
                                    donation.ad._id
                                  )}
                                >
                                  {isLoading ? "Approving" : "Approve Donation"}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* ================================= MODAL END ================================= */}
                      </th>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <div className="w-full flex justify-center">
                <span className="">No Pending Donations</span>
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationAds;
