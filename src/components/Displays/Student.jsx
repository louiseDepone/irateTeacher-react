import { useQueryCertainStudentOnASubject, useQueryCertainsubjectonAStudent } from "@/hooks/query/useFetch";
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
import useUserStore from "@/hooks/store/useUserStore";

export default function Student({  students }) {
  const setselectedStudentSubjects = useSelectedSideBar(
    (state) => state.setselectedStudentSubjects
  );
  
  const setToShow = useUserStore((state) => state.setToShow);
  
    const { refetch } = useQueryCertainsubjectonAStudent();

    const subjectset = async () => {
       try {
         await setselectedStudentSubjects(students);
         await refetch();
         setToShow("subject");
       } catch (e) {
         console.log(e);
       }
    }
  return (
    <div
      className="border bg-primaryColor border-grayish/50 boxborderpost hover:bg-grayish w-full  md:w-[48.4%] flex flex-col min-h-32 p-4  text-fontColor"
      onClick={subjectset}
    >
      <div className="flex-1 ">
        <p className="text-lg">{students.student_id}</p>
      </div>
      <div className="h-full flex justify-end flex-wrap items-end gap-2">
        <button
          className="p-2 px-3 bg-linkedColor text-xs text-primaryColor"
          onClick={subjectset}
        >
          View Subjects
        </button>
        <Dialog>
          <DialogTrigger className="p-2 px-3 bg-linkedColor text-xs text-primaryColor">
            View Information
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Infomation</DialogTitle>
              <DialogDescription>Nothing Here yet!</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
