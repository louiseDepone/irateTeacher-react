import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import starcolored from "@/assets/starcolored.svg";
import starempty from "@/assets/starempty.svg";
import axios from "axios";
import { useRef } from "react";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";
import { useQueryRaitings } from "@/hooks/query/useQueryRaitings";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Post() {
    const user = useUserStore((state) => state.user);
  const userSubject = useDatabaseStore((state) =>
    state.enrollments.filter((enrolled) => enrolled.student_id == user.id)
  );

const dtateachers = useDatabaseStore((state) => state.enrollments.filter((enrolled) => enrolled.student_id == user.id).map((enrolled) =>{
  return{
    teacher: enrolled.teacher,
    teacher_id: enrolled.teacher_id
  }
}))
// userTeachers;
const trys = new Set(dtateachers.map((teacher) => teacher.teacher_id));

const userTeachers = dtateachers.filter((teacher, index) => trys.has(teacher.teacher_id) && trys.delete(teacher.teacher_id) && teacher);
console.log(trys, "trys");

console.log(userTeachers)

  const [userSubjects, setUserSubjects] = useState(null);
  const {refetch } = useQueryRaitings()
  const [ratings, setRatings] = useState({
    teaching_methods: 0,
    communication: 0,
    supportiveness: 0,
    engagement: 0,
    organization: 0,
    attitude: 0,
  });
  const divPara = useRef();
  const refuse = useRef();
  const submitPost = (e) => {
    e.preventDefault();

    console.log(e,
     "value every eelmeent inside the form",
       e.target[0].value,
      e.target[1].value,
       e.target[2].value,
     ratings.teaching_methods,
      ratings.communication,
       ratings.supportiveness,
     ratings.engagement,
      ratings.organization,
      ratings.attitude,
    )
    const post = async () => {
      // return
      try {
        if (e.target[2].value == "null" || e.target[1].value == "null") {
          throw new Error("Hello there");
        }
        console.log(divPara.current);
        const response = await axios.post(
          "/ratings",
          {
            data: {
              student_id: user.id,
              teacher_subject_id: userSubject.filter(
                (subject) =>
                  subject.teacher_id == userSubjects &&
                  subject.subject_id == e.target[2].value
              )[0].teacher_subject_id,
              comment: divPara.current.innerText,
              teaching_method: ratings.teaching_methods,
              attitude: ratings.attitude,
              communication: ratings.communication,
              organization: ratings.organization,
              supportiveness: ratings.supportiveness,
              engagement: ratings.engagement,
              likes: 0,
              dislikes: 0,
              date: (new Date)
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );

        refetch();
        refuse.current.reset();
        divPara.current.innerText = "Enter a comment for a teacher";
        return;
      } catch (error) {
        console.log(error);
      }
    };

    post();
  };
  return (
    // <div className="flex w-full p-3 border-b border-grayish ">

    // </div>

    <div className="flex justify-center flex-col items-center py-6">
      <div className="bg-white rounded-full w-12 h-12 object-cover flex items-center justify-center">
        <span className="text-[#1B2730] font-bold">
          {user.name.charAt(0).toUpperCase() +
            user.name.charAt(user.name.length - 1).toUpperCase()}
        </span>
      </div>
      <p className="text-xl font-bold text-white pt-1">{user.name}</p>
      <p className="text-mutedColor text-[0.6rem] pt-4">
        Rate your teacher's performance based on your personal experience.
      </p>

      <div className="w-3/4 ">
        <Dialog className="w-full backdrop-blur-sm ">
          <DialogTrigger className="w-full">
            <div className="w-full h-fit flex items-center mt-4 gap-3">
              <input
                type="text"
                placeholder="Enter a comment for a teacher"
                className=" bg-secondaryColor w-full h-12 rounded-[20px] pl-12 text-[0.6rem] px-4 py-2  focus:outline-none"
              />
              <button className="text-nowrap text-linkedColor text-xs ">
                POST
              </button>
            </div>
          </DialogTrigger>
          <DialogContent className=" h-full w-full md:w-1/3 md:max-h-[80%] md:h-fit overflow-auto bg-primaryColor  p-8 border-borderColor ">
            <form
              className="w-full space-y-3"
              onSubmit={submitPost}
              ref={refuse}
            >
              <div
                ref={divPara}
                className="text-white w-full border-l pl-5  post  focus:outline-none mt-6"
                contentEditable="plaintext-only"
                data-lexical-text="true"
                suppressContentEditableWarning={true}
                onClick={() => {
                  // mt the p element inside the divpara
                  if (
                    divPara.current.innerText == "Enter a comment for a teacher"
                  ) {
                    divPara.current.innerText = "";
                  }
                }}
              >
                <p className="pTo delete text-mutedColor">
                  Enter a comment for a teacher
                </p>
              </div>
              <button></button>

              {/* ------------------------- */}
              <div className=" h-fit text-xs lg:flex sm:gap-3 ">
                <div className="flex justify-center items-center h-16 w-full gap-4">
                  <p className="text-white text-nowrap">Teacher</p>
                  <select
                    className="text-white bg-transparent w-full h-full "
                    onChange={(e) => {
                      setUserSubjects(e.target.value);
                    }}
                    name="teacher"
                  >
                    <option className="text-black " value={null}>
                      Choose
                    </option>
                    {userTeachers.map((subject, index) => {
                      return (
                        <option
                          key={index}
                          className="text-black"
                          value={subject.teacher_id}
                        >
                          {subject.teacher}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex justify-center items-center w-full h-16 gap-4 ">
                  <p className="text-white text-nowrap">Subject</p>
                  <select
                    name="subject"
                    id="subject"
                    className="bg-transparent text-white  mp-3  h-full w-full"
                    disabled={userSubjects == "null"}
                  >
                    <option className="text-black " value={"null"}>
                      Choose
                    </option>
                    {userSubject
                      .filter((subject) => subject.teacher_id == userSubjects)
                      .map((subject, index) => {
                        return (
                          <option
                            key={index}
                            className="text-black"
                            value={subject.subject_id}
                          >
                            {subject.subject}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              {/* ------------------------- */}
              <div className="flex flex-col items-end w-full   space-y-3">
                <div className="flex text-xs justify-between  w-full text-white font-normal flex-wrap gap-3">
                  <div className="flex flex-col justify-center items-center ">
                    <p>Teaching Method</p>
                    <Rating
                      className="z-2"
                      emptySymbol={<img src={starempty} alt="empty" />}
                      placeholderSymbol={
                        <img src={starcolored} alt="colored" />
                      }
                      fullSymbol={<img src={starcolored} alt="colored" />}
                      placeholderRating={ratings.teaching_methods}
                      onChange={(e) => {
                        setRatings({
                          ...ratings,
                          teaching_methods:
                            e === ratings.teaching_methods ? 0 : e,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p>Communication</p>
                    <Rating
                      emptySymbol={<img src={starempty} alt="empty" />}
                      placeholderSymbol={
                        <img src={starcolored} alt="colored" />
                      }
                      fullSymbol={<img src={starcolored} alt="colored" />}
                      placeholderRating={ratings.communication}
                      onChange={(e) => {
                        setRatings({
                          ...ratings,
                          communication: e === ratings.communication ? 0 : e,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p>Supportiveness</p>
                    <Rating
                      emptySymbol={<img src={starempty} alt="empty" />}
                      placeholderSymbol={
                        <img src={starcolored} alt="colored" />
                      }
                      fullSymbol={<img src={starcolored} alt="colored" />}
                      placeholderRating={ratings.supportiveness}
                      onChange={(e) => {
                        setRatings({
                          ...ratings,
                          supportiveness: e === ratings.supportiveness ? 0 : e,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p>Organization</p>
                    <Rating
                      emptySymbol={<img src={starempty} alt="empty" />}
                      placeholderSymbol={
                        <img src={starcolored} alt="colored" />
                      }
                      fullSymbol={<img src={starcolored} alt="colored" />}
                      placeholderRating={ratings.organization}
                      onChange={(e) => {
                        setRatings({
                          ...ratings,
                          organization: e === ratings.organization ? 0 : e,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p>Engagement</p>
                    <Rating
                      emptySymbol={<img src={starempty} alt="empty" />}
                      placeholderSymbol={
                        <img src={starcolored} alt="colored" />
                      }
                      fullSymbol={<img src={starcolored} alt="colored" />}
                      placeholderRating={ratings.engagement}
                      onChange={(e) => {
                        setRatings({
                          ...ratings,
                          engagement: e === ratings.engagement ? 0 : e,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <p>Attitude</p>
                    <Rating
                      emptySymbol={<img src={starempty} alt="empty" />}
                      placeholderSymbol={
                        <img src={starcolored} alt="colored" />
                      }
                      fullSymbol={<img src={starcolored} alt="colored" />}
                      placeholderRating={ratings.attitude}
                      onChange={(e) => {
                        setRatings({ ...ratings, attitude: e });
                      }}
                    />
                  </div>
                </div>
                <div className="space-x-2">

                <DialogClose className="bg-red-500 rounded-lg px-4 py-1">
                  Discard 
                </DialogClose>
                <button className="bg-[#8287FE] rounded-lg px-4 py-1">
                  Post
                </button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
