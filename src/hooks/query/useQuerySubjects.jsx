import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useQuerySubjects() {
    const setSubjects = useDatabaseStore((state) => state.setSubjects);
  const navigate = useNavigate();
        const { data, refetch, isLoading, error } = useQuery({
          queryKey: [555555, "subjects"],
          queryFn: async () => {
            try {
              const response = await axios.get("/subjects", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
              });
              const data = await response;
              setSubjects(data.data);
              return data;
            } catch (error) {
              console.error(error);
              // localStorage.clear();
                // navigate(0, "/login", { replace: true });
              return error;
            }
          },

        //   refetchInterval: 3000,
        });

    return { data, refetch, isLoading, error };

}
