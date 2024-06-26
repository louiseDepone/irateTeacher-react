import React from 'react'
import { useQueryCertainStudentOnASubject, useQueryCertainsubjectonAStudent } from '../query/useFetch';
import axios from "axios";

export function useunEnrollStudent(enrollement_id) {
  const { refetch } = useQueryCertainStudentOnASubject();
  const { refetch: refetchuseQueryCertainsubjectonAStudent } =
    useQueryCertainsubjectonAStudent();

  const deltetion = async (enrolled) => {
    try {
      const realDeletion = await axios.delete(
        `/realDeletion/${enrolled.enrollment_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      refetch();
      refetchuseQueryCertainsubjectonAStudent();
    } catch (error) {
    }
  };

  return  {deltetion} ;
}
