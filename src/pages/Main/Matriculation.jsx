import { useQueryMatriculation } from '@/hooks/query/useQueryMatriculation';
import useDatabaseStore from '@/hooks/store/useDatabaseStore';
import useUserStore from '@/hooks/store/useUserStore';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
export default function Matriculation() {
  const fileTypes = ["JPG", "PNG", "PDF"];
  const user = useUserStore((state) => state.user);
  const matriculation = useDatabaseStore((state) => state.matriculation);

  const {refetch:refetchMatruiclation} = useQueryMatriculation()

  // const [file, setFile] = useState(null);
  //  const handleChange = (file) => {
  //    console.log(file)
  //   setFile(file);
  //  };


  const submit = (e) => {
    e.preventDefault();
    // console.log(file);
    // console.log(user.id, e.target[1].value);

    const form = e.target;
    const formData = new FormData(form);

    consol.log(form)
    console.log(formData)
    const postMatriculation = async () => {
      // try {
      //   await axios.post(
      //     `/ddddddddddddAddingmatriculation/${user.id}`,
      //     formData,
      //     {
      //       headers: {
      //         Authorization: `${localStorage.getItem("token")}`,
      //       },
      //     }
      //   );
      //   console.log("done");
      //   refetchMatruiclation()
      // } catch (error) {
      //   console.error("Axios error:", error);
      // }
    };

    // postMatriculation();
  }
  return (
    <div className="pt-4 w-full space-y-5 text-fontColor relative h-1/2">
{/*       <div className="absolute w-full bg-bodyBackground rounded-lg h-full flex justify-center ">
        <div className="w-1/2 text-xs">
          Please submit your matriculation through email to
          louisedepone@gmail.com. Make sure that the student ID of your account
          is match to the matriculation to be submitted
        </div>
      </div> */}
      <form className="space-y-4" onSubmit={submit}>
        <div className=" flex items-center justify-center  "> 
{/*            <FileUploader
            handleChange={handleChange}
            name="pdf_name_matriculation"
            id="pdf_name_matriculation"
            classes=" h-[10rem]"
            width="20px"
            label="drag and drop a file here or click to select file"
            types={fileTypes}
            required
          />  */}
           <input
            type="file"
            disabled
            name="pdf_name_matriculation"
            id="pdf_name_matriculation"
            className="w-full"
            required
          ></input> 
         </div> 
         <div className="flex gap-2">
          <input
            name="file_name"
            type="text"
            disabled
            className="h-full py-1 rounded-lg px-4 w-full text-black"
            placeholder="Enter unique file name for your attached file "
            required
          />
          <button className="bg-linkedColor rounded-lg text-nowrap px-3 text-white text-sm">
            Submit for Approval
          </button>
        </div>
      </form> 

       <div>
        <p className="text-white">Matriculations</p>
        <div className="flex flex-wrap text-xs gap-20 md:gap-0 ">
          {matriculation.reverse().map((matriculation, index) => {
            return (
              <div
                key={index}
                className="flex justify-between flex-col w-1/3 pb-6"
              >
                <p>{matriculation.approved}</p>
                <div>
                  <iframe
                    // src={matriculation?.s3name}
                    className="text-red-500"
                    width="200px"
                    height="250px"
                  />
                </div>

                <div className="flex gap-2">
                  <div>
                    <p className="text-mutedColor text-nowrap">Reuqet</p>
                    <p className="text-mutedColor  text-nowrap">Name</p>
                  </div>
                  <div>
                    <p> {matriculation.approved ? "Approved" : "Pending"}</p>
                    <p>
                      {matriculation.pdf_name_matriculation.slice(0, 23)}...
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
