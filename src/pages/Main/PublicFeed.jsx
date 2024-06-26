import App from "@/App";
import AllPost from "@/components/Displays/AllPost";
import { Button } from "@/components/ui/button";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";
import React from "react";

export default function PublicFeed() {
  const [numberToLoad, setNumberToLoad] = React.useState(10);
  const lengthoforiginalrating = useDatabaseStore(
    (state) =>
      state.ratings.filter(
        (rating) => rating.approved == 1 && rating.deleted == 0
      ).length
  );
  const ratings = useDatabaseStore((state) =>
    state.ratings
      .filter((rating) => rating.approved == 1 && rating.deleted == 0)
      .slice(0, numberToLoad)
  );

  return (
    <div className="w-[100%] space-y-3 pb-20 md:pb-0">
      {/* <App /> */}
      {ratings.map((rating, index) => {
        return (
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
        );
      })}

      <div>
        {numberToLoad >= lengthoforiginalrating && (
          <p
            className="
        w-full text-mutedColor text-xs text-center
        "
          >
            {" "}
            You've reached the end of the post!
          </p>
        )}
      </div>
      <div className="w-full flex justify-center items-center h-10 ">
        <button
          className="text-fontColor w-full  text-center hover:bg-grayish flex justify-center items-center cursor-cell  h-10"
          onClick={() => setNumberToLoad(numberToLoad + 10)}
        >
          {numberToLoad <= lengthoforiginalrating
            ? "Load More"
            : "No More Data"}
        </button>
      </div>
    </div>
  );
}
