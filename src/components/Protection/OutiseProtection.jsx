import { useQueryUser } from "@/hooks/query/useQueryUser";
import useResetAllStor from "@/hooks/query/useResetAllStor";
import useUserStore from "@/hooks/store/useUserStore";
import React from "react";
import { useNavigate } from "react-router-dom";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useSelectedSideBar from "@/hooks/store/useSelectedSideBar";

// setEnrollment;
// setRatings;
// setStudent_ratings;
// setStudents;
// setSubjects;
// setTeacher_subjects;
// setTeacherst;

// setstudentsEnroled;
// setListOfStudents;

// setUser;
// setUserSubjectEnrolledin;
// setUserTeacherEnrolledin;
// setUserpinpost;

export default function OutiseProtection({ children }) {
  const setUser = useUserStore((state) => state.setUser);
  // const { resetAllStore: reset } = useResetAllStor();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  if (token == null ||!token )  {
    localStorage.clear();
    setUser(null);
    return children;
  }
  const { data, refetch, isLoading, error } = useQueryUser();
  if (isLoading) {
      return <div className="text-white">Loading the protected sherif...</div>;
  } 
    
  return navigate("/main/foryoufeed", { replace: true });
}
