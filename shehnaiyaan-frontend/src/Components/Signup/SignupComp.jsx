import React, { useState } from "react";
import pix from "../../Used Images/RegistrationImage.jpeg";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupComp = () => {
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [contact, setContact] = useState();
  const [cnic, setCNIC] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [navigate, token]);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      fullName: fullname,
      email: email,
      mobile: contact,
      CNIC: cnic,
      address: address,
      password,
      userType,
    };

    // post Request

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/v1/user/signup`, data)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userType", userType);
        navigate("/home", { replace: true });
        toast.success("👋 Welcome to Shehnaiyan!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex items-center justify-center p-10 bg-register bg-cover ">
      <form
        className=" flex w-[900px] bg-[#5DB6BC]  rounded-lg  "
        onSubmit={submitHandler}
      >
        <div className=" hidden md:flex flex-[8]  ">
          <img
            src={pix}
            alt=""
            className=" md:h-full rounded-bl-lg rounded-tl-lg "
          />
        </div>
        <div className=" flex-[8] flex flex-col items-center p-10 ">
          {" "}
          <span className="text-3xl text-white font-serif ">
            {" "}
            Register
          </span>{" "}
          <input
            required
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Full Name"
            type="text"
            className="outline-none mt-10 rounded-md my-4 w-[250px] h-9 p-2"
          />
          <input
            required
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="text"
            className="outline-none rounded-md w-[250px] h-9 p-2"
          />
          <input
            required
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact No"
            type="text"
            className="outline-none rounded-md my-4 w-[250px] h-9 p-2"
          />
          <input
            required
            onChange={(e) => setCNIC(e.target.value)}
            placeholder="CNIC"
            type="text"
            className="outline-none rounded-md w-[250px] h-9 p-2"
          />
          <input
            required
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            type="text"
            className="outline-none rounded-md my-4 w-[250px] h-9 p-2"
          />
          <input
            required
            placeholder="Password"
            type="password"
            className="outline-none  rounded-md  w-[250px] h-9 p-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col items-center mt-2 ">
            <button
              className=" btn border-none hover:bg-indigo-600 w-full p-3 my-3 bg-indigo-500 rounded-md  text-white px-8 text-center"
              onClick={() => setUserType("Donor")}
            >
              Register as Donor
            </button>
            <div className="text-slate-800 divider">OR</div>
            <button
              className=" btn border-none hover:bg-indigo-600 w-full p-3 my-3 bg-indigo-500 rounded-md  text-white px-8 text-center"
              onClick={() => setUserType("Receiver")}
            >
              {" "}
              Register as Acceptor
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupComp;
