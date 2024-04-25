import React from "react";
import Rating from "react-rating";
import starcolored from "@/assets/starcolored.svg";
import starempty from "@/assets/starempty.svg";
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import dilikefull from "@/assets/dilikefull.svg";
import dislikeemtpy from "@/assets/dislikeemtpy.svg";
import LikeEmpty from "@/assets/LikeEmpty.svg";
import LikeFull from "@/assets/LikeFull.svg";
import { useQueryRaitings } from "@/hooks/query/useQueryRaitings";
import { useQueryPinPost } from "@/hooks/query/useQueryUser";
import useUserStore from "@/hooks/store/useUserStore";
function AllPost({
  deleted,
  approval,
  attitude,
  comment,
  communication,
  date,
  dislikes,
  engagement,
  likes,
  organization,
  rating_id,
  studentName,
  subjectName,
  supportiveness,
  teacherName,
  teaching_method,
}) {
  const location = useLocation().pathname.split("/")[2];
  const { refetch } = useQueryRaitings();
  const userpinpost = useUserStore((state) => state.userpinpost);
  const user = useUserStore((state) => state.user);
  const { refetch: refetchpinpost } = useQueryPinPost();
 
  return (
    <div
      className={`bg-primaryColor flex w-full p-5 rounded-lg border min-w-fit text-[0.7rem] border-borderColor/60  text-fontColor gap-3  h-fit text-xs boxborderpost  ${
        !studentName || !teacherName || !subjectName 
          ? "animate-pulse"
          : ""
      }`}
    >
      <div>
        {studentName !== null ? (
          <div className="bg-fontColor rounded-full w-8 h-8 object-cover flex items-center justify-center">
            <span className="text-primaryColor font-bold">
              {studentName?.charAt(0).toUpperCase() +
                studentName?.charAt(studentName.length - 1).toUpperCase()}
            </span>
          </div>
        ) : (
          <div className="bg-fontColor rounded-full w-8 h-8 object-cover flex items-center justify-center"></div>
        )}
      </div>
      <div className="w-full ">
        <div className="flex md:gap-5 gap-4 items-center justify w-full flex-wrap">
          <p>{studentName}</p>
          <p className="text-transparent bg-fontColor  w-1 h-1 rounded-full">
            {" "}
            .
          </p>
          <span className="text-center text-mutedColor text-xs">
            {date?.split("T")[0].replace(/-/g, "/") || (
              <div className="h-2 w-20 rounded bg-mutedColor opacity-3"> </div>
            )}
          </span>
          <span
            className={`${
              location == "foryoufeed" ? "inline-block" : "hidden"
            }`}
          >
            <select
              defaultValue={deleted}
              onChange={(e) => {
                const changdata = async () => {
                  try {
                    // tohiderating/:id
                    const res = await axios.put(
                      `/tohiderating/${rating_id}`,
                      {
                        deleted: e.target.value == "1" ? 1 : 0,
                        student_id: user.id,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          authorization: `${localStorage.getItem("token")}`,
                        },
                      }
                    );
                    refetch();
                    refetchpinpost();
                  } catch (error) {}
                };
                changdata();
              }}
              className="text-mutedColor w-fit bg-transparent b-0 px-3"
            >
              <option value="1">hidden</option>
              <option value="0">Public</option>
            </select>
          </span>
          <span
            className={`${
              location == "foryoufeed" ? "inline-block" : "hidden"
            }`}
          >
            {approval == 0 ? (
              <span className="text-mutedColor">Pending</span>
            ) : (
              <span className="text-mutedColor">Approved</span>
            )}
          </span>

          {/* <div className="  w-full flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex gap-1 h-full justify-center items-center">
                <span className="text-transparent bg-red-500 w-1 h-1 rounded-full">
                  {" "}
                  .
                </span>
                <span className="text-transparent bg-red-500 w-1 h-1 rounded-full">
                  {" "}
                  .
                </span>
                <span className="text-transparent bg-red-500 w-1 h-1 rounded-full">
                  {" "}
                  .
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#10232f] text-fontColor w-44 mr-14 p-4 border-[0.3px]">
                <DropdownMenuSeparator />
                <button className="w-full" onClick={() => {}}>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </button>{" "}
                <button
                  className="w-full"
                  onClick={() => {
                    const changdata = async () => {
                      try {
                        // console.log(deleted)
                        const res = await axios.delete(
                          `https://ratemyteacher.onrender.com/ratings/${rating_id}`,
                          {
                            headers: {
                              "Content-Type": "application/json",
                              authorization: `${localStorage.getItem("token")}`,
                            },
                            data: {
                              deleted: deleted == 1 ? 0 : 1,
                            },
                          }
                        );
                        // console.log(res);
                        refetch()
                      } catch (error) {
                        // console.log(error);
                      }
                    };
                    changdata();
                  }}
                >
                  <DropdownMenuItem>
                    {!deleted ? "Hide" : "Show"}
                  </DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </div>
        <div className="flex flex-col gap-4 justify-center items-center pt-5 text-[0.7rem]">
          <div className="flex pt-3 flex-col w-full">
            <div className="flex gap-3">
              <p className="font-semibold text-mutedColor text-nowrap">
                {" "}
                Teacher
              </p>
              <span>
                {teacherName || (
                  <div className="h-2 w-20 rounded bg-mutedColor opacity-3">
                    {" "}
                  </div>
                )}
              </span>
            </div>
            <div className="flex gap-3">
              <p className="font-semibold text-mutedColor text-nowrap ">
                {" "}
                Subject
              </p>
              <span className="  ">
                {subjectName || (
                  <div className="h-2 w-20 rounded bg-mutedColor opacity-3">
                    {" "}
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className="text-left w-full text-[0.7rem] py-2">
            {comment}
          </div>
          <div className="flex flex-col  w-full justify-center items-center space-y-3 ">
            <div className="flex text-xs justify-evenly items-center w-full  text-fontColor font-normal flex-wrap gap-3 text-[0.7rem]">
              <div className="flex flex-col  justify-center items-center  gap-2">
                <p>Teaching Method</p>
                <Rating
                  emptySymbol={<img width={20} src={starempty} alt="empty" />}
                  placeholderSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  fullSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  readonly
                  placeholderRating={teaching_method}
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p>Communication</p>
                <Rating
                  emptySymbol={<img width={20} src={starempty} alt="empty" />}
                  placeholderSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  fullSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  placeholderRating={communication}
                  readonly
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p>Supportiveness</p>
                <Rating
                  readonly
                  emptySymbol={<img width={20} src={starempty} alt="empty" />}
                  placeholderSymbol={
                    <img
                      width={20}
                      src={
                        starcolored || (
                          <div className="h-2 w-20 rounded bg-mutedColor opacity-3">
                            {" "}
                          </div>
                        )
                      }
                      alt="colored"
                    />
                  }
                  fullSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  placeholderRating={supportiveness}
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p>Organization</p>
                <Rating
                  readonly
                  emptySymbol={<img width={20} src={starempty} alt="empty" />}
                  placeholderSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  fullSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  placeholderRating={organization}
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p>Engagement</p>
                <Rating
                  readonly
                  emptySymbol={<img width={20} src={starempty} alt="empty" />}
                  placeholderSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  fullSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  placeholderRating={engagement}
                />
              </div>
              <div className="flex flex-col justify-center items-center gap-2">
                <p>Attitude</p>
                <Rating
                  readonly
                  emptySymbol={<img width={20} src={starempty} alt="empty" />}
                  placeholderSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  fullSymbol={
                    <img width={20} src={starcolored} alt="colored" />
                  }
                  placeholderRating={attitude}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex gap-2   cursor-not-allowed">
            <div className="flex gap-2 justify-center items-center">
              <img src={LikeEmpty} width={17} alt="" />
              <p>{likes}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <img
                src={dislikeemtpy}
                width={17}
                className="pt-[0.3rem]"
                alt=""
              />
              <p>{dislikes}</p>
            </div>
          </div>
        </div>
      </div>
      <span
        className={`text-nowrap flex-1 text-right ${
          true == true ? "inline-block" : "hidden"
        }`}
      >
        {userpinpost.map((id) => id.rating_id).includes(rating_id) == 0 ? (
          <button
            className="text-green-400 "
            onClick={() => {
              const changdata = async () => {
                try {
                  // tohiderating/:id
                  const res = await axios.post(
                    `/pinposts`,
                    {
                      rating_id: rating_id,
                      student_id: user.id,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("token")}`,
                      },
                    }
                  );
                  refetchpinpost();
                } catch (error) {}
              };
              changdata();
            }}
          >
            Pin
          </button>
        ) : (
          <button
            className="text-dangerColor"
            onClick={() => {
              const changdata = async () => {
                try {
                  // tohiderating/:id
                  const res = await axios.delete(
                    `/pinposts/${rating_id}/${user.id}`,
                    {
                      headers: {
                        "Content-Type": "application/json",
                        authorization: `${localStorage.getItem("token")}`,
                      },
                    }
                  );
                  refetchpinpost();
                } catch (error) {}
              };
              changdata();
            }}
          >
            Unpin
          </button>
        )}
      </span>
    </div>
  );
}

export default AllPost;
