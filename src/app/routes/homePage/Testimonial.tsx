"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "@/app/content/ThemeContext";
import Image from "next/image";

type TestimonialItem = {
  name: string;
  company: string;
  feedback: string;
  image: string;
};

const testimonials: TestimonialItem[] = [
  {
    name: "Rishi Agrawal",
    company: "Acme Corp",
    feedback:
      " Inrext provided clear guidance, helping me invest in a successful commercial property. Transparent and reliable service! Thank You So Much!",
    image: "/images/logos/persono1.jpg",
  },
  {
    name: "Manoj Sukla",
    company: "Beta Solutions",
    feedback:
      "Inrext's team was patient and professional, guiding me step-by-step through real estate investing. Perfect start to my journey.",
    image: "/images/logos/persono2.webp",
  },
  {
    name: "Rajveer Singh",
    company: "Gamma Group",
    feedback:
      "Inrext's targeted campaigns delivered high-quality leads, helping us hit our sales goal faster than expected. Highly effective strategy and execution",
    image: "/images/logos/persono3.jpg",
  },
  {
    name: "Priya Sharma",
    company: "Delta Ventures",
    feedback:
      "Inrext excels in real estate with deep market knowledge, legal expertise, and proactive, client-focused service. Top-tier professionals.",
    image: "/images/logos/persono4.jpg",
  },
  {
    name: "Yash Singh",
    company: "Stark Industries",
    feedback:
    "Inrext made the entire property acquisition process seamless. Their attention to detail and constant communication gave me complete peace of mind.",
    image: "/images/logos/persono5.jpg",
  },
];

const Testimonial: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const { isDarkMode } = useTheme();

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 1, // only one testimonial visible
    autoplay: true,
    autoplaySpeed: 6000,
    beforeChange: (_: number, next: number) => setActiveSlide(next),
  };

  // helper to get circular index
  const getIndex = (index: number) => (index + testimonials.length) % testimonials.length;

  return (
    <div
      className={`py-12 ${
        isDarkMode ? "bg-black" : "bg-blue-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 pt-[5rem] pb-[3rem] flex flex-col justify-center items-center overflow-hidden">
        <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
          Our
          <span
            className={`cormorant-garamond ps-3 pe-3 ${
              isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
            }`}
          >
            Clients
          </span>
          Say It Best
        </h1>
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Feedback Box */}
        <div className="relative bg-white rounded-lg shadow-lg px-8 py-5">
          <div className="text-[2rem] text-blue-300 absolute left-4 top-2 select-none">
            “
          </div>
          <p className="text-gray-800 lg:text-[0.9rem] md:text-[0.9rem] text-[0.7rem] lg:leading-[1.4rem] md:leading-[1.1rem] leading-[1rem]">
            {testimonials[activeSlide].feedback}
          </p>
          {/* Bubble arrow */}
          <div className="absolute left-1/2 -bottom-4 transform -translate-x-1/2 
            w-0 h-0 border-l-8 border-r-8 border-t-8 
            border-l-transparent border-r-transparent border-t-white"></div>
        </div>

        {/* Images Row + Name/Company beside active image */}
        <div className="mt-10 flex items-center justify-center gap-40 md:gap-20 gap-6">
          {/* 2 left (hidden on mobile) */}
          <div className="hidden md:block">
            <Image
              src={testimonials[getIndex(activeSlide - 2)].image || "/images/placeholder.png"}
              alt=""
              width={72}
              height={72}
              className="w-18 aspect-square rounded-full object-cover opacity-50"
              style={{ objectFit: "cover" }}
              sizes="72px"
              priority
            />
          </div>
          <div className="hidden md:block">
            <Image
              src={testimonials[getIndex(activeSlide - 1)].image || "/images/placeholder.png"}
              alt=""
              width={64}
              height={64}
              className="w-16 aspect-square rounded-full object-cover opacity-70"
              style={{ objectFit: "cover" }}
              sizes="64px"
              priority
            />
          </div>

          {/* Active image + Name/Company beside it */}
          <div className="flex flex-col md:flex-row items-center md:mr-[6rem] gap-3 md:gap-5">
            <Image
              src={testimonials[activeSlide].image || "/images/placeholder.png"}
              alt={testimonials[activeSlide].name}
              width={96}
              height={96}
              className="w-24 aspect-square rounded-full object-cover border-3 border-blue-500 shadow-lg"
              style={{ objectFit: "cover" }}
              sizes="96px"
              priority
            />
            <div className="flex flex-col items-center md:items-start">
              <div className={`font-semibold lg:text-[1.3rem] md:text-[1.2rem] text-[1rem] whitespace-nowrap ${isDarkMode ? "text-blue-100" : "text-blue-500"}`}>
                {testimonials[activeSlide].name}
              </div>
              <div className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.7rem] whitespace-nowrap ${isDarkMode ? "text-white" : "text-gray-700"}`}>
                {testimonials[activeSlide].company}
              </div>
            </div>
          </div>

          {/* 2 right (hidden on mobile) */}
          <div className="hidden md:block">
            <Image
              src={testimonials[getIndex(activeSlide + 1)].image || "/images/placeholder.png"}
              alt=""
              width={64}
              height={64}
              className="w-16 aspect-square rounded-full object-cover opacity-70"
              style={{ objectFit: "cover" }}
              sizes="64px"
              priority
            />
          </div>
          <div className="hidden md:block">
            <Image
              src={testimonials[getIndex(activeSlide + 2)].image || "/images/placeholder.png"}
              alt=""
              width={56}
              height={56}
              className="w-14 aspect-square rounded-full object-cover opacity-50"
              style={{ objectFit: "cover" }}
              sizes="56px"
              priority
            />
          </div>
        </div>
      </div>

      {/* Hidden Slider (controls autoplay + active index) */}
      <div style={{ display: "none" }}>
        <Slider {...settings}>
          {testimonials.map((_, idx) => (
            <div key={idx}></div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;