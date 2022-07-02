import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";

const StatusComp = () => {
  const [myAds, setMyAds] = useState();
  const token = localStorage.getItem("token");

  const fetchData = useCallback(() => {
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/v1/ad/myAd`, config)
      .then((data) => {
        setMyAds(data.data);
      });
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full bg-white">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th></th>
              <th>Total Amount</th>
              <th>Donation Recieved</th>
              <th>Donation Remaining</th>
              <th>Date of Posting </th>
              <th>Delivery Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* <!-- row 1 --> */}
            {myAds?.map((ad, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{ad.totalAmount}</td>
                <td>{ad.amountPaid}</td>
                <td>
                  {ad.totalAmount - ad.amountPaid < 0
                    ? "0"
                    : ad.totalAmount - ad.amountPaid}
                </td>
                <td>{ad.date.slice(0, 10)}</td>
                <td>{ad.deliveryDate.slice(0, 10)}</td>
                <td className="">
                  {ad.status === "Completed" ? (
                    <span className="btn btn-success btn-active no-animation text-white">
                      {" "}
                      {ad.status}{" "}
                    </span>
                  ) : ad.status === "Live" ? (
                    <span className="btn btn-info btn-active no-animation w-[80px] text-white">
                      {" "}
                      {ad.status}{" "}
                    </span>
                  ) : ad.status === "Reject" ? (
                    <span className="btn btn-warning btn-active no-animation text-white">
                      {" "}
                      {ad.status}ed{" "}
                    </span>
                  ) : (
                    <span className="btn btn-error btn-active no-animation text-white">
                      {" "}
                      {ad.status}{" "}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatusComp;
