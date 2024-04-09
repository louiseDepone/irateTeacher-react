import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useQueryEnrollments() {
    const setEnrollment = useDatabaseStore((state) => state.setEnrollment);
        const { data, refetch, isLoading, error } = useQuery({
        queryKey: [8888888, 'enrollments'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                  "/studentteackingcourses",
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const data = await response;
                setEnrollment(data?.data?.filter((enrollment) => enrollment.deleted === 0))
                return data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },
        });

  return  { data, refetch, isLoading, error }
}