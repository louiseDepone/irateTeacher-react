
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";
import useUserStore from "@/hooks/store/useUserStore";
import { LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import home from "@/assets/home.svg";
import approve from "@/assets/approve.svg";
import subject from "@/assets/subject.svg";
import teacher from "@/assets/teacher.svg";
import student from "@/assets/student.svg";
import profile from "@/assets/profile.svg";
import enroll from "@/assets/enroll.svg";
import admin from "@/assets/admin.svg";
import matriculation from "@/assets/matriculation.svg";

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
    <div className=" px-5 sticky md:top-0 top-[calc(100vh-4rem)]  bg-primaryColor/70   z-100 backdrop-blur-xl   h-16 md:h-20 border-b-[0.1rem] border-borderColor flex justify-between items-center w-full lg:flex-nowrap ">
      <div className=" justify-items-start pl-2  hidden lg:inline-block w-96 flex-1  ">
        <Link className="font-bold text-2xl text-white flex ">
          Ra <span className="text-[#8287FE]">Te</span>
        </Link>
      </div>
      <div className="   flex gap-7 md:gap-20  w-full justify-between md:w-fit text-sm flex-nowrap items-center">
        <Link
          to={"publicfeed"}
          className={` ${
            urlState === "publicfeed"
              ? "text-[#8287FE] "
              : "text-white opacity-50"
          } `}
        >
          <img className="outline-green-500 min-w-5 w-5" src={home} alt="" />
        </Link>
        <Link
          to={"foryoufeed"}
          className={` ${
            navigation.pathname.split("/")[2] === "foryoufeed"
              ? "text-[#8287FE]"
              : "text-white opacity-50 "
          } `}
        >
          <img className="outline-green-500 min-w-5 w-5" src={profile} alt="" />
        </Link>
        <Link
          to={"teacher"}
          onClick={() => {
            setUserChosenTeacher(null);
          }}
          className={` ${
            navigation.pathname.split("/")[2] === "teacher"
              ? "text-[#8287FE]"
              : "text-white opacity-50 "
          } `}
        >
          <img className="outline-green-500 min-w-6 w-5" src={teacher} alt="" />
        </Link>
        <Link
          to={"subject"}
          onClick={() => {
            setUserChosenSubject(null);
          }}
          className={` ${
            navigation.pathname.split("/")[2] === "subject"
              ? "text-[#8287FE]"
              : "text-white opacity-50 "
          } `}
        >
          <img className="outline-green-500 min-w-5 w-5" src={subject} alt="" />
        </Link>

        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"admin"}
            className={` ${
              navigation.pathname.split("/")[2] === "admin"
                ? "text-[#8287FE]"
                : "text-white opacity-50 "
            } `}
          >
            <img className="outline-green-500 min-w-5 w-5" src={admin} alt="" />
          </Link>
        )}
        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"teachersubject"}
            className={` ${
              navigation.pathname.split("/")[2] === "teachersubject"
                ? "text-[#8287FE]"
                : "text-white opacity-50 "
            } `}
          >
            <img
              className="outline-green-500 min-w-5 w-5"
              src={enroll}
              alt=""
            />
          </Link>
        )}
        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"postapproval"}
            className={` ${
              navigation.pathname.split("/")[2] === "postapproval"
                ? "text-[#8287FE]"
                : "text-white opacity-50 "
            } `}
          >
            <img
              className="outline-green-500 min-w-5 w-5"
              src={approve}
              alt=""
            />
          </Link>
        )}
        {user.role.toLowerCase() === "admin" && (
          <Link
            to={"student"}
            className={` ${
              navigation.pathname.split("/")[2] === "student"
                ? "text-[#8287FE]"
                : "text-white opacity-50 "
            } `}
          >
            <img
              className="outline-green-500 min-w-6"
              src={student}
              color="red"
              fill="red"
            />
          </Link>
        )}
        <Link
          to={"matriculation"}
          className={` ${
            navigation.pathname.split("/")[2] === "matriculation"
              ? "text-[#8287FE]"
              : "text-white opacity-50 "
          } `}
        >
          <img
            className="outline-green-500 min-w-6"
            src={matriculation}
            color="red"
            fill="red"
          />
        </Link>
      </div>
      <div className="justify-items-end hidden items-center md:flex flex-1 justify-end ">
        <a
          className="text-white pr-3 hover:text-[#8287FE] justify-items-end"
          onClick={() => {
            localStorage.removeItem("token");
          }}
          href="https://irateteacher.vercel.app/main/foryoufeed/login"
        >
          <LogOut color="white" />
        </a>
      </div>
    </div>
  );
}
