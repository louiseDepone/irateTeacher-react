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
// approved: 1;
// attitude: 3;
// comment: "sadsd";
// communication: 3;
// date: "2024-03-27T16:00:00.000Z";
// deleted: 0;
// dislikes: 0;
// engagement: 2;
// likes: 0;
// organization: 3;
// rating_id: 51;
// studentName: "anonynmouse";
// student_id: 1234567890;
// subjectName: "System Fundamentals";
// supportiveness: 5;
// teacherName: "Ronel B. Simon";
// teaching_method: 3;
export default function Ratings() {
  const ratings = useDatabaseStore((state) => state.ratings);
  return (
    <table className="w-full">
      <TableCaption>A list of Critique</TableCaption>
      <TableHeader>
        <TableRow className="border-grayish text-fontColor">
          <TableHead>No.</TableHead>
          <TableHead className="text-nowrap">Teacher</TableHead>
          <TableHead className="text-nowrap w-[30%] ">Subject</TableHead>
          <TableHead className="text-nowrap">Comment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ratings.map((rating, index) => {
          return (
            <TableRow key={index} className="border-grayish">
              <TableCell className="text-nowrap">{index}</TableCell>
              <TableCell className="text-nowrap">
                {rating.teacherName}
              </TableCell>
              <TableCell>{rating.subjectName}</TableCell>
              <TableCell>{rating.comment}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </table>
  );
}
