import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  student_id: z
    .string()
    .refine((data) => {
      const regex = /^\d{2}\d{5}$/;
      return regex.test(data);
    }, "Invalid student ID format. It should be in the format 'YYNNNNN'"),
  name: z.string().refine((data) => {
    if (data.includes(" ") || data.length === 0) {
      return false;
    }
    return true;
  }, "Name cannot contain spaces and make sure to be 'Anonymous'"),
  email: z.string().email(),
  password: z.string().min(5, "Password must be at least 5 characters").max(234),
});
export default function Register() {
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: "",
      name: "",
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [errors, isError] = useState();
  const [message, setMessage] = useState("Register");
  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);


    const register = async () => {
      try {
        setMessage("Registering")
        const register = await axios.post(
          "/register",
          values
        );
        setMessage("registered");
        const data = await register.data;
        const login = await axios.post("/login", {
          email: values.email,
          password: values.password,
        });
        const logindata = await login.data;
        localStorage.setItem("token", logindata.token);

        navigate("/main/foryoufeed", { replace: true });
      } catch (error) {
        isError(error?.response?.data);
      }
    };

    register();
  }
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex justify-center flex-col items-center h-screen  w-fit"
        >
          <div className="font-black  text-7xl text-white flex ">
            Ra <span className="text-[#8287FE] ">Te</span>
          </div>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="email"
              className=" w-full "
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm ">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Email Address "
                      className="bg-transparent focus-visible:border-[0.5px] border-[0.5px]  text-white"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="student_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white text-sm ">
                    ID Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Student ID Number"
                      className="bg-transparent focus-visible:border-[0.5px] border-[0.5px]  text-white"
                      {...field}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="  w-full">
                <FormLabel className="text-white text-sm  ">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Desired Anonymous Name"
                    className="bg-transparent focus-visible:border-[0.5px] border-[0.5px]  text-white"
                    {...field}
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="  w-full">
                <FormLabel className="text-white text-sm ">Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Password"
                    className="bg-transparent focus-visible:border-[0.5px] border-[0.5px]  text-white"
                    {...field}
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          {errors?.message && (
            <sub className="text-red-500 p-2 ">{errors?.message}</sub>
          )}
          <button className="bg-[#8287FE] w-full  rounded-md py-2  mt-5  font-bold  text-white ">
            {message}
          </button>
          <sub className="w-full text-center text-white font-normal mt-3">
            Already have an Account yet?{" "}
            <Link to={"/login"} className="text-[#8287FE]">
              {" "}
              Login Account
            </Link>
          </sub>
        </form>
      </Form>
    </div>
  );
}
