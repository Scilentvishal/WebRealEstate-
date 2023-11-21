"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MAX_PRICE, MIN_PRICE } from "./searchModalData";
import { toast } from "react-toastify";
import {typesOfProperties, citiesInIndia } from "../properties/propertyTypesData";

const SearchModal = ({ handleHideModal }) => {
  const responseType = {
    error: "error",
    success: "success",
  };
  const [step, setStep] = useState(2);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [type, setType] = useState(typesOfProperties[0].name);
  const [city, setCity] = useState(citiesInIndia[0]);
  const router = useRouter();

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSearch = () => {
    // console.log(
    //   type 
    //   // && 
    //   // city &&
    //   //  minPrice 
    //   //  && maxPrice && 
    //   // ( maxPrice > minPrice)
    //   );
    // console.log(minPrice , maxPrice , city, type)
    if (type && city ) {
      const url = `/search?type=${type}&minPrice=${minPrice}&maxPrice=${maxPrice}&city=${city}`;

      router.push(url);
    } else {
      return notify("Fill all fields", responseType.error);
    }
  };

  function notify(text, response) {
    toast[response](text);
  }

  return (
    <div className={`fixed inset-0 z-[200] `}>
      <div className="flex items-center relative justify-center min-h-screen p-4 text-center sm:p-0">
        <div className="relative z-10 p-6 bg-white shadow-xl rounded-md sm:w-96">
          <AiOutlineClose
            onClick={handleHideModal}
            className="absolute right-4 top-4 cursor-pointer text-lg text-black"
          />
          <div className="mb-4 text-primaryOrange">
            {step === 1 && (
              <div>
                <h3 className="text-lg font-semibold text-primaryOrange">
                  Pick Your Desired Price
                </h3>
                <div className="relative mb-4">
                  <label
                    htmlFor="minprice"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Min Price
                  </label>
                  <input
                    type="number"
                    id="minprice"
                    name="minprice"
                    defaultValue={minPrice}
                    min={MIN_PRICE}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="maxprice"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Max Price
                  </label>
                  <input
                    type="number"
                    id="maxprice"
                    name="maxprice"
                    defaultValue={maxPrice}
                    max={MAX_PRICE}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3 className="text-lg font-semibold">Pick a type</h3>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select an option
                  </label>
                  <select
                    onChange={(e) => setType((prev) => e.target.value)}
                    value={type}
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {typesOfProperties.map((types, i) => (
                      <option value={types.name} key={types.id}>
                        {types.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Add form fields for step 2 */}
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 className="text-lg font-semibold">Pick a City</h3>
                <div>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a City
                  </label>
                  <select
                    onChange={(e) => setCity((prev) => e.target.value)}
                    defaultValue={city}
                    id="city"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    {citiesInIndia.map((city, i) => (
                      <option value={city} key={i}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            {step > 2 && (
              <button
                onClick={prevStep}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Previous
              </button>
            )}
            {step < 3 && (
              <button
                onClick={nextStep}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                onClick={handleSearch}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
