import  useDatabaseStore  from "../store/useDatabaseStore";
import  useSelectedSideBar from "../store/useSelectedSideBar";
import  useUserStorefrom from "../store/useUserStore";

export default function useResetAllStor() {
  const resetAllStore = () => {
    // Reset Database store
    const {
      setEnrollment,
      setRatings,
      setStudent_ratings,
      setStudents,
      setSubjects,
      setTeacher_subjects,
      setTeachers,
    } = useDatabaseStore.getState();
    setEnrollment([]);
    setRatings([]);
    setStudent_ratings([]);
    setStudents([]);
    setSubjects([]);
    setTeacher_subjects([]);
    setTeachers([]);

    // Reset Selected Sidebar store
    const { setstudentsEnroled, setListOfStudents } =
      useSelectedSideBar.getState();
    setstudentsEnroled(null);
    setListOfStudents([]);

    // Reset User store
    const {
      setUser,
      setUserSubjectEnrolledin,
      setUserTeacherEnrolledin,
      setUserpinpost,
    } = useUserStore.getState();
    setUser(null);
    setUserSubjectEnrolledin([]);
    setUserTeacherEnrolledin([]);
    setUserpinpost([]);
  };

  return { resetAllStore };
}
