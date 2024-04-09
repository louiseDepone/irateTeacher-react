import useUserStore from "@/hooks/store/useUserStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [errors, isError] = useState();
  const [isDisable, setdisable] = useState(false);
  const navigate = useNavigate();

  const setUser = useUserStore((state) => state.setUser);
  const token = localStorage.getItem("token");
  const useUserPintPost = useUserStore((state) => state.userpinpost);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    
      if (token === null) {
        localStorage.clear();
        setUser(null);

      }
  },[])

  const submit = (e) => {
    e.preventDefault();

    const logincred = {
      email: e.target[0].value,
      password: e.target[1].value,
    };

    const login = async () => {
      try {
        setdisable(true);
        const response = await axios.post(
          "/login",
          logincred
        );
        const data = await response.data;
        localStorage.setItem("token", data.token);
        setdisable(false);
              localStorage.setItem("logout", "false");
        navigate("/main/foryoufeed");

      } catch (error) {
        setdisable(false);
        isError(error?.response?.data);
      }
    };
    login();
  };
  return (
    <div className="flex justify-center flex-col bg-white items-center h-screen ">
      <div className="font-black  text-7xl  flex ">
        Ra <span className="text-[#8287FE] ">Te</span>
      </div>
      <form onSubmit={submit} className="flex flex-col w-80 gap-1">
        <div className="flex flex-col w-full gap-1 pb-1">
          <label htmlFor="email" className=" text-sm ">
            Email
          </label>
          <input
            placeholder="Enter your Email"
            required
            type="email"
            className=" w-full border-b border-[#8287FE] p-2 pl-5 text-sm"
          />
        </div>
        <div className="flex flex-col   w-full gap-1 pb-2">
          <label htmlFor="passowrd" className=" text-sm">
            Password
          </label>
          <input
            placeholder="Enter your current-password"
            autoComplete="on"
            required
            type="password"
            className=" w-full border-b border-[#8287FE] p-2 pl-5 text-sm"
          />
        </div>
        {errors?.message && (
          <sub className="text-red-500 ">{errors?.message}</sub>
        )}
        <button
          disabled={isDisable}
          className="bg-[#8287FE] text-white  w-full mt-5 rounded-md p-1 py-2 font-bold   "
        >
          {isDisable ? "Logging In..." : "Login "}
        </button>
        <sub className="w-full text-center  font-normal mt-2">
          Does'nt have an Account yet?{" "}
          <Link className="text-[#8287FE]" to={"/register"}>
            Create Account
          </Link>
        </sub>
      </form>
    </div>
  );
}
