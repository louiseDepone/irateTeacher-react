import Teachersubject from "@/components/Displays/Teachersubject";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import React, { useEffect } from "react";
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
import { useQueryCertainStudentOnASubject } from "@/hooks/query/useFetch";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";

export default function TeacherSubject() {
  const teacher_subjects = useDatabaseStore((state) => state.teacher_subjects);
  const teachers = useDatabaseStore((state) => state.teachers);
  const subjects = useDatabaseStore((state) => state.subjects);
  const [teacherChose, setTeacherChose] = React.useState("");
  const [teacherCurrentTeaching, setTeacherCurrentTeaching] = React.useState(
    []
  );
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

    if (studentsEnroled) fetchData();

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
  return (
    <div>
      <div className="flex justify-between text-white items-center w-full p-5">
        <p className="text-xl">Subjects and Instructors</p>

        <Dialog>
          <DialogTrigger>
            {" "}
            <img src={addsubject} alt="" />
          </DialogTrigger>
          <DialogContent className="w-fit ">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
            </DialogHeader>
            <form action="#" onSubmit={submit}>
              <div className="flex w-full flex-col">
                <label htmlFor="teacher">Teacher</label>

                <select
                  name="teacher"
                  id="teacher"
                  className="w-full"
                  onChange={(e) => {
                    setTeacherChose(e.target.value);
                    setTeacherCurrentTeaching(
                      teacher_subjects
                        .filter(
                          (teacher_subject) =>
                            teacher_subject.teacher_id == e.target.value
                        )
                        .map((teacher_subject) => teacher_subject.subject_id)
                    );

                  }}
                >
                  <option value="">Select Subject</option>
                  {teachers.map((teacher, index) => {
                    return (
                      <option key={index} value={teacher.teacher_id}>
                        {teacher.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex w-full flex-col">
                <label htmlFor="subject">Subject</label>
                <select name="subject" id="subject " className="w-full">
                  <option value="">Select Teacher</option>
                  {subjects
                    .filter(
                      (subject) =>
                        !teacherCurrentTeaching.includes(subject.subject_id)
                    )
                    .map((subject, index) => {
                      return (
                        <option key={index} value={subject.subject_id}>
                          {subject.subject}
                        </option>
                      );
                    })}
                </select>
              </div>
              <Button>Add</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-5 flex flex-wrap gap-5">
        {teacher_subjects.map((teacher_subject, index) => {
          return (
            <Teachersubject key={index} teacher_subject={teacher_subject} />
          );
        })}
      </div>
    </div>
  );
}
