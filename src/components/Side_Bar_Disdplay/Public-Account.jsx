import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";
import React, { useEffect, useState } from "react";
import search from "@/assets/search.svg"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import {
//   Table,
//   tbody,
//   TableCaption,
//   td,
//   th,
//   thead,
//   tr,
// } from "@/components/ui/table";
import axios from "axios";
import { useQueryEnrollments } from "@/hooks/query/useQueryEnrollments";
import useUserStore from "@/hooks/store/useUserStore";
import { Link } from "react-router-dom";
import { useQueryTeachers } from "@/hooks/query/useQueryTeachers";
import { useQuerySubjects } from "@/hooks/query/useQuerySubjects";
import { set } from "react-hook-form";
export default function PublicAccount() {


  
  // const user = useUserStore((state) => state.user);
  // userChosenSubject;
  // userChosenTeacher;
  // setUserChosenSubject;
  // setUserChosenTeacher;
  const setUserChosenSubject = useUserStore(
    (state) => state.setUserChosenSubject
  );
  const setUserChosenTeacher = useUserStore(
    (state) => state.setUserChosenTeacher
  );
  const ratings = useDatabaseStore((state) => state.publicEdpoint);
  
  const [searchSubject, setsearchSubject] = useState("");
  const [searchteachers, setsearchteachers] = useState("");
  
  const queryTeacher = useQueryTeachers();
  const querySubject = useQuerySubjects();
  const teachers = useDatabaseStore((state) => state.teachers);
  const subjects = useDatabaseStore((state) => state.subjects);
  // const subjects = useUserStore((state) => state.userSubjectEnrolledin);
  // const teachers = useUserStore((state) => state.userTeacherEnrolledin);
  
  const setUserSearch = useUserStore((state) => state.setUserSearch);
  return (
    <div className="  text-fontColor space-y-6 p-8 pt-4 text-[0.8rem] h-full overflow-auto pb-7">
      <p className="text-mutedColor text-[0.9rem] font-bold">SUBJECTS AND TEACHERS</p>

      <div className="">
        <div className="font-semibold flex py-1 justify-between h-full items-center">
          <input
            name="gg"
            id="gg"
            type="text"
            className="font-normal p-2 rounded-md text-xs  bg-primaryColor pl-4 text-[0.7rem] h-full flex-1 mr-3"
            placeholder="search subject  name"
            onChange={(e) => {
              setsearchSubject(e.target.value);
            }}
          />

          <label onClick={() => {}} htmlFor="gg">
            <img src={search} width={13} alt="" />
          </label>
        </div>
        <div className="space-y-3 p-3 ">
          {subjects.length == 0 && (
            <p className="text-mutedColor text-[0.8rem]">
              No subjects on the list
            </p>
          )}
          {subjects
            ?.filter((sub) =>
              sub.subject?.toLowerCase().includes(searchSubject?.toLowerCase())
            )
            ?.map((subject, index) => {
              return (
                <span
                  onClick={() => {
                    // setUserChosenSubject(subject.subject_id);
                    setUserSearch(subject.subject);
                  }}
                  to={`/main/subject`}
                  key={index}
                  className={`flex justify-between hover:text-linkedColor cursor-pointer  ${
                    setUserChosenSubject == subject.subject_id
                      ? " text-linkedColor "
                      : ""
                  } `}
                >
                  <p>{subject.subject}</p>
                  <p className="text-linkedColor font-semibold pl-3">
                    {
                      ratings?.filter(
                        (sub) => sub.subject_id == subject.subject_id
                      ).length
                    }
                  </p>
                </span>
              );
            })}
        </div>
      </div>
      <div className="h-fit">
        <div className="font-semibold flex py-1 justify-between h-full items-center">
          <input
            name="rr"
            id="rr"
            type="text"
            className="font-normal p-2 rounded-md text-xs  bg-primaryColor pl-4 text-[0.7rem] h-full flex-1 mr-3"
            placeholder="search teacher name"
            onChange={(e) => {
              setsearchteachers(e.target.value);
            }}
          />

          <label onClick={() => {}} htmlFor="rr">
            <img src={search} width={13} alt="" />
          </label>
        </div>
        <div className="space-y-3 p-3 ">
          {teachers.length == 0 && (
            <p className="text-mutedColor text-[0.8rem]">
              No teachers on the list
            </p>
          )}
          {teachers
            ?.filter((sub) =>
              sub.name?.toLowerCase().includes(searchteachers?.toLowerCase())
            )
            .map((teacher, index) => {
              return (
                <span
                  onClick={() => {
                    // setUserChosenTeacher(teacher.teacher_id);
                    setUserSearch(teacher.name);
                  }}
                  to={`/main/teacher`}
                  key={index}
                  className="flex justify-between hover:text-linkedColor cursor-pointer"
                >
                  <p>{teacher.name}</p>

                  <p className="text-linkedColor font-semibold  pl-3">
                    {
                      ratings?.filter(
                        (teach) => teach.teacher_id == teacher.teacher_id
                      ).length
                    }
                  </p>
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
