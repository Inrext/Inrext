"use client";
import React, { useEffect, useState } from "react";
import Slider, { CustomArrowProps } from "react-slick";
import { IoLocationOutline } from "react-icons/io5";
import { SlSizeFullscreen } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../content/ThemeContext";
import { propertyService } from "../../../services/propertyService";
import "aos/dist/aos.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Types
import type { Property } from "../../../services/propertyService";

const PropertiesFeaturedSlider = () => {
  const { isDarkMode } = useTheme();
  const [properties, setProperties] = useState<Property[]>([]);
  const [nextArrowStyle, setNextArrowStyle] = useState({});
  const [prevArrowStyle, setPrevArrowStyle] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);

  // Fetch properties
  useEffect(() => {
    propertyService
      .getAllProperties("", 1, 100, "true")
      .then((res) => setProperties(res.data || []));
  }, []);

  // Featured properties logic
  const parentFeatured = properties.filter(
    (p: any) =>
      p.isPublic === true &&
      p.isFeatured === true &&
      (!p.parentId || p.parentId === null)
  );
  const seen = new Set();
  const featuredProperties = parentFeatured.filter((p: any) => {
    if (!p._id) return false;
    if (seen.has(p._id)) return false;
    seen.add(p._id);
    return true;
  });

  // Responsive arrow styles
  useEffect(() => {
    function responsiveStyles(breakpoints: Record<string, any>) {
      if (typeof window === "undefined") return breakpoints.desktop;
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) return breakpoints.mobile;
      else if (windowWidth >= 768 && windowWidth < 1024) return breakpoints.tablet;
      else if (windowWidth >= 1024 && windowWidth < 1280) return breakpoints.laptop;
      else return breakpoints.desktop;
    }
    setNextArrowStyle(
      responsiveStyles({
        mobile: { marginTop: "9.9rem", right: "2.6rem", zIndex: 1 },
        tablet: { marginTop: "9.9rem", right: "1.8rem", zIndex: 1 },
        laptop: { marginTop: "-8.4rem", right: "1.9rem", zIndex: 1 },
        desktop: { marginTop: "11.9rem", right: "2.4rem", zIndex: 1 },
      })
    );
    setPrevArrowStyle(
      responsiveStyles({
        mobile: { marginTop: "9.9rem", left: "18.1rem", zIndex: 2 },
        tablet: { marginTop: "9.9rem", left: "42.2rem", zIndex: 2 },
        laptop: { marginTop: "-8.4rem", left: "47.9rem", zIndex: 2 },
        desktop: { marginTop: "11.9rem", left: "73.7rem", zIndex: 2 },
      })
    );
  }, []);

  const handleBeforeChange = (current: number, next: number) => setActiveSlide(next);

  function NextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", position: "absolute", ...nextArrowStyle }}
        onClick={onClick}
      />
    );
  }
  function PrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", position: "absolute", ...prevArrowStyle }}
        onClick={onClick}
      />
    );
  }

  // Utility: Normalize images
  const normalizeImages = (imgs: any[] = []): string[] =>
    Array.isArray(imgs) && imgs.length > 0
      ? imgs
          .map((img) => {
            if (typeof img === "string") return img;
            if (typeof img === "object" && img && "url" in img) return img.url;
            return undefined;
          })
          .filter((img): img is string => Boolean(img))
      : [];

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1200,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: handleBeforeChange,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 1, initialSlide: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div
      className={`overflow-hidden ${isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"}`}
    >
      <div className="overflow-hidden py-20" data-aos="fade-up" data-aos-duration="1200">
        <div className="flex flex-col gap-y-[0.6rem]">
          <div className="max-w-7xl mx-auto px-6 pb-2 flex flex-col justify-center items-center overflow-hidden">
            <h1 className="dm-serif-display text-center  text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
              featured
              <span className={`cormorant-garamond ps-2 pe-2 ${isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"}`}>
                Properties
              </span>
            </h1>
          </div>
          <div className="max-w-7xl mx-auto pt-0 lg:pb-0 flex flex-col justify-center items-center text-[1.1rem]">
            <p className={`raleway uppercase font-semibold lg:pb-0 pb-0 lg:text-2xl text-[1rem] text-center lg:px-0 px-5 ${isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"}`}>
              Your Dream Property is Just a Click Away – Start Your Search Today!
            </p>
          </div>
        </div>
        {/* Slider Section */}
        <div className="max-w-7xl mx-auto px-0 pt-0 pb-0 overflow-hidden">
          <div className="slider-container pb-12 overflow-hidden ps-0 pe-0">
            <Slider {...settings} className=" h-88 pt-10">
              {featuredProperties.map((property, index) => (
                <div
                  key={property._id || property.propertyName || property.projectName}
                  className="px-[0.8rem]"
                >
                  <Link
                    href={`/properties/${encodeURIComponent(
                      property.propertyName
                        ?.replace(/\s+/g, "-")
                        .replace(/-project$/i, "")
                        .toLowerCase() || ""
                    )}`}
                  >
                    <div
                      className="cursor-pointer relative h-48 flex flex-col justify-center items-center bg-cover bg-center transition-all duration-500 hover:scale-[1.05] rounded-lg"
                      style={{
                        backgroundImage: `url('${(() => {
                          const imgs = normalizeImages(property.images);
                          return imgs.length > 0 ? imgs[0] : "";
                        })()}')`,
                      }}
                    >
                      <div className="relative top-[6.8rem] bg-white p-4 rounded w-[16rem] flex flex-col gap-y-2.5">
                        <h1 className="capitalize text-black lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] lg:leading-5 md:leading-[1.1rem] leading-4 font-semibold flex items-center gap-x-0 ">
                          <span>{property.price}</span>
                        </h1>
                        <p className="capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-5 md:leading-[1.1rem] leading-4 flex items-center gap-x-0">
                          <IoLocationOutline />{" "}
                          <span>
                            {Array.isArray(property.location)
                              ? property.location[0].length > 15
                                ? property.location[0].substring(0, 15) + "..."
                                : property.location[0]
                              : typeof property.location === "string" && property.location.length > 15
                              ? property.location.substring(0, 15) + "..."
                              : property.location}
                          </span>
                        </p>
                        <div className="flex justify-between items-center mt-auto text-blue-500 font-medium">
                          <p className="flex items-center capitalize lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-5 md:leading-[1.1rem] leading-4 gap-x-2">
                            <SlSizeFullscreen />
                            <span>
                              {property.minSize || property.maxSize
                                ? `${property.minSize || ""}${property.maxSize ? ` - ${property.maxSize}` : ""}${property.sizeUnit ? ` ${property.sizeUnit}` : ""}`
                                : "—"}
                            </span>
                          </p>
                        </div>
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

export default PropertiesFeaturedSlider;
