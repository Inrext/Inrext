/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
"use client";

import React, { useEffect } from "react";
import { useTheme } from "../content/ThemeContext";
import Link from "next/link";

const Achievements = () => {
  const { isDarkMode } = useTheme();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);
  return (
    <>
      <div
        className={`lg:h-[100vh] h-[50vh] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        {/* Content */}
        <div className="relative flex flex-col justify-center items-center lg:gap-y-[3rem] gap-y-[1.5rem] p-4">
          <h1
            className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
              isDarkMode ? "text-blue-500" : "text-blue-500"
            }`}
          >
            Celebrated by Industry.
            <br /> Chosen by You.
          </h1>
          <p
            className={`raleway text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.7rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Beyond awards, it’s the trust we earn that truly defines our
            success.
          </p>
        </div>
      </div>
      {/* ======== 1 =============== */}
      <div
        className={`lg:h-[90vh] h-[45vh]  ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full h-full overflow-hidden max-w-5xl mx-auto flex justify-center relative py-0">
          <div className="inter relative font-black text-blue-500 w-full">
            <p
              className={`lg:text-[30rem] md:text-[21rem] text-[15rem] scale-x-90 scale-y-100 ${
                isDarkMode
                  ? "drop-shadow-[5px_5px_5px_rgba(255,255,255,0.5)]"
                  : "drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              }`}
            >
              1
            </p>
          </div>
          <div className="absolute inset-0">
            <p
              className={`raleway font-light lg:leading-[0.9rem] md:leading-[0.8rem] leading-[0.7rem] text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] lg:w-[40rem] md:w-[40rem] w-[18rem] lg:top-[12rem] md:top-[9rem] top-[6rem] lg:left-[11.5rem] md:left-[8.1rem] left-[5.2rem] absolute ${
                isDarkMode ? "text-white" : "text-gray-900"
              } line-clamp-[3] md:line-clamp-none lg:line-clamp-none`}
            >
              <span className="font-semibold lg:text-[0.9rem] md:text-[0.7rem] text-[0.7rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                Proud Member of the #SoldOutClub
              </span>{" "}
              <br />
              Inrext Private Limited has been honored with the prestigious
              #SoldOutClub Award by Godrej Properties for our outstanding sales
              performance in FY 2024–25 at Godrej Jardinia, Sector 146, Noida.
              This recognition reflects our unwavering commitment to excellence,
              trust, and results in the real estate landscape
            </p>
            <img
              className="z-[1] lg:h-[15rem] md:h-[9.2rem] h-[6.5rem] lg:top-[17.5rem] md:top-[13.5rem] top-[9.5rem] lg:left-[11.5rem] md:left-[8.1rem] left-[5.2rem] absolute"
              src="/images/Awards/Godrej jardinia.jpg"
              alt=""
            />
            <h1 className="uppercase inter z-[1] text-blue-500 font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[5rem] md:bottom-[3.3rem] bottom-[4.5rem] lg:left-[18rem] md:left-[12.7rem] left-[7.9rem] absolute  ">
              Godrej
            </h1>
            <h1
              className={`uppercase inter  font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[2.1rem] md:bottom-[1.8rem] bottom-[3.2rem] lg:left-[21rem]  md:left-[14.2rem] left-[9.2rem] absolute z-[1.1]  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Jardinia
            </h1>
          </div>
        </div>
      </div>
      {/* ========= 2 ================ */}
      <div
        className={`lg:h-[90vh] h-[45vh]  ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full h-full overflow-hidden max-w-5xl mx-auto flex justify-center relative py-0">
          <div className="absolute inset-0 z-[1]">
            <p
              className={`raleway font-light lg:leading-[0.9rem] md:leading-[0.8rem] leading-[0.7rem] text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] lg:top-[11rem] md:top-[8rem] top-[5rem] lg:w-[35rem] md:w-[35rem] w-[17rem] lg:right-[14rem] md:right-[12rem] right-[6.5rem] absolute ${
                isDarkMode ? "text-white" : "text-gray-900"
              } line-clamp-[3] md:line-clamp-none lg:line-clamp-none`}
            >
              <span className="font-semibold lg:text-[0.9rem] md:text-[0.7rem] text-[0.7rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                Empowered Through Collaboration
              </span>{" "}
              <br />
              We’re proud to be recognized by CXC Infotech for our continued
              support and active involvement. This award is a testament to the
              strong partnerships we build and the shared success we strive for
              in every collaboration.
            </p>
            <img
              className="z-[1] lg:h-[21rem] md:h-[13rem] h-[9rem] lg:top-[13rem] md:top-[10rem] top-[7.5rem] lg:right-[13.5rem] md:right-[9.5rem] right-[6.5rem] absolute"
              src="/images/Awards/Award 6.png"
              alt=""
            />
            <h1 className="uppercase inter z-[1] text-blue-500 font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[5.2rem] md:bottom-[4.3rem] bottom-[4.8rem] lg:left-[22.4rem] md:left-[23.5rem] left-[5rem] absolute  ">
              cxc
            </h1>
            <h1
              className={`uppercase  inter font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[2.4rem] md:bottom-[2.6rem] bottom-[3.3rem] lg:left-[25.5rem] md:left-[25rem] left-[6.6rem] absolute z-[-1]  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Infotech
            </h1>
          </div>
          <div className="inter  relative font-black text-blue-500 w-full">
            <p
              className={`lg:text-[30rem] md:text-[21rem] text-[15rem] text-end scale-x-90 scale-y-100 ${
                isDarkMode
                  ? "drop-shadow-[5px_5px_5px_rgba(255,255,255,0.5)]"
                  : "drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              }`}
            >
              2
            </p>
          </div>
        </div>
      </div>
      {/* ======== 3 =============== */}
      <div
        className={`lg:h-[90vh] h-[45vh]  ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full h-full overflow-hidden max-w-5xl mx-auto flex justify-center relative py-0">
          <div className="inter  relative font-black text-blue-500 w-full">
            <p
              className={`lg:text-[30rem] md:text-[21rem] text-[15rem] scale-x-90 scale-y-100 ${
                isDarkMode
                  ? "drop-shadow-[5px_5px_5px_rgba(255,255,255,0.5)]"
                  : "drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              }`}
            >
              3
            </p>
          </div>
          <div className="absolute inset-0">
            <p
              className={`raleway font-light lg:leading-[0.9rem] md:leading-[0.8rem] leading-[0.7rem] text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] lg:w-[40rem] md:w-[40rem] w-[18rem] lg:top-[12rem] md:top-[9rem] top-[6rem] lg:left-[12.5rem] md:left-[9.1rem] left-[6.2rem] absolute ${
                isDarkMode ? "text-white" : "text-gray-900"
              } line-clamp-[3] md:line-clamp-none lg:line-clamp-none`}
            >
              <span className="font-semibold lg:text-[0.9rem] md:text-[0.7rem] text-[0.7rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                Excellence in Every Endeavour
              </span>{" "}
              <br />
              Awarded the Certificate of Excellence by Land Science Buildwell,
              this recognition celebrates Inrext’s extraordinary contribution to
              The Lake Countryside Farms. It reflects our commitment to
              delivering lasting value and fostering trust in every
              collaboration.
            </p>
            <img
              className="z-[1] lg:h-[15rem] md:h-[9.2rem] h-[6.5rem] lg:top-[17.5rem] md:top-[13.5rem] top-[9.5rem] lg:left-[12.5rem] md:left-[9.1rem] left-[6.2rem] absolute"
              src="/images/Awards/Lake farms award.jpg"
              alt=""
            />
            <h1 className="uppercase inter z-[1] text-blue-500 font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[5.5rem] md:bottom-[3.6rem] bottom-[4.7rem] lg:left-[19.5rem] md:left-[13.9rem] left-[8.9rem] absolute  ">
              The Lake
            </h1>
            <h1
              className={`uppercase inter font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[2.2rem] md:bottom-[2rem] bottom-[3.3rem] lg:left-[22rem] md:left-[14.9rem] left-[10rem] absolute z-[1.1]  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Farms
            </h1>
          </div>
        </div>
      </div>
      {/* ========= 4 ================ */}
      <div
        className={`lg:h-[90vh] h-[45vh]  ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full h-full overflow-hidden max-w-5xl mx-auto flex justify-center relative py-0">
          <div className="absolute inset-0 z-[1]">
            <p
              className={`raleway font-light lg:leading-[0.9rem] md:leading-[0.8rem] leading-[0.7rem] text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] lg:top-[11rem] md:top-[8rem] top-[5rem] lg:w-[35rem] md:w-[35rem] w-[17rem] lg:right-[14rem] md:right-[12rem] right-[6.5rem] absolute ${
                isDarkMode ? "text-white" : "text-gray-900"
              } line-clamp-[3] md:line-clamp-none lg:line-clamp-none`}
            >
              <span className="font-semibold lg:text-[0.9rem] md:text-[0.7rem] text-[0.7rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                A Symbol of Trusted Partnerships
              </span>{" "}
              <br />
              Presented by Imperia, this award honors Inrext Pvt. Ltd. for our
              unwavering support and collaborative spirit. It’s a shining
              reminder of the smiles we help secure through strong, enduring
              alliances.
            </p>
            <img
              className="z-[1] lg:h-[21rem] md:h-[13rem] h-[9rem] lg:top-[13rem] md:top-[10rem] top-[7.5rem] lg:right-[13.5rem] md:right-[9.5rem] right-[6.5rem] absolute"
              src="/images/Awards/Award 8.png"
              alt=""
            />
            <h1 className="uppercase inter z-[1] text-blue-500 font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[4.1rem] md:bottom-[3.4rem] bottom-[4.4rem] lg:left-[26rem] md:left-[25.5rem] left-[7rem] absolute  ">
              imperia
            </h1>
            <h1
              className={`uppercase inter font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[1.2rem] md:bottom-[1.9rem] bottom-[3rem] lg:left-[30.4rem] md:left-[27.4rem] left-[8.7rem] absolute z-[-1]  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              award
            </h1>
          </div>
          <div className="inter  relative font-black text-blue-500 w-full">
            <p
              className={`lg:text-[30rem] md:text-[21rem] text-[15rem] text-end scale-x-90 scale-y-100 ${
                isDarkMode
                  ? "drop-shadow-[5px_5px_5px_rgba(255,255,255,0.5)]"
                  : "drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              }`}
            >
              4
            </p>
          </div>
        </div>
      </div>
      {/* ======== 5 =============== */}
      <div
        className={`lg:h-[90vh] h-[45vh]  ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full h-full overflow-hidden max-w-5xl mx-auto flex justify-center relative py-0">
          <div className="inter  relative font-black text-blue-500 w-full">
            <p
              className={`lg:text-[30rem] md:text-[21rem] text-[15rem] scale-x-90 scale-y-100 ${
                isDarkMode
                  ? "drop-shadow-[5px_5px_5px_rgba(255,255,255,0.5)]"
                  : "drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              }`}
            >
              5
            </p>
          </div>
          <div className="absolute inset-0">
            <p
              className={`raleway font-light lg:leading-[0.9rem] md:leading-[0.8rem] leading-[0.7rem] text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] lg:w-[40rem] md:w-[40rem] w-[18rem] lg:top-[12rem] md:top-[9rem] top-[6rem] lg:left-[11.5rem] md:left-[9.6rem] left-[6rem] absolute ${
                isDarkMode ? "text-white" : "text-gray-900"
              } line-clamp-[3] md:line-clamp-none lg:line-clamp-none`}
            >
              <span className="font-semibold lg:text-[0.9rem] md:text-[0.7rem] text-[0.7rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                Vision Meets Performance
              </span>{" "}
              <br />
              Awarded by FairFox at Eye of Noida, this honor celebrates Inrext
              Pvt. Ltd.’s outstanding dedication, top-tier performance, and
              unwavering commitment to excellence in one of Noida’s most iconic
              developments.
            </p>
            <img
              className="z-[1] lg:h-[30rem] md:h-[19rem] h-[13rem] lg:top-[9.5rem] md:top-[8.2rem] top-[6.4rem] lg:left-[6.5rem] md:left-[5rem] left-[3rem] absolute"
              src="/images/Awards/Award 10.png"
              alt=""
            />
            <h1 className="uppercase inter z-[1] text-blue-500 font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[5.8rem] md:bottom-[3.5rem] bottom-[4.5rem] lg:left-[20rem] md:left-[15.5rem] left-[9.2rem] absolute  ">
              Eye of
            </h1>
            <h1
              className={`uppercase inter font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[2.7rem] md:bottom-[2rem] bottom-[2.9rem] lg:left-[22.4rem] md:left-[15.4rem] left-[9.8rem]  absolute z-[1.1]  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Noida
            </h1>
          </div>
        </div>
      </div>
      {/* ========= 6 ================ */}
      <div
        className={`lg:h-[90vh] h-[45vh]  ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full h-full overflow-hidden max-w-5xl mx-auto flex justify-center relative py-0">
          <div className="absolute inset-0 z-[1]">
            <p
              className={`raleway font-light lg:leading-[0.9rem] md:leading-[0.8rem] leading-[0.7rem] text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] lg:top-[11rem] md:top-[8rem] top-[5rem] lg:w-[35rem] md:w-[35rem] w-[17rem] lg:right-[14rem] md:right-[12rem] right-[6.5rem] absolute ${
                isDarkMode ? "text-white" : "text-gray-900"
              } line-clamp-[3] md:line-clamp-none lg:line-clamp-none`}
            >
              <span className="font-semibold lg:text-[0.9rem] md:text-[0.7rem] text-[0.7rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                EON Best Performer Award 2024
              </span>{" "}
              <br />
              Presented by Eye of Noida (EON), this award celebrates Inrext Pvt.
              Ltd.’s exceptional sales performance and unmatched dedication
              during the January–February 2024 campaign. A proud recognition of
              our team's unwavering drive and excellence in real estate
              leadership, setting a new benchmark for success at the EON
              Project.
            </p>
            <img
              className="z-[1] lg:h-[15rem] md:h-[9.2rem] h-[7rem] lg:top-[17.5rem] md:top-[13.5rem] top-[8.7rem] lg:right-[13.5rem] md:right-[10rem] right-[6.5rem] absolute"
              src="/images/Awards/Award 3.png"
              alt=""
            />
            <h1 className="uppercase inter z-[1] text-blue-500 font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[5.4rem] md:bottom-[3.5rem] bottom-[5rem] lg:left-[27.2rem] md:left-[25.8rem] left-[7.2rem] absolute  ">
              Eye of
            </h1>
            <h1
              className={`uppercase inter font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[2.4rem] md:bottom-[2rem] bottom-[3.5rem] lg:left-[30.9rem] md:left-[27rem] left-[8.5rem] absolute z-[-1]  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Noida
            </h1>
          </div>
          <div className="inter  relative font-black text-blue-500 w-full">
            <p
              className={`lg:text-[30rem] md:text-[21rem] text-[15rem] text-end scale-x-90 scale-y-100 ${
                isDarkMode
                  ? "drop-shadow-[5px_5px_5px_rgba(255,255,255,0.5)]"
                  : "drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              }`}
            >
              6
            </p>
          </div>
        </div>
      </div>
      {/* =========== 7 ================ */}
      <div
        className={`lg:h-[90vh] h-[45vh]  ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full h-full overflow-hidden max-w-5xl mx-auto flex justify-center relative py-0">
          <div className="inter  relative font-black text-blue-500 w-full">
            <p
              className={`lg:text-[30rem] md:text-[21rem] text-[15rem] scale-x-90 scale-y-100 ${
                isDarkMode
                  ? "drop-shadow-[5px_5px_5px_rgba(255,255,255,0.5)]"
                  : "drop-shadow-[5px_5px_5px_rgba(0,0,0,0.5)]"
              }`}
            >
              7
            </p>
          </div>
          <div className="absolute inset-0">
            <p
              className={`raleway font-light lg:leading-[0.9rem] md:leading-[0.8rem] leading-[0.7rem] text-[0.5rem] md:text-[0.6rem] lg:text-[0.7rem] lg:w-[40rem] md:w-[40rem] w-[18rem] lg:top-[12rem] md:top-[9rem] top-[6rem] lg:left-[11.5rem] md:left-[9.6rem] left-[6rem] absolute ${
                isDarkMode ? "text-white" : "text-gray-900"
              } line-clamp-[3] md:line-clamp-none lg:line-clamp-none`}
            >
              <span className="font-semibold lg:text-[0.9rem] md:text-[0.7rem] text-[0.7rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                Legends of Excellence Outstanding
              </span>{" "}
              <br />
              Proud to receive an award from Godrej Majesty a name that stands
              for trust, excellence, and innovation in real estate. This
              recognition fuels our commitment to deliver quality and integrity
              in everything we do. Grateful for the honour and inspired to keep
              raising the bar.
            </p>
            <img
              className="z-[1] lg:h-[15rem] md:h-[9.2rem] h-[6.5rem] lg:top-[17.5rem] md:top-[13.5rem] top-[9.7rem] lg:left-[12.4rem] md:left-[8.5rem] left-[5.5rem] absolute"
              src="/images/Awards/Godrej.jpg"
              alt=""
            />
            <h1 className="uppercase inter z-[1] text-blue-500 font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[5rem] md:bottom-[3.3rem] bottom-[4.3rem] lg:left-[20rem] md:left-[13.8rem] left-[8.6rem] absolute  ">
              Godrej
            </h1>
            <h1
              className={`uppercase inter font-extrabold lg:text-[3.2rem] text-[1.5rem] lg:bottom-[2.1rem] md:bottom-[1.9rem] bottom-[3rem] lg:left-[22.4rem] md:left-[15rem] left-[9.8rem]  absolute z-[1.1]  ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Noida
            </h1>
          </div>
        </div>
      </div>
      {/* -================== */}
      <div
        className={`flex py-10 flex-col justify-center items-center ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <p
          className={`lg:text-[1.3rem] md:text-[1rem] text-[0.9rem] ${
            isDarkMode ? "text-white" : "text-blue-500"
          }`}
        >
          Join Us on Our Journey of Excellence!
        </p>
        <Link
          href="/"
          className="mt-8 w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
        >
          get in touch
        </Link>
      </div>
    </>
  );
};

export default Achievements;
