import React from "react";
import Image from "next/image";
import { useTheme } from "../../content/ThemeContext";

const WhatMakeUs: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      <div className="overflow-hidden ">
        <div className="max-w-7xl mx-auto px-6 py-[3rem] pb-[0.6rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
            What Makes Us <br />
            <span
              className={`cormorant-garamond  ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Stand Out ?
            </span>
          </h1>
        </div>

        <div className="max-w-[75rem] mx-auto lg:mt-[3rem] lg:mb-[3rem] md:mt-[2rem] md:mb-[3rem] mt-[2rem] mb-[3rem]  flex lg:flex-nowrap flex-wrap lg:justify-between justify-center lg:px-[4rem] md:px-[4rem] px-0 text-gray-900 gap-5">
          {/* Card 1 */}
          <div className="overflow-hidden rounded-xl cursor-pointer">
            <div
              className={`relative flex flex-col justify-center items-center rounded-xl lg:h-[10rem] md:h-[10rem] h-[8rem] lg:w-[14rem] md:w-[14rem] w-[8rem] px-1.5 gap-y-3
                ${
                  isDarkMode
                    ? "bg-gradient-to-b from-gray-900 from-[0%] to-black to-[100%] border border-[#5c727d]"
                    : "bg-white "
                } shadow-lg backdrop-blur-[6px]`}
            >
              {/* Blurred background */}
              {/* Removed inner blur div, as the card bg now matches the image */}
              {/* Content above blur */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full w-full">
                <Image
                  className="lg:w-[3rem] md:w-[3.5rem] w-[2.5rem] lg:h-[3rem] md:h-[3.5rem] h-[2.5rem]"
                  src="/images/what1.png"
                  alt="Trusted by Investors"
                  width={48}
                  height={48}
                  priority
                />
                <p className={`text-center font-semibold mt-4 ${
                  isDarkMode ? "text-white" : "text-black"
                } text-lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] lg:leading-[1rem] md:leading-[0.9rem] leading-[0.8rem]`}>
                  Trusted by <br /> Investors
                </p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="overflow-hidden rounded-xl cursor-pointer">
            <div
              className={`relative flex flex-col justify-center items-center rounded-xl lg:h-[10rem] md:h-[10rem] h-[8rem] lg:w-[14rem] md:w-[14rem] w-[8rem] px-1.5 gap-y-3
                ${
                  isDarkMode
                    ? "bg-gradient-to-b from-gray-900 from-[0%] to-black to-[100%] border border-[#5c727d]"
                    : "bg-white "
                } shadow-lg backdrop-blur-[6px]`}
            >
              {/* Content above blur */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full w-full">
                <Image
                  className="lg:w-[3rem] md:w-[3.5rem] w-[2.5rem] lg:h-[3rem] md:h-[3.5rem] h-[2.5rem]"
                  src="/images/what2.png"
                  alt="Transparency & Integrity"
                  width={48}
                  height={48}
                  priority
                />
                <p className={`text-center font-semibold mt-4 ${
                  isDarkMode ? "text-white" : "text-black"
                } lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] lg:leading-[1rem] md:leading-[0.9rem] leading-[0.8rem]`}>
                  Transparency & <br /> Integrity
                </p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="overflow-hidden rounded-xl cursor-pointer">
            <div
              className={`relative flex flex-col justify-center items-center rounded-xl lg:h-[10rem] md:h-[10rem] h-[8rem] lg:w-[14rem] md:w-[14rem] w-[8rem] px-1.5 gap-y-3
                ${
                  isDarkMode
                    ? "bg-gradient-to-b from-gray-900 from-[0%] to-black to-[100%] border border-[#5c727d]"
                    : "bg-white "
                } shadow-lg backdrop-blur-[6px]`}
            >
              {/* Content above blur */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full w-full">
                <Image
                  className="lg:w-[3rem] md:w-[3.5rem] w-[2.5rem] lg:h-[3rem] md:h-[3.5rem] h-[2.5rem]"
                  src="/images/what3.png"
                  alt="Expert Market Insights"
                  width={48}
                  height={48}
                  priority
                />
                <p className={`text-center font-semibold mt-4 ${
                  isDarkMode ? "text-white" : "text-black"
                } lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] lg:leading-[1rem] md:leading-[0.9rem] leading-[0.8rem]`}>
                  Expert Market <br /> Insights
                </p>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="overflow-hidden rounded-xl cursor-pointer">
            <div
              className={`relative flex flex-col justify-center items-center rounded-xl lg:h-[10rem] md:h-[10rem] h-[8rem] lg:w-[14rem] md:w-[14rem] w-[8rem] px-1.5 gap-y-3
                ${
                  isDarkMode
                    ? "bg-gradient-to-b from-gray-900 from-[0%] to-black to-[100%] border border-[#5c727d]"
                    : "bg-white "
                } shadow-lg backdrop-blur-[6px]`}
            >
              {/* Content above blur */}
              <div className="relative z-10 flex flex-col justify-center items-center h-full w-full">
                <Image
                  className="lg:w-[3rem] md:w-[3.5rem] w-[2.5rem] lg:h-[3rem] md:h-[3.5rem] h-[2.5rem]"
                  src="/images/what4.png"
                  alt="Maximized Returns"
                  width={48}
                  height={48}
                  priority
                />
                <p className={`text-center mt-4 font-semibold ${
                  isDarkMode ? "text-white" : "text-black"
                } lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] lg:leading-[1rem] md:leading-[0.9rem] leading-[0.8rem]`}>
                  Maximized <br /> Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatMakeUs;