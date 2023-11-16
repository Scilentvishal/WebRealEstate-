"use client"
import Link from "next/link";
import React from "react";

const Properties = ({ properties }) => {

  return (
    <section className="text-primaryOrange bg-black body-font">
      <div className="container md:px-5 py-24 mx-auto max-w-7xl">
        <div className="md:px-0 px-4">
        <h3>Most Viewed Properties</h3>
        <span className="tracking-widest text-xs title-font font-medium">Check Them Out</span>
       
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-1 my-3">
          {properties.map((property, i) => (
            <Link href={`/details/${property.id}`} key={i}>
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="relative aspect-w-4 aspect-h-3 h-64 ">
                  <div
                    className="w-full cursor-pointer h-full bg-cover bg-no-repeat"
                    style={{
                      backgroundImage: `url('/images/${property?.image}')`,
                    }}
                  />
                  <span className="absolute top-0 left-0 py-2 text-white px-6 bg-primaryOrange">{property?.city}</span>
                </div>

                <div className="p-6">
                  <h2 className="tracking-widest text-sm title-font font-medium text-gray-400 mb-1">
                    {property?.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
