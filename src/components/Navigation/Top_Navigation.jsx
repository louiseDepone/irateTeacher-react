
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";
import useUserStore from "@/hooks/store/useUserStore";
import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function TopNavigation() {
  const url = window.location.href;
  const [urlState, setUrlState] = useState(url);
  const navigation = useLocation();
  const user = useUserStore((state) => state.user);

   const setUserChosenSubject = useUserStore(
     (state) => state.setUserChosenSubject
   );
   const setUserChosenTeacher = useUserStore(
     (state) => state.setUserChosenTeacher
   );
   const setUserpinpost = useUserStore((state) => state.setUserpinpost);

   const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    setUrlState(navigation.pathname.split("/")[2]);
  }, [navigation]);
  return (
    <div className=" px-5 sticky top-0 bg-primaryColor  z-100   h-16 border-b border-borderColor flex justify-center items-center w-full lg:flex-nowrap ">
      <div className=" justify-items-start pl-2  hidden lg:inline-block w-96  ">
        <Link className="font-bold text-2xl text-white flex ">
          Ra <span className="text-[#8287FE]">Te</span>
        </Link>
      </div>
      <div className="w-full  bg-primaryColor flex gap-7 lg:justify-start justify-center  text-sm lg:flex-nowrap flex-wrap">
        <Link
          to={"publicfeed"}
          className={` ${
            urlState === "publicfeed" ? "text-[#8287FE]" : "text-white"
          } `}
        >
          Public
        </Link>
        <Link
          to={"foryoufeed"}
          className={` ${
            navigation.pathname.split("/")[2] === "foryoufeed"
              ? "text-[#8287FE]"
              : "text-white"
          } `}
        >
          Your Post
        </Link>
        <Link
          to={"teacher"}
          onClick={() => {
            setUserChosenTeacher(null);
          }}
          className={` ${
            navigation.pathname.split("/")[2] === "teacher"
              ? "text-[#8287FE]"
              : "text-white"
          } `}
        >
          Teacher
        </Link>
        <Link
          to={"subject"}
          onClick={() => {
            setUserChosenSubject(null);
          }}
          className={` ${
            navigation.pathname.split("/")[2] === "subject"
              ? "text-[#8287FE]"
              : "text-white"
          } `}
        >
          Subject
        </Link>

        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"admin"}
            className={` ${
              navigation.pathname.split("/")[2] === "admin"
                ? "text-[#8287FE]"
                : "text-white"
            } `}
          >
            Admin
          </Link>
        )}
        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"teachersubject"}
            className={` ${
              navigation.pathname.split("/")[2] === "teachersubject"
                ? "text-[#8287FE]"
                : "text-white"
            } `}
          >
            Enroll
          </Link>
        )}
        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"postapproval"}
            className={` ${
              navigation.pathname.split("/")[2] === "postapproval"
                ? "text-[#8287FE]"
                : "text-white"
            } `}
          >
            Post Approval
          </Link>
        )}
        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"student"}
            className={` ${
              navigation.pathname.split("/")[2] === "student"
                ? "text-[#8287FE]"
                : "text-white"
            } `}
          >
            Students
          </Link>
        )}
      </div>
      <div className="justify-items-end items-center flex ">
        <a
          className="text-white pr-3 hover:text-[#8287FE] justify-items-end"
          onClick={() => {
            localStorage.removeItem("token");
          }}
          href="https://irateteacher.onrender.com/"
        >
          <LogOut color="white" />
        </a>
      </div>
    </div>
  );
}
