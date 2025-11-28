"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import Image from "next/image";
import { useTheme } from "../content/ThemeContext";
import { useEffect, useState } from "react";
import { propertyService, Property } from "../../services/propertyService";

export default function CityPage() {
  const { city } = useParams();
  const { isDarkMode } = useTheme();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    propertyService.getAllProperties('', 1, 100, "true")
      .then((res) => {
        // Filter properties by city param
        const cityParam = (city as string).toLowerCase().replace(/\s+/g, "");
        const filtered = (res.data || []).filter((prop: Property) => {
          const locationStr = Array.isArray(prop.location)
            ? prop.location.join(" ").toLowerCase()
            : (prop.location || "").toLowerCase();
          return locationStr.includes(cityParam);
        });
        setProperties(filtered);
      })
      .catch((err) => {
        setError("Failed to fetch properties");
      })
      .finally(() => setLoading(false));
  }, [city]);

  // Use the first property as the city data for header, or fallback to city name
  const data = properties[0] || {
    projectName: typeof city === 'string' ? city : '',
    description: `Explore properties in ${city}.`,
    images: ["/images/default-city.jpg"],
  };

  // Compute clean city name for heading
  const cleanCityName = (() => {
    const c = (city as string).toLowerCase();
    if (c.includes("delhi")) return "Delhi";
    if (c.includes("gnoida") || c.includes("greaternoida") || c.includes("noidaextension")) return "Greater Noida";
    return data.projectName;
  })();

  return (
    <div className={`${isDarkMode ? "bg-black" : "bg-white"} min-h-screen w-full`}>
      {/* Exclusive Listing Heading and Subheading at top */}
      <div className="w-full max-w-7xl mx-auto px-4 pt-32">
        <h1 className={`dm-serif-display text-center ${isDarkMode ? "text-blue-400" : "text-blue-500"} lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize mb-2`}>
          {cleanCityName}{" "}
          <span
            className={`cormorant-garamond ps-2 pe-2 ${
              isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"
            }`}
          >
            Exclusive Listing
          </span>
        </h1>
        <p
          className={`raleway uppercase font-semibold lg:text-2xl text-[1rem] text-center mb-16 ${
            isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"
          }`}
        >
          {`Explore, Compare, and Choose from the Best Real Estate Listings in ${cleanCityName}.`}
        </p>
      </div>
      {/* Property Cards moved to top, just below heading */}
      <div className="w-full max-w-7xl mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
          {loading && (
            <div className={`col-span-2 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              Loading properties...
            </div>
          )}
          {error && (
            <div className={`col-span-2 text-center ${isDarkMode ? "text-red-400" : "text-red-500"}`}>
              {error}
            </div>
          )}
          {!loading && !error && properties.length === 0 && (
            <div className={`col-span-2 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              No properties found for {data.projectName}.
            </div>
          )}
          {properties.map((prop) => {
            // Inline PropertyCard for backend data
            const nameSlug = encodeURIComponent((prop.projectName || '').replace(/\s+/g, "-").toLowerCase());
            const citySlug = (city as string).toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                key={prop._id || prop.slug || prop.projectName}
                href={`/${citySlug}/${nameSlug}`}
                className={`flex flex-col sm:flex-row p-2 gap-4 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow ${
                  isDarkMode ? "bg-[#181818]" : "bg-white"
                }`}
              >
                {/* Image */}
                <div className="w-full sm:w-[12rem] h-[10rem] sm:h-[12rem] flex-shrink-0 flex justify-center items-center">
                  <Image
                    src={Array.isArray(prop.images) && prop.images.length > 0 ? (typeof prop.images[0] === 'string' ? prop.images[0] : prop.images[0]?.url) : "/images/default-city.jpg"}
                    className="w-full h-full rounded-xl object-cover"
                    alt={prop.projectName || ''}
                    width={300}
                    height={200}
                  />
                </div>
                {/* Content */}
                <div className="flex flex-col justify-between flex-1 py-2 sm:py-2 px-1 sm:px-0">
                  <div>
                    <h2
                      className={`capitalize font-semibold text-[1.1rem] mb-1 sm:mb-2 ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {prop.projectName}
                    </h2>
                    <p
                      className={`text-[0.9rem] mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {prop.description && prop.description.length > 100
                        ? prop.description.substring(0, 100) + "..."
                        : prop.description}
                    </p>
                  </div>
                  <div className={`flex flex-col sm:flex-row flex-wrap sm:justify-between items-start sm:items-center gap-1 sm:gap-0 font-medium ${
                    isDarkMode ? "text-blue-400" : "text-blue-500"
                  }`}>
                    <p className="flex items-center text-[0.95rem]">
                      <SlSizeFullscreen className="mr-1" />
                      <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>{prop.minSize || ''}</span>
                    </p>
                    <p className="flex items-center text-[0.95rem]">
                      <IoLocationOutline className="mr-1" />
                      <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>{typeof prop.location === 'string' ? prop.location : Array.isArray(prop.location) ? prop.location[0] : ''}</span>
                    </p>
                    <p className="flex items-center text-[0.95rem]">
                      <MdOutlineCurrencyRupee className="mr-1" />
                      <span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>{prop.price || ''}</span>
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/*if you want extra spacing below then use pb-16 below otherwise left it as is */}
    </div>
  );
}


