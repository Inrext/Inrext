"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "../../content/ThemeContext";

const challenges = [
  { icon: "/images/About icons/1.png", title: "Smarter ROI Decisions", desc: "Powerful calculators & personalized insights to maximize your returns." },
  { icon: "/images/About icons/2.png", title: "Verified Properties Only", desc: "Every listing is pre-screened, saving you from risky investments." },
  { icon: "/images/About icons/3.png", title: "Expert Guidance Anytime", desc: "One-on-one support to help you navigate the real estate maze." },
  { icon: "/images/About icons/4.png", title: "Knowledge That Grows You", desc: "Market updates, trends, and education to level up your investment game." },
  { icon: "/images/About icons/5.png", title: "Personalized Investment Plans", desc: "We tailor property suggestions that fit your goals and budget." },
  { icon: "/images/About icons/6.png", title: "Transparent Deal Process", desc: "No hidden terms — just clear, honest property transactions." },
];

const Challenges = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`overflow-hidden ${isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"}`}>
      <div className="max-w-7xl mx-auto px-6 lg:pt-[5rem] pb-[3rem] flex flex-col justify-center items-center overflow-hidden">
        <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
          Your
          <span className={`cormorant-garamond ps-3 pe-3 ${isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"}`}>Challenges,</span>
          Our
          <span className={`cormorant-garamond ps-3 pe-3 ${isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"}`}>Solutions</span>
        </h1>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-[0rem] mb-[0rem] ">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 ">
          {challenges.map((item, idx) => (
            <div key={idx} className="px-[0.5rem]">
              <div className={`h-full grid grid-row-2 justify-center items-center relative bg-zinc-900 rounded-lg ${isDarkMode ? " border border-blue-500/30 rounded-xl" : "border border-[#5c727d] rounded-xl"}`}>
                <div className="p-7 w-full h-full flex justify-center items-center relative">
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image src={item.icon} alt="" className="w-7 h-7 object-contain" width={28} height={28} priority />
                    </div>
                  </div>
                  <div className="absolute left-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  <div className="absolute right-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="flex flex-col justify-center items-center pb-5 px-5">
                  <h2 className="dm-serif-display text-white font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    {item.title}
                  </h2>
                  <p className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center ${isDarkMode ? "text-white" : "text-gray-900"} leading-6`}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
