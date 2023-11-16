"use client"
import Image from "next/image";
import React, { useState } from "react";
import SearchModal from "../searchModal/SearchModal";

const HeroSection = () => {

    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () =>{
        setShowModal(pre => true)
    }
    const handleHideModal = () =>{
        setShowModal(pre => false)
    }

  return (
    <section className="mt-12">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 lg:py-0 py-10">
          <h1 className="max-w-2xl mb-4 text-3xl text-primaryOrange font-bold tracking-tight leading-none md:text-4xl xl:text-5xl ">
            Browse through our list of properties
          </h1>
          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl ">
            We offer a wide variety of houses and apartments
          </p>
          <p className="max-w-2xl mb-6 font-light mt-5 lg:mb-8 md:text-lg lg:text-xl ">
            From villas in goa to appartments in pune. we've got you covered{" "}
            <br />
            Getting an estate has never been smoother
          </p>

          <button onClick={handleShowModal} className="relative inline-flex items-center z-0 justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Click To Search
            </span>
          </button>
          {
            showModal && (
                <SearchModal
                handleHideModal={handleHideModal}
                />
            )
          }
        </div>
        <div className=" lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src="/images/house.jpg"
            className="mx-auto"
            alt="House with swimming pull"
            width={400}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
