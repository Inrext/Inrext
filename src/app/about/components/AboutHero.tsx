"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "../../content/ThemeContext";

const CounterBox = React.memo(({ value, label, isDarkMode }: { value: number; label: string; isDarkMode: boolean }) => (
  <p
    className={`border rounded-xl lg:py-[2rem] py-[1rem] flex flex-col justify-center items-center ${
      isDarkMode ? "text-white" : "text-[#5c727d]"
    }`}
  >
    <span className="open-sans text-blue-500 font-bold lg:text-[1.3rem] text-[1.2rem]">{value}+</span>
    {label}
  </p>
));

const AboutHero = () => {
  const { isDarkMode } = useTheme();
  const statsRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    yearsExp: 0,
    happyCustomers: 0,
    guides: 0,
  });

  const animateCounters = useCallback(() => {
    let startTime: number | null = null;
    const duration = 2000;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCounters({
        yearsExp: Math.floor(progress * 12),
        happyCustomers: Math.floor(progress * 1000),
        guides: Math.floor(progress * 22),
      });
      if (progress < 1) animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, animateCounters]);

  return (
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
        <div className="grid lg:grid-cols-2    md:grid-cols-1 grid-cols-1 max-w-7xl mx-auto lg:px-6 px-5 py-[2rem] md:mt-[5rem] mt-[4.5rem] gap-14">
          <div className="flex flex-col lg:px-10 justify-center rounded-4xl  bg-zinc-900  gap-y-[2rem] lg:pt-[3rem] lg:pb-[2rem]">
            <h1 className="dm-serif-display text-blue-500 font-normal lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
              Real Estate, <br /> Reimagined <br /> For You.
            </h1>
            <p
              className={`lg:text-[0.9rem] md:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] ${
                isDarkMode ? "text-white" : "text-gray-900"
              } leading-6`}
            >
              Inrext is where real estate meets vision. Driven by leaders with 10–12+ years of industry expertise, we go beyond transactions to craft opportunities turning properties into powerful investments. <br /> From residential retreats to commercial hubs, hospitality spaces to retail landmarks including office spaces, shops, kiosks, and restaurants Inrext empowers you with insights, trust, and tailored solutions. At Inrext, we don’t just consult. We transforming the way of investing
            </p>
            <Link
              href="/"
              className="montserrat w-fit text-white px-6 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              EXPLORE OUR JOURNEY
            </Link>
            <div className="grid grid-cols-3 gap-x-5 mt-0 text-center">
              <CounterBox value={counters.yearsExp} label="Years Experience" isDarkMode={isDarkMode} />
              <CounterBox value={counters.happyCustomers} label="Happy Customers" isDarkMode={isDarkMode} />
              <CounterBox value={counters.guides} label="Professional Guides" isDarkMode={isDarkMode} />
            </div>
          </div>
          <div className="lg:h-full h-[35vh]">
            <Image
              className="w-full rounded-4xl h-full object-cover"
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
  );
};

export default AboutHero;
