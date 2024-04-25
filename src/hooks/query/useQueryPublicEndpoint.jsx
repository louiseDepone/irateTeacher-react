
import React from "react";
import useDatabaseStore from "../store/useDatabaseStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
  // setPublicEdpoint: (publicEdpoint) => set({ publicEdpoint }),

export function useQueryPublicEndpoint() {
  const setPublicEdpoint = useDatabaseStore((state) => state.setPublicEdpoint);
  const navigate = useNavigate();
  const { data, refetch, isLoading, error, isRefetching } = useQuery({
    queryKey: [22222, "ratings"],
    queryFn: async () => {
      try {
        const response = await axios.get("/publicEndpoints", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await response.data;
        setPublicEdpoint(data);
        return data;
      } catch (error) {
        console.error(error);
        // localStorage.clear();
        // navigate(0, "/login", { replace: true });

        return error;
      }
    },
    // refetchInterval: 1000,
  });

  return { data, refetch, isLoading, error, isRefetching };
}
