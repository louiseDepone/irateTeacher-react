import App from "@/App";
import AllPost from "@/components/Displays/AllPost";
import { Button } from "@/components/ui/button";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";
import React, { useEffect, useState } from "react";

import search from "@/assets/search.svg";
export default function Subject() {
  const [numberToLoad, setNumberToLoad] = useState(10);
  const [lengthOfOriginalRatings, setLengthOfOriginalRatings] = useState(0);
  const userChosenSubject = useUserStore((state) => state.userChosenSubject);
  const setUserChosenSubject = useUserStore(
    (state) => state.setUserChosenSubject
  );

  const ratings = useDatabaseStore((state) =>
    state.ratings
      .filter((rating) => rating.approved == 1 && rating.deleted == 0)
      .filter((rating) =>
        userChosenSubject ? rating.subject_id == userChosenSubject : true
      )
      .slice(0, numberToLoad)
  );

  useEffect(() => {
    const originalRatings = useDatabaseStore
      .getState()
      .ratings.filter((rating) => rating.approved == 1 && rating.deleted == 0);
    setLengthOfOriginalRatings(
      userChosenSubject
        ? originalRatings.filter(
            (rating) => rating.subject_id == userChosenSubject
          ).length
        : originalRatings.length
    );
  }, [userChosenSubject, numberToLoad]);

  const loadMoreButtonText =
    numberToLoad >= lengthOfOriginalRatings ? "No More Data" : "Load More";

  const handleLoadMore = () => {
    setNumberToLoad(numberToLoad + 10);
  };
  const [show, setshow] = useState(false);

  const [seratch, setseratch] = useState("");
  const subjectfilterName = useDatabaseStore((state) => state.subjects);
  return (
    <div className="w-[100%] space-y-3 pb-20 md:pb-0 ">
      <div className="flex justify-center items-center gap-3 w-full mt-4 md:mt-0  ">
        <input
          type="text"
          placeholder="Search name and comments"
          className="w-full bg-primaryColor border rounded-md text-white px-6  border-borderColor py-2"
          onChange={(e) => {
            setseratch(e.target.value);
          }}
        />
        <button
          className="text-linkedColor text-xs text-nowrap"
          onClick={() => {
            setshow(!show);
          }}
        >
          {show ? "Show Less Filter" : "Show More Filter"}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setUserChosenSubject(null);
          }}
          className={`text-white text-xs ${
            userChosenSubject === null
              ? " bg-linkedColor  -order-1"
              : "bg-secondaryColor"
          }  hover:bg-linkedColor rounded-xl p-3 px-4 text-sm`}
        >
          All
        </button>
        {subjectfilterName.slice(0, show ? -1 : 3)?.map((e, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                setUserChosenSubject(e.subject_id);
              }}
              className={`text-white text-xs ${
                userChosenSubject === e.subject_id
                  ? " bg-linkedColor  -order-1 "
                  : "bg-secondaryColor"
              }  hover:bg-linkedColor rounded-xl p-3 px-4 text-sm`}
            >
              {e.subject}
            </button>
          );
        })}
      </div>
      {/* <App /> */}
      {ratings
        .filter(
          (fil) =>
            fil.comment.toLowerCase().includes(seratch.toLowerCase()) ||
            fil.studentname.toLowerCase().includes(seratch.toLowerCase()) ||
            fil.subjectname.toLowerCase().includes(seratch.toLowerCase()) ||
            fil.teachername.toLowerCase().includes(seratch.toLowerCase())
        )
        .map((rating, index) => (
          <AllPost
            key={index}
            deleted={rating.deleted}
            approval={rating.approved}
            attitude={rating.attitude}
            comment={rating.comment}
            communication={rating.communication}
            date={rating.date}
            dislikes={rating.dislikes}
            engagement={rating.engagement}
            likes={rating.likes}
            organization={rating.organization}
            rating_id={rating.rating_id}
            studentName={rating.studentname}
            subjectName={rating.subjectname}
            supportiveness={rating.supportiveness}
            teacherName={rating.teachername}
            teaching_method={rating.teaching_method}
          />
        ))}
      <div>
        {numberToLoad >= lengthOfOriginalRatings && (
          <p className="w-full text-mutedColor text-xs text-center">
            You've reached the end of the posts!
          </p>
        )}
      </div>
      <div className="w-full flex justify-center items-center h-10">
        <button
          className="text-white w-full  text-center hover:bg-grayish flex justify-center items-center cursor-cell  h-10"
          onClick={handleLoadMore}
          disabled={numberToLoad >= lengthOfOriginalRatings}
        >
          <p>{loadMoreButtonText}</p>
        </button>
      </div>
    </div>
  );
}
