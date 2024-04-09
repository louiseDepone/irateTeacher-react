import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";
import React from "react";
import LikeEmpty from "@/assets/LikeEmpty.svg";
import LikeFull from "@/assets/LikeFull.svg";
import pin from "@/assets/pin.svg";
import axios from "axios";
import { useQueryPinPost, useQueryUser } from "@/hooks/query/useQueryUser";
export default function PinnedPost() {
  const user = useUserStore((state) => state.user);


  const userpinpost = useUserStore((state) => state.userpinpost).map((post) => post.rating_id);
  const {refetch} = useQueryPinPost();
  const ratings = useDatabaseStore((state) => state.ratings).filter((rating) => userpinpost.includes(rating.rating_id));

  ratings.sort((a, b) => {
    const indexA = userpinpost.indexOf(a.rating_id);
    const indexB = userpinpost.indexOf(b.rating_id);
    return indexA - indexB;
  }).reverse();

// approved: 1;
// attitude: 0;
// comment: "hmmmmmmmmmmm";
// communication: 0;
// date: "2024-04-05T16:00:00.000Z";
// deleted: 0;
// dislikes: 0;
// engagement: 0;
// likes: 0;
// organization: 0;
// rating_id: 245;
// studentName: "vytc ytf";
// student_id: 1213;
// subjectName: "CSFE2 Node & React";
// subject_id: 2;
// supportiveness: 0;
// teacherName: "liela Gardose";
// teacher_id: 1;
// teaching_method: 0;
  return (
    <div className=" fixed top-16  w-80 hidden xl:flex justify-start items-center  flex-col h-[calc(100vh-48px)] py-4  text-white px-9">
      <p className="text-mutedColor text-[0.9rem] font-bold text-left w-full py-3">
        {userpinpost.length} Pinned Post
      </p>
      <div className="space-y-3 pt-4  px-2 overflow-auto w-full " id="pin">
        {ratings.map((rating, index) => {
          return (
            <div
              key={index}
              className="w- flex flex-col gap-4 relative hover:bg-secondaryColor text-[0.6rem] w-full border border-borderColor rounded-md p-5 "
            >
              <img
                src={pin}
                width={27}
                alt=""
                className="absolute -top-2 -right-5 cursor-pointer"
                onClick={() => {
                  const unpin = async () => {
                    try {
                      const deleting = await axios.delete(
                        `/pinPosts/${rating.rating_id}/${user.id}`,
                        {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                          },
                        }
                      );
                      refetch();
                    } catch (error) {
                    }
                  };
                  unpin();
                }}
              />
              <div className="flex justify-between">
                <p className="t">{rating.studentName}</p>
                <p className="text-mutedColor">{rating.date.split("T")[0]}</p>
              </div>
              <div className="flex gap-2">
                <div className="space-y-2 text-mutedColor">
                  <p className="text-nowrap">Teacher</p>
                  <p className="text-nowrap">Subject</p>
                </div>
                <div className="space-y-2">
                  <p>{rating.teacherName}</p>
                  <p>{rating.subjectName}</p>
                </div>
              </div>
              <div>
                <p>{rating.comment}</p>
              </div>

              <div className="flex gap-2 text-xs  text-mutedColor stroke-1 stroke-mutedColor ">
                <div className="flex gap-1 justify-center items-center">
                  <img src={LikeEmpty} width={17} alt="" />
                  <p>{rating.likes}</p>
                </div>
                <div className="flex gap-1 items-center">
                  <img
                    src={LikeEmpty}
                    width={17}
                    alt=""
                    className=" rotate-180 pb-[0.3rem]"
                  />
                  <p>{rating.dislikes}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
