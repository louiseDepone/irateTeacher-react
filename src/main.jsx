import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Authentication/Login.jsx";
import Register from "./pages/Authentication/Register.jsx";
import ForYouFeed from "./pages/Main/ForYouFeed.jsx";
import Main from "./pages/Main.jsx";
import PublicFeed from "./pages/Main/PublicFeed.jsx";
import Protection from "./components/Protection/Protection.jsx";
import OutiseProtection from "./components/Protection/OutiseProtection.jsx";
import Admin from "./pages/Main/Admin.jsx";
import dotenv from "dotenv";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import TeacherSubject from "./pages/Main/TeacherSubject.jsx";
import Subject from "./pages/Main/Subject.jsx";
import Teacher from "./pages/Main/Teacher.jsx";
import Postapproval from "./pages/Main/Postapproval.jsx";
import Students from "./pages/Main/Students.jsx";
import axios from "axios";
import Matriculation from "./pages/Main/Matriculation.jsx";
// axios.defaults.baseURL = "http://localhost:3300";
axios.defaults.baseURL = import.meta.env.VITE_SECRET_KEY;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: false,
    },
  },
});
const BrowserRouter = createBrowserRouter([
  {
    path: "/login",
    element: (
      <OutiseProtection>
        <Login />
      </OutiseProtection>
    ),
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: (
      <OutiseProtection>
        <Register />
      </OutiseProtection>
    ),
  },
  {
    path: "/main",
    element: (
      <Protection>
        <Main />
      </Protection>
    ),
    children: [
      {
        path: "/main/foryoufeed",
        element: <ForYouFeed />,
      },
      {
        path: "/main/publicfeed",
        element: <PublicFeed />,
      },
      {
        path: "/main/admin",
        element: <Admin />,
      },
      {
        path: "/main/teacherSubject",
        element: <TeacherSubject />,
      },
      {
        path: "/main/teacher",
        element: <Teacher />,
      },
      {
        path: "/main/subject",
        element: <Subject />,
      },
      {
        path: "/main/postapproval",
        element: <Postapproval />,
      },
      {
        path: "/main/student",
        element: <Students />,
      },
      {
        path: "/main/matriculation",
        element: <Matriculation />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={BrowserRouter} />
    </QueryClientProvider>
  </React.StrictMode>
);
