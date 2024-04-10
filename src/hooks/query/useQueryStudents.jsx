import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useQueryStudents() {
  const setStudents = useDatabaseStore(state => state.setStudents);

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
            return error;
          }
        },

        // refetchInterval: 3000,
      });

    return { data, refetch, isLoading, error };

}
