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
import { useLocation } from "react-router-dom";
import { useQueryUser } from "@/hooks/query/useQueryUser";

export default function Post() {
  const {refetch:userrefetch} = useQueryUser()
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

  
    const post = async () => {
      // return
      try {
        if (e.target[2].value == "null" || e.target[1].value == "null") {
          throw new Error("Hello there");
        }
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
        // divPara.current.innerText = "Enter a comment for a teacher";
        return;
      } catch (error) {
      }
    };

    post();
  };
  const location = useLocation().pathname.split("/")[2];
  return (
    // <div className="flex w-full p-3 border-b border-grayish ">

    // </div>

    <div
      className={` ${
        ["foryoufeed", "publicfeed"].includes(location) ? " flex " : " hidden "
      } justify-center flex-col items-center py-6`}
      
    >
      <div className="bg-fontColor rounded-full w-12 h-12 object-cover flex items-center justify-center">
        <span className="text-primaryColor font-bold">
          {user.name.charAt(0).toUpperCase() +
            user.name.charAt(user.name.length - 1).toUpperCase()}
        </span>
      </div>
      <p className="pt-1 text-xs">{user?.id}</p>
      <p className="text-xl font-bold text-fontColor">{user.name}</p>
      <div>
        <Dialog>
          <DialogTrigger className="p-1 rounded-full border border-borderColor px-5 text-xs hover:bg-linkedColor hover:text-primaryColor">
            Edit Profile
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Account Information</DialogTitle>
              <form action="#" className="py-3 space-y-2" onSubmit={(e) => {
                e.preventDefault()

                // confirm the password if not match
                if(e.target[3].value !== e.target[4].value){
                  alert("Passwords do not match")
                  return
                }
                // the name, email ,password and ofmrim password must not be blank
                if(e.target[0].value == "" || e.target[1].value == "" || e.target[2].value == "" || e.target[3].value == ""){
                  alert("Please fill all fields")
                  return
                }

                // if the password is less than 6 characters
                if(e.target[3].value.length < 6){
                  alert("Password must be at least 6 characters")
                  return
                }

                // if the email is not valid
                // if the name is not valid
                if(e.target[0].value.length < 3){
                  alert("Name must be at least 3 characters")
                  return
                }

                const update = async () => {
                  try {
                    const response = await axios.put(
                      `/students/${user.id.toString()}`,
                      {
                        name: e.target[0].value,
                        email: e.target[2].value,
                        password: e.target[3].value
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `${localStorage.getItem("token")}`,
                        },
                      }
                    )
                      
                    alert("Profile updated");
                    userrefetch();
                    refetch();
                  } catch (error) {
                    console.log(error)
                    alert("sss")
                    
                  }
                  
                  
                }
                
                update()
              }}>
                <div>
                  <label htmlFor="name" className="text-xs">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full"
                    defaultValue={user.name}
                  />
                </div>
                <div>
                  <label htmlFor="idNumber" className="text-xs">
                    Student ID
                  </label>{" "}
                  <input
                    type="text"
                    placeholder="ID number"
                    name="idNumber"
                    value={user.id}
                    className="w-full"
                    disabled
                  />
                </div>
                <div>
                  <label htmlFor="Email" className="text-xs">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="w-full"
                    defaultValue={user.email}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="text-xs">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="text-xs">
                    Confirm Password
                  </label>
                  <input
                    type="Password"
                    placeholder="Confirm Password"
                    className="w-full"
                  />
                </div>
                <div className="flex justify-end">
                  <button className="bg-[#8287FE] text-primaryColor text-xs px-4 py-2 rounded-lg">
                    update
                  </button>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <p className="text-mutedColor text-[0.6rem] pt-4">
        Rate your teacher's performance based on your personal experience.
      </p>

      <div className="w-3/4 ">
        <Dialog className="w-full backdrop-blur-sm ">
          <DialogTrigger className="w-full">
            <div className="w-full h-fit flex items-center mt-4 gap-3 text-nowrap">
              <input
                type="text"
                placeholder="Enter a comment for a teacher"
                className=" border-borderColor/60 
boxborderpost bg-primaryColor w-full h-12 rounded-[20px] pl-7 text-[0.6rem] px-4 py-2  focus:outline-none"
              />
              <div className="text-nowrap text-linkedColor text-xs  ">POST</div>
            </div>
          </DialogTrigger>
          <DialogContent className=" h-full w-full md:w-1/3 md:max-h-[80%] md:h-fit overflow-auto bg-primaryColor  p-8 border-borderColor ">
            <div className="w-full text-center text-lg font-bold text-fontColor">
              CREATE POST
            </div>
            <form
              className="w-full space-y-3"
              onSubmit={submitPost}
              ref={refuse}
            >
              <div
                ref={divPara}
                className="text-fontColor border-fontColor w-full border-l-4 pl-5  post  focus:outline-none mt-6"
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
                  <p className="text-fontColor text-nowrap">Teacher</p>
                  <select
                    className="text-fontColor bg-transparent w-full h-full "
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
                  <p className="text-fontColor text-nowrap">Subject</p>
                  <select
                    name="subject"
                    id="subject"
                    className="bg-transparent text-fontColor  mp-3  h-full w-full"
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
                <div className="bg-red-500 w-full"></div>
                <div className="flex text-xs justify-between  w-full text-fontColor font-normal flex-wrap gap-3">
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
                            e == ratings.teaching_methods ? 0 : e,
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
                          communication: e == ratings.communication ? 0 : e,
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
                          supportiveness: e == ratings.supportiveness ? 0 : e,
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
                          organization: e == ratings.organization ? 0 : e,
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
                          engagement: e == ratings.engagement ? 0 : e,
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
                <div className="space-x-2 w-full  py-4 pt-10 text-primaryColor ">
                  <button className="text-xs text-linkedColor ">
                    About ratings
                  </button>
                  <DialogClose className="bg-red-500 rounded-lg px-4 py-1 float-right">
                    Discard
                  </DialogClose>
                  <button
                    disabled={
                      ratings.teaching_methods === 0 ||
                      ratings.communication === 0 ||
                      ratings.supportiveness === 0 ||
                      ratings.engagement === 0 ||
                      ratings.organization === 0 ||
                      ratings.attitude === 0
                    }
                    className="bg-[#8287FE] rounded-lg px-4 py-1 float-right"
                  >
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
