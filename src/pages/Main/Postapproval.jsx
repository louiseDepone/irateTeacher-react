import Teachersubject from "@/components/Displays/Teachersubject";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import React, { useEffect, useState } from "react";
import addsubject from "@/assets/addsubject.svg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQueryTeacher_subjects } from "@/hooks/query/useQueryTeacher_subjects";
import axios from "axios";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";

import RatingsPosts from "@/components/Displays/RatingsPosts";
export default function Postapproval() {

  const [teacherChose, setTeacherChose] = React.useState("");
  
  const ratings = useDatabaseStore((state) => state.ratings);
  const { refetch } = useQueryTeacher_subjects();

  const studentsEnroled = useSelectedSideBar((state) => state.studentsEnroled);

  const setListOfStudents = useSelectedSideBar(
    (state) => state.setListOfStudents
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `/multipleEnrollementDependingOnTheTeacherSubjectId/${studentsEnroled?.teacher_subject_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );

        const data = await response.data;
        setListOfStudents(data);
        return response;
      } catch (error) {
        return error;
      }
    };

    if (studentsEnroled)fetchData();
  }, [studentsEnroled]);
  const submit = (e) => {
    e.preventDefault();
    const teacher_id = teacherChose;
    const subject_id = e.target[1].value;

    if (!teacher_id || !subject_id) {
      return;
    }

    const dataAdd = async () => {
      try {
        const add = await axios.post(
          "/teacherSubjects",
          {
            teacher_id,
            subject_id,
          },
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

    dataAdd();
    e.target[0].value = "";
    e.target[1].value = "";
  };
  const [filter, setFilter] = useState([]);
  // useEffect(() => {
  //   console.log(filter,"ddddddddddddddddddddddddddd")
  //   switch (filter) {
  //     case "approved":
  //       setRatings(rating.filter((post) => post.approved == 1));
  //       break;
  //     case "disapproved":
  //       setRatings(rating.filter((post) => post.approved == 0));
  //       break;
  //     default:
  //       setRatings(rating);
  //   }
  // }, [filter]);
  return (
    <div>
      <div className="flex flex-col  text-white w-full p-5">
        <p className="text-xl">Posts</p>
        {
          ratings.length === 0 && <p className="text-center text-lg text-mutedColor">No post available</p>
        }
        {/* <div className="flex flex-wrap pt-3 gap-2">
          <button
            className={`p-1 px-2 text-xs hover:bg-linkedColor border border-borderColor rounded-full ${
              filter.includes("Approved") ? " bg-linkedColor " : ""
            }`}
            onClick={() => {
              if (filter.includes("Approved")) {
                setRatings(rating);
                setFilter([]);
              } else {
                setRatings(rating.filter((post) => post.approved == 1));
                setFilter(["Approved"]);
              }
            }}
          >
            {" "}
            Approved{" "}
          </button>
          <button
            className={`p-1 px-2 text-xs hover:bg-linkedColor border border-borderColor rounded-full ${
              filter.includes("disapproved") ? "bg-linkedColor" : ""
            }`}
            onClick={() => {
              if (filter.includes("disapproved")) {
                setRatings(rating);
                setFilter([]);
              } else {
                setRatings(rating.filter((post) => post.approved == 0));
                setFilter(["disapproved"]);
              }
            }}
          >
            {" "}
            For Approval{" "}
          </button>
          </div>  */}
      </div>
      <div className="p-5 flex flex-wrap gap-5">
        {ratings.map((post, index) => {
          return <RatingsPosts key={index} post={post} />;
        })}
      </div>
    </div>
  );
}
