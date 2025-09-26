import React from "react";
import { useTheme } from "../../content/ThemeContext";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

const WorkWithUs: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      <div className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center overflow-hidden py-[3rem]">
          <div className="max-w-4xl mx-auto">
            <p
              className={`uppercase raleway font-semibold text-center lg:text-[1.3rem] md:text-[1.2rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem] ${
                isDarkMode ? "text-white backdrop-blur-md " : "text-black"
              }`}
            >
              Opportunities Await
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-[0rem] lg:mt-[1rem] flex flex-col justify-center items-center overflow-hidden">
            <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] uppercase">
              Work With
              <span
                className={`cormorant-garamond  ps-2.5 pe-1.5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Us
              </span>
              !
            </h1>
          </div>
        </div>
        <div className="flex flex-col mb-[3rem] lg:gap-y-[2.5rem]">
          <div className="max-w-7xl px-6 mx-auto ">
            <p
              className={`text-center font-light lg:w-[60rem] lg:text-[0.9rem] md:text-[0.9rem] text-[0.7rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] capitalize ${
                isDarkMode
                  ? "text-white  backdrop-blur-md "
                  : "text-gray-900"
              }`}
            >
              At Inrext, we go beyond just offering projects we create an ecosystem for success. Gain access to premium real estate inventory, enjoy higher commissions, and benefit from our exclusive support system designed to fuel your growth. Our expertise, strategic market insights, and seamless processes empower you to work smarter, close deals faster, and maximize your earnings. Whether you're an investor, broker, or real estate professional, partnering with Inrext means staying ahead in a competitive market. Elevate your success with us because your growth is our priority.
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:pt-[0rem] pt-[1.5rem] pb-[0rem] flex flex-col justify-center items-center overflow-hidden">
            <Link
              href="/contact"
              className="flex items-center gap-1 w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              GET IN TOUCH{" "}
              <span className="text-[1rem]">
                <MdArrowOutward />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;