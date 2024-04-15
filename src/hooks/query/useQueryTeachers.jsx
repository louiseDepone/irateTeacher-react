import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function useQueryTeachers() {
    const setTeacherst = useDatabaseStore((state) => state.setTeacherst);
    const navigate = useNavigate();
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
                localStorage.clear();
                navigate( 0,"/login", { replace: true });
                return error;
            }
        },
    });

    return { data, refetch, isLoading, error };

}
