import { useQueryCertainStudentOnASubject } from "@/hooks/query/useFetch";
import { useQueryEnrollments } from "@/hooks/query/useQueryEnrollments";
import { useQueryRaitings } from "@/hooks/query/useQueryRaitings";
import { useQueryTeacher_subjects } from "@/hooks/query/useQueryTeacher_subjects";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";
import axios from "axios";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQueryPinPost } from "@/hooks/query/useQueryUser";

export default function RatingsPosts({ post }) {
  const setstudentsEnroled = useSelectedSideBar(
    (state) => state.setstudentsEnroled
  );

  const {refetch: pinpostRfetch} = useQueryPinPost()

  const { refetch, isRefetching } = useQueryRaitings();
  return (
    <div
      className="border border-grayish hover:bg-grayish w-full  md:w-[48.4%] flex flex-col min-h-56 p-4  text-white"
      onClick={() => {
        // setstudentsEnroled(teacher_subject);
      }}
    >
      <div className="flex-1 ">
        <p className="text-lg">{post.studentname}</p>
        <div className="flex gap-2 pt-3 ">
          <p className="text-xs  flex flex-col  gap-1">
            <span className="text-mutedColor">Subject</span>
            <span className="text-mutedColor ">Teacher</span>
          </p>
          <p className="text-xs   gap-1 flex flex-col  ">
            <span>
              {post.subjectname}
              </span> 
            <span>
             {post.teachername}{" "}
              </span> 
          </p>
        </div>
      </div>
      <p className="text-[0.6rem] py-4">
        {post.comment.replace(`\n`, "").slice(0, 200)}...
      </p>
      <div className="h-full flex justify-end flex-wrap items-end gap-2">
        <Dialog>
          <DialogTrigger className="p-2 px-3 bg-[#8287FE] text-xs">
            View Post
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>{post.comment}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <button
          className={
            post.approved == 1
              ? "p-2 px-3 bg-red-500 text-xs"
              : "p-2 px-3 bg-green-400 text-xs"
          }
          onClick={() => {
            const ratings = async () => {
              console.log({ approved: post.approved == 0 ? 1 : 0 });
              try {
                const deleting = await axios.put(
                  `/approveDisapproveraiting/${post.rating_id}`,
                   {approved: post.approved == 0 ? 1 : 0},
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                console.log("deleting my competense", deleting);
                refetch();
                pinpostRfetch();
              } catch (error) {
                console.log(error);
              }
            };
            ratings();
          }}
        >
          {post.approved == 0 ? "Approve" : "Disapprove"}
        </button>
      </div>
    </div>
  );
}
