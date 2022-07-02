import React from "react";
import { Route, Routes } from "react-router-dom";
import DonationAdDetail from "../../Components/Donation/DonationAdDetail";
import DonationAds from "../../Components/Donation/DonationAds";
import PendingAdDetail from "../../Components/Pending/PendingAdDetail";
import PendingAds from "../../Components/Pending/PendingAds";

const Admin = () => {
  return (
    <div className="">
      <Routes>
        <Route path="donation" element={<DonationAds />} />
        <Route path="donation/:id" element={<DonationAdDetail />} />
        <Route path="pendingAds" element={<PendingAds />} />
        <Route path="pendingAds/:adid" element={<PendingAdDetail />} />
      </Routes>
    </div>
  );
};

export default Admin;
