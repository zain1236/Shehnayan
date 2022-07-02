import axios from "axios";
import React, { useEffect, useState } from "react";
import login from "../../Used Images/LoginImage.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginComp = () => {
  const [email, setEmail] = useState();
  const [userType, setUserType] = useState();
  const [password, setPassword] = useState();

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
      email,
      password,
      userType,
    };

    // post request

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/v1/user/login`, data)
      .then((data) => {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userType", userType);
        navigate("/home", { replace: true });
        toast.success("👋 Welcome Back!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Please check your credentials!", {
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
  return (
    <div className="  w-full grid grid-cols-1 md:grid-cols-2 bg-login bg-cover p-10 py-20">
      <div className=" place-self-center">
        <img src={login} alt="" className="w-[500px] md:mb-6 " />
      </div>
      <form
        onSubmit={submitHandler}
        className="  mt-8 md:mt-0 md:place-self-left place-self-center w-[430px] min-h-[450px] bg-[#E6EFF8] rounded-lg p-10 flex flex-col items-center "
      >
        <span className=" text-3xl font-medium font-mono text-slate-900">
          Login
        </span>
        <input
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          className="outline-none mt-10 rounded-md my-4 w-[250px] h-9 p-2"
        />
        <input
          required
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="outline-none  rounded-md  w-[250px] h-9 p-2"
        />

        <div className="mt-8 ">
          <label htmlFor="" className="mr-3 text-slate-900">
            {" "}
            Login As
          </label>

          <select
            name="cars"
            id="cars"
            className="p-1 outline-none border rounded-md text-slate-700 "
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="" className="text-slate-400">
              Select
            </option>
            <option value="Donor">Donor</option>
            <option value="Receiver">Receiver</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <a href="/" className="text-indigo-400 mt-3">
          {" "}
          Forgot Password ?
        </a>

        <div className="flex flex-col items-center mt-auto ">
          <button
            className=" btn border-none w-full p-3 my-3 hover:bg-indigo-600 bg-indigo-500   text-white px-8 text-center"
            // disabled={}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginComp;
