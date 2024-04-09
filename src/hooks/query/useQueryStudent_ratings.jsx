import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useQueryStudent_ratings() {
    const setStudent_ratings = useDatabaseStore(
      (state) => state.setStudent_ratings
    );
        const { data, refetch, isLoading, error } = useQuery({
        queryKey: [777777, 'student_ratings'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                  "/studentRatings",
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: localStorage.getItem("token"),
                    },
                  }
                );
                const data = await response;
                setStudent_ratings(data.data)
                return data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },
        });

  return 
}
