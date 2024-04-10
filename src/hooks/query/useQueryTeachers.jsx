import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useQueryTeachers() {
    const setTeacherst = useDatabaseStore((state) => state.setTeacherst);

    const { data, refetch, isLoading, error } = useQuery({
        queryKey: [33333, 'teachers'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    "/teachers",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                const data = await response;
                setTeacherst(data.data.filter((teacher) => teacher.deleted == 0))
             
                return data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },
    });

    return { data, refetch, isLoading, error };

}
