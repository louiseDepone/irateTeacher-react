import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import { ArrowBigDown, ArrowDown, EyeIcon, EyeOffIcon, MoveDown } from "lucide-react";
import AllTeacher from "@/components/Tables/Teacher";
import Students from "@/components/Tables/Students";
import Subjects from "@/components/Tables/Subjects";
import Ratings from "@/components/Tables/Ratings";
import Teacher_subjects from "@/components/Tables/Teacher_subjects";

export default function Admin() {
  const teachers = useDatabaseStore((state) => state.teachers);
  const students = useDatabaseStore((state) => state.students);
  const subjects = useDatabaseStore((state) => state.subjects);
  const ratings = useDatabaseStore((state) => state.ratings);
  const teacher_subjects = useDatabaseStore((state) => state.teacher_subjects);
 
  const [open, setOpen] = React.useState({
    teachers: true,
    students: true,
    subjects: true,
    ratings: true,
    teacher_subjects: true,
  });
  return (
    <div className="w-full flex justify-center flex-col  p-7 text-white ">
      {/* <div className=""> */}
        <div className="flex justify-between">
          Teacher
          {open.teachers ? (
            <EyeIcon onClick={() => setOpen({ ...open, teachers: false })} />
          ) : (
            <EyeOffIcon onClick={() => setOpen({ ...open, teachers: true })} />
          )}
        </div>
        <div
          className={` 
          ${open.teachers ? "flex" : "hidden"}
        `}
        >
          <AllTeacher />
        </div>
      
        <div className="flex justify-between">
          Subjects
          {open.subjects ? (
            <EyeIcon onClick={() => setOpen({ ...open, subjects: false })} />
          ) : (
            <EyeOffIcon onClick={() => setOpen({ ...open, subjects: true })} />
          )}
        </div>

        <div
          className={`  
          ${open.subjects ? "block" : "hidden"}
        `}
        >
          <Subjects />
        </div>

   

    
    // </div>
  );
}
