"use client";
// TypeScript type for a team member
export type TeamMember = {
  _id: string;
  name: string;
  position?: string;
  image?: string;
  profileImages?: string[];
  category?: string;
};

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../content/ThemeContext";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaTelegram } from "react-icons/fa";


// Responsive style helper for Next/SSR
function responsiveStyles(breakpoints: any) {
  if (typeof window === "undefined") return breakpoints.desktop;
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    return breakpoints.mobile;
  } else if (windowWidth >= 768 && windowWidth < 1024) {
    return breakpoints.tablet;
  } else if (windowWidth >= 1024 && windowWidth < 1280) {
    return breakpoints.laptop;
  } else {
    return breakpoints.desktop;
  }
}

function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        ...responsiveStyles({
          mobile: {
            marginTop: "11.9rem",
            right: "2.6rem",
          },
          tablet: {
            marginTop: "11.9rem",
            right: "2rem",
          },
          laptop: {
            marginTop: "-8.4rem",
            right: "1.9rem",
          },
          desktop: {
            marginTop: "12rem",
            right: "1.8rem",
          },
        }),
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        ...responsiveStyles({
          mobile: {
            marginTop: "11.9rem",
            left: "18.1rem",
          },
          tablet: {
            marginTop: "11.9rem",
            left: "42.4rem",
          },
          laptop: {
            marginTop: "-8.4rem",
            left: "47.9rem",
          },
          desktop: {
            marginTop: "12rem",
            left: "66.2rem",
          },
        }),
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 2000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  beforeChange: (_oldIndex: number, newIndex: number) => {},
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


const Teams: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    AOS.init({ once: true });
    // Fetch Growth-Navigators from backend
    async function fetchGrowthNavigators() {
      try {
        const res = await axios.get("/api/pillar?category=growth-navigators");
        setTeamMembers(res.data);
      } catch (error) {
        console.error("Error fetching Growth-Navigators:", error);
      }
    }
    fetchGrowthNavigators();
  }, []);

  // Helper to get correct image src
  function getImageSrc(member: TeamMember): string {
    if (member.image) {
      if (member.image.startsWith("http://") || member.image.startsWith("https://")) {
        return member.image;
      }
      return `/images/${member.image.replace(/^\/images\//, "")}`;
    }
    if (member.profileImages && member.profileImages.length > 0) {
      let img = member.profileImages[0];
      // If profileImages is array of objects, use url property
      if (typeof img === "object" && (img as any).url) {
        img = (img as any).url;
      }
      if (typeof img === "string" && (img.startsWith("http://") || img.startsWith("https://"))) {
        return img;
      }
      if (typeof img === "string") {
        return `/images/${img.replace(/^\/images\//, "")}`;
      }
    }
    return "/images/default-profile.png";
  }

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
        <div className="max-w-7xl mx-auto px-6 py-[3rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
            Growth
            <span
              className={`cormorant-garamond ps-2 ${
                isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"
              }`}
            >
              Navigators
            </span>
          </h1>
        </div>

        {/* Slider Section */}
        <div className="max-w-6xl mx-auto lg:px-0 mb-[0rem] ">
          <div className="slider-container">
            <Slider
              {...settings}
              className="overflow-hidden pb-[0rem] lg:h-[26rem] h-[26rem]"
            >
              {teamMembers.map((member) => (
                <div key={member._id} className="px-[0.6rem]">
                  <Link href={`/team/${encodeURIComponent(member.name)}`}>
                    <div
                      className={`h-full flex flex-col justify-center items-center px-5 lg:mx-0 mx-5 rounded-xl group cursor-pointer ${
                        isDarkMode
                          ? "border-2 border-blue-500"
                          : "border-2 border-blue-500"
                      }`}
                    >
                      <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-full h-full object-contain bg-white rounded-xl"
                          src={getImageSrc(member)}
                          alt={member.name}
                        />
                      </div>
                      <div className="flex flex-col py-5 w-full justify-center text-center items-center">
                        <h1 className="text-blue-500 font-semibold uppercase text-[1rem] leading-[1rem]">
                          {member.name}
                        </h1>
                        <p
                          className={`capitalize text-[0.9rem] ${
                            isDarkMode ? "text-white" : "text-gray-500"
                          }`}
                        >
                          {member.position}
                        </p>
                        <Link
                          href="/about"
                          className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500"
                        >
                          Say Hello👋{" "}
                          <span className="text-[1.50rem]">
                            <FaTelegram />
                          </span>
                        </Link>
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

export default Teams;