import React, { useEffect, useState } from "react";
import Rating from "react-rating";
import starcolored from "@/assets/starcolored.svg";
import starempty from "@/assets/starempty.svg";
import axios from "axios";
import { useRef } from "react";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";

export default function Post() {
    const user = useUserStore((state) => state.user);
  const userSubject = useDatabaseStore((state) =>
    state.enrollments.filter((enrolled) => enrolled.student_id == user.id)
  );
  const [userSubjects, setUserSubjects] = useState(null);
  // const { refetch } = useQueryUserPosts();
  const [ratings, setRatings] = useState({
    teaching_methods: 0,
    communication: 0,
    supportiveness: 0,
    engagement: 0,
    organization: 0,
    attitude: 0,
  });
  const refuse = useRef();
  const submitPost = (e) => {
    e.preventDefault();

    const post = async () => {
      try {
        if (e.target[2].value == "null" || e.target[1].value == "null") {
          throw new Error();
        }
        const response = await axios.post(
          "https://ratemyteacher.onrender.com/ratings",
          {
            data: {
              student_id: userInfromation.id,
              teacher_subject_id: userSubject?.filter(
                (subject) =>
                  subject.teacher == userSubjects &&
                  subject.subject == e.target[2].value
              )[0].teacher_subject_id,
              comment: e.target[0].value,
              teaching_method: ratings.teaching_methods,
              attitude: ratings.attitude,
              communication: ratings.communication,
              organization: ratings.organization,
              supportiveness: ratings.supportiveness,
              engagement: ratings.engagement,
              likes: 0,
              dislikes: 0,
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
        allPostrefetch();
        refuse.current.reset();
        return;
      } catch (error) {
        console.log(error);
      }
    };

    post();
  };
  return (
    <div className="flex w-full p-3 border-b border-grayish ">
      <div className="px-3">
        {" "}
        <div className="bg-white rounded-full w-8 h-8 object-cover flex items-center justify-center">
          <span className="text-[#1B2730] text-2xs font-bold">
            {user.name.charAt(0).toUpperCase() +
              user.name.charAt(user.name.length - 1).toUpperCase()}
          </span>
        </div>
      </div>
      <form className="w-full space-y-3" onSubmit={submitPost} ref={refuse}>
        <div className="flex w-full  bg-[#28343E] rounded-xl p-3 pl-6 gap-2">
          <textarea
            type="text"
            name="comment"
            placeholder="Enter a comment for a teacher"
            className=" w-[70%]  resize-none  focus:outline-none focus:h-[200px] border-none  bg-transparent text-white rounded-md px-3 py-2"
            wrap="soft"
            rows="1"
            spellCheck="true"
            required
          ></textarea>

          <div className=" h-fit text-xs w-[30%]">
            <div className="flex justify-center items-center w-full gap-4">
              <p className="text-white">Teacher</p>
              <select
                className="text-white bg-transparent w-full "
                onChange={(e) => {
                  setUserSubjects(e.target.value);
                  console.log(e.target.value);
                }}
                name="teacher"
              >
                <option className="text-black " value={null}>
                  Choose
                </option>
                {userSubject?.map((subject, index) => {
                  return (
                    <option
                      key={index}
                      className="text-black"
                      value={subject.teacher}
                    >
                      {subject.teacher}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-center items-center w-full gap-4">
              <p className="text-white">Subject</p>
              <select
                name="subject"
                id="subject"
                className="bg-transparent text-white  mp-3 w-full"
                disabled={userSubjects == "null"}
              >
                <option className="text-black " value={"null"}>
                  Choose
                </option>
                {userSubject
                  ?.filter((subject) => subject.teacher == userSubjects)
                  .map((subject, index) => {
                    return (
                      <option
                        key={index}
                        className="text-black"
                        value={subject.subject}
                      >
                        {subject.subject}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end w-full   space-y-3">
          <div className="flex text-xs justify-between  w-full text-white font-normal flex-wrap gap-3">
            <div className="flex flex-col justify-center items-center ">
              <p>Teaching Method</p>
              <Rating
                className="z-2"
                emptySymbol={<img src={starempty} alt="empty" />}
                placeholderSymbol={<img src={starcolored} alt="colored" />}
                fullSymbol={<img src={starcolored} alt="colored" />}
                placeholderRating={ratings.teaching_methods}
                onChange={(e) => {
                  setRatings({
                    ...ratings,
                    teaching_methods: e == ratings.teaching_methods ? 0 : e,
                  });
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <p>Communication</p>
              <Rating
                emptySymbol={<img src={starempty} alt="empty" />}
                placeholderSymbol={<img src={starcolored} alt="colored" />}
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
                placeholderSymbol={<img src={starcolored} alt="colored" />}
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
                placeholderSymbol={<img src={starcolored} alt="colored" />}
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
                placeholderSymbol={<img src={starcolored} alt="colored" />}
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
                placeholderSymbol={<img src={starcolored} alt="colored" />}
                fullSymbol={<img src={starcolored} alt="colored" />}
                placeholderRating={ratings.attitude}
                onChange={(e) => {
                  setRatings({ ...ratings, attitude: e });
                }}
              />
            </div>
          </div>
          <button className="bg-[#8287FE] rounded-lg px-4 py-1">Post</button>
        </div>
      </form>
    </div>
  );
}
