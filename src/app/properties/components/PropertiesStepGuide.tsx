"use client";
import React, { useState } from "react";
import { useTheme } from "../../content/ThemeContext";

const steps = [
  "Search & Explore",
  "Shortlist & Compare",
  "Schedule a Visit",
  "Consult & Negotiate",
  "Secure Your Deal",
];

const PropertiesStepGuide = () => {
  const { isDarkMode } = useTheme();
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setGradientPos({ x, y });
  };

  return (
     <div
        className={`overflow-hidden  ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
    <div
          className="overflow-hidden lg: py-[0rem]"
          data-aos="fade-up"
          data-aos-duration="1200"
          onMouseMove={handleMouseMove}
          style={{
            background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(59,130,246,0.7), transparent 20%)`,
            transition: "background-position 0.1s ease",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center overflow-hidden py-[3rem]">
            <div className="max-w-4xl mx-auto   ">
              <p
                className={`uppercase raleway font-semibold text-center lg:text-[1.3rem] md:text-[1.2rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem] ${
                  isDarkMode ? "text-white backdrop-blur-md " : "text-black"
                }`}
              >
                Start Investing Like a Pro – Here’s Your
              </p>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-[0rem] lg:mt-[1rem] flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] uppercase">
                step by step
                <span
                  className={`cormorant-garamond  ps-2.5 pe-1.5 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Guide
                </span>
              </h1>
            </div>
          </div>
          <div className="w-[0rem] h-[0rem] absolute pointer-events-none" />
          <div className="max-w-7xl mx-auto lg:px-6 px-2 py-[5rem] flex justify-around items-center relative">
            <div className="absolute lg:left-[6.2rem] md:left-[2.5rem] left-[0.8rem] lg:right-[6.2rem] md:right-[2.5rem] right-[0.8rem] top-1/2 h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Search & <br /> Explore
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Shortlist & <br /> Compare
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Schedule a<br /> Visit
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Consult &<br /> Negotiate
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Secure Your
                <br /> Deal
              </p>
            </div>
          </div>
        
      <div className="w-[0rem] h-[0rem] absolute  pointer-events-none" />
    </div>
    </div>
  );
};

export default PropertiesStepGuide;
