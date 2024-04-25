import useDatabaseStore from '@/hooks/store/useDatabaseStore';
import useUserStore from '@/hooks/store/useUserStore';
import React from 'react'
import LikeEmpty from "@/assets/LikeEmpty.svg"
import LikeFull from "@/assets/LikeFull.svg"
export default function Profile_Overview() {
  const user = useUserStore(state => state.user)
  const [numberToLaod, setNumberToLoad] = React.useState(10);
  const ratings = useDatabaseStore((state) =>
    state.ratings
      .filter((rating) => rating.student_id === user?.id)
  );

  const approved = ratings
    .filter((rating) => rating.approved === 1)
    .slice(0, numberToLaod);
  
  const subjects = useDatabaseStore((state) =>
    state.enrollments.filter((subject) =>
      // ratings.some((rating) => rating.subject_id === subject.id)
      subject.student_id === user?.id
    )
  );

  
  return (
    <div className=" fixed top-16  w-60 hidden lg:flex justify-start items-center flex-col h-[calc(100vh-48px)] py-4 border-r border-[#1B2730]">
      <div>
        <div className="bg-fontColor w-16 h-16 flex items-center justify-center ">
          <p className="text-[#1B2730] text-lg font-bold">
            {user?.name.charAt(0).toUpperCase() +
              user?.name.charAt(user?.name.length - 1).toUpperCase()}
          </p>
        </div>
      </div>
      <div className="text-center py-1 space-y-1">
        <p className="text-fontColor text-sm capitalize">{user?.name}</p>
        <p className="text-[#D7D7D7]  text-xs">{user?.id}</p>
      </div>

      <div className="py-4   ">
        <table className="w-full">
          <thead className="">
            <tr className="text-[#9E9E9E] text-xs font-normal  text-center">
              <td className="px-2">Subject</td>
              <td className="px-2">Comments</td>
              <td className="px-2">Likes</td>
            </tr>
          </thead>
          <tbody>
            <tr className="text-fontColor text-sm font-normal text-center">
              <td className="px-2">{subjects.length}</td>
              <td className="px-2">{ratings.length}</td>
              <td className="px-2">0</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="text-fontColor  w-full  py-5  border-t border-grayish overflow-auto space-y-7 h-fit ">
        <p className="text-lg font-bold pl-5">Approved Posts</p>

        {approved.map((raiting, index) => {
          return (
            <div
              key={index}
              className="space-y-3  w-full px-4 border-b border-grayish "
            >
              <div className="flex text-[.6rem] justify-around">
                <div className="flex gap-1">
                  <p className="text-[#9E9E9E] ">Teacher</p>
                  <p>{raiting.teacherName}</p>
                </div>
                <div className="flex gap-1">
                  <p className="text-[#9E9E9E] ">Subject</p>
                  <p>{raiting.subjectName}</p>
                </div>
              </div>
              <p className="text-xs ">{raiting.comment}</p>
              <div className="w-full text-xs flex justify-center items-center gap-3 pb-4">
                <div className="flex gap-2 justify-center items-center">
                  <p>{raiting.likes}</p>
                  <img src={LikeEmpty} alt="" />
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <p>{raiting.dislikes}</p>
                  <img src={LikeEmpty} className=" rotate-180" alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full flex justify-center items-center h-10">
        <button
          className="text-fontColor w-full  text-center hover:bg-grayish flex justify-center items-center cursor-cell  h-10"
          onClick={() => setNumberToLoad(numberToLaod + 10)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}
