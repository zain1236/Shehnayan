import axios from "axios";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PendingAds = () => {
  const [ads, setAds] = useState();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const fetchData = useCallback(() => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/ad/pending`, config)
      .then((data) => {
        setAds(data.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const detailBtnHandler = (id) => {
    // window.location = `/admin/pendingAds/${id}`;
    navigate(`/admin/pendingAds/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <>
      <div className="flex justify-center p-10">
        <div className="overflow-x-auto w-full">
          <table className="table table-zebra w-full bg-slate-600">
            {/* <!-- head --> */}
            <thead>
              <tr>
                <th></th>
                <th>Applicant Name</th>
                <th>Items Required</th>
                <th>Total Amount</th>
                <th>Delivery Date</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* <!-- row 1 --> */}
              {ads?.length > 0
                ? ads?.map((ad, i) => (
                    <tr key={i}>
                      <th>{i + 1}</th>
                      <td>{ad.applicantName}</td>
                      <td>
                        {ad.itemsNeeded.length > 1
                          ? `${ad.itemsNeeded[0]}, ...`
                          : ad.itemsNeeded[0]}
                      </td>
                      <td>{ad.totalAmount}</td>
                      <td>{ad.deliveryDate.slice(0, 10)}</td>
                      <td>{ad.status}</td>
                      <th>
                        <button
                          className="btn btn-ghost btn-xs"
                          onClick={detailBtnHandler.bind(null, ad._id)}
                        >
                          details
                        </button>
                      </th>
                    </tr>
                  ))
                : " No Data to Show"}
              {/* <!-- row 2 --> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PendingAds;
