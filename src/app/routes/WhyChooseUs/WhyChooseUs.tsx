"use client";

import React, { useEffect } from "react";
import { useTheme } from "../../content/ThemeContext";
import AOS from "aos";
import "aos/dist/aos.css";

const WhyChooseUs: React.FC = () => {
  const { isDarkMode } = useTheme();
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      <div
        className="overflow-hidden"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        <div className="max-w-7xl  mx-auto px-6 pt-[3rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-3xl md:text-[2.9rem] font-normal text-center text-blue-500 lg:leading-[3.5rem] md:leading-[2.7rem] leading-[2rem]">
            Why Choose
            <span
              className={`cormorant-garamond text-3xl md:text-[2.9rem] ps-2 pe-2 ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Us
            </span>
            ?
          </h1>
        </div>
        <div className="max-w-6xl mx-auto pt-[1rem] lg:pb-[5rem] flex flex-col justify-center items-center text-[1.1rem]">
          <p
            className={`raleway uppercase font-semibold lg:pb-[2rem] pb-[1rem] lg:text-2xl text-[1rem] text-center lg:px-0 px-5 ${
              isDarkMode ? "text-white  backdrop-blur-md " : "text-gray-900"
            }`}
          >
            At INREXT, we’re committed to turning your investment goals into reality.
          </p>
          <p
            className={`lg:px-0 px-3 text-center lg:text-[1.1rem] md:text-[1rem] text-[0.8rem] ${
              isDarkMode ? "text-white  backdrop-blur-md " : "text-gray-900"
            }`}
          >
            Real estate isn’t just about properties it’s about possibilities. With 12+ years of expertise, market intelligence, and a results driven approach, Inrext transforms investments into lasting wealth. Whether residential, commercial, or farmland, we provide strategic guidance, seamless transactions, and high growth opportunities ensuring your investment journey is smart, secure, and rewarding.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;