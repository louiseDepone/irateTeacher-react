import App from "@/App";
import AllPost from "@/components/Displays/AllPost";
import { Button } from "@/components/ui/button";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";
import React, { useEffect, useState } from "react";

export default function Teacher() {
  const [numberToLoad, setNumberToLoad] = useState(10);
  const [lengthOfOriginalRatings, setLengthOfOriginalRatings] = useState(0);
  const userChosenTeacher = useUserStore((state) => state.userChosenTeacher);

  const ratings = useDatabaseStore((state) =>
    state.ratings
      .filter((rating) => rating.approved === 1 && rating.deleted === 0)
      .filter((rating) =>
        userChosenTeacher ? rating.teacher_id === userChosenTeacher : true
      )
      .slice(0, numberToLoad)
  );

  useEffect(() => {
    const originalRatings = useDatabaseStore
      .getState()
      .ratings.filter(
        (rating) => rating.approved === 1 && rating.deleted === 0
      );
    setLengthOfOriginalRatings(
      userChosenTeacher
        ? originalRatings.filter(
            (rating) => rating.teacher_id === userChosenTeacher
          ).length
        : originalRatings.length
    );
  }, [userChosenTeacher, numberToLoad]);

  const loadMoreButtonText =
    numberToLoad >= lengthOfOriginalRatings ? "No More Data" : "Load More";

  const handleLoadMore = () => {
    setNumberToLoad(numberToLoad + 10);
  };

  return (
    <div className="w-[100%] space-y-3 ">
      {/* <App /> */}
      {ratings.map((rating, index) => (
        <AllPost
          key={index}
          deleted={rating.deleted}
          approval={rating.approval}
          attitude={rating.attitude}
          comment={rating.comment}
          communication={rating.communication}
          date={rating.date}
          dislikes={rating.dislikes}
          engagement={rating.engagement}
          likes={rating.likes}
          organization={rating.organization}
          rating_id={rating.rating_id}
          studentName={rating.studentName}
          subjectName={rating.subjectName}
          supportiveness={rating.supportiveness}
          teacherName={rating.teacherName}
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
