"use client";
import React, { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from 'swiper/types';
import { useTheme } from "../content/ThemeContext";
import  Link  from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Image from "next/image";

const Events = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(2); // Start with center slide active
  const [activeIndex1, setActiveIndex1] = useState(2);
  const [activeIndex2, setActiveIndex2] = useState(2);
  const [activeIndex3, setActiveIndex3] = useState(2);
  const [activeIndex4, setActiveIndex4] = useState(2);

  const swiperRef1 = useRef<any>(null);
  const swiperRef2 = useRef<any>(null);
  const swiperRef3 = useRef<any>(null);
  const swiperRef4 = useRef<any>(null);
  const swiperRef5 = useRef<any>(null);

  const events = [
    {
      id: 1,
      title: "Estate Excellence Honors",
      image: "/images/Event images/Estate excellence award/DSC_9287.JPG",
      description: "Celebrating outstanding achievements in real estate"
    },
    {
      id: 2,
      title: "Estate Excellence Honors",
      image: "/images/Event images/Estate excellence award/DSC_9537.JPG",
      description: "Celebrating outstanding achievements in real estate"
    },
    {
      id: 3,
      title: "Estate Excellence Honors",
      image: "/images/Event images/Estate excellence award/DSC_0092.JPG",
      description: "Celebrating outstanding achievements in real estate"
    },
    {
      id: 4,
      title: "Estate Excellence Honors",
      image: "/images/Event images/Estate excellence award/DSC_9632.JPG",
      description: "Celebrating outstanding achievements in real estate"
    },
    {
      id: 5,
      title: "Estate Excellence Honors",
      image: "/images/Event images/Estate excellence award/DSC_9433.JPG",
      description: "Celebrating outstanding achievements in real estate"
    },
    {
      id: 6,
      title: "Estate Excellence Honors",
      image: "/images/Event images/Estate excellence award/DSC.jpg",
      description: "Celebrating outstanding achievements in real estate"
    }
  ];
  const events1 = [
    {
      id: 1,
      title: "Realtor's Meet",
      image: "/images/Event images/Mall of Noida/Z72_5785.JPG",
      description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 2,
      title: "Realtor's Meet",
      image: "/images/Event images/Mall of Noida/Z72_5817.JPG",
      description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 3,
      title: "Realtor's Meet",
      image: "/images/Event images/Mall of Noida/DSC_5824.JPG",
       description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 4,
      title: "Realtor's Meet",
      image: "/images/Event images/Mall of Noida/DSC_5835.JPG",
       description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 5,
      title: "Realtor's Meet",
      image: "/images/Event images/Mall of Noida/DSC_5821.JPG",
       description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 6,
      title: "Realtor's Meet",
      image: "/images/Event images/Mall of Noida/Z72_5831.JPG",
       description: "Connecting real estate professionals for collaboration"
    }
  ];
  const events2 = [
    {
      id: 1,
      title: "RE Network Summit",
      image: "/images/Event images/Lucknow image/02.jpg",
      description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 2,
      title: "RE Network Summit",
      image: "/images/Event images/Lucknow image/03.jpg",
      description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 3,
      title: "RE Network Summit",
      image: "/images/Event images/Lucknow image/09.jpg",
       description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 4,
      title: "RE Network Summit",
      image: "/images/Event images/Lucknow image/17.jpg",
       description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 5,
      title: "RE Network Summit",
      image: "/images/Event images/Lucknow image/23.jpg",
       description: "Connecting real estate professionals for collaboration"
    },
    {
      id: 6,
      title: "RE Network Summit",
      image: "/images/Event images/Lucknow image/33.jpg",
       description: "Connecting real estate professionals for collaboration"
    }
  ];
  const events3 = [
    {
      id: 1,
      title: "Power Brokers Assembly",
      image: "/images/Event images/Noida The Iconic tower/1T5A3517.JPG",
      description: "A premier networking meet for brokers shaping the future of real estate"
    },
    {
      id: 2,
      title: "Power Brokers Assembly",
      image: "/images/Event images/Noida The Iconic tower/1T5A3506.JPG",
      description: "A premier networking meet for brokers shaping the future of real estate"
    },
    {
      id: 3,
      title: "Power Brokers Assembly",
      image: "/images/Event images/Noida The Iconic tower/1T5A3556.JPG",
      description: "A premier networking meet for brokers shaping the future of real estate"
    },
    {
      id: 4,
      title: "Power Brokers Assembly",
      image: "/images/Event images/Noida The Iconic tower/1T5A3564.JPG",
      description: "A premier networking meet for brokers shaping the future of real estate"
    },
    {
      id: 5,
      title: "Power Brokers Assembly",
      image: "/images/Event images/Noida The Iconic tower/1T5A3578.JPG",
      description: "A premier networking meet for brokers shaping the future of real estate"
    },
    {
      id: 6,
      title: "Power Brokers Assembly",
      image: "/images/Event images/Noida The Iconic tower/1T5A3506.JPG",
      description: "A premier networking meet for brokers shaping the future of real estate"
    }
  ];
  const events4 = [
    {
      id: 1,
      title: "Investor's Meet",
      image: "/images/Event images/Patna/image 1.jpeg",
      description: "For the Few Who See Beyond the Blueprint."
    },
    {
      id: 2,
      title: "Investor's Meet",
      image: "/images/Event images/Patna/image 2.jpeg",
      description: "For the Few Who See Beyond the Blueprint."
    },
    {
      id: 3,
      title: "Investor's Meet",
      image: "/images/Event images/Patna/image 3.jpeg",
      description: "For the Few Who See Beyond the Blueprint."
    },
    {
      id: 4,
      title: "Investor's Meet",
      image: "/images/Event images/Patna/image 4.jpeg",
      description: "For the Few Who See Beyond the Blueprint."
    },
    {
      id: 5,
      title: "Investor's Meet",
      image: "/images/Event images/Patna/image 5.jpeg",
      description: "For the Few Who See Beyond the Blueprint."
    },
    {
      id: 6,
      title: "Investor's Meet",
      image: "/images/Event images/Patna/image 6.jpeg",
      description: "For the Few Who See Beyond the Blueprint."
    }
  ];

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleSlideChange1 = (swiper: SwiperType) => {
    setActiveIndex1(swiper.realIndex);
  };
  
  const handleSlideChange2 = (swiper: SwiperType) => {
    setActiveIndex2(swiper.realIndex);
  };

  const handleSlideChange3 = (swiper: SwiperType) => {
    setActiveIndex3(swiper.realIndex);
  };

  const handleSlideChange4 = (swiper: SwiperType) => {
    setActiveIndex4(swiper.realIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div
        className={`lg:h-[100vh] h-[50vh] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        {/* Image with black overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/Event images/BG image.jpg"
            alt="Events background"
            className="w-full h-full object-cover"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col mt-[15rem] justify-center items-center lg:gap-y-[3rem] gap-y-[1.5rem] p-4">
          <h1
            className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
              isDarkMode ? "text-blue-500" : "text-white"
            }`}
          > From grand gatherings<br /> to exclusive meetups
          </h1>
          <p className="raleway text-white text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.6rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase">
            Your Dream Property is Just a Click Away – Start Your Search Today!
          </p>
          {/* <Link
            to="/properties"
            className="w-fit text-white px-6 uppercase text-[0.6rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            EXPLORE OUR LISTING
          </Link> */}
        </div>
      </div>

      {/* Estate Excellence Honors Carousel */}
      <div
        className={`flex flex-col justify-center items-center w-full pt-20 ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full max-w-6xl px-4 relative">
          <Swiper
          ref={swiperRef1}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            initialSlide={activeIndex}
            spaceBetween={-12}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: -12,
              depth: 100,
              modifier: 2,
              slideShadows: true,
              scale: 1,
            }}
            navigation={{
              nextEl: '.custom-next-1',
              prevEl: '.custom-prev-1',
            }}
            breakpoints={{
              640: {
                spaceBetween: -20,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.8,
                },
              },
              768: {
                spaceBetween: -25,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.85,
                },
              },
              1024: {
                spaceBetween: -12,
                coverflowEffect: {
                  stretch: -12,
                  scale: 1,
                },
              },
            }}
            onSlideChange={handleSlideChange}
            modules={[EffectCoverflow, Navigation]}
            className="mySwiper"
          >
            {events.map((event) => (
              <SwiperSlide
                key={event.id}
                className="!w-[130px] !h-[210px] lg:!w-[300px] lg:!h-[400px] md:!w-[300px] md:!h-[350px] rounded-lg overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[0rem] md:bottom-[0rem] bottom-[0rem] lg:left-[65rem] md:left-[39rem] left-[15.8rem]"></div> */}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-[-0.4rem] lg:left-[66.4rem] md:left-[40.4rem] left-[17.2rem] lg:right-[1.8rem] md:right-[3.8rem] right-[1.5rem] z-1 flex justify-between transform -translate-y-1/2  px-[0rem]">
            <button
            onClick={() => swiperRef1.current?.swiper.slidePrev()}
              aria-label="Previous slide"
              className="swiper-button-prev flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowBack size={18} />
            </button>
            <button
            onClick={() => swiperRef1.current?.swiper.slideNext()}
              aria-label="Next slide"
              className="swiper-button-next flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowForward size={18} />
            </button>
          </div>
        </div>

        {/* Active Event Info */}
        <div className="relative z-1 mt-[-4.5rem] md:mt-5 lg:mt-0 md:bottom-[10rem] lg:w-full lg:max-w-[28rem] md:max-w-[23rem] max-w-[10rem] text-center ">
          <h1 className="uppercase raleway font-extrabold text-[0.8rem] lg:text-[2.5rem] md:text-[2.1rem] md:leading-[2.2rem] leading-[0.8rem] text-white bg-black/70 p-2 rounded-lg flex flex-col items-center">
            {events[activeIndex % events.length].title}
            <span className="lg:text-[0.9rem] md:text-[0.9rem] text-[0.3rem] font-extralight capitalize lg:leading-5 md:leading-4 leading-1.5 lg:pt-2 md:pt-2 pt-1">
            {events[activeIndex % events.length].description}
            </span>
          </h1>
        </div>
      </div>
      {/* Realtor's Meet Carousel */}
      <div
        className={`flex flex-col justify-center items-center w-full pt-20 ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full max-w-6xl px-4 relative">
          <Swiper
          ref={swiperRef2}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            initialSlide={activeIndex}
            spaceBetween={-12}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: -12,
              depth: 100,
              modifier: 2,
              slideShadows: true,
              scale: 1,
            }}
            navigation={{
              nextEl: '.custom-next-2',
              prevEl: '.custom-prev-2',
            }}
            breakpoints={{
              640: {
                spaceBetween: -20,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.8,
                },
              },
              768: {
                spaceBetween: -25,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.85,
                },
              },
              1024: {
                spaceBetween: -12,
                coverflowEffect: {
                  stretch: -12,
                  scale: 1,
                },
              },
            }}
            onSlideChange={handleSlideChange1}
            modules={[EffectCoverflow, Navigation]}
            className="mySwiper"
          >
            {events1.map((event) => (
              <SwiperSlide
                key={event.id}
                className="!w-[130px] !h-[210px] lg:!w-[300px] lg:!h-[400px] md:!w-[300px] md:!h-[350px] rounded-lg overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[0rem] md:bottom-[0rem] bottom-[0rem] lg:left-[65rem] md:left-[39rem] left-[15.8rem]"></div> */}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-[-0.4rem] lg:left-[66.4rem] md:left-[40.4rem] left-[17.2rem] lg:right-[1.8rem] md:right-[3.8rem] right-[1.5rem] z-1 flex justify-between transform -translate-y-1/2  px-[0rem]">
          
            <button
            onClick={() => swiperRef2.current?.swiper.slidePrev()}
              aria-label="Previous slide"
              className="swiper-button-prev flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowBack size={18} />
            </button>
            <button
             onClick={() => swiperRef2.current?.swiper.slideNext()}
              aria-label="Next slide"
              className="swiper-button-next flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowForward size={18} />
            </button>
          </div>
        </div>

        {/* Active Event Info */}
        <div className="relative z-1 mt-[-4.5rem] md:mt-5 lg:mt-8 md:bottom-[10rem] lg:w-full lg:max-w-[28rem] md:max-w-[23rem] max-w-[10rem] text-center">
          <h1 className="uppercase raleway font-extrabold text-[0.8rem] lg:text-[2.5rem] md:text-[2.1rem] md:leading-[2.2rem] leading-[0.8rem] text-white bg-black/70 p-2 rounded-lg flex flex-col items-center">
            {events1[activeIndex1 % events1.length].title}
            <span className="lg:text-[0.9rem] md:text-[0.9rem] text-[0.3rem] font-extralight capitalize lg:leading-5 md:leading-4 leading-1.5 lg:pt-2 md:pt-2 pt-1 ">
            {events1[activeIndex1 % events1.length].description}
            </span>
          </h1>
        </div>
      </div>
      {/* RE Network Summit Carousel */}
      <div
        className={`flex flex-col justify-center items-center w-full pt-20 ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full max-w-6xl px-4 relative">
          <Swiper
          ref={swiperRef3}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            initialSlide={activeIndex}
            spaceBetween={-12}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: -12,
              depth: 100,
              modifier: 2,
              slideShadows: true,
              scale: 1,
            }}
            navigation={{
              nextEl: '.custom-next-3',
              prevEl: '.custom-prev-3',
            }}
            breakpoints={{
              640: {
                spaceBetween: -20,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.8,
                },
              },
              768: {
                spaceBetween: -25,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.85,
                },
              },
              1024: {
                spaceBetween: -12,
                coverflowEffect: {
                  stretch: -12,
                  scale: 1,
                },
              },
            }}
            onSlideChange={handleSlideChange2}
            modules={[EffectCoverflow, Navigation]}
            className="mySwiper"
          >
            {events2.map((event) => (
              <SwiperSlide
                key={event.id}
                className="!w-[130px] !h-[210px] lg:!w-[300px] lg:!h-[400px] md:!w-[300px] md:!h-[350px] rounded-lg overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[0rem] md:bottom-[0rem] bottom-[0rem] lg:left-[65rem] md:left-[39rem] left-[15.8rem]"></div> */}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-[-0.4rem] lg:left-[66.4rem] md:left-[40.4rem] left-[17.2rem] lg:right-[1.8rem] md:right-[3.8rem] right-[1.5rem] z-1 flex justify-between transform -translate-y-1/2  px-[0rem]">
          
            <button
            onClick={() => swiperRef3.current?.swiper.slidePrev()}
              aria-label="Previous slide"
              className="swiper-button-prev flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowBack size={18} />
            </button>
            <button
             onClick={() => swiperRef3.current?.swiper.slideNext()}
              aria-label="Next slide"
              className="swiper-button-next flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowForward size={18} />
            </button>
          </div>
        </div>

        {/* Active Event Info */}
        <div className="relative z-1 mt-[-4.5rem] md:mt-5 lg:mt-0 md:bottom-[10rem] lg:w-full lg:max-w-[28rem] md:max-w-[23rem] max-w-[10rem] text-center ">
          <h1 className="uppercase raleway font-extrabold text-[0.8rem] lg:text-[2.5rem] md:text-[2.1rem] md:leading-[2.2rem] leading-[0.8rem] text-white bg-black/70 p-2 rounded-lg flex flex-col items-center">
            {events2[activeIndex2 % events2.length].title}
            <span className="lg:text-[0.9rem] md:text-[0.9rem] text-[0.3rem] font-extralight capitalize lg:leading-5 md:leading-4 leading-1.5 lg:pt-2 md:pt-2 pt-1">
            {events2[activeIndex2 % events2.length].description}
            </span>
          </h1>
        </div>
      </div>
      {/* Power Brokers Assembly Carousel */}
      <div
        className={`flex flex-col justify-center items-center w-full pt-20 ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full max-w-6xl px-4 relative">
          <Swiper
          ref={swiperRef4}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            initialSlide={activeIndex}
            spaceBetween={-12}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: -12,
              depth: 100,
              modifier: 2,
              slideShadows: true,
              scale: 1,
            }}
            navigation={{
              nextEl: '.custom-next-4',
              prevEl: '.custom-prev-4',
            }}
            breakpoints={{
              640: {
                spaceBetween: -20,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.8,
                },
              },
              768: {
                spaceBetween: -25,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.85,
                },
              },
              1024: {
                spaceBetween: -12,
                coverflowEffect: {
                  stretch: -12,
                  scale: 1,
                },
              },
            }}
            onSlideChange={handleSlideChange3}
            modules={[EffectCoverflow, Navigation]}
            className="mySwiper"
          >
            {events3.map((event) => (
              <SwiperSlide
                key={event.id}
                className="!w-[130px] !h-[210px] lg:!w-[300px] lg:!h-[400px] md:!w-[300px] md:!h-[350px] rounded-lg overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[0rem] md:bottom-[0rem] bottom-[0rem] lg:left-[65rem] md:left-[39rem] left-[15.8rem]"></div> */}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-[-0.4rem] lg:left-[66.4rem] md:left-[40.4rem] left-[17.2rem] lg:right-[1.8rem] md:right-[3.8rem] right-[1.5rem] z-1 flex justify-between transform -translate-y-1/2  px-[0rem]">
          
            <button
            onClick={() => swiperRef4.current?.swiper.slidePrev()}
              aria-label="Previous slide"
              className="swiper-button-prev flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowBack size={18} />
            </button>
            <button
             onClick={() => swiperRef4.current?.swiper.slideNext()}
              aria-label="Next slide"
              className="swiper-button-next flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowForward size={18} />
            </button>
          </div>
        </div>

        {/* Active Event Info */}
        <div className="relative z-1 mt-[-4.5rem] md:mt-5 lg:mt-0 md:bottom-[10rem] lg:w-full lg:max-w-[28rem] md:max-w-[23rem] max-w-[10rem] text-center">
          <h1 className="uppercase raleway font-extrabold text-[0.8rem] lg:text-[2.5rem] md:text-[2.1rem] md:leading-[2.2rem] leading-[0.8rem] text-white bg-black/70 p-2 rounded-lg flex flex-col items-center">
            {events3[activeIndex3 % events3.length].title}
            <span className="lg:text-[0.9rem] md:text-[0.9rem] text-[0.3rem] font-extralight capitalize lg:leading-5 md:leading-4 leading-1.5 lg:pt-2 md:pt-2 pt-1">
            {events3[activeIndex3 % events3.length].description}
            </span>
          </h1>
        </div>
      </div>
      {/* Investor's Meet Carousel */}
      <div
        className={`flex flex-col justify-center items-center w-full pt-20 ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="w-full max-w-6xl px-4 relative">
          <Swiper
          ref={swiperRef5}
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            initialSlide={activeIndex}
            spaceBetween={-12}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: -12,
              depth: 100,
              modifier: 2,
              slideShadows: true,
              scale: 1,
            }}
            navigation={{
              nextEl: '.custom-next-5',
              prevEl: '.custom-prev-5',
            }}
            breakpoints={{
              640: {
                spaceBetween: -20,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.8,
                },
              },
              768: {
                spaceBetween: -25,
                coverflowEffect: {
                  stretch: 0,
                  scale: 0.85,
                },
              },
              1024: {
                spaceBetween: -12,
                coverflowEffect: {
                  stretch: -12,
                  scale: 1,
                },
              },
            }}
            onSlideChange={handleSlideChange4}
            modules={[EffectCoverflow, Navigation]}
            className="mySwiper"
          >
            {events4.map((event) => (
              <SwiperSlide
                key={event.id}
                className="!w-[130px] !h-[210px] lg:!w-[300px] lg:!h-[400px] md:!w-[300px] md:!h-[350px] rounded-lg overflow-hidden shadow-xl transition-all duration-300"
              >
                <div className="relative w-full h-full group">
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-bold text-lg">{event.title}</h3>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div> */}
                </div>
              </SwiperSlide>
            ))}
            {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[0rem] md:bottom-[0rem] bottom-[0rem] lg:left-[65rem] md:left-[39rem] left-[15.8rem]"></div> */}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className="absolute bottom-[-0.4rem] lg:left-[66.4rem] md:left-[40.4rem] left-[17.2rem] lg:right-[1.8rem] md:right-[3.8rem] right-[1.5rem] z-1 flex justify-between transform -translate-y-1/2  px-[0rem]">
          
            <button
            onClick={() => swiperRef5.current?.swiper.slidePrev()}
              aria-label="Previous slide"
              className="swiper-button-prev flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowBack size={18} />
            </button>
            <button
             onClick={() => swiperRef5.current?.swiper.slideNext()}
              aria-label="Next slide"
              className="swiper-button-next flex items-center justify-center !text-white bg-blue-500 rounded-full p-0.5 hover:bg-blue-600 transition cursor-pointer"
            >
              <IoIosArrowForward size={18} />
            </button>
          </div>
        </div>

        {/* Active Event Info */}
        <div className="relative z-1 mt-[-4.5rem] md:mt-5 lg:mt-8 md:bottom-[10rem] lg:w-full lg:max-w-[28rem] md:max-w-[23rem] max-w-[10rem] text-center">
          <h1 className="uppercase raleway font-extrabold text-[0.8rem] lg:text-[2.5rem] md:text-[2.1rem] md:leading-[2.2rem] leading-[0.8rem] text-white bg-black/70 p-2 rounded-lg flex flex-col items-center">
            {events4[activeIndex4 % events4.length].title}
            <span className="lg:text-[0.9rem] md:text-[0.9rem] text-[0.3rem] font-extralight capitalize lg:leading-5 md:leading-4 leading-1.5 lg:pt-2 md:pt-2 pt-1">
            {events4[activeIndex4 % events4.length].description}
            </span>
          </h1>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div
        className={`overflow-hidden ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div
          className="overflow-hidden"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="max-w-7xl mx-auto px-6 py-[3rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
            What’s
            <span className={`cormorant-garamond ps-2 ${isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"}`}>
              Next
            </span>
            ?
          </h1>
        </div>

          <div className="max-w-6xl lg:px-0 px-5 mx-auto  lg:pt-[0rem] pt-[0rem] text-center lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ">
            <p className={isDarkMode ? "text-white" : "text-gray-900"}>
              Exciting things are on the way! <br />
              Stay connected to get updates on our future events
            </p>
          </div>
          <div className="max-w-7xl mx-auto px-6 pt-[3rem] pb-[5rem] flex flex-col justify-center items-center overflow-hidden">
            <Link
              href="/"
              className="w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              JOIN US NEXT TIME
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
