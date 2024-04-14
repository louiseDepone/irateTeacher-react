import { create } from "zustand";

const initialState = {
  enrollments: [],
  ratings: [],
  student_ratings: [],
  students: [],
  subjects: [],
  teacher_subjects: [],
  teachers: [],
  matriculation: [],
  all_matriculations:[],

  admin_enrollments: [],
  admin_ratings: [],
  admin_student_ratings: [],
  admin_students: [],
  admin_subjects: [],
  admin_teacher_subjects: [],
  admin_teachers: [],
};

const useDatabaseStore = create((set) => ({
  ...initialState,
  admin_setEnrollment: (enrollments) => set({ enrollments }),
  admin_setRatings: (ratings) => set({ ratings }),
  admin_setStudent_ratings: (student_ratings) => set({ student_ratings }),
  admin_setStudents: (students) => set({ students }),
  admin_setSubjects: (subjects) => set({ subjects }),
  admin_setTeacher_subjects: (teacher_subjects) => set({ teacher_subjects }),
  admin_setTeacherst: (teachers) => set({ teachers }),

  setEnrollment: (enrollments) => set({ enrollments }),
  setRatings: (ratings) => set({ ratings }),
  setStudent_ratings: (student_ratings) => set({ student_ratings }),
  setStudents: (students) => set({ students }),
  setSubjects: (subjects) => set({ subjects }),
  setTeacher_subjects: (teacher_subjects) => set({ teacher_subjects }),
  setTeacherst: (teachers) => set({ teachers }),
  setMatriculation: (matriculation) => set({ matriculation }),
  setAllMatriculations: (all_matriculations) => set({ all_matriculations }),
  reset: () => set(initialState),
}));

export default useDatabaseStore;
