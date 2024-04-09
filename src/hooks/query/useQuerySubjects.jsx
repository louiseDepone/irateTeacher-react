import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useQuerySubjects() {
    const setSubjects = useDatabaseStore((state) => state.setSubjects);

        const { data, refetch, isLoading, error } = useQuery({
        queryKey: [555555, 'subjects'],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    "/subjects",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem("token"),
                        },
                    }
                );
                const data = await response;
                setSubjects(data.data)
                return data;
            } catch (error) {
                console.error(error)
                return error;
            }
        },
        });

    return { data, refetch, isLoading, error };

}
