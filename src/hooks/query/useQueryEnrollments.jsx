import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useQueryEnrollments() {
    const setEnrollment = useDatabaseStore((state) => state.setEnrollment);
    const navigate = useNavigate();
        const { data, refetch, isLoading, error } = useQuery({
          queryKey: [8888888, "enrollments"],
          queryFn: async () => {
            try {
              const response = await axios.get("/studentteackingcourses", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
              });
              const data = await response;
              setEnrollment(
                data?.data?.filter((enrollment) => enrollment.deleted == 0)
              );
              return data;
            } catch (error) {
              // localStorage.clear();
                // navigate(0, "/login", { replace: true });

              console.error(error);
              return error;
            }
          },

          // refetchInterval: 3000,
        });

  return  { data, refetch, isLoading, error }
}