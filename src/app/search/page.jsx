"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

const page = () => {
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [filteredproperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/property");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterProperties = () => {
      if (loading || properties.length === 0) return;

      const { type, city, minPrice, maxPrice } = queryString.parse(searchParams.toString());
    setFilteredProperties(prev => {
      return properties.filter((property) =>{
        return (
          property.propertyType === type
          && property.city === city
        )
      })
    })
    
    }
    properties?.length > 0 && filterProperties()
  }, [properties]);

  return (
    <section className="text-primaryOrange bg-black body-font">
      <div className="container md:px-5 py-24 mx-auto max-w-7xl">
        <div className="md:px-0 px-4">
          <h3 className="text-2xl">Here Is Your Desired Property</h3>
          <span className="tracking-widest text-sm title-font ">
            Happy Browsing
          </span>
        </div>

        {loading ? (
          // Loader component (replace with your own loader)
          <div className="flex items-center justify-center h-64">
            Loading...
          </div>
        ) : filteredproperties.length === 0 ? (
          // Display a message if no properties are found
          <div className="text-center mt-8 text-gray-400 text-3xl">
            No properties found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 px-4 gap-1 my-3">
            {filteredproperties.map((property, i) => (
              <Link href={`/details/${property._id}`} key={i}>
                <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <div className="relative aspect-w-4 aspect-h-3 h-64">
                    <div
                      className="w-full cursor-pointer h-full bg-cover bg-no-repeat"
                      style={{
                        backgroundImage: `url('${property?.image}')`,
                      }}
                    />
                    <span className="absolute top-0 left-0 py-2 text-white px-6 bg-primaryOrange">
                      {property?.city}
                    </span>
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
        )}
      </div>
    </section>
  );
};

export default page;
