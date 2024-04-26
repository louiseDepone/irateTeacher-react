
import App from "@/App";
import AllPost from "@/components/Displays/AllPost";
import { Button } from "@/components/ui/button";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";
import React, { useEffect, useState } from "react";
import { useQueryMatriculation } from "./hooks/query/useQueryMatriculation";

import search from "@/assets/search.svg";
import { useQueryPublicEndpoint } from "./hooks/query/useQueryPublicEndpoint";
import { Link } from "react-router-dom";
import Account from "./components/Side_Bar_Disdplay/Account";
import PublicAccount from "./components/Side_Bar_Disdplay/Public-Account";
import { set } from "react-hook-form";
  // setPublicEdpoint: (publicEdpoint) => set({ publicEdpoint }),

export default function PublicFeed() {
  const setPublicEdpoint = useDatabaseStore((state) => state.setPublicEdpoint);
  const publicEndpoint = useQueryPublicEndpoint();
  const [numberToLoad, setNumberToLoad] = React.useState(10);
  const userSearch = useUserStore((state) => state.userSearch);
  const setUserSearch = useUserStore((state) => state.setUserSearch);
  const lengthoforiginalrating = useDatabaseStore(
    (state) =>
      state.publicEdpoint.length
  );
  // const userChosenSubject = useUserStore((state) => state.userChosenSubject);
  // const userChosenTeacher = useUserStore((state) => state.userChosenTeacher);
  const [searchPost, setSearchPost] = useState("");
  const publicEdpoint = useDatabaseStore((state) =>
    state.publicEdpoint
      .slice(0, numberToLoad)
  );

  
  return (
    <div className="bg-bodyBackground">
      <div className=" px-5 sticky md:top-0 top-[calc(100vh-4rem)]  bg-primaryColor/85   z-100 backdrop-blur-xl   h-16 md:h-20 border-b-[0.1px] border-borderColor/50 flex justify-between items-center w-full lg:flex-nowrap overflow-auto boxborder ">
        <Link className="font-black pl-5 text-2xl text-fontColor flex ">
          Ra<span className="text-[#8287FE]">Te</span>
        </Link>
        <div className="flex gap-6 pr-5 text-sm font-bold">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
      <div className="flex w-full gap-2 px-[4rem] pt-6">
        <div className=" space-y-3 pb-20 md:pb-0 w-[calc(65vw-4rem)]">
          {/* <App /> */}

          <div className="font-semibold flex py-1 justify-between  items-center">
            <input
              name="gg"
              id="gg"
              type="text"
              className="font-normal p-2 rounded-md text-xs  bg-primaryColor border  pl-4 text-[0.7rem] h-full flex-1 "
              placeholder="search subject name"
              onChange={(e) => {
                // setsearchSubject(e.target.value);
                setUserSearch(e.target.value);
              }}
            />
          </div>

          {publicEdpoint
            .filter(
              (filt) =>
                filt.teachername
                  ?.toLowerCase()
                  .includes(userSearch?.toLowerCase()) ||
                filt.subjectname
                  ?.toLowerCase()
                  .includes(userSearch?.toLowerCase())
            )
            .map((rating, index) => {
              return (
                <AllPost
                  key={index}
                  deleted={rating?.deleted}
                  approval={rating?.approved}
                  attitude={rating?.attitude}
                  comment={rating?.comment}
                  communication={rating?.communication}
                  date={rating?.date}
                  dislikes={rating?.dislikes}
                  engagement={rating?.engagement}
                  likes={rating?.likes}
                  organization={rating?.organization}
                  rating_id={rating?.rating_id}
                  studentName={rating?.studentname}
                  subjectName={rating?.subjectname}
                  supportiveness={rating?.supportiveness}
                  teacherName={rating?.teachername}
                  teaching_method={rating?.teaching_method}
                />
              );
            })}

          <div>
            {numberToLoad >= lengthoforiginalrating && (
              <p
                className="
        w-full text-mutedColor text-xs text-center
        "
              >
                {" "}
                You've reached the end of the post!
              </p>
            )}
          </div>
          <div className="w-full flex justify-center items-center h-10 ">
            <button
              className="text-fontColor w-full  text-center hover:bg-grayish flex justify-center items-center cursor-cell  h-10"
              onClick={() => setNumberToLoad(numberToLoad + 10)}
            >
              {numberToLoad <= lengthoforiginalrating
                ? "Load More"
                : "No More Data"}
            </button>
          </div>
        </div>
        <div className="fixed  ml-[calc(65vw-3rem)] w-[calc(35vw-4rem)] hidden lg:inline">
          <PublicAccount />
        </div>
      </div>
    </div>
  );
}
