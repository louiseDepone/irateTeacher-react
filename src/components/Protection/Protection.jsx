import {useQueryUser} from '@/hooks/query/useQueryUser'
import useResetAllStor from '@/hooks/query/useResetAllStor';
import useUserStore from '@/hooks/store/useUserStore';
import React from 'react'
import { useNavigate , useLocation} from 'react-router-dom';

export default function Protection({children}) {
  // const { resetAllStore: reset } = useResetAllStor();
  const { data, refetch, isLoading, error } = useQueryUser();
  const setUser = useUserStore((state) => state.setUser);
  const navigate = useNavigate();
  const location = useLocation().pathname.split("/")[2];

  const token = localStorage.getItem("token");
    if (token === null || !token) {
      localStorage.clear();
      setUser(null);
      // reset();
      navigate(0, { replace: true })
      return navigate("../login", { replace: true });
    }
    if (isLoading) {
      return <div className='text-white'>Loading the protected gone...</div>;
    }else if (error) {
    // reset();
    // navigate(0, { replace: true })
    return navigate("../login", { replace: true });
  } else if(data.status === 201){
    setUser(data.data)
  switch (location?.toLowerCase()) {
    case "admin":
      if (data.data.role.toLowerCase() !== "admin")
        return navigate("main/foryoufeed", { replace: true });
    case "teachersubject":
      if (data.data.role.toLowerCase() !== "admin")
        return navigate("main/foryoufeed", { replace: true });
    case "foryoufeed":
    case "publicfeed":
  }
    return children
  }
}
