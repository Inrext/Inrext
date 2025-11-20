"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import { CustomArrowProps } from "react-slick";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaBed } from "react-icons/fa6";
import { FiDroplet } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WhyChooseUs from "../routes/WhyChooseUs/WhyChooseUs";
import Link from "next/link";
import { useTheme } from "../content/ThemeContext";
import Image from "next/image";

 
import { propertyService } from "../../services/propertyService";

type Property = {
    images?: any;
  _id?: string;
  slug?: string;
  projectName: string;
  builderName: string;
  description: string;
  location: string;
  propertyType: string;
  propertyName: string;
  price: string;
  minSize: string;
};

const Properties = () => {
  const { isDarkMode } = useTheme();

  // State for fetched properties
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  const [activeSlide, setActiveSlide] = useState(0);
  const [nextArrowStyle, setNextArrowStyle] = useState({});
  const [prevArrowStyle, setPrevArrowStyle] = useState({});

  const hasFetched = React.useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setLoading(true);
    propertyService.getAllProperties('', 1, 100, "true")
      .then((res) => {
        setProperties(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch properties");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      once: true,
    });

    // Set arrow styles on client only
    function responsiveStyles(breakpoints: Record<string, any>) {
      if (typeof window === "undefined") {
        return breakpoints.desktop;
      }
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

  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
  };

  function NextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...nextArrowStyle,
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...prevArrowStyle,
        }}
        onClick={onClick}
      />
    );
  }

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
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProperties = properties.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(properties.length / cardsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setGradientPos({ x, y });
  };

  return (
    <>
      <div
        className={`lg:h-[100vh] h-[50vh] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        {/* Image with black overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/properties.jpg"
            alt=""
            fill
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center lg:gap-y-[3rem] gap-y-[1.5rem] p-4">
          <h1
            className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
              isDarkMode ? "text-blue-500" : "text-white"
            }`}
          >
            Find Your Dream <br /> Property
          </h1>
          <p className="raleway text-white text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.6rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase">
            Your Dream Property is Just a Click Away – Start Your Search Today!
          </p>
          
        </div>
      </div>
      
      <div
        className={`overflow-hidden  ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div
          className="overflow-hidden py-[5rem]"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="flex flex-col gap-y-[0.6rem]">
            <div className="max-w-7xl mx-auto px-6 pb-[0.5rem] flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
                featured
                <span
                  className={`cormorant-garamond ps-2 pe-2 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Properties
                </span>
              </h1>
            </div>
            <div className="max-w-7xl mx-auto pt-[0rem] lg:pb-[0rem] flex flex-col justify-center items-center text-[1.1rem]">
              <p
                className={`raleway uppercase font-semibold lg:pb-[0rem] pb-[0rem] lg:text-2xl text-[1rem] text-center lg:px-0 px-5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Your Dream Property is Just a Click Away – Start Your Search
                Today!
              </p>
            </div>
          </div>
          {/* Slider Section */}
          <div className="max-w-7xl mx-auto px-0 pt-[0rem] pb-[0rem] overflow-hidden">
            <div className="slider-container pb-[3rem] overflow-hidden ps-0 pe-[0rem]">
              <Slider {...settings} className=" h-[22rem] pt-[2.5rem]">
                {currentProperties.map((properties, index) => (
                  <div key={properties._id || properties.propertyName || properties.projectName} className="px-[0.8rem]">
                    <Link
                      href={`/properties/${encodeURIComponent(
                        properties.propertyName.replace(/\s+/g, "-").replace(/-project$/i, '').toLowerCase()
                      )}`}
                    >
                      <div
                        className="cursor-pointer relative h-[12rem] flex flex-col justify-center items-center bg-cover bg-center transition-all duration-500 hover:scale-[1.05] rounded-lg"
                        style={{
                          backgroundImage: `url('${Array.isArray(properties.images) && properties.images.length > 0 ? (properties.images[0].url || properties.images[0]) : ''}')`,
                        }}
                      >
                        <div className="relative top-[6.8rem] bg-white p-4 rounded w-[16rem] flex flex-col gap-y-2.5">
                          <h1 className="capitalize text-black lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] font-semibold flex items-center gap-x-0 ">
                            <MdOutlineCurrencyRupee />
                            <span>{properties.price}</span>
                          </h1>
                          <p className="capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] flex items-center gap-x-0">
                            <IoLocationOutline />{" "}
                           
                            <span>
                              {Array.isArray(properties.location)
                                ? properties.location[0].length > 15
                                  ? properties.location[0].substring(0, 15) +
                                    "..."
                                  : properties.location[0]
                                : properties.location.length > 15
                                ? properties.location.substring(0, 15) + "..."
                                : properties.location}
                            </span>
                          </p>
                          <div className="flex items-center justify-between text-[1rem]">
                            <p className="capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] flex items-center gap-x-2">
                              <SlSizeFullscreen className="" />{" "}
                              { <span>{properties.minSize}</span>  }
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
         <div
          className="overflow-hidden pb-[3rem]"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="flex flex-col gap-y-[0.6rem]">
            <div className="max-w-7xl mx-auto px-6 pb-[0.5rem] flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
                exclusive
                <span
                  className={`cormorant-garamond ps-2 pe-2 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Listing
                </span>
              </h1>
            </div>
            <div className="max-w-7xl mx-auto pt-[0rem] lg:pb-[0rem] flex flex-col justify-center items-center text-[1.1rem]">
              <p
                className={`raleway uppercase font-semibold lg:pb-[0rem] pb-[0rem] lg:text-2xl text-[1rem] text-center lg:px-0 px-5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Explore, Compare, and Choose from the Best Real Estate Listings.
              </p>
            </div>
          </div>
          {/* --------- */}
          <div className="max-w-7xl mx-auto lg:px-6 px-2 py-[5rem] ">
            <div className="grid lg:grid-cols-2 grid-cols-1  lg:justify-normal justify-center gap-[3.5rem]">
              {currentProperties.map((properties, index) => (
                <div
                  key={properties._id || properties.propertyName || properties.projectName}
                  className="w-full flex justify-center overflow-hidden lg:description rounded-xl"
                >
                  <Link
                    href={`/properties/${encodeURIComponent(
                      properties.propertyName.replace(/\s+/g, "-").replace(/-project$/i, '').toLowerCase()
                    )}`}
                    className={`flex p-2 lg:gap-2.5 md:gap-2.5 gap-4 lg:description rounded-xl overflow-hidden ${
                      index % 4 < 2 ? "flex-row" : "flex-row-reverse"
                    } hover:scale-105 transition-transform duration-300`}
                  >
                    {/* Image */}
                    <div className="lg:w-[15rem] md:w-[15rem] w-[12rem] lg:h-[15rem] md:h-[15rem] h-[12rem] ">
                      <Image
                        src={Array.isArray(properties.images) && properties.images.length > 0 ? (properties.images[0].url || properties.images[0]) : '/images/placeholder.png'}
                        className="w-full h-full lg:description rounded-xl object-cover"
                        alt=""
                        width={240}
                        height={240}
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 240px"
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div className="relative lg:w-[20.9rem] md:w-[20.9rem] w-[10rem] lg:py-5 md:py-5 lg:px-5 flex flex-col h-full">
                      <div className="flex flex-col gap-y-3">
                        <h1
                          className={`capitalize text-black lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] font-semibold ${
                            isDarkMode
                              ? "text-white backdrop-blur-md"
                              : "text-black"
                          }`}
                        >
                          {properties.projectName || properties.propertyName}
                        </h1>
                        <p
                          className={`capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] font-light ${
                            isDarkMode
                              ? "text-white backdrop-blur-md"
                              : "text-gray-700"
                          }`}
                        >
                          {/* {properties.description} */}
                          {properties.description.length > 100
                            ? properties.description.substring(0, 100) + "..."
                            : properties.description}
                        </p>
                      </div>
                      <div className=" relative lg:bottom-[-2.5rem] md:bottom-[-5.8rem] bottom-[-1.2rem] left-0 right-0 flex flex-col gap-y-2.5 lg:pt-3 md:pt-3 pt-2">
                        <div className="flex justify-between mt-auto items-center text-blue-500 font-medium">
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem]">
                            <SlSizeFullscreen className="" />
                           </p>
                        </div>
                        <div className="flex flex-wrap justify-between mt-auto items-center text-blue-500 font-medium">
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem]">
                            <IoLocationOutline />
                            <span>
                              <span>
                                {Array.isArray(properties.location)
                                  ? properties.location[0].length > 15
                                    ? properties.location[0].substring(0, 15) +
                                      "..."
                                    : properties.location[0]
                                  : properties.location.length > 15
                                  ? properties.location.substring(0, 15) + "..."
                                  : properties.location}
                              </span>
                            </span>
                          </p>
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem]">
                            <MdOutlineCurrencyRupee />
                            <span>{properties.price}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 w-6 h-6 flex items-center rounded-full ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronLeft />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 w-6 h-6 flex items-center rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        <div
          className="overflow-hidden lg: py-[0rem]"
          data-aos="fade-up"
          data-aos-duration="1200"
          onMouseMove={handleMouseMove}
          style={{
            background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(59,130,246,0.7), transparent 20%)`,
            transition: "background-position 0.1s ease",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center overflow-hidden py-[3rem]">
            <div className="max-w-4xl mx-auto   ">
              <p
                className={`uppercase raleway font-semibold text-center lg:text-[1.3rem] md:text-[1.2rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem] ${
                  isDarkMode ? "text-white backdrop-blur-md " : "text-black"
                }`}
              >
                Start Investing Like a Pro – Here’s Your
              </p>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-[0rem] lg:mt-[1rem] flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] uppercase">
                step by step
                <span
                  className={`cormorant-garamond  ps-2.5 pe-1.5 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Guide
                </span>
              </h1>
            </div>
          </div>
          <div className="w-[0rem] h-[0rem] absolute pointer-events-none" />
          <div className="max-w-7xl mx-auto lg:px-6 px-2 py-[5rem] flex justify-around items-center relative">
            <div className="absolute lg:left-[6.2rem] md:left-[2.5rem] left-[0.8rem] lg:right-[6.2rem] md:right-[2.5rem] right-[0.8rem] top-1/2 h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Search & <br /> Explore
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Shortlist & <br /> Compare
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Schedule a<br /> Visit
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Consult &<br /> Negotiate
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Secure Your
                <br /> Deal
              </p>
            </div>
          </div>
          <div className="w-[0rem] h-[0rem] absolute  pointer-events-none" />
        </div>
      </div>
       <div>
        <WhyChooseUs />
      </div>
    </>
  );
};

export default Properties;
