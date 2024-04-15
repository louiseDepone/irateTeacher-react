import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useQueryStudents() {
  const setStudents = useDatabaseStore(state => state.setStudents);
  const navigate = useNavigate();

      const { data, refetch, isLoading, error } = useQuery({
        queryKey: [666666, "students"],
        queryFn: async () => {
          try {
            const response = await axios.get("/students", {
              headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
              },
            });
            const data = await response;
            setStudents(data.data);
            return data;
          } catch (error) {
            console.error(error);
            localStorage.clear();
                navigate(0, "/login", { replace: true });
            return error;
          }
        },

        // refetchInterval: 3000,
      });

    return { data, refetch, isLoading, error };

}
