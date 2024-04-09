import useDatabaseStore from '@/hooks/store/useDatabaseStore';
import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit, Plus } from 'lucide-react';
// approved: 1;
// deleted: 0;
// email: "student1";
// name: "student1";
// password: "$2b$10$ySnD76G.FcQ3QX24VAYt1.eX0dRLPjOLqt.5.mNbv.YSl0GePRxmm";
// role: "student";
// student_id: 1;
export default function Students() {
  const students = useDatabaseStore((state) => state.students);
  return (
    <table className='w-full overflow-auto'>
      <TableCaption>A list of students.</TableCaption>
      <TableHeader>
        <TableRow className="border-grayish text-white">
          <TableHead>No.</TableHead>
          {/* <TableHead>Email</TableHead> */}
          <TableHead>Student Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
          <TableHead className=""><Plus/></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.map((student, index) => {
          return (
            <TableRow key={index} className="border-grayish">
              <TableCell>{index}</TableCell>
              {/* <TableCell>{student.email}</TableCell> */}
              <TableCell>{student.student_id}</TableCell>
              <TableCell className="text-gray-700">
                {student.approved === 1 ? "Approved" : "Pending"}
              </TableCell>
              <TableCell className="space-x-2 flex">
                <button className="text-white bg-red-500 px-2 py-1 rounded-md">
                  Restrict
                </button>
                <button
                  className={` px-2 py-1 rounded-md ${
                    student.approved === 0 ? "bg-green-500" : "bg-red-500"
                  }
                }`}
                >
                  {student.approved === 0 ? "Approve" : " Disapprove"}
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </table>
  )
}