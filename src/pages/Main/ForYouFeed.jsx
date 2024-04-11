import AllPost from "@/components/Displays/AllPost";
import Post from "@/components/Displays/Post";
import useDatabaseStore from "@/hooks/store/useDatabaseStore";
import useUserStore from "@/hooks/store/useUserStore";
import React from "react";

export default function ForYouFeed() {
  const user = useUserStore((state) => state.user);
  const [numberToLaod, setNumberToLoad] = React.useState(10);
  
  const lengthoforiginalraiting = useDatabaseStore(
    (state) =>
      state.ratings
      .filter((rating) => rating.student_id == user?.id).length
  );
  const ratings = useDatabaseStore((state) =>
    state.ratings
      .filter((rating) => rating.student_id == user?.id)
      .slice(0, numberToLaod)
  );
  return (
    <div className="w-[100%]">
      <div className="space-y-3 pt-3">
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
              studentName={rating.studentName}
              subjectName={rating.subjectName}
              supportiveness={rating.supportiveness}
              teacherName={rating.teacherName}
              teaching_method={rating.teaching_method}
            />
          );
        })}
      </div>
      <div>
        {numberToLaod >= lengthoforiginalraiting && 
        <p
          className="
        w-full text-mutedColor text-xs text-center
        "
        >
          {" "}
          You've reach the end of the post!
        </p>
        
        }
      </div>
      <div className="w-full flex justify-center items-center h-10">
        <button
          className="text-white w-full  text-center hover:bg-grayish flex justify-center items-center cursor-cell  h-10"
          onClick={() => setNumberToLoad(numberToLaod + 10)}
        >
          {numberToLaod <= lengthoforiginalraiting
            ? "Load More"
            : "No More Data"}
        </button>
      </div>
    </div>
  );
}
