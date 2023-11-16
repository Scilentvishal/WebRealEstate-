"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const router = useRouter();
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
  });

  const responseType = {
    error: "error",
    success: "success",
  };

  const handleChange = (e) => {
    setState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.password === "" || state.email === "" || state.username === "") {
      return toast.warning("Fill all fields", responseType.error);
    }
  
    if (state.password.length < 6) {
      return toast.warning("Password must be 6 or greater", responseType.error);
    }
  
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Correct the header key
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
          username: state.username,
        }),
      });

      if (res?.status === 501) {
          toast.error("User with the same email already exists", responseType.error);
      } 
      if (res?.status === 502){
        toast.error("User with the same username already exists", responseType.error);
      } 
      if (res?.status === 201) {
        toast.success("Successfully registered, now login", responseType.success);
        setState({
          email: "",
          username: "",
          password: "",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } 
     
    } catch (error) {
      console.error(`errrr ${error}`);
      toast.error("Error occurred while registering", responseType.error);
    }
  };
  

  function ShowToast(text, response) {
    toast[response](text);
  }

  return (
    <section className="bg-[url('/images/chennai_apartment.jpg')] bg-no-repeat bg-cover bg-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center md:px-6 px-2 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create You Account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  onChange={handleChange}
                  value={state.email || ""}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your username
                </label>
                <input
                  onChange={handleChange}
                  value={state.username || ""}
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="namesirname12"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  onChange={handleChange}
                  value={state.password || ""}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full text-white bg-primaryOrange hover:bg-secondaryOrange focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Have a account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-primaryOrange hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
