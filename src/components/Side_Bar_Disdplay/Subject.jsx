import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import search from "@/assets/search.svg";
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

const [searchInerroledIn, setsearchInerroledIn] = useState("");
const [searchNotInrolledIn, setsearchNotInrolledIn] = useState("");

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
            <DialogContent className="w-[70%] h-[80%] bg-primaryColor border-borderColor text-white gap-0 flex flex-col overflow-auto hf">
              <div className="text-sm">
                {" "}
                <span className="tetx-xs text-mutedColor">Studend Id </span>
                {selectedStudentSubjects?.student_id}
              </div>
              <div className=" flex-col w-full lg:h-full lg:flex-row bg-primaryColor border-borderColor text-white  flex  pb-10">
                <div className="w-full h-full  ">
                  <div className="py-6 font-semibold text-xs text-mutedColor ">
                    Student Enrolled In
                  </div>

                  <div className=" flex-1 lg:flex-wrap   flex-col lg:flex-row   flex gap-5 min-h-fit max-h-[86%] h-[80%]    ">
                    <div className="font-semibold flex py-1 justify-between w-[98%] place-self-center items-center">
                      <input
                        name="gg"
                        id="gg"
                        type="text"
                        className="font-normal p-2 rounded-md text-xs  bg-secondaryColor pl-4 text-[0.7rem]  flex-1 mr-3"
                        placeholder="search teacher name or subject name"
                        onChange={(e) => {
                          // setsearchSubject(e.target.value);
                          setsearchInerroledIn(e.target.value);
                        }}
                      />

                      <label onClick={() => {}} htmlFor="gg">
                        <img src={search} width={13} alt="" />
                      </label>
                    </div>{" "}
                    <div className=" w-full flex pb-5 flex-col lg:flex-row lg:flex-wrap  gap-2 max-h-[50%] lg:max-h-full  overflow-auto px-2 h-full  ">
                      {
                        listOfEnrolledSubjects.length === 0 && (
                          <div className="text-mutedColor text-[0.8rem] text-center w-full">No subject enrolled in</div>
                        )
                      }
                      {listOfEnrolledSubjects.filter(
                        (sub) => sub.subject.toLowerCase().includes(searchInerroledIn.toLowerCase()) || sub.teacher_name.toLowerCase().includes(searchInerroledIn.toLowerCase())
                      ).map((subs, index) => {
                        return (
                            <div key={index} className=" flex lg:w-[45%] w-full h-32 hover:bg-secondaryColor border border-borderColor rounded-md p-3 text-[0.8rem] flex-col justify-between  ">
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
                        );
                      })}
                    </div>
                  </div>
                </div>
                <div className=" min-w-[40%]  flex flex-col items-center space-y-6 max-h-full  overflow-auto px-4 ">
                  <div className="font-semibold flex py-1 justify-between w-full items-center">
                    <input
                      name="gg"
                      id="gg"
                      type="text"
                      className="font-normal p-2 rounded-md text-xs  bg-secondaryColor pl-4 text-[0.7rem]  flex-1 mr-3"
                      placeholder="search teacher name or subject name"
                      onChange={(e) => {
                        // setsearchSubject(e.target.value);
                        setsearchNotInrolledIn(e.target.value);
                      }}
                    />

                    <label onClick={() => {}} htmlFor="gg">
                      <img src={search} width={13} alt="" />
                    </label>
                  </div>

                  <div className=" w-full flex flex-col items-center space-y-6 max-h-full  overflow-auto px-4 ">
                    {
                      teacher_subjects.length === 0 && (
                        <div className="text-mutedColor text-[0.8rem]">No subject available</div>
                      )
                    }
                    {teacher_subjects.filter(
                      (sub) => sub.subject.toLowerCase().includes(searchNotInrolledIn.toLowerCase()) || sub.teacher_name.toLowerCase().includes(searchNotInrolledIn.toLowerCase() )
                    ).map((enrollment, index) => {
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
                                  console.log(error);
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
              </div>
            </DialogContent>
          </Dialog>
        </div>
          {
            originallistOfEnrolledSubjects.length === 0 && (
              <div className="text-mutedColor text-center w-full text-[0.8rem]">No subject enrolled in</div>
            )
          }
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
