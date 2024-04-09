import { useQueryCertainStudentOnASubject } from "@/hooks/query/useFetch";
import { useQueryEnrollments } from "@/hooks/query/useQueryEnrollments";
import { useQueryTeacher_subjects } from "@/hooks/query/useQueryTeacher_subjects";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";
import useUserStore from "@/hooks/store/useUserStore";
import axios from "axios";
import React, { useEffect } from "react";

export default function Teachersubject({ teacher_subject }) {
  const setstudentsEnroled = useSelectedSideBar(
    (state) => state.setstudentsEnroled
  );

  const setToShow = useUserStore((state) => state.setToShow);
  const {refetch} = useQueryTeacher_subjects()
  const {refetch:enrollmentfetch} = useQueryEnrollments()
  return (
    <div
      className="border border-grayish hover:bg-grayish  w-full md:w-[48.4%] flex flex-col min-h-48 p-4  text-white"
      onClick={() => {
        setstudentsEnroled(teacher_subject);
        setToShow("program")
      }}
    >
      <div className="flex-1">
        <p className="text-lg">{teacher_subject.subject}</p>
        <p className="text-sm">{teacher_subject.teacher_name} </p>
      </div>
      <div className="h-full flex justify-end flex-wrap items-end gap-2">
        <button
          className="p-2 px-3 bg-[#8287FE] text-xs"
          onClick={() => {
            setToShow("program")
            setstudentsEnroled(teacher_subject);
          }}
        >
          students
        </button>
        <button
          className={
            teacher_subject.deleted === 0
              ? "p-2 px-3 bg-red-500 text-xs"
              : "p-2 px-3 bg-green-400 text-xs"
          }
          onClick={() => {
            const ratings = async () => {
              try {
                const isDeleted = {
                  isDeleted: teacher_subject.deleted === 0 ? 1 : 0,
                };

                const deleting = await axios.put(
                  `/teacherSubjectsDelete/${teacher_subject.teacher_subject_id}`,
                  isDeleted,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                console.log("deleting my competense", deleting);
                refetch();
                enrollmentfetch();
              } catch (error) {
                console.log(error);
              }
            };
            ratings();
          }}
        >
          {teacher_subject.deleted === 0
            ? "Disable to be rated"
            : "Enable to be rated"}
        </button>
      </div>
    </div>
  );
}
