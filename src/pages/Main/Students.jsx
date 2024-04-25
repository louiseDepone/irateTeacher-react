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
import Student from "@/components/Displays/Student";
export default function Students() {
  const [teacherChose, setTeacherChose] = React.useState("");

  const ratings = useDatabaseStore((state) => state.ratings);
  const { refetch } = useQueryTeacher_subjects();

  const students = useDatabaseStore((state) => state.students);
 

  const [filter, setFilter] = useState([]);
  return (
    <div className=" pb-20 md:pb-0">
      <div className="flex flex-col  text-fontColor w-full p-5">
        <p className="text-xl">Students</p>
      </div>
      <div className="p-5 flex flex-wrap gap-5">
        {students.map((student, index) => {
          return <Student key={index} students={student} />;
        })}
      </div>
    </div>
  );
}
