import React from "react";
import useUserStore from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useQueryUser() {
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [11111, "user"],
    queryFn: async () => {
      try {
        const response = await axios.get("/verify", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await response;
        setUser(data.data);
        return data;
      } catch (error) {
        console.error(error);
        localStorage.clear();
        setUser(null)

        navigate("/login");

        return error;
      }
    },
  });
  return { data, refetch, isLoading, error };
}

export function useQuerymultipleSubjectOfACertainUser() {
  const user = useUserStore((state) => state.user);
  const setUserSubjectEnrolledin = useUserStore(
    (state) => state.setUserSubjectEnrolledin
  );
  
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [65294729, "multipleSubjectOfACertainUser"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/multipleSubjectOfACertainUser/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await response;
        setUserSubjectEnrolledin(data.data);
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

export function useQuerymutliplesTeacherOfACertainUser() {
  const user = useUserStore((state) => state.user);
  const setUserTeacherEnrolledin = useUserStore(
    (state) => state.setUserTeacherEnrolledin
  );
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [502932, "mutliplesTeacherOfACertainUser"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `/mutliplesTeacherOfACertainUser/${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await response;
        setUserTeacherEnrolledin(data.data);
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

export function useQueryPinPost() {
  const user = useUserStore((state) => state.user);
  const setUserpinpost = useUserStore((state) => state.setUserpinpost);
  const userpinpost = useUserStore((state) => state.userpinpost);
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: [502932, "pinpost"],
    queryFn: async () => {
      try {
        const response = await axios.get(`/pinposts/user/${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
        const data = await response;

        setUserpinpost(data.data);
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
