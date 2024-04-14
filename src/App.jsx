import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { set } from 'react-hook-form';
function App() {
  const [count, setCount] = useState(0)

  const [post, setPost] = useState()  
  
    const fetchsinglePost = async () => {
      try {
        console.log("starting")
        const response = await axios.get("http://localhost:3200/singePost",{
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        const ll = await response.data;
        setPost({url:ll});
      } catch (error) {
        console.log("error")
        console.error("Axios error:", error);
      }

    };
    
    
    const deletePost = async () => {
      try {
        console.log("starting")
        const response = await axios.delete("http://localhost:3200/deletePost",{
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
        console.log("done")
      } catch (error) {
        console.log("error")
        console.error("Axios error:", error);
      }
    }

  return (
    <div
      className="bg-white h-screen
    w-full flex  flex-wrap justify-center items-center gap-4"
    >
      <Button>
        <Link to={"/login"}> Login </Link>
      </Button>
      <Button>
        <Link to={"/register"}> Register </Link>
      </Button>

    </div>
  );
}

export default App
