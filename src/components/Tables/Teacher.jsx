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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  ArrowBigDown,
  ArrowDown,
  Axis3D,
  Delete,
  Edit,
  EyeIcon,
  EyeOffIcon,
  MoveDown,
  Plus,
} from "lucide-react";
import axios from "axios";
import { useQueryTeachers } from "@/hooks/query/useQueryTeachers";
export default function AllTeacher() {
  const [open, setOpen] = React.useState({
    teachers: true,
    students: true,
    subjects: true,
    ratings: true,
    teacher_subjects: true,
  });
  const teachers = useDatabaseStore((state) => state.teachers);
  const { refetch } = useQueryTeachers();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const submit = (e) => {
    e.preventDefault();
    const information = {
      name: e.target[0].value.trim(),
    };

    const addTeacher = async () => {
      try {
        setIsSubmitting(true);
        const res = await axios.post(
          "/teachers",
          information,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log(res);
        refetch();
        setIsSubmitting(false);
      } catch (error) {
        console.log(error);
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
        setIsSubmitting(false);
      }
    };
    addTeacher();
  };
  return (
    <table className="w-full">
        <TableCaption>A list of Teachers</TableCaption>
        <TableHeader>
          <TableRow className="border-grayish text-fontColor">
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>action</TableHead>
            <TableHead>
              <Dialog className="">
                <DialogTrigger>
                  <button className="text-2xl font-semibold">
                    <Plus />
                  </button>
                </DialogTrigger>
                <DialogContent className="w-fit h-fit">
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                  </DialogHeader>
                  <form action="#" onSubmit={submit}>
                    <div>
                      <label htmlFor="name">Name</label>
                      <input type="text" />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Adding..." : "Add"}
                    </button>
                  </form>
                </DialogContent>
              </Dialog>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers.map((teacher, index) => {
            return (
              <TableRow key={index} className="border-grayish">
                <TableCell>{index}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell className="space-x-2">
                  <button className="text-fontColor bg-blue-500 px-2 py-1 rounded-md">
                    Edit
                  </button>
                  <button className="text-fontColor bg-red-500 px-2 py-1 rounded-md">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </table>
  );
}
