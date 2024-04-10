import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useQueryTeacher_subjects() {
    const setTeacher_subjects = useDatabaseStore(
      (state) => state.setTeacher_subjects
    );

        const { data, refetch, isLoading, error } = useQuery({
          queryKey: [44444, "teacher_subjects"],
          queryFn: async () => {
            try {
              const response = await axios.get("/teacherSubjects", {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
              });
              const data = await response;
              setTeacher_subjects(data.data);
              return data;
            } catch (error) {
              console.error(error);
              return error;
            }
          },

          // refetchInterval: 3000,
        });

    return { data, refetch, isLoading, error }

}
