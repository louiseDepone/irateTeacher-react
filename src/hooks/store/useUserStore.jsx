import { create } from "zustand";
const initialState = {
  user: null,
  userSubjectEnrolledin: [],
  userTeacherEnrolledin: [],
  userpinpost: [],
  userChosenSubject: null,
  userChosenTeacher: null,
  toShow:"account",
  userSearch:""
};
const useUserStore = create((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  setUserSubjectEnrolledin: (userSubjectEnrolledin) =>
    set({ userSubjectEnrolledin }),
  setUserTeacherEnrolledin: (userTeacherEnrolledin) =>
    set({ userTeacherEnrolledin }),
  setUserpinpost: (userpinpost) => set({ userpinpost }),
  reset: () => set(initialState),
  setUserChosenSubject: (userChosenSubject) => set({ userChosenSubject }),
  setUserChosenTeacher: (userChosenTeacher) => set({ userChosenTeacher }),
  setToShow: (toShow) => set({ toShow }),
  setUserSearch: (userSearch) => set({ userSearch})
}));

export default useUserStore;