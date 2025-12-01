"use client";

// ================= TYPES & HELPERS =================
type ProfileImage = string | { url: string; [key: string]: any };
type PillarMember = {
  _id: string;
  name: string;
  category: string;
  profileImages?: ProfileImage[];
  designation?: string;
  about?: string;
  experience?: string;
  projects?: any[];
  expertise?: any[];
  skills?: any[];
  isActive?: boolean;
  isFeatured?: boolean;
  image?: string; // fallback for legacy code
  position?: string; // fallback for legacy code
};
 
function getImageSrc(member: PillarMember): string {
  // 1. Check legacy image field
  if (member.image) {
    if (member.image.startsWith("http://") || member.image.startsWith("https://")) return member.image;
    if (member.image.startsWith("/uploads/")) return member.image; // backend static path
    if (member.image !== "default-profile.png") return `/images/${member.image.replace(/^\/images\//, "")}`;
  }
  // 2. Check profileImages array (string or object)
  if (member.profileImages && member.profileImages.length > 0) {
    for (const img of member.profileImages) {
      if (typeof img === "object" && img !== null && 'url' in img && typeof img.url === 'string') {
        const url = img.url;
        if (url.startsWith("http://") || url.startsWith("https://")) return url;
        if (url.startsWith("/uploads/")) return url;
        if (url && url !== "default-profile.png") return `/images/${url.replace(/^\/images\//, "")}`;
      }
      if (typeof img === "string") {
        if (img.startsWith("http://") || img.startsWith("https://")) return img;
        if (img.startsWith("/uploads/")) return img;
        if (img !== "default-profile.png") return `/images/${img.replace(/^\/images\//, "")}`;
      }
    }
  }
  // 3. Fallback: use a public avatar service
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name || "User")}`;
}
import React, { useEffect, useRef, useState, useCallback } from "react";
import { fetchPillarsByCategory } from "../../services/pillarService";
import Image from "next/image";
import { useTheme } from "../content/ThemeContext";
import Link from "next/link";
import Testimonial from "../routes/homePage/Testimonial";
import WorkWithUs from "../routes/homePage/WorkWithUs";
import { FaClockRotateLeft, FaTelegram } from "react-icons/fa6";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });
import Teams from "../routes/homePage/Teams";

// Add types for CounterBox props
type CounterBoxProps = {
  value: number;
  label: string;
  isDarkMode: boolean;
};

const CounterBox = React.memo(({ value, label, isDarkMode }: CounterBoxProps) => (
  <p
    className={`border rounded-xl lg:py-[2rem] py-[1rem] flex flex-col justify-center items-center ${
      isDarkMode ? "text-white" : "text-[#5c727d]"
    }`}
  >
    <span className="open-sans text-blue-500 font-bold lg:text-[1.3rem] text-[1.2rem]">
      {value}+
    </span>
    {label}
  </p>
));

const AboutPage = () => {
    // (Debug log moved to useEffect below)
  const { isDarkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // State for counting numbers
  const [yearsExp, setYearsExp] = useState(0);
  const [happyCustomers, setHappyCustomers] = useState(0);
  const [services, setServices] = useState(0);
  const [guides, setGuides] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // State for pillar sections
  const [visionaries, setVisionaries] = useState<PillarMember[]>([]);
  const [strategicForce, setStrategicForce] = useState<PillarMember[]>([]);
  const [powerhouseTeam, setPowerhouseTeam] = useState<PillarMember[]>([]);
  const [growthNavigators, setGrowthNavigators] = useState<PillarMember[]>([]);

  // Debug: Log visionaries array to check for duplicates
  React.useEffect(() => {
    console.log('Visionaries data:', visionaries);
  }, [visionaries]);

  // Fetch pillar data using pillarService
  useEffect(() => {
    async function fetchAllPillars() {
      setVisionaries(await fetchPillarsByCategory("the-visionaries"));
      setStrategicForce(await fetchPillarsByCategory("the-strategic-force"));
      setPowerhouseTeam(await fetchPillarsByCategory("the-powerhouse-team"));
      setGrowthNavigators(await fetchPillarsByCategory("growth-navigators"));
    }
    fetchAllPillars();
  }, []);

  // Consolidated counter state
  const [counters, setCounters] = useState({
    yearsExp: 12,
    happyCustomers: 1000,
    services: 4,
    guides: 22,
  });

  const animateCounters = useCallback(() => {
    let startTime: number | null = null;
    const duration = 2000; // 2 seconds for all counters

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        yearsExp: Math.floor(progress * 12),
        happyCustomers: Math.floor(progress * 1000),
        services: Math.floor(progress * 4),
        guides: Math.floor(progress * 22),
      });

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Only run IntersectionObserver on client
    if (typeof window === "undefined") return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animateCounters]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  // Add types for arrow props
  type ArrowProps = {
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
  };

  function NextArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...(typeof window !== "undefined"
            ? responsiveStyles({
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
              })
            : {}),
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: ArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...(typeof window !== "undefined"
            ? responsiveStyles({
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
              })
            : {}),
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  // Add type for responsiveStyles
  function responsiveStyles(breakpoints: {
    mobile: React.CSSProperties;
    tablet: React.CSSProperties;
    laptop: React.CSSProperties;
    desktop: React.CSSProperties;
  }): React.CSSProperties {
    if (typeof window === "undefined") return {};
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
    beforeChange: (oldIndex: number, newIndex: number) => setActiveIndex(newIndex),
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

  return (
    <>
      <div
        className={`lg:h-[100vh] h-[100%] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div
          ref={statsRef}
          className={`overflow-hidden ${
            isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
          }`}
        >
          <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 max-w-7xl mx-auto lg:px-6 px-5 py-[2rem] md:mt-[5rem] mt-[4.5rem] gap-14">
            {/* Content */}
            <div className="flex flex-col lg:px-10 justify-center gap-y-[2rem] lg:pt-[0rem]">
              <h1 className="dm-serif-display text-blue-500 font-normal lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
                Real Estate, <br /> Reimagined <br /> For You.
              </h1>
              <p
                className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } leading-6`}  
              >
                Inrext is where real estate meets vision. Driven by leaders with
                10–12+ years of industry expertise, we go beyond transactions to
                craft opportunities turning properties into powerful
                investments. <br /> From residential retreats to commercial
                hubs, hospitality spaces to retail landmarks including office
                spaces, shops, kiosks, and restaurants Inrext empowers you with
                insights, trust, and tailored solutions. At Inrext, we don’t
                just consult. We transforming the way of investing
              </p>

              <Link
                href="/"
                className="montserrat w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
              >
                EXPLORE OUR JOURNEY
              </Link>
              <div className="grid grid-cols-3 gap-x-5 mt-0 text-center">
                <CounterBox
                  value={counters.yearsExp}
                  label="Years Experience"
                  isDarkMode={isDarkMode}
                />
                <CounterBox
                  value={counters.happyCustomers}
                  label="Happy Customers"
                  isDarkMode={isDarkMode}
                />
                <CounterBox
                  value={counters.guides}
                  label="Professional Guides"
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>

            {/* Image */}
            <div className="lg:h-full h-[35vh]">
              <Image
                className="w-full rounded-xl h-full object-cover"
                src="/images/about.webp"
                alt="About Us"
                width={800}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      {/* Empowering Investors */}
      <div
        className={`lg:h-[100vh] h-[100%] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div
          ref={statsRef}
          className={`overflow-hidden ${
            isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
          }`}
        >
          <div className="grid lg:grid-cols-2  md:grid-cols-1 grid-cols-1 max-w-7xl mx-auto lg:px-6 px-5 py-[0rem] md:mt-[5rem] my-[4.5rem] gap-14">
            {/* Content */}
            <div className="flex flex-col lg:px-10 justify-center gap-y-[2rem] lg:pt-[0rem]">
              <h1 className="dm-serif-display text-blue-500 font-normal lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ">
                Empowering <br />{" "}
                <span
                  className={`${isDarkMode ? "text-white" : "text-blue-500"}`}
                >
                  {" "}
                  <span className="cormorant-garamond">Investors</span>
                </span>
              </h1>
              <p
                className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                  isDarkMode ? "text-white" : "text-gray-900"
                } leading-6`}
              >
                In a market filled with confusion and misinformation, you
                deserve clarity. That’s why we created INREXT—to bring
                transparency, technology, and trust to your real estate journey.
              </p>
              <Link
                href="/"
                className="montserrat w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
              >
                EXPLORE OUR JOURNEY
              </Link>

              <div className="lg:h-full h-[35vh]">
                <Image
                  className="w-full rounded-xl h-full object-cover"
                  src="/images/About image.webp"
                  alt="About Us"
                  width={800}
                  height={400}
                  priority
                />
              </div>
            </div>

            {/*  */}
            <div className="grid grid-rows-4 gap-x-5 gap-y-5 mt-0 text-center">
              <div className="grid grid-cols-5 lg:p-0 md:p-[2rem] p-[1.5rem] border border-[#5c727d] rounded-xl">
                <div className="col-span-2 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/10.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>

                <div className="col-span-3  flex flex-col justify-center items-center">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Transparency First
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    We believe trust begins with clarity. No hidden agendas,
                    just honest real estate.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-5 lg:p-0 md:p-[2rem] p-[1.5rem] border border-[#5c727d] rounded-xl">
                <div className="col-span-2 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/9.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>

                <div className="col-span-3  flex flex-col justify-center items-center">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Empowering Growth
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    We don't just close deals—we open doors to long-term growth
                    for every client and associate.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-5 lg:p-0 md:p-[2rem] p-[1.5rem] border border-[#5c727d] rounded-xl">
                <div className="col-span-2 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/8.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>

                <div className="col-span-3  flex flex-col justify-center items-center">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Innovation Driven
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    We use smart tools and forward-thinking strategies to make
                    investing seamless and efficient.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-5 lg:p-0 md:p-[2rem] p-[1.5rem] border border-[#5c727d] rounded-xl">
                <div className="col-span-2 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/7.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-6.5 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 h-[1.8rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>

                <div className="col-span-3  flex flex-col justify-center items-center">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    People Centered
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    Our mission starts and ends with people. Your goals, your
                    journey, our full support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Challenges */}
      <div
        className={`overflow-hidden ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:pt-[5rem] pb-[3rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
            Your
            <span
              className={`cormorant-garamond ps-3 pe-3 ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Challenges,
            </span>
            Our
            <span
              className={`cormorant-garamond ps-3 pe-3 ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Solutions
            </span>
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-[0rem] mb-[0rem] ">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-5 ">
            <div className="px-[0.5rem]">
              <div
                className={`h-full grid grid-row-2 justify-center items-center relative  rounded-lg ${
                  isDarkMode
                    ? "border border-[#5c727d] rounded-xl"
                    : "border border-[#5c727d] rounded-xl"
                }`}
              >
                <div className="p-7 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/1.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="flex flex-col justify-center items-center pb-5 px-5">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Smarter ROI Decisions
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    Powerful calculators & personalized insights to maximize
                    your returns.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-[0.5rem]">
              <div
                className={`h-full grid grid-row-2 justify-center items-center relative  rounded-lg ${
                  isDarkMode
                    ? "border border-[#5c727d] rounded-xl"
                    : "border border-[#5c727d] rounded-xl"
                }`}
              >
                <div className="p-7 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/2.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="flex flex-col justify-center items-center pb-5 px-5">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Verified Properties Only
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    Every listing is pre-screened, saving you from risky
                    investments.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-[0.5rem]">
              <div
                className={`h-full grid grid-row-2 justify-center items-center relative  rounded-lg ${
                  isDarkMode
                    ? "border border-[#5c727d] rounded-xl"
                    : "border border-[#5c727d] rounded-xl"
                }`}
              >
                <div className="p-7 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/3.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="flex flex-col justify-center items-center pb-5 px-5">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Expert Guidance Anytime
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    One-on-one support to help you navigate the real estate
                    maze.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-[0.5rem]">
              <div
                className={`h-full grid grid-row-2 justify-center items-center relative  rounded-lg ${
                  isDarkMode
                    ? "border border-[#5c727d] rounded-xl"
                    : "border border-[#5c727d] rounded-xl"
                }`}
              >
                <div className="p-7 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/4.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="flex flex-col justify-center items-center pb-5 px-5">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Knowledge That Grows You
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    Market updates, trends, and education to level up your
                    investment game.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-[0.5rem]">
              <div
                className={`h-full grid grid-row-2 justify-center items-center relative  rounded-lg ${
                  isDarkMode
                    ? "border border-[#5c727d] rounded-xl"
                    : "border border-[#5c727d] rounded-xl"
                }`}
              >
                <div className="p-7 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/5.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="flex flex-col justify-center items-center pb-5 px-5">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Personalized Investment Plans
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    We tailor property suggestions that fit your goals and
                    budget.
                  </p>
                </div>
              </div>
            </div>
            <div className="px-[0.5rem]">
              <div
                className={`h-full grid grid-row-2 justify-center items-center relative  rounded-lg ${
                  isDarkMode
                    ? "border border-[#5c727d] rounded-xl"
                    : "border border-[#5c727d] rounded-xl"
                }`}
              >
                <div className="p-7 w-full h-full flex justify-center items-center relative">
                  {/* Centered Icon */}
                  <div className="relative p-1 rounded-full border border-blue-500 z-0">
                    <div className="p-1 rounded-full border border-blue-500">
                      <Image
                        src="/images/About icons/6.png"
                        alt=""
                        className="w-7 h-7 object-contain"
                        width={28}
                        height={28}
                        priority
                      />
                    </div>
                  </div>

                  {/* Horizontal Line - Left */}
                  <div className="absolute left-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

                  {/* Horizontal Line - Right */}
                  <div className="absolute right-26 top-1/2 transform -translate-y-1/2 w-[4.5rem] h-px bg-gradient-to-l from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Top */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />

                  {/* Vertical Line - Bottom */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-[1.5rem] w-px bg-gradient-to-t from-transparent via-blue-500 to-transparent" />
                </div>
                <div className="flex flex-col justify-center items-center pb-5 px-5">
                  <h2 className="dm-serif-display text-blue-500 font-normal lg:text-[1.5rem] md:text-[1.3rem] text-[1.2rem] lg:leading-[1.8rem] md:leading-[1.6rem] leading-[1.4rem]">
                    Transparent Deal Process
                  </h2>
                  <p
                    className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    } leading-6`}
                  >
                    No hidden terms — just clear, honest property transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* the visionaries */}
      <div
        className={`overflow-hidden ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 pt-[5rem] pb-[3rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
            The
            <span
              className={`cormorant-garamond ps-3 pe-3 ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Visionaries
            </span>
          </h1>
        </div>

        {/* Slider Section */}
        <div className="max-w-7xl mx-auto lg:px-0 mb-[0rem]">
          {/* Desktop/Laptop View - Grid */}
          <div className="hidden lg:block">
            <div className="flex  justify-center">
              <div className="grid lg:grid-cols-2 gap-4 pb-[0rem]">
                {visionaries.map((member) => (
                  <div key={member._id} className="px-[0.6rem]">
                    <Link href={`/team/${encodeURIComponent(member.name)}`}>
                      <div
                        className={`h-full flex flex-col justify-center items-center px-5 rounded-xl group cursor-pointer ${
                          isDarkMode
                            ? "border-2 border-blue-500"
                            : "border-2 border-blue-500"
                        }`}
                      >
                        <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                          <Image
                            className="w-full h-full object-contain bg-white rounded-xl"
                            src={getImageSrc(member) || "/images/default-profile.png"}
                            alt={member.name}
                            width={240}
                            height={192}
                            priority
                            onError={e => { e.currentTarget.src = "/images/default-profile.png"; }}
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
                          {/* Replace Link with button to avoid nested <a> */}
                          <button
                            type="button"
                            className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500"
                            tabIndex={-1}
                            aria-label="Say Hello"
                            // Optionally, add onClick if you want to handle something
                          >
                            Say Hello👋{" "}
                            <span className="text-[1.50rem]">
                              <FaTelegram />
                            </span>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet View - Simple Horizontal Scroll */}
          <div className="lg:hidden max-w-6xl mx-auto lg:px-0 mb-[0rem] overflow-x-auto">
            <div className="slider-container">
              <Slider
                {...settings}
                className="overflow-hidden pb-[0rem] lg:h-[26rem] h-[26rem]"
              >
                {visionaries.map((member) => (
                  <div key={member._id} className="me-[1.6rem] px-[0.6rem]">
                    <Link
                      className="flex flex-col items-center justify-center"
                      href={`/team/${encodeURIComponent(member.name)}`}
                    >
                      <div
                        className={`h-full flex flex-col justify-center items-center px-12 lg:mx-0 mx-5 rounded-xl group cursor-pointer ${
                          isDarkMode
                            ? "border-2 border-blue-500"
                            : "border-2 border-blue-500"
                        }`}
                      >
                        <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                          <Image
                            className="w-full h-full object-contain bg-white rounded-xl"
                            src={getImageSrc(member)}
                            alt={member.name}
                            width={240}
                            height={192}
                            priority
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
                          <button
                            type="button"
                            className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500"
                            tabIndex={-1}
                            aria-label="Say Hello"
                          >
                            Say Hello👋{" "}
                            <span className="text-[1.50rem]">
                              <FaTelegram />
                            </span>
                          </button>
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
      {/* the strategic force */}
      <div
        className={`overflow-hidden ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 pt-[5rem] pb-[3rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
            The
            <span
              className={`cormorant-garamond ps-3 pe-3 ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Strategic
            </span>
            Force
          </h1>
        </div>

        {/* Slider Section */}
        <div className="max-w-7xl mx-auto lg:px-0 mb-[0rem]">
          {/* Desktop/Laptop View - Grid */}
          <div className="hidden lg:block">
            <div className="flex justify-center">
              <div className="grid lg:grid-cols-3 gap-4 pb-[0rem]">
                {strategicForce.map((member) => (
                  <div key={member._id} className="px-[0.6rem]">
                    <Link href={`/team/${encodeURIComponent(member.name)}`}>
                      <div
                        className={`h-full flex flex-col justify-center items-center px-5 rounded-xl group cursor-pointer ${
                          isDarkMode
                            ? "border-2 border-blue-500"
                            : "border-2 border-blue-500"
                        }`}
                      >
                        <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                          <Image
                            className="w-full h-full object-contain bg-white rounded-xl"
                            src={getImageSrc(member)}
                            alt={member.name}
                            width={240}
                            height={192}
                            priority
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
                          <button
                            type="button"
                            className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500"
                            tabIndex={-1}
                            aria-label="Say Hello"
                          >
                            Say Hello👋{" "}
                            <span className="text-[1.50rem]">
                              <FaTelegram />
                            </span>
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet View - Simple Horizontal Scroll */}
          <div className="lg:hidden max-w-6xl mx-auto lg:px-0 mb-[0rem] overflow-x-auto">
            <div className="slider-container">
              <Slider
                {...settings}
                className="overflow-hidden pb-[0rem] lg:h-[26rem] h-[26rem]"
              >
                {strategicForce.map((member) => (
                  <div key={member._id} className="me-[1.6rem] px-[0.6rem]">
                    <Link
                      className="flex flex-col items-center justify-center"
                      href={`/team/${encodeURIComponent(member.name)}`}
                    >
                      <div
                        className={`h-full flex flex-col justify-center items-center px-12 lg:mx-0 mx-5 rounded-xl group cursor-pointer ${
                          isDarkMode
                            ? "border-2 border-blue-500"
                            : "border-2 border-blue-500"
                        }`}
                      >
                        <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                          <Image
                            className="w-full h-full object-contain bg-white rounded-xl"
                            src={getImageSrc(member)}
                            alt={member.name}
                            width={240}
                            height={192}
                            priority
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
                          <button
                            type="button"
                            className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500"
                            tabIndex={-1}
                            aria-label="Say Hello"
                          >
                            Say Hello👋{" "}
                            <span className="text-[1.50rem]">
                              <FaTelegram />
                            </span>
                          </button>
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
      {/*  */}
      <Teams />
      <div
        className={`overflow-hidden ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 pt-[5rem] pb-[3rem] flex flex-col justify-center items-center overflow-hidden">
          <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
            The
            <span
              className={`cormorant-garamond ps-3 pe-3 ${
                isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
              }`}
            >
              Powerhouse
            </span>
            Team
          </h1>
        </div>
        {/* Slider Section */}
        <div className="max-w-6xl mx-auto lg:px-0 mb-[0rem] ">
          <div className="slider-container">
            <Slider
              {...settings}
              className="overflow-hidden pb-[0rem] lg:h-[26rem] h-[26rem]"
            >
              {(() => {
                // Filter unique by normalized name and category
                const normalize = (str: string) => (str || '').trim().toLowerCase();
                const uniqueMembers = powerhouseTeam.filter((v, i, a) =>
                  a.findIndex(x => normalize(x.name) === normalize(v.name) && normalize(x.category) === normalize(v.category)) === i
                );
                return uniqueMembers.map((member) => (
                  <Link key={member._id} href={`/team/${encodeURIComponent(member.name)}`} className="me-[1.6rem] px-[0.6rem] block group">
                    <div
                      className={`h-full flex flex-col justify-center items-center px-5 lg:mx-0 mx-5 rounded-xl group cursor-pointer ${
                        isDarkMode
                          ? "border-2 border-blue-500"
                          : "border-2 border-blue-500"
                      } transition-shadow hover:shadow-lg`}
                    >
                      <div className="rounded-xl mt-5 w-[15rem] h-[12rem]">
                        <Image
                          className="w-full h-full object-contain bg-white rounded-xl"
                          src={getImageSrc(member)}
                          alt={member.name}
                          width={240}
                          height={192}
                          priority
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
                        <button
                          type="button"
                          className="mt-5 italianno-regular w-full flex flex-row items-end justify-between text-white px-4 py-2 rounded-full bg-blue-500"
                          tabIndex={-1}
                          aria-label="Say Hello"
                        >
                          Say Hello👋{" "}
                          <span className="text-[1.50rem]">
                            <FaTelegram />
                          </span>
                        </button>
                      </div>
                    </div>
                  </Link>
                ));
              })()}
            </Slider>
          </div>
        </div>
      </div>
      {/*  */}
      <Testimonial />
      <WorkWithUs />
    </>
  );
};

export default AboutPage;
