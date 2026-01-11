"use client";
import React from "react";
import { useTheme } from "../../content/ThemeContext";
import Image from "next/image";

const PropertiesHeader = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`lg:h-[100vh] h-[50vh] overflow-hidden flex justify-center items-center relative ${
        isDarkMode ? "bg-black" : "bg-blue-50"
      }`}
    >
      {/* Image with black overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/properties.jpg"
          alt=""
          fill
          className="w-full h-full object-cover"
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      {/* Content */}
      <div className="relative flex flex-col justify-center items-center lg:gap-y-[3rem] gap-y-[1.5rem] p-4">
        <h1
          className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
            isDarkMode ? "text-blue-500" : "text-white"
          }`}
        >
          Find Your Dream <br /> Property
        </h1>
        <p className="raleway text-white text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.6rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase">
          Your Dream Property is Just a Click Away – Start Your Search Today!
        </p>
      </div>
    </div>
  );
};

export default PropertiesHeader;
