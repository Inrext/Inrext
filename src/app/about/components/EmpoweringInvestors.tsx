"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../content/ThemeContext";

const EmpoweringInvestors = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`lg:h-[100vh] h-[100%] overflow-hidden flex justify-center items-center relative ${
        isDarkMode ? "bg-black" : "bg-blue-50"
      }`}
    >
      <div
        className={`overflow-hidden ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div className="grid lg:grid-cols-2  md:grid-cols-1 grid-cols-1 max-w-7xl mx-auto lg:px-6 px-5 py-[0rem] md:mt-[5rem] my-[4.5rem] gap-14">
          <div className="flex flex-col lg:px-10 justify-center gap-y-[2rem] lg:pt-[0rem]">
            <h1 className="dm-serif-display text-blue-500 font-normal lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ">
              Empowering <br />
              <span
                className={`${isDarkMode ? "text-white" : "text-blue-500"}`}
              >
                <span className="cormorant-garamond">Investors</span>
              </span>
            </h1>
            <p
              className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                isDarkMode ? "text-white" : "text-gray-900"
              } leading-6`}
            >
              In a market filled with confusion and misinformation, you deserve
              clarity. That’s why we created INREXT—to bring transparency,
              technology, and trust to your real estate journey.
            </p>
            <Link
              href="/"
              className="montserrat w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              EXPLORE OUR JOURNEY
            </Link>
            <div className="lg:h-full h-[35vh]">
              <Image
                className="w-full rounded-xl h-full object-cover"
                src="/images/About image.webp"
                alt="About Us"
                width={800}
                height={400}
                priority
              />
            </div>
          </div>
          <div className="grid grid-rows-4 gap-x-5 gap-y-5 mt-0 text-center">
            {[
              {
                icon: "/images/About icons/10.png",
                title: "Transparency First",
                desc: (
                  <>
                    We Believe Trust Begins With
                    <br />
                    Clarity. No Hidden Agendas, Just
                    <br />
                    Honest Real Estate.
                  </>
                ),
              },
              {
                icon: "/images/About icons/9.png",
                title: "Empowering Growth",
                desc: (
                  <>
                    We Don't Just Close Deals—We
                    <br />
                    Open Doors To Long-Term Growth
                    <br />
                    For Every Client And Associate.
                  </>
                ),
              },
              {
                icon: "/images/About icons/8.png",
                title: "Innovation Driven",
                desc: (
                  <>
                    We Use Smart Tools And Forward-
                    <br />
                     Thinking Strategies To Make 
                    <br />
                    To Investing Seamless And Efficient.
                  </>
                ),
              },
              {
                icon: "/images/About icons/7.png",
                title: "People Centered",
                desc: (
                  <>
                    Our Mission Starts And Ends  With
                    <br />
                     People. Your Goals, Your Journey,
                    <br />
                    Our Full Support.
                  </>
                ),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-5 lg:p-0 md:p-[2rem] p-[1.5rem]  bg-zinc-900 rounded-4xl"
              >
                <div className="col-span-2 max- h-full flex justify-center items-center relative">
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src={item.icon}
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>
                  <div className="absolute left-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  <div className="absolute right-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="col-span-3 flex flex-col gap-2 justify-center items-center">
                  <h2 className="dm-serif-display text-white font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    {item.title}
                  </h2>
                  <p
                     className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                isDarkMode ? "text-white" : "text-gray-900"
              } leading-6`}
                  >
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpoweringInvestors;
