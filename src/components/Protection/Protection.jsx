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
    if (token == null || !token) {
      localStorage.clear();
      setUser(null);
      // reset();
      return navigate("../login", { replace: true });
    }

    if (isLoading) {
      return <div className='text-white'>Loading the useQuery User</div>;
    }else if (error) {
      // localStorage.clear();
      // setUser(null);
      console.log(error, 'erroruuuuuuuuuuuuuuuu')
    // return navigate("../login", { replace: true });
     return <div className="text-white">Loading the protected gone... , {error}</div>;
  } else if(data.status == 201){
  
  
   setUser(data.data)
   console.log(data, 'data')
   if(!data.data.role.toLowerCase()){
    return <div className="text-white">Loading your roal...</div>;
   }
  switch (location?.toLowerCase()) {
    case "admin":
      if (data.data.role.toLowerCase() !== "admin")
        return navigate("main/foryoufeed", { replace: true });
    case "teachersubject":
      if (data.data.role.toLowerCase() !== "admin")
        return navigate("main/foryoufeed", { replace: true });
    case "foryoufeed":
    case "publicfeed":
    case "matriculation":
      return children;
    default:
      return  navigate("../login", { replace: true });;
  }
  }
}
