// MarketPage
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useTheme } from "../../content/ThemeContext";
import Link from "next/link"; // Use Next.js Link

gsap.registerPlugin(ScrollTrigger);

const MarketPage: React.FC = () => {
  const { isDarkMode } = useTheme();

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const indiaRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<Array<HTMLDivElement | null>>([]);
  const slidesContainerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  const cities = [
    { name: "Delhi", img: "/images/delhi.jpg" },
    { name: "Noida", img: "/images/noida.jpg" },
    { name: "Nainital", img: "/images/Nainital.jpg" },
    { name: "G.Noida", img: "/images/Gnoida.jpg" },
    { name: "Dehradun", img: "/images/dehradun.avif" },
    { name: "Dholera", img: "/images/dholeraprime.jpg" },
  ];

  // Only run animations on client
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([indiaRef.current, contentRef.current, headingRef.current], {
        opacity: 0,
        x: 0,
      });

      gsap.set(indiaRef.current, {
        opacity: 1,
        fontSize: "0vw",
      });

      gsap.set(slidesContainerRef.current, {
        x: 0,
      });

      gsap.set(slidesRef.current, {
        opacity: 0,
        x: 100,
      });

      // Initial position for content - centered
      gsap.set(contentRef.current, {
        x: "50%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate INDIA text expanding
      tl.to(indiaRef.current, {
        fontSize: "30vw",
        scale: 2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
      });

      // Show heading after INDIA animation
      tl.to(
        headingRef.current,
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Show content and move it from center to left
      tl.to(
        contentRef.current,
        {
          opacity: 1,
          x: "0%",
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.5"
      );

      // Animate slides one by one
      slidesRef.current.forEach((slide, index) => {
        tl.to(
          slide,
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={`relative ${isDarkMode ? "bg-black" : "bg-blue-50"}`}>
      <div className="overflow-hidden">
        <div
          ref={sectionRef}
          className="relative w-full  lg:h-[100vh] h-auto"
        >
          <div
            className="w-[0rem] h-[0rem] absolute left-[0rem] top-[2rem] rounded-full
             bg-transparent shadow-[0_0_200px_150px_rgba(59,130,246,0.7)] pointer-events-none"
          />
          
          {/* Heading - now controlled by animation */}
          <div 
            ref={headingRef}
            className="max-w-7xl mx-auto px-6 pt-0 flex flex-col justify-center items-center"
          >
            <h1 className="dm-serif-display lg:text-[3.1rem] lg:leading-[2.8] md:text-[2.1rem] md:leading-[1.8] text-[1.5rem] leading-[1.4] text-center text-blue-500 w-80 md:w-[35rem] ">
              Explore Our{" "}
              <span
                className={`cormorant-garamond ${
                  isDarkMode ? "text-white" : "text-blue-500"
                }`}
              >
                Market
              </span>
            </h1>
          </div>

          {/* INDIA Text */}
          <div
            ref={indiaRef}
            className="h-full w-full flex items-center justify-center absolute top-0 left-0"
          >
            <h1
              className="text-outline uppercase font-extrabold w-full text-center tracking-[0.5rem]"
              style={{
                WebkitTextStroke: isDarkMode ? "2.5px white" : "2.5px #155dfc",
                color: "transparent",
              }}
            >
              INDIA
            </h1>
          </div>
          <div
            className="w-[0rem] h-[0rem] absolute right-[0rem] bottom-[2rem] rounded-full
             bg-transparent shadow-[0_0_200px_150px_rgba(59,130,246,0.7)] pointer-events-none"
          />

          <div className="relative grid lg:grid-cols-3 grid-cols-1 px-0 max-w-7xl mx-auto pt-0 lg:h-[35rem] md:h-[45rem] h-[40rem]">
            <div
              ref={contentRef}
              className="lg:h-full col-span-1 h-[30vh] flex flex-col flex-wrap justify-center items-start"
            >
              <div className="flex flex-col justify-center items-center space-y-10 transform lg:translate-x-[20%] md:translate-x-[50%] translate-x-[10%]">
                <h1
                  className={`raleway font-semibold lg:text-[1.3rem] md:text-[1.20rem] text-[1.2rem] lg:leading-[1.4rem] md:leading-[1.4rem] leading-[1.1rem] text-center w-[20rem] ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  REDEFINING SPACES, ELEVATING LIFESTYLES
                </h1>
                <p
                  className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] text-center lg:w-[22rem] md:w-[25rem] w-[20rem] ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Discover top real estate options across India, tailored to
                  your needs.
                </p>
                <Link
                  href="/properties"
                  className="w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
                >
                  Learn More
                </Link>
              </div>
            </div>

            <div className=" col-span-2 h-full flex items-center justify-center overflow-hidden">
              <div
                ref={slidesContainerRef}
                className="flex lg:space-x-2 md:space-x-3 space-x-1.5 h-[25rem] items-center"
              >
                {cities.map((city, index) => (
                  <Link
                    key={city.name}
                    href={`/${city.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block"
                  >
                    <div
                      ref={(el) => {
                        slidesRef.current[index] = el;
                      }}
                      className="relative h-[20rem] min-w-[3.5rem] md:h-[25rem] md:min-w-[6rem] lg:h-[30rem] lg:min-w-[8rem] flex-shrink-0 bg-cover bg-center rounded-xl flex items-center justify-center before:absolute before:inset-0 before:bg-black/60 before:rounded-xl"
                      style={{ backgroundImage: `url(${city.img})` }}
                    >
                      <h1 className="absolute text-white text-[2rem] font-bold uppercase transform -rotate-90">
                        {city.name}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MarketPage;