import React from "react";
import useDatabaseStore from "../store/useDatabaseStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useQueryRaitings() {
  const setRatings = useDatabaseStore((state) => state.setRatings);
  const { data, refetch, isLoading, error, isRefetching } = useQuery({
    queryKey: [22222, "ratings"],
    queryFn: async () => {
      try {
        const response = await axios.get("/ratings", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await response;
        setRatings(data.data);
        return data;
      } catch (error) {
        console.error(error);
        return error;
      }
    },
    // refetchInterval: 1000,
  });

  return { data, refetch, isLoading, error, isRefetching };
}
