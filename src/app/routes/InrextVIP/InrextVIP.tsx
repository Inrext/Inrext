"use client";

import React from "react";
import { useTheme } from "../../content/ThemeContext";
import Link from "next/link";

const InrextVIP: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      <div className="relative  mx-auto px-6 pt-[3rem]  flex flex-col justify-center items-center overflow-hidden">
        {/* Top radial background */}
        <div
          className="absolute top-[-18rem] w-[75vw] h-[40vh] rounded-full bg-gradient-radial blur-2xl opacity-100"
          style={{
            background:
              "radial-gradient(circle, #86B5FF, #3785FF, #0063FF, #ECF2F9)",
          }}
        ></div>
        <div className="py-[5rem] flex flex-col justify-center items-center gap-y-[3rem]">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
            Your gateway to
            <span
              className={`cormorant-garamond ps-2 ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Elite Networks
            </span>
          </h1>
          <div className="flex flex-col justify-center items-center gap-y-[0.8rem]">
            <p className="uppercase raleway font-semibold  text-blue-500 text-center lg:text-[1.3rem] md:text-[1.2rem] text-[1rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem]">
              Indulge in privilege. Command the market. Build your legacy.
            </p>
            <p
              className={`text-center font-light lg:w-[60rem] lg:text-[0.9rem] md:text-[0.9rem] text-[0.7rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] capitalize  ${
                isDarkMode
                  ? "text-white  backdrop-blur-md "
                  : "text-black"
              }`}
            >
              Step into a realm where visionaries converge, opportunities unfold,
              and fortunes are meticulously crafted. This isn’t just an investment
              club it’s a gateway to unparalleled influence, elite networks, and
              limitless prosperity.
            </p>
          </div>
          <Link
            href="/"
            className="w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            EXPLORE NOW
          </Link>
        </div>
        {/* Bottom radial background */}
        <div
          className="absolute bottom-[-18rem] w-[75vw] h-[40vh] rounded-full bg-gradient-radial blur-2xl opacity-100"
          style={{
            background:
              "radial-gradient(circle, #86B5FF, #3785FF, #0063FF, #ECF2F9)",
          }}
        ></div>
      </div>
    </div>
  );
};

export default InrextVIP;