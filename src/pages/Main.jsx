import Post from "@/components/Displays/Post";
import Program from "@/components/Side_Bar_Disdplay/Program";
import Subject from "@/components/Side_Bar_Disdplay/Subject";
import Account from "@/components/Side_Bar_Disdplay/Account";
import Top_Navigation from "@/components/Navigation/Top_Navigation";
import PinnedPost from "@/components/Profile/PinnedPost";
import Profile_Overview from "@/components/Profile/Profile_Overview";
import { useQueryEnrollments } from "@/hooks/query/useQueryEnrollments";
import { useQueryRaitings } from "@/hooks/query/useQueryRaitings";
import { useQueryStudent_ratings } from "@/hooks/query/useQueryStudent_ratings";
import { useQueryStudents } from "@/hooks/query/useQueryStudents";
import { useQuerySubjects } from "@/hooks/query/useQuerySubjects";
import { useQueryTeacher_subjects } from "@/hooks/query/useQueryTeacher_subjects";
import { useQueryTeachers } from "@/hooks/query/useQueryTeachers";
import { useQueryPinPost, useQuerymultipleSubjectOfACertainUser, useQuerymutliplesTeacherOfACertainUser } from "@/hooks/query/useQueryUser";
import useUserStore from "@/hooks/store/useUserStore";
import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Main() {
  const queryRaitings = useQueryRaitings();
  const queryTeachers = useQueryTeachers();
  const queryStudents = useQueryStudents();
  const querySubjects = useQuerySubjects();
  // const queryStudent_raitings = useQueryStudent_ratings(); for fiXing
  const queryTeacher_subjects = useQueryTeacher_subjects();
  const queryEnrollments = useQueryEnrollments();
  const queryUserSubjectEnrolledIn = useQuerymultipleSubjectOfACertainUser();
  const queryUserTeacherEnrolledIn = useQuerymutliplesTeacherOfACertainUser();
  const queuryUserpinpost = useQueryPinPost();

  const location = useLocation().pathname.split("/")[2];
  const user = useUserStore((state) => state.user);
  const toShow = useUserStore((state) => state.toShow);
  const setToShow = useUserStore((state) => state.setToShow);
  return (
    <div>
      <Top_Navigation />
      {/* <Profile_Overview /> */}
      <PinnedPost />

      <div className=""></div>

      <div className="xl:ml-80 lg:mr-80 py-3 px-8 xl:px-0 ">
        <Post />
        <Outlet />
        {/* d */}
      </div>

      <div className="fixed hidden lg:inline top-16 w-72 right-0 h-[calc(100vh-48px)]    ">
        {user.role === "admin" && (
          <>
            <div className="text-white text-xs flex  py-3 w-full sticky top-1 bg-primaryColor">
              <button
                className={`flex-1 hover:text-linkedColor  ${
                  toShow === "program" ? "text-linkedColor" : "text-white"
                }`}
                onClick={() => setToShow("program")}
              >
                Program{" "}
              </button>
              <button
                className={`flex-1 hover:text-linkedColor  ${
                  toShow === "account" ? "text-linkedColor" : "text-white"
                }`}
                onClick={() => setToShow("account")}
              >
                Account{" "}
              </button>
              <button
                className={`flex-1 hover:text-linkedColor  ${
                  toShow === "subject" ? "text-linkedColor" : "text-white"
                }`}
                onClick={() => setToShow("subject")}
              >
                Subject{" "}
              </button>
            </div>
          </>
        )}

        {toShow === "program" ? (
          <Program />
        ) : toShow === "subject" ? (
          <Subject />
        ) : (
          <Account />
        )}
      </div>
    </div>
  );
}
