import useDatabaseStore from '@/hooks/store/useDatabaseStore';
import React from 'react'
// subject: "Thesis Writing 1/Capstone Project 1";
// subject_id: 1;
// teacher_id: 1;
// teacher_name: "Anna Loretta Capanang-Romulo";
// teacher_subject_id: 1;
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function Teacher_subjects() {
  const teacher_subjects = useDatabaseStore((state) => state.teacher_subjects);
  return (
    <table className="w-full">
      <TableCaption>A list of Subjects with Teachers</TableCaption>
      <TableHeader>
        <TableRow className="border-grayish text-fontColor">
          <TableHead>No.</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Teacher</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {teacher_subjects.map((teacher_subject, index) => {
          return (
            <TableRow key={index} className="border-grayish">
              <TableCell>{index}</TableCell>
              <TableCell>{teacher_subject.subject}</TableCell>
              <TableCell>{teacher_subject.teacher_name}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </table>
  );
}
