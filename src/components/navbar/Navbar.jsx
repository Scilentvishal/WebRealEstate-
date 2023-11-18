"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ListModal from "../listModal/ListModal";
import {  signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const {data: session, staus} = useSession();
  const page = usePathname()
  // const isUserLoggedIn = useSession();
  const [isUserLoggedIn, setisUserLoggedIn] = useState(!session?.user?._id);
  const [showListModal, setShowListModal] = useState(false);

  // console.log(`errrr ${session}`)
  const handleShowListModal = () => {
    setShowListModal((prev) => true);
  };
  const handleHideListModal = () => {
    setShowListModal((prev) => false);
  };

  useEffect(() => {
    // Optional: You can update the state based on the session
    // For example, if you want to track the user's login status
    setisUserLoggedIn(Boolean(!session?.user?._id));
  }, [session?.user?._id]);

  if (
    page.includes("login") ||
    page.includes("register") 
  ) {
    return null;
  }


  return (
    <header className=" fixed bg-black top-0 left-0 right-0 shadow-[0px_3px_9px_0px_#718096] body-font z-[1000]">
      <div className="container max-w-7xl mx-auto flex flex-wrap md:px-5 py-5 px-2 justify-between items-center ">
        <Link href="/">
          {/* {console.log(session)} */}
          <span className="ml-3 text-xl text-primaryOrange">WebRealEstate</span>
        </Link>
        {/* <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <Link href="/first">
            <span className="mr-5 hover:text-gray-600">First Link</span>
          </Link>
          <Link href="/second">
            <span className="mr-5 hover:text-gray-600">Second Link</span>
          </Link>
          <Link href="/third">
            <span className="mr-5 hover:text-gray-600">Third Link</span>
          </Link>
          <Link href="/fourth">
            <span className="mr-5 hover:text-gray-600">Fourth Link</span>
          </Link>
        </nav> */}
         {session ? (
          // If user is logged in
          <div className="flex justify-center items-center space-x-2 z-[1000]">
            <button
              onClick={() => signOut()}
              className="inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none text-white hover:text-gray-100 hover:bg-red-800 rounded text-base md:mt-0"
            >
              LogOut
            </button>
            <span
              onClick={handleShowListModal}
              className="cursor-pointer inline-flex items-center py-1 px-3 text-white hover:text-gray-500 text-base md:mt-0"
            >
              List
            </span>
            {showListModal && (
              <ListModal handleHideListModal={handleHideListModal} />
            )}
          </div>
        ) : (
          // If user is logged out
          <div className="flex justify-center items-center md:space-y-0 space-y-2 space-x-2 ">
            <Link
              href="/login"
              className="inline-flex items-center bg-green-600 border-0 py-1 px-3 focus:outline-none text-white hover:text-gray-100 hover:bg-green-700 rounded text-base md:mt-0"
            >
              LogIn
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center py-1 px-3 text-white hover:text-gray-500 text-base md:mt-0 cursor-pointer"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
