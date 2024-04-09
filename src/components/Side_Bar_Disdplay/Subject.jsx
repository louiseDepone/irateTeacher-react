import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";
import { useQueryCertainStudentOnASubject, useQueryCertainsubjectonAStudent } from "@/hooks/query/useFetch";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import { useunEnrollStudent } from "@/hooks/deleteQuery/useunEnrollStudent";
import axios from "axios";
export default function Subject() {
  const { deltetion } = useunEnrollStudent();
const { refetch } = useQueryCertainStudentOnASubject();
const { refetch: refetchuseQueryCertainsubjectonAStudent } =
  useQueryCertainsubjectonAStudent();
  const selectedStudentSubjects = useSelectedSideBar(
    (state) => state.selectedStudentSubjects
  );


  const originallistOfEnrolledSubjects = useSelectedSideBar((state) => state.listOfEnrolledSubjects);
  const originallistOfEnrolledSubjectsid = useSelectedSideBar((state) =>
    state.listOfEnrolledSubjects.map(
      (enrollment) => enrollment.teacher_subject_id
    )
  );

  const originalteacher_subjects = useDatabaseStore((state) =>
    state.teacher_subjects
  );
  
  const [listOfEnrolledSubjects, setListOfEnrolledSubjects] = useState([]);


const [teacher_subjects, setteacher_subjects] = useState([]);



useEffect(() => {
  setListOfEnrolledSubjects(originallistOfEnrolledSubjects);
  setteacher_subjects(
    originalteacher_subjects?.filter(
      (enrollment) =>
        !originallistOfEnrolledSubjectsid.includes(enrollment.teacher_subject_id)
    )
  );
}, [
  selectedStudentSubjects,
  originallistOfEnrolledSubjects,
]);
  return (
    <>
      <div className="flex  items-start justify-start gap-2 flex-col  text-white text-[0.8rem] w-full pt-4 pl-5 pb-14 h-full">
        <div className="flex gap-5 ">
          <p className="text-mutedColor text-nowrap">Student</p>
          {selectedStudentSubjects?.student_id}
        </div>
        <div className="flex justify-between w-full">
          <p className="text-mutedColor text-nowrap pt-2">Enrolled In</p>
          <Dialog className="text-[0.8rem]  ">
            <DialogTrigger>
              <button
                className="text-2xl font-semibold pr-4"
                disabled={selectedStudentSubjects == null}
              >
                +
              </button>
            </DialogTrigger>
            <DialogContent className="w-[70%] h-[80%] bg-primaryColor border-borderColor text-white gap-0 flex flex-col">
              <div className="text-sm"> <span className="tetx-xs text-mutedColor">Studend Id </span>{selectedStudentSubjects?.student_id}</div>
              <div className=" flex-col w-full lg:h-full lg:flex-row bg-primaryColor border-borderColor text-white  flex  pb-10">
                <div className="w-full h-full  ">
                  <div className="py-6 font-semibold text-xs text-mutedColor ">
                    Student Enrolled In
                  </div>

                  <div className=" flex-1 lg:flex-wrap pb-5  flex-col lg:flex-row  flex gap-5 min-h-fit max-h-[86%]  overflow-auto ">
                    {listOfEnrolledSubjects.map((subs, index) => {
                      return (
                        <>
                          <div className="  lg:w-[45%] h-32 hover:bg-secondaryColor border border-borderColor rounded-md p-3 text-[0.8rem] flex-col justify-between flex ">
                            <div className="flex gap-2 0 ">
                              <div className="text-nowrap space-y-1">
                                <p>Teacher</p>
                                <p>Subject</p>
                              </div>
                              <div className="space-y-1">
                                <p>{subs.teacher_name}</p>
                                <p>{subs.subject}</p>
                              </div>
                            </div>

                            <button
                              className="float-right w-fit p-1 px-2 self-end text-dangerColor"
                              onClick={() => deltetion(subs)}
                            >
                              Unenroll
                            </button>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className=" min-w-fit lg:w-[35%] flex flex-col items-center space-y-6 max-h-full  overflow-auto px-4 ">
                  {teacher_subjects.map((enrollment, index) => {
                    return (
                      <div className="space-y-5 p-3 hover:bg-secondaryColor border-borderColor rounded-md w-full self-center text-[0.8rem] h-fit flex flex-col border  ">
                        <div className="flex gap-2 w-[97%] ">
                          <div className="text-nowrap">
                            <p>Teacher</p>
                            <p>Subject</p>
                          </div>
                          <div>
                            <p>{enrollment?.teacher_name}</p>
                            <p>{enrollment?.subject}</p>
                          </div>
                        </div>

                        <button
                          className="float-right self-end text-green-500"
                          onClick={() => {
                            const addEnroll = async () => {
                             
                              // enrollment;
                              try {
                                const enroll = await axios.post(
                                  "/enrollment",
                                  {
                                    student_id:
                                      selectedStudentSubjects?.student_id,
                                    teacher_subject_id:
                                      enrollment.teacher_subject_id,
                                  },
                                  {
                                    headers: {
                                      "Content-Type": "application/json",
                                      Authorization:
                                        localStorage.getItem("token"),
                                    },
                                  }
                                );

                                refetch();
                                refetchuseQueryCertainsubjectonAStudent();
                              } catch (error) {
                              }
                            };

                            addEnroll();
                          }}
                        >
                          Enroll
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full h-full overflow-auto pb-5 pr-4">
          <div className="flex gap-5 flex-col text-white pt-3  w-full">
            {originallistOfEnrolledSubjects.map((subs, index) => {
              return (
                <>
                  <div className="space-y-3">
                    <div className="flex gap-2 w-[97%] 0">
                      <div className="text-nowrap">
                        <p>Teacher</p>
                        <p>Subject</p>
                      </div>
                      <div>
                        <p>{subs.teacher_name}</p>
                        <p>{subs.subject}</p>
                      </div>
                    </div>

                    <button
                      className="float-right text-dangerColor"
                      onClick={() => deltetion(subs)}
                    >
                      Unenroll
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
