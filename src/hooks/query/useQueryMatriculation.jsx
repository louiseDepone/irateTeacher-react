import React from 'react'
import useDatabaseStore from '../store/useDatabaseStore'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useUserStore from '../store/useUserStore';
import { useNavigate } from 'react-router-dom';

export function useQueryMatriculation() {
  const setMatriculation = useDatabaseStore((state) => state.setMatriculation);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [938293892, "matriculationsss"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/matriculation/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await response;
        console.log(data)
        setMatriculation(
          data?.data?.filter(
            (matris) => matris.deleted == 0 || matris.deleted == null
          )
        );
        return data;
      } catch (error) {
        console.error(error);
        // localStorage.clear();
                // navigate(0, "/login", { replace: true });

        return error;
      }
    },
  
    // refetchInterval: 3000,
  });

  return { data, refetch, isLoading, error };
}
export function useQueryChosenMatriculations() {
  const setAllMatriculations = useDatabaseStore(
    (state) => state.setAllMatriculations
  );
  const user = useUserStore((state) => state.user);
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [978793792, "ALLmatriculationsss"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/matriculation`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await response;
        console.log(data)
        setAllMatriculations(
          data?.data?.filter(
            (matris) => matris.deleted == 0 || matris.deleted == null
          )
        );
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