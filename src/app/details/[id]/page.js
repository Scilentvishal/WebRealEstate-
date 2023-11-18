"use client";
import { Property } from "@/components/properties/propertyData";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { useSession } from "next-auth/react";

const page = (ctx) => {
  const { data:session } = useSession();
  const [property, setProperty] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [showEditModal, setShowEditModal] = useState(false);

  const [isOwner, setisOwner] = useState(session?.user._id === property?.CurrentOwner)

  const router = useRouter();
  const id = ctx.params.id;

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(`/api/property/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "GET",
      });
      const data = await res.json();
      setProperty(data);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  useEffect(()=>{
    setisOwner(session?.user._id === property?.CurrentOwner)
  },[session?.user._id , property?.CurrentOwner])

  const handleOpenEditModal = () => {
    setShowEditModal((prev) => true);
  };
  const handleEditEditModal = () => {
    setShowEditModal((prev) => false);
  };

  const handleDelete = () => {};

  return (
    <section className="text-white body-font">
      <div className="container max-w-8xl px-5 py-24 mx-auto flex flex-col">
        <div className="lg:w-4/6 mx-auto">
          <div className="rounded-lg h-auto overflow-hidden relative">
            {loading ? ( // Display a loading indicator
              <div className="w-full h-[780px] bg-gray-200 animate-pulse"></div>
            ) : (
              <Image
                width={1200}
                height={780}
                alt="content"
                src={`${property?.image}`}
              />
            )}
            <span className="absolute top-0 left-0 py-2 text-white px-6 bg-primaryOrange">
              {property?.city}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row mt-10">
            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
              <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-10 h-10"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col items-center text-center justify-center">
                <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                  Phoebe Caulfield
                </h2>
                <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                <p className="text-base">
                  Raclette knausgaard hella meggs normcore williamsburg enamel
                  pin sartorial venmo tbh hot chicken gentrify portland.
                </p>
              </div>
            </div>
            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
              <span className="tracking-widest text-sm title-font font-medium text-white">
                {property?.propertyType}
              </span>
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-primaryOrange">
                {property?.title}
              </h1>
              <p className="leading-relaxed text-lg mb-4">
                {property?.description}
              </p>
              <div className="w-full relative my-10 shadow-md">
                <table className="table-auto w-full text-left whitespace-no-wrap">
                  <thead >
                    <tr className="text-center">
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        property_type
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        size
                      </th>
                      <th className="px-4 py-3 title-font flex items-center justify-center gap-x-2 tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        <FaBed /> Bedrooms
                      </th>
                      <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                        Price
                      </th>

                      {isOwner && (
                        <>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Edit
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                            Delete
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="px-4 py-3">{property?.propertyType}</td>
                      <td className="px-4 py-3">{property?.size} Sq. m</td>
                      <td className="px-4 py-3">{property?.beds}</td>
                      <td className="px-4 py-3">Rs. {property?.price}</td>
                      {isOwner && (
                        <>
                          <td className="px-4 py-3">
                            <button onClick={handleOpenEditModal}>
                              <BiSolidEdit className="text-2xl cursor-pointer mx-auto text-green-500" />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <button onClick={handleDelete}>
                              <MdDelete className="text-2xl cursor-pointer mx-auto text-red-600" />
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </div>
              <Link
                href="/"
                className="text-indigo-500 cursor-pointer inline-flex items-center"
              >
                Learn More
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
