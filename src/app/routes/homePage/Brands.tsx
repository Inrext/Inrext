// Brands.jsx
import React from "react";
import { useTheme } from "../../content/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const Brands = () => {
  const { isDarkMode } = useTheme();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 9,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000, // Increased speed for smoother continuous effect
    autoplaySpeed: 0, // Set to 0 for continuous scrolling
    cssEase: "linear", // Linear easing for constant speed
    pauseOnHover: false, // Prevent pausing on hover for continuous motion
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Array of brand logos for cleaner rendering
  const brandLogos = Array.from({ length: 25 }, (_, i) => i + 2); // 2 to 26

  return (
    <div className={`${isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"}`}>
      <div className="overflow-hidden py-[3rem]">
        <div className="max-w-7xl mx-auto px-6 py-[0rem] pb-[0rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display pb-[0.6rem] lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] text-center text-blue-500 lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
            Our
            <span
              className={`cormorant-garamond ps-2 ${
                isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"
              }`}
            >
              Trusted Allies
            </span>{" "}
            <br />
            In Shaping Skylines
          </h1>
        </div>
        
        {/* Slider Section */}
        <div className="w-full pt-[3rem]">
          <div className="slider-container custom-slider">
            <Slider
              {...settings}
              className={`overflow-hidden ${
                isDarkMode ? "bg-transparent backdrop-blur-md" : "bg-blue-500"
              }`}
            >
              {brandLogos.map((logoNum) => (
                <div key={logoNum} className="py-2">
                  <div className={isDarkMode ? "bg-transparent" : "bg-transparent"}>
                    <Image
                      className="w-[7rem] h-[2.5rem] object-contain mx-auto"
                      src={`/images/BrandsLogo/${logoNum}.png`}
                      alt={`Brand ${logoNum}`}
                      width={112}
                      height={40}
                      style={{ objectFit: "contain" }}
                      sizes="112px"
                      priority
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
