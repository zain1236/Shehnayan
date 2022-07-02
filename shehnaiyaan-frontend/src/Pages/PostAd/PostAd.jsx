import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostAdComp from "../../Components/PostAd/PostAdComp";

const PostAd = () => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  useEffect(() => {
    if (userType !== "Receiver") {
      navigate("/home");
    }
  }, [userType, navigate]);
  return (
    <div>
      {" "}
      <PostAdComp />{" "}
    </div>
  );
};

export default PostAd;
