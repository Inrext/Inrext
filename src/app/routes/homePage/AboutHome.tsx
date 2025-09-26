// AboutHome.jsx
import React, { useEffect, useState } from "react";
import { useTheme } from "../../content/ThemeContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutHome = () => {
  const { isDarkMode } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);

  // --- Add state for arrow styles ---
  const [arrowStyles, setArrowStyles] = useState({
    next: { marginTop: "4.8rem", right: "2.9rem", zIndex: 1, position: "absolute", display: "block" },
    prev: { marginTop: "4.8rem", left: "17.8rem", zIndex: 1, position: "absolute", display: "block" },
  });

  useEffect(() => {
    // Only run on client
    if (typeof window !== "undefined") {
      let next, prev;
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        next = { marginTop: "4.8rem", right: "2.9rem", zIndex: 1, position: "absolute", display: "block" };
        prev = { marginTop: "4.8rem", left: "17.8rem", zIndex: 1, position: "absolute", display: "block" };
      } else if (windowWidth >= 768 && windowWidth < 1024) {
        next = { marginTop: "4.4rem", right: "2.2rem", zIndex: 1, position: "absolute", display: "block" };
        prev = { marginTop: "4.4rem", left: "42.4rem", zIndex: 1, position: "absolute", display: "block" };
      } else if (windowWidth >= 1024 && windowWidth < 1280) {
        next = { marginTop: "-8.4rem", right: "1.9rem", zIndex: 1, position: "absolute", display: "block" };
        prev = { marginTop: "-8.4rem", left: "47.9rem", zIndex: 1, position: "absolute", display: "block" };
      } else {
        next = { marginTop: "15.6rem", right: "1.9rem", zIndex: 1, position: "absolute", display: "block" };
        prev = { marginTop: "15.6rem", left: "47.9rem", zIndex: 1, position: "absolute", display: "block" };
      }
      setArrowStyles({ next, prev });
    }
  }, []);

  const slideContent = [
   {
  title: "What We Do ?",
  description: "Turning smart investments into fast growth while\nyou sit back and watch opportunities fall into\nplace, effortlessly.",
  details: "",
}

];

  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
  };

  function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyles.next }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, ...arrowStyles.prev }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
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

  const currentContent = slideContent[activeSlide % slideContent.length];

  useEffect(() => {
      AOS.init({
        //   duration: 1000, // Animation duration (default: 400)
        once: true, // Whether animation should happen only once
      });
    }, []);

  return (
    <div className={` ${isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"}`} >
    <div
        className="overflow-hidden py-[3rem]"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
      <div className="max-w-7xl lg:h-auto flex justify-center mx-auto py-[0rem]" >
        <div className="flex flex-col justify-center items-center ">
          <div className="grid lg:grid-cols-6 grid-cols-1">
            <div className="col-span-2 lg:ps-[5rem] px-[1rem] lg:pe-[2rem] flex lg:flex-col justify-center lg:gap-0 gap-5 lg:items-start items-center pt-[0rem] pb-[0rem]">
              <h1 className="dm-serif-display lg:mt-0 my-8 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] text-blue-500 lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
                {currentContent.title.split(" ")[0]} <br />{" "}
                {currentContent.title.split(" ")[1]} <br />
                <span
                  className={`cormorant-garamond ${
                    isDarkMode ? "text-white" : "text-blue-500"
                  }`}
                >
                  {currentContent.title.split(" ")[2]}
                </span>{" "}
                {currentContent.title.split(" ")[3]}
              </h1>
              <p className={`lg:mt-5 lg:text-[0.9rem] md:text-[0.9rem] text-[0.6rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[0.9rem] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`} style={{ whiteSpace: "pre-line" }}>
                {currentContent.description}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                {currentContent.details}
              </p>
            </div>
            <div className="col-span-4 mt-0 lg:h-[35rem] h-[12rem]  ">
              <div className="slider-container relative">
                <Slider {...settings} className="mt-[0rem] mb-[0rem] overflow-hidden lg:h-[35rem] h-[12rem]  rounded-xl">
                  <div className="px-[0rem] col-span-1 overflow-hidden">
                    <div
                      className="cursor-pointer relative lg:h-[35rem] h-[12rem] flex flex-col justify-center items-center bg-cover bg-center overflow-hidden transition-all duration-500 hover:scale-[1.05]"
                      style={{
                        backgroundImage:
                          "url('/images/pexels-shkrabaanthony-5816283-1.jpg')",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/70"></div>
                      <div className="relative z-10 overflow-hidden flex lg:flex-col flex-row">
                        <h1
                          className="uppercase inter font-extrabold lg:text-[15rem] text-[8rem] w-full text-center lg:tracking-[1rem] scale-x-135 scale-y-170 relative lg:-top-[1.5rem] top-[0rem]"
                          style={{
                            WebkitTextStroke: "1px white",
                            color: "transparent",
                            filter: "drop-shadow(2px 2px 3.5px white)",
                          }}
                        >
                          <span
                            style={{
                              WebkitTextStroke: "1px white",
                              color: "transparent",
                              filter: "drop-shadow(2px 2px 3.5px white)",
                            }}
                          >
                            1
                          </span>
                        </h1>
                        <div className="relative lg:-top-[1.5rem] top-[2.5rem] lg:ps-5 lg:pe-2 pe-2">
                          <h1 className="dm-serif-display lg:text-[1.3rem] text-[1.2rem] lg:leading-[1.25rem] leading-[1.1rem] ml-4 capitalize text-blue-500">
                            Real Estate <br />
                            Investment Advisory
                          </h1>
                          <p className="mt-5 text-white lg:leading-[1.25rem]  leading-[1rem] lg:text-[0.8rem] ml-2 text-[0.7rem]">
                            Unlock smarter investments with expert strategies
                            tailored to grow your property wealth. We don't just
                            advise we architect your real estate success
                            story.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-[0rem] overflow-hidden">
                    <div
                      className="cursor-pointer relative lg:h-[35rem] h-[12rem] flex flex-col justify-center items-center bg-cover bg-center overflow-hidden transition-all duration-500 hover:scale-[1.05]"
                      style={{
                        backgroundImage:
                          "url('/images/pexels-fauxels-3183148-2.jpg')",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/80"></div>
                      <div className="relative z-10 overflow-hidden flex lg:flex-col flex-row">
                        <h1
                          className="uppercase inter font-extrabold lg:text-[15rem] text-[8rem] w-full text-center lg:tracking-[1rem] scale-x-135 scale-y-170 relative lg:-top-[1.5rem] top-[0rem]"
                          style={{
                            WebkitTextStroke: "1px white",
                            color: "transparent",
                            filter: "drop-shadow(2px 2px 3.5px white)",
                          }}
                        >
                          <span
                            style={{
                              WebkitTextStroke: "1px white",
                              color: "transparent",
                              filter: "drop-shadow(2px 2px 3.5px white)",
                            }}
                          >
                            2
                          </span>
                        </h1>
                        <div className="relative lg:-top-[1.5rem] top-[2.5rem] lg:ps-5 lg:pe-2 pe-2">
                          <h1 className="dm-serif-display lg:text-[1.3rem] text-[1.2rem] lg:leading-[1.25rem] leading-[1.1rem] ml-4 capitalize text-blue-500">
                          Strategic Channel <br />
                          Partner Alliance
                          </h1>
                          <p className="mt-5 text-white lg:leading-[1.25rem] ml-2  leading-4 lg:text-[0.8rem] text-[0.7rem]">
                          Plug into a powerful network of real estate pros,
                            top-tier projects, and profitable alliances.
                            Collaborate, close deals, and scale like never
                            before.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-[0rem] overflow-hidden">
                    <div
                      className="cursor-pointer relative lg:h-[35rem] h-[12rem] flex flex-col justify-center items-center bg-cover bg-center overflow-hidden transition-all duration-500 hover:scale-[1.05]"
                      style={{
                        backgroundImage:
                          "url('/images/pexels-mikhail-nilov-7731397-3.jpg')",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/80"></div>
                      <div className="relative z-10 overflow-hidden flex lg:flex-col flex-row">
                        <h1
                          className="uppercase inter font-extrabold lg:text-[15rem] text-[8rem] w-full text-center lg:tracking-[1rem] scale-x-135 scale-y-170 relative lg:-top-[1.5rem] top-[0rem]"
                          style={{
                            WebkitTextStroke: "1px white",
                            color: "transparent",
                            filter: "drop-shadow(2px 2px 3.5px white)",
                          }}
                        >
                          <span
                            style={{
                              WebkitTextStroke: "1px white",
                              color: "transparent",
                              filter: "drop-shadow(2px 2px 3.5px white)",
                            }}
                          >
                            3
                          </span>
                        </h1>
                        <div className="relative lg:-top-[1.5rem] top-[2.5rem] lg:ps-5 lg:pe-2 pe-2">
                          <h1 className="dm-serif-display lg:text-[1.3rem] text-[1.2rem] lg:leading-[1.25rem] leading-[1.1rem] ml-4 capitalize text-blue-500">
                          Loan & Financing <br />
                            Assistance
                          </h1>
                          <p className="mt-5 text-white lg:leading-[1.25rem] ml-2 leading-4 lg:text-[0.8rem] text-[0.7rem]">
                             No more paperwork chaos or confusing terms. We
                            simplify financing so you can focus on finding your
                            dream property and securing it stress-free.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-[0rem] overflow-hidden">
                    <div
                      className="cursor-pointer relative lg:h-[35rem] h-[12rem] flex flex-col justify-center items-center bg-cover bg-center overflow-hidden transition-all duration-500 hover:scale-[1.05]"
                      style={{
                        backgroundImage:
                          "url('/images/CorporateSolutions.jpg')",
                      }}
                    >
                      <div className="absolute inset-0 bg-black/80"></div>
                      <div className="relative z-10 overflow-hidden flex lg:flex-col flex-row">
                        <h1
                          className="uppercase inter font-extrabold lg:text-[15rem] text-[8rem] w-full text-center lg:tracking-[1rem] scale-x-135 scale-y-170 relative lg:-top-[1.5rem] top-[0rem]"
                          style={{
                            WebkitTextStroke: "1px white",
                            color: "transparent",
                            filter: "drop-shadow(2px 2px 3.5px white)",
                          }}
                        >
                          <span
                            style={{
                              WebkitTextStroke: "1px white",
                              color: "transparent",
                              filter: "drop-shadow(2px 2px 3.5px white)",
                            }}
                          >
                            4
                          </span>
                        </h1>
                        <div className="relative lg:-top-[1.5rem] top-[2.5rem] lg:ps-5 lg:pe-2 pe-2">
                          <h1 className="dm-serif-display lg:text-[1.3rem] text-[1.2rem] lg:leading-[1.25rem] leading-[1.1rem]  capitalize text-blue-500">
                          Corporate Solutions
                          </h1>
                          <p className="mt-5 text-white lg:leading-[1.25rem]  leading-4 lg:text-[0.8rem] text-[0.7rem]">
                          We Don't Just Lease Space We Unlock Growth.
                            From iconic addresses to high footfall hotspots, we connect your brand with spaces that speak success minus the hassle, plus the impact.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
                {/* <div className="w-[4.5rem]  h-[1.9rem] bg-white relative rounded-full lg:bottom-[2.8rem] md:bottom-[2.5rem] bottom-[2.1rem] lg:left-[47.6rem] md:left-[42rem] left-[17.5rem]"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AboutHome;
