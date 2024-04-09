import { create } from "zustand";
const intialState = {
  studentsEnroled: null,
  listOfStudents: [],
  selectedStudentSubjects: null,
  listOfEnrolledSubjects: []
};

const useSelectedSideBar = create((set) => ({
  ...intialState,
  setstudentsEnroled: (studentsEnroled) => {
    set({ studentsEnroled });
  },
  setListOfStudents: (listOfStudents) => set({ listOfStudents }),
  setlistOfEnrolledSubjects: (listOfEnrolledSubjects) =>
    set({ listOfEnrolledSubjects }),
  setselectedStudentSubjects: (selectedStudentSubjects) =>
    set({ selectedStudentSubjects }),
  reset: () => set(intialState),
}));

export default useSelectedSideBar;
