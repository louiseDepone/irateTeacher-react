import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useSelectedSideBar from '../store/useSelectedSideBar';
import { useQueryEnrollments } from './useQueryEnrollments';

export function useQueryCertainStudentOnASubject() {
  
  const { refetch:refetchEnrollment } = useQueryEnrollments();
  const studentsEnroled = useSelectedSideBar((state) => state.studentsEnroled);
  const setListOfStudents = useSelectedSideBar(
    (state) => state.setListOfStudents
  );
  
      // try {
      //   const response = await axios.get(
      //     `/multipleEnrollementDependingOnTheTeacherSubjectId/${studentsEnroled?.teacher_subject_id}`,
      //     {
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: localStorage.getItem("token"),
      //       },
      //     }
      //   );

      //   const data = await response.data;
      //   setListOfStudents(data);
      //   return response;
      // } catch (error) {
      //   console.log(error);
      //   return error;
      // }

         const { data, error, refetch, isLoading } = useQuery({
           queryKey: [
             "multipleEnrollementDependingOnTheTeacherSubjectId",
             532343,
           ],
           queryFn: async () => {

            if (!studentsEnroled) return;
             try {
         
              

               const response = await axios.get(
                 `/multipleEnrollementDependingOnTheTeacherSubjectId/${studentsEnroled?.teacher_subject_id}`,
                 {
                   headers: {
                     "Content-Type": "application/json",
                     Authorization: localStorage.getItem("token"),
                   },
                 }
               );

               const data = await response.data;
               setListOfStudents(data);
               refetchEnrollment();
               return response.data;
             } catch (error) {
               return error;
             }
           },
         });

         return {
           data,
           error,
           refetch,
           isLoading,
         };
    
}

export function  useQueryCertainsubjectonAStudent() {
  
  const selectedStudentSubjects = useSelectedSideBar(
    (state) => state.selectedStudentSubjects
  );
  const setlistOfEnrolledSubjects = useSelectedSideBar(
    (state) => state.setlistOfEnrolledSubjects
  );
  
      const { data, error , refetch, isLoading} = useQuery({
        queryKey: ['multipleEnrollementDependingOnTheStudentId', 34234632],
        queryFn: async () => {

          if (!selectedStudentSubjects) return;
          try{
            
            const response = await axios.get(
              `/multipleEnrollementDependingOnTheStudentId/${selectedStudentSubjects?.student_id}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: localStorage.getItem("token"),
                },
              }


            );
    
              const data = await response.data;
              setlistOfEnrolledSubjects(data);
            return response.data;
          } catch (error) {
            return error;
          }

      },
    });

    return {
      data,
      error,
      refetch,
      isLoading
    }
    
}