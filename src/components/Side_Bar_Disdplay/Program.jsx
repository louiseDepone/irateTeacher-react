import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";
import React, { useEffect, useState } from "react";

import search from "@/assets/search.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useQueryEnrollments } from "@/hooks/query/useQueryEnrollments";
import { useQueryCertainStudentOnASubject } from "@/hooks/query/useFetch";
import {  useunEnrollStudent } from "@/hooks/deleteQuery/useunEnrollStudent";

export default function Program() {
  const selectedSideBar = useSelectedSideBar((state) => state.studentsEnroled);
  const listOfStudents = useSelectedSideBar((state) => state.listOfStudents);
  const { deltetion } = useunEnrollStudent();
  
  const { refetch } = useQueryCertainStudentOnASubject();
  const setListOfStudents = useSelectedSideBar(
    (state) => state.setListOfStudents
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const students = useDatabaseStore((state) => state.students);
  const [onlist, setOnlist] = useState([]);
  // Now 'studentsWhoAreNotEnrolled' state contains the list of students who are not enrolled
  const [studentsWhoAreNotEnrolled, setStudentsWhoAreNotEnrolled] =
    React.useState([]);

  const [idsOfEnrolled, setIdsOfEnrolled] = React.useState([]);
  useEffect(() => {
    const ids = listOfStudents.map((student) => student.student_id);
    setIdsOfEnrolled(ids);
  }, [listOfStudents, isSubmitting]);

  useEffect(() => {
    const studentsWhoAreNotEnrolled = students?.filter(
      (student) => !idsOfEnrolled.includes(student.student_id)
    );
    setStudentsWhoAreNotEnrolled(studentsWhoAreNotEnrolled);
  }, [idsOfEnrolled]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       `/multipleEnrollementDependingOnTheTeacherSubjectId/${selectedSideBar?.teacher_subject_id}`,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: localStorage.getItem("token"),
  //         },
  //       }
  //     );

  //     const data = await response.data;
  //     setListOfStudents(data);
  //     refetch();
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     return error;
  //   }
  // };

  const submit = (e) => {
    e.preventDefault();
    const data = {
      teacher_subject_id: selectedSideBar?.teacher_subject_id,
      student_id: onlist,
    };
    const add = async () => {
      try {
        setIsSubmitting(true);
        const add = await axios.post(
          "/Multipleenrollment",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        refetch()
        setIsSubmitting(false);
      } catch (error) {
        setIsSubmitting(false);
      }
    };

    add();
  };

  const [searchstudent, setsearchstudent] = useState("");

  return (
    <div className="text-white text-[0.8rem]  w-full pt-4 px-5 overflow-auto h-full ">
      <div className="flex  items-start justify-start gap-2">
        <div className="flex gap-5 flex-col ">
          <p className="text-mutedColor text-nowrap">Teacher</p>
          <p className="text-mutedColor text-nowrap">Program</p>
        </div>
        <div className="flex gap-5 flex-col ">
          {selectedSideBar ? (
            <>
              <p>{selectedSideBar?.teacher_name}</p>
              <p>{selectedSideBar?.subject}</p>
            </>
          ) : (
            <>
              <p className="text-mutedColor"> Choose a program</p>
              <p className="text-mutedColor">Choose a program</p>
            </>
          )}
        </div>
      </div>
      <div className=" pt-5 space-y-5 flex flex-col ">
        <div className="flex justify-between">
          <Dialog className=" ">
            <DialogTrigger className="w-full flex justify-between items-center">
              <p>Students</p>

              <button
                className="text-2xl font-semibold"
                disabled={selectedSideBar == null}
              >
                +
              </button>
            </DialogTrigger>
            <DialogContent className="w-1/2 h-[80%] bg-green-300 ">
              <form
                action="#"
                onSubmit={submit}
                className=" flex  flex-col h-full overflow-auto w-full bg-red-400 min-h-full  "
              >
                <div className="   bg-yellow-200 flex-1 ">
                  <table className="w-full text-left  bg-purple-500 max-h-full ">
                    {/* <TableCaption>A list of students.</TableCaption> */}
                    <thead className="sticky top-0 bg-orange-400">
                      <tr className="border-grayish text-grayish">
                        <th className="text-grayish"></th>
                        <th className="text-grayish">Student Name</th>
                        <th className="text-grayish">Student Id</th>
                        <th className="text-grayish">Status</th>
                      </tr>
                    </thead>

                    <tbody className="">
                      {studentsWhoAreNotEnrolled.map((student, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-grayish"
                            onClick={() => {
                              if (onlist.includes(student.student_id)) {
                                setOnlist(
                                  onlist?.filter(
                                    (id) => id !== student.student_id
                                  )
                                );
                              } else {
                                setOnlist([...onlist, student.student_id]);
                              }

                            }}
                          >
                            <td>
                              <input
                                defaultChecked={onlist.includes(
                                  student.student_id
                                )}
                                type="checkbox"
                                checked={onlist.includes(student.student_id)}
                              />
                            </td>
                            <td>{student.name}</td>
                            <td>{student.student_id}</td>
                            <td>
                              {student.approved == 1 ? "Approved" : "Pending"}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <button
                  className="sticky flex-2 bg-green-500 w-full  bottom-0"
                  type="submit"
                  disabled={
                    isSubmitting || studentsWhoAreNotEnrolled.length == 0
                  }
                >
                  {studentsWhoAreNotEnrolled.length == 0
                    ? "No student to add"
                    : isSubmitting
                    ? "Adding..."
                    : "Add"}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between items-center">
          <input
            name="gg"
            id="gg"
            type="text"
            className="font-normal p-2 rounded-md  text-xs  bg-secondaryColor pl-4 text-[0.7rem] h-full flex-1 mr-3 "
            placeholder="search subject name"
            onChange={(e) => {
              setsearchstudent(e.target.value);
            }}
          />
          <label onClick={() => {}} htmlFor="gg">
            <img src={search} width={13} alt="" />
          </label>
        </div>
        {listOfStudents.length != 0 ? (
          <>
            {" "}
            {listOfStudents?.filter(stud => stud.student_id.toString().includes(searchstudent)).map((enrolled, index) => (
              <div key={index} className="flex justify-between">
                <p>{enrolled?.student_id}</p>
                <button
                  className="font-black text-red-500"
                  onClick={() => {
                    deltetion(enrolled);
                  }}
                >
                  --
                </button>
              </div>
            ))}{" "}
          </>
        ) : (
          <p className="text-mutedColor w-full text-center">
            {" "}
            No student enrolled
          </p>
        )}
      </div>
    </div>
  );
}
