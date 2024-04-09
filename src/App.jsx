import { useState } from 'react'
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
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-white h-screen
    w-full flex justify-center items-center gap-4'>
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
