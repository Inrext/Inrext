"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "../../content/ThemeContext";
import { fetchPillarsByCategory } from "../../../services/pillarService";
import { FaTelegram } from "react-icons/fa";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

function getImageSrc(member: any) {
  if (member.profileImages && member.profileImages.length > 0) {
    const img = member.profileImages[0];
    if (typeof img === "object" && img.url) return img.url;
    if (typeof img === "string") return img;
  }
  if (member.image) return member.image;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || "User")}`;
}

const StrategicForceSection = () => {
  const { isDarkMode } = useTheme();
  const [strategicForce, setStrategicForce] = useState<any[]>([]);
  useEffect(() => {
    fetchPillarsByCategory("the-strategic-force").then(setStrategicForce);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  return (
    <div className={`overflow-hidden ${isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"}`}>
      <div className="max-w-7xl mx-auto px-6 pt-[5rem] pb-[3rem] flex flex-col justify-center items-center overflow-hidden">
        <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
          The
          <span className={`cormorant-garamond ps-3 pe-3 ${isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"}`}>Strategic</span>
          Force
        </h1>
      </div>
      <div className="max-w-7xl mx-auto lg:px-0 mb-[0rem]">
        <div className="hidden lg:block">
          <div className="flex flex-row justify-center gap-4 pb-[0rem]">
            {strategicForce.map((member) => (
              <div key={member._id} className="px-[0.6rem]">
                <Link href={`/team/${encodeURIComponent(member.name)}`}>
                  <div className={`h-full flex flex-col justify-center items-center px-5 rounded-xl group cursor-pointer ${isDarkMode ? "border border-gray-500/30" : "border border-blue-500/30"}`}>
                    <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                      <Image className="w-full h-full object-contain bg-white rounded-xl" src={getImageSrc(member)} alt={member.name} width={240} height={192} priority />
                    </div>
                    <div className="flex flex-col py-5 w-full justify-center text-center items-center">
                      <h1 className="text-blue-500 font-semibold uppercase text-[1rem] leading-[1rem]">{member.name}</h1>
                      <p className={`capitalize text-[0.9rem] ${isDarkMode ? "text-white" : "text-gray-500"}`}>{member.position || member.designation}</p>
 <Link
                          href="/about"
                          className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500"
                        >
                          Say Hello👋{" "}
                          <span className="text-[1.50rem]">
                            <FaTelegram />
                          </span>
                        </Link>                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:hidden max-w-6xl mx-auto lg:px-0 mb-[0rem] overflow-x-auto">
          <div className="slider-container">
            <Slider {...settings} className="overflow-hidden pb-[0rem] lg:h-[26rem] h-[26rem]">
              {strategicForce.map((member) => (
                <div key={member._id} className="me-[1.6rem] px-[0.6rem]">
                  <Link className="flex flex-col items-center justify-center" href={`/team/${encodeURIComponent(member.name)}`}>
                    <div className={`h-full flex flex-col justify-center items-center px-12 lg:mx-0 mx-5 rounded-xl group cursor-pointer ${isDarkMode ? "border-2 border-blue-500" : "border-2 border-blue-500"}`}>
                      <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                        <Image className="w-full h-full object-contain bg-white rounded-xl" src={getImageSrc(member)} alt={member.name} width={240} height={192} priority />
                      </div>
                      <div className="flex flex-col py-5 w-full justify-center text-center items-center">
                        <h1 className="text-blue-500 font-semibold uppercase text-[1rem] leading-[1rem]">{member.name}</h1>
                        <p className={`capitalize text-[0.9rem] ${isDarkMode ? "text-white" : "text-gray-500"}`}>{member.position || member.designation}</p>
                        <button type="button" className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500" tabIndex={-1} aria-label="Say Hello">Say Hello👋</button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicForceSection;
