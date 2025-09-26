/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
// Hero.jsx
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../../content/ThemeContext"; // Importing theme context
// import { Link } from "react-router-dom";
import { useEffect } from "react";

const Hero = () => {
  const { isDarkMode } = useTheme();
  useEffect(() => {
    AOS.init({
      //   duration: 1000, // Animation duration (default: 400)
      once: true, // Whether animation should happen only once
    });
  }, []);

  return (
    <div
      className={`lg:h-[100vh] md:h-[63.5vh] h-[54vh] flex justify-center overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md  " : "bg-blue-50 "
      }`}
    >
    <div className="max-w-7xl overflow-hidden relative w-full h-full flex flex-col items-center mt-[4.5rem] ">
      <div
        className="text-blue-500 lg:pt-[2rem] text-center overflow-hidden leading-[0.9]"
        data-aos="zoom-in"
        data-aos-duration="3000"
      >
        <h3
          className={`raleway uppercase font-semibold lg:text-[1.8rem] md:text-[1.3rem] text-[0.6rem] ${
            isDarkMode ? "text-white" : "text-blue-500"
          }`}
        >
          Guiding You to Secure and Lucrative Property
        </h3>
        <h1 className="dm-serif-display font-normal uppercase lg:text-[11.5rem] md:text-[6rem] text-[3rem]">Investments</h1>
      </div>
      <div
        className="absolute w-full bottom-0 flex items-center justify-center lg:top-[8rem] md:top-[4rem] top-[2rem]  overflow-hidden" data-aos-duration="3000" data-aos="fade-up"
        style={{ clipPath: "inset(0 0 0 0)" }}
      >
        <div className="lg:w-[22rem] lg:h-[10rem] flex flex-col  gap-y-3 leading-5 overflow-hidden">
        </div>
        {/* circle */}
        <div
          className="w-[0rem] h-[0rem] absolute lg:right-[20rem] md:right-[20rem] right-[28rem] lg:top-[14rem] top-[12.8rem] rounded-full
             bg-transparent shadow-[0_0_100px_90px_rgba(59,130,246,0.7)] pointer-events-none"
        >
        </div>

        {/* image */}
        {/* <div className="lg:w-[41.5rem] lg:h-[30.5rem] z-10 relative flex items-start justify-end"> */}
        <div className="lg:w-full lg:h-full z-10 relative flex items-start justify-end">
          <img
            src="/images/hero.webp"
            alt="Hero"
            className="relative w-full h-full"
          />
        </div>
        {/* circle */}
        <div
          className="w-[0rem] h-[0rem] absolute lg:left-[18rem] left-[20rem] lg:bottom-[0rem] bottom-[2rem] rounded-full bg-transparent shadow-[0_0_100px_100px_rgba(0.7,130,246,59)] pointer-events-none"
        >
        </div>
        <div className="lg:w-[22rem] lg:h-[10rem] flex flex-col  gap-y-3 leading-5 overflow-hidden">
        </div>
      </div>
      </div>
    </div>
  );
};

export default Hero;
