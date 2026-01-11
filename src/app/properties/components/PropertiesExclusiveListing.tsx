"use client";
import React, { useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../content/ThemeContext";
import { propertyService } from "../../../services/propertyService";
import type { Property } from "../../../services/propertyService";

const PropertiesExclusiveListing = () => {
  const { isDarkMode } = useTheme();
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;

  useEffect(() => {
    propertyService
      .getAllProperties("", 1, 100, "true")
      .then((res) => setProperties(res.data || []));
  }, []);

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProperties = properties.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(properties.length / cardsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Utility: Normalize images
  const normalizeImages = (imgs: any[] = []): string[] =>
    Array.isArray(imgs) && imgs.length > 0
      ? imgs
          .map((img) => {
            if (typeof img === "string") return img;
            if (typeof img === "object" && img && "url" in img) return img.url;
            return undefined;
          })
          .filter((img): img is string => Boolean(img))
      : [];

  return (
  <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >      
       <div
          className="overflow-hidden pb-12"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="flex flex-col gap-y-[0.6rem]">
            <div className="max-w-7xl mx-auto px-6 pb-2 flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
                exclusive
                <span
                  className={`cormorant-garamond ps-2 pe-2 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Listing
                </span>
              </h1>
            </div>
            <div className="max-w-7xl mx-auto pt-0 lg:pb-0 flex flex-col justify-center items-center text-[1.1rem]">
              <p
                className={`raleway uppercase font-semibold lg:pb-0 pb-0 lg:text-2xl text-[1rem] text-center lg:px-0 px-5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Explore, Compare, and Choose from the Best Real Estate Listings.
              </p>
            </div>
          </div>
          {/* --------- */}
          <div className="max-w-7xl mx-auto lg:px-6 px-2 py-20 ">
            <div className="grid lg:grid-cols-2 grid-cols-1  lg:justify-normal justify-center gap-14">
              {currentProperties.map((properties, index) => (
                <div
                  key={
                    properties._id ||
                    properties.propertyName ||
                    properties.projectName
                  }
                  className="w-full flex justify-center overflow-hidden lg:description rounded-xl"
                >
                  <Link
                    href={`/properties/${encodeURIComponent(
                      properties.propertyName
                        .replace(/\s+/g, "-")
                        .replace(/-project$/i, "")
                        .toLowerCase()
                    )}`}
                    className={`flex p-2 lg:gap-2.5 md:gap-2.5 gap-4 lg:description rounded-xl overflow-hidden ${
                      index % 4 < 2 ? "flex-row" : "flex-row-reverse"
                    } hover:scale-105 transition-transform duration-300`}
                  >
                    {/* Image */}
                    <div className="lg:w-60 md:w-60 w-48 lg:h-60 md:h-60 h-48 ">
                      <Image
                        src={(() => {
                          const imgs = normalizeImages(properties.images);
                          return imgs.length > 0 ? imgs[0] : "/images/placeholder.png";
                        })()}
                        className="w-full h-full lg:description rounded-xl object-cover"
                        alt=""
                        width={240}
                        height={240}
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 240px"
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div className="relative lg:w-[20.9rem] md:w-[20.9rem] w-40 lg:py-5 md:py-5 lg:px-5 flex flex-col h-full">
                      <div className="flex flex-col gap-y-3">
                        <h1
                          className={`capitalize text-black lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] lg:leading-5 md:leading-[1.1rem] leading-4 font-semibold ${
                            isDarkMode
                              ? "text-white backdrop-blur-md"
                              : "text-black"
                          }`}
                        >
                          {properties.projectName || properties.propertyName || "Unnamed Property"}
                        </h1>
                        <p
                          className={`capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-5 md:leading-[1.1rem] leading-4 font-light ${
                            isDarkMode
                              ? "text-white backdrop-blur-md"
                              : "text-gray-700"
                          }`}
                        >
                          {/* {properties.description} */}
                          {properties.description && properties.description.length > 100
                            ? properties.description.substring(0, 100) + "..."
                            : properties.description}
                        </p>
                      </div>
                      <div className=" relative lg:-bottom-10 md:bottom-[-5.8rem] bottom-[-1.2rem] left-0 right-0 flex flex-col gap-y-2.5 lg:pt-3 md:pt-3 pt-2">
                        <div className="flex justify-between mt-auto items-center gap-2 text-blue-500 font-medium">
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-5 md:leading-[1.1rem] gap-1 leading-4">
                            <SlSizeFullscreen />
                            <span>
                              {properties.minSize || properties.maxSize
                                ? `${properties.minSize || ""}${
                                    properties.maxSize
                                      ? ` - ${properties.maxSize}`
                                      : ""
                                  }${
                                    properties.sizeUnit
                                      ? ` ${properties.sizeUnit}`
                                      : ""
                                  }`
                                : "—"}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-between mt-auto items-center text-blue-500 font-medium">
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-5 md:leading-[1.1rem] leading-4">
                            <IoLocationOutline />
                            <span>
                              <span>
                                {Array.isArray(properties.location)
                                  ? properties.location[0].length > 15
                                    ? properties.location[0].substring(0, 15) +
                                      "..."
                                    : properties.location[0]
                                  : properties.location.length > 15
                                  ? properties.location.substring(0, 15) + "..."
                                  : properties.location}
                              </span>
                            </span>
                          </p>
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-5 md:leading-[1.1rem] leading-4">
                            {/* <MdOutlineCurrencyRupee /> */}
                            <span>{properties.price}/{properties.sizeUnit}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 w-6 h-6 flex items-center rounded-full ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronLeft />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 w-6 h-6 flex items-center rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          </div>
        </div>

        </div>
   );
};

export default PropertiesExclusiveListing;
