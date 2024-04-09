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
import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';
import { useQuerySubjects } from '@/hooks/query/useQuerySubjects';
export default function Subjects() {

  const subjects = useDatabaseStore((state) => state.subjects);
  const {refetch} = useQuerySubjects();
  const submit = (e) => {
    e.preventDefault();
    const information = {
      subject: e.target[0].value,
    };

    const addSubject = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3300/subjects",
          information,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        refetch()
      } catch (error) {
        console.log(error);
      }
    };
    refetch
    addSubject();
  };
  return (
      <table className='w-full'>
        <TableCaption>A list of Subjects</TableCaption>
        <TableHeader>
          <TableRow className="border-grayish text-white">
            <TableHead>No.</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>
              <Dialog className="w-fit">
                <DialogTrigger>
                  <Plus />
                </DialogTrigger>
                <DialogContent className="w-fit">
                  <DialogHeader>
                    <DialogTitle>Add a new Subject</DialogTitle>
                  </DialogHeader>
                    <form action="#" onSubmit={submit}>
                        <div className="">
                          <label htmlFor="name">Subject</label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className=""
                          />
                        </div>
                          <button
                            type="submit"
                            className=""
                          >
                            Add
                          </button>
                    </form>
                </DialogContent>
              </Dialog>
            </TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => {
            return (
              <TableRow key={index} className="border-grayish">
                <TableCell>{index}</TableCell>
                <TableCell>{subject.subject}</TableCell>
                <TableCell className="space-x-3">
                  <button className="text-white bg-blue-500 px-2 py-1 rounded-md">
                    Edit
                  </button>
                  <button className="text-white bg-red-500 px-2 py-1 rounded-md">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </table>
  )
}
