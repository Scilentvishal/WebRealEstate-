"use client";
import Image from "next/image";
import React, { useState } from "react";
import typesOfProperties from "../properties/propertyTypesData";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const ListModal = ({ handleHideListModal }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const responseType = {
    error: "error",
    success: "success",
  };
  const [stateData, setstateData] = useState({
    title: "",
    state: "",
    city: "",
    description: "",
    image: null,
    price: "",
    size: "",
    beds: "",
    phonenumber: "",
    propertyType: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      setstateData((prevstateData) => ({
        ...prevstateData,
        image: file,
      }));

      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setstateData((prevstateData) => ({
          ...prevstateData,
          imagePreview: reader.result,
        }));
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setstateData({
        ...stateData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValueEmpty = Object.values(stateData).some((value) => value === "");

    if (isValueEmpty) {
      return notify("Fill All Fields", responseType.error);
    }

    try {
      const imageUrl = await uploadImage();

      const res = await fetch("/api/property", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          ...stateData,
          img: imageUrl,
          currentOwner: session?.user?._id,
        }),
      });

      if (!res.ok) {
        throw new Error("Error Occured");
      }

      const property = await res.json();

      router.push(`/details/${property?._id}`);
    } catch (error) {
      console.error(error);
    }

    // handleHideListModal();
  };

  const uploadImage = async () => {
    if (!stateData.image) return;

    const Data = new FormData();
    Data.append("file", stateData.image);
    Data.append("upload_preset", "realEstateApp");
    Data.append("cloud_name", "dehite0hw");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dehite0hw/image/upload",
        {
          method: "POST",
          body: Data,
        }
      );

      const imgdata = await res.json();

      const imageUrl = imgdata["secure_url"];
      return imageUrl;
    } catch (error) {
      console.log(error);
    }
  };

  function notify(text, response) {
    toast[response](text);
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out`}
    >
      {/* {console.log(session)} */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-8 rounded-md shadow-lg z-10 w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Real Estate Property
          </h2>
          <button
            onClick={handleHideListModal}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-96 text-black"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Property Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={stateData.title}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="propertyType"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={stateData.propertyType}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            >
              <option value="" disabled>
                Select Property Type
              </option>
              {typesOfProperties.map((property) => (
                <option key={property.id} value={property.name}>
                  {property.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={stateData.state}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={stateData.city}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Property Description
            </label>
            <textarea
              id="description"
              name="description"
              value={stateData.description}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              accept="image/*" // Allow only image files
              required
            />
            {stateData.imagePreview && (
              <div className="mt-2">
                <Image
                  src={stateData.imagePreview}
                  alt="Image Preview"
                  className="rounded-md"
                  width={300}
                  height={200}
                />
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Price(Rs.)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={stateData.price}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Size(Sq m)
            </label>
            <input
              type="number"
              id="size"
              name="size"
              value={stateData.size}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="beds"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Bedrooms
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              value={stateData.beds}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phonenumber"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="phonenumber"
              name="phonenumber"
              value={stateData.phonenumber}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Add more form fields as needed */}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListModal;
