'use client';
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "../content/ThemeContext";
import { IoArrowDownCircleOutline } from "react-icons/io5";

type Milestone = {
  id: number;
  title: string;
  content: React.ReactNode;
  position: "left" | "right";
};

const Journey: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [activeMilestone, setActiveMilestone] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [pathLength, setPathLength] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const journeyRef = useRef<HTMLDivElement | null>(null);

  const milestones: Milestone[] = [
    {
      id: 1,
      title: "April 4, 2021 – The Birth of INREXT",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">
            Every Vision Begins with a Spark
          </span>
          <br />
          A small group of 11 passionate individuals came together with one
          shared belief : <br />
          <span className="font-bold">
            Real estate needed change. Real estate needed transparency.
          </span>
          <br /> That day, <span className="font-bold">INREXT</span> was
          born—not just as a company, but as a mission to reform how real estate
          works in India. <br />
          <span className="font-bold">Founded with purpose :</span> <br /> We
          saw chaos. We brought clarity.
          <br />A transparent approach to property dealings that people could
          trust. No hidden agendas. No broken promises.
        </>
      ),
      position: "left",
    },
    {
      id: 2,
      title: "Early Days – Just a Few Projects",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">
            Small Steps, Big Dreams
          </span>
          <br />
          We began with limited resources and a handful of projects. No fancy
          offices. No big clients. Just trust, teamwork, and tireless
          dedication. <br />
          <span>
            <span className="font-bold">Initial Budget</span> – ₹18 Crores{" "}
            <br />{" "}
          </span>
          <span>
            <span className="font-bold">Team Strength</span> – 11 Dreamers{" "}
            <br />
          </span>
          <span>
            <span className="font-bold">Focus</span>– Residential Real Estate
            with ethical practices <br />
          </span>
          Each project was a stepping stone. Each client, a believer in our
          vision.
        </>
      ),
      position: "right",
    },
    {
      id: 3,
      title: "2022–2023 – Recognition Begins",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">
            Growth Fueled by Trust
          </span>
          <br />
          Our honest approach struck a chord with clients and partners alike.
          Word spread. Projects grew. We onboarded new builders. Our footprint
          widened. <br />
          From local names to{" "}
          <span className="font-bold"> regional giants,</span> INREXT became a
          symbol of reliability. <br />
          <span className="font-bold">
            Turnover milestones started rising <br />
          </span>
          Team expanded, associates joined our mission <br />
          Began operations in Tier 1 and Tier 2 cities <br />
          The journey was on… and there was no looking back.
        </>
      ),
      position: "left",
    },
    {
      id: 4,
      title: "2023–2024 – India's Top Builders, Now Partners",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">
            Making Waves Nationwide
          </span>{" "}
          <br />
          What began with small collaborations now turned into prestigious
          associations. <br />
          <span className="font-bold">
            Today, INREXT proudly works with India's top real estate developers.{" "}
            <br />
          </span>
          DLF, Godrej, Lodha, KW, Signature Global – you name them. <br />
          Our commitment and client-first approach created a ripple effect, and
          the industry took notice.
        </>
      ),
      position: "right",
    },
    {
      id: 5,
      title: "Team INREXT: From 11 to 200+ Strong",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">People First – Always</span>{" "}
          <br />
          Behind every successful deal is a dedicated individual. <br />
          From consultants to creative heads, analysts to associates – our
          people are our backbone. <br />
          <span>
            <span className="font-bold">Team Size in 2024</span> – 200+
            Employees & Associates <br />
          </span>
          <span>
            <span className="font-bold">Culture</span> – Growth, learning,
            transparency, and shared vision
            <br />
          </span>
          They're not just working at INREXT. They're building it.
        </>
      ),
      position: "left",
    },
    {
      id: 6,
      title: "2024–25 – ₹200+ Crores Turnover",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">
            The Milestone That Changed the Game
          </span>
          <br />
          This was more than a number. <br />
          It was a moment of validation that{" "}
          <span className="font-bold">
            {" "}
            INREXT is no longer the underdog—it's a market leader. <br />
          </span>
          Turnover :{" "}
          <span className="font-bold">
            {" "}
            ₹200+ Cr in FY 2024–25 <br />
          </span>
          Operating Pan-India <br />
          Client base across investor classes – budget to luxury <br />
          This achievement wasn't luck. It was the result of relentless focus
          and fearless ambition.
        </>
      ),
      position: "right",
    },
    {
      id: 7,
      title: "A Vision Bigger Than Numbers",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">
            What Drives Us Forward
          </span>
          <br />
          We didn't start INREXT just to sell properties. <br />
          We started to{" "}
          <span className="font-bold">
            {" "}
            bring back faith in real estate. <br />
          </span>
          Transparency <br />
          Ethics <br />
          Technology-backed solutions <br />
          Empowering brokers & investors alike <br />
          Our journey is about building trust, one transaction at a time.
        </>
      ),
      position: "left",
    },
    {
      id: 8,
      title: "You're Still Early in Our Story",
      content: (
        <>
          <span className="text-[1.3rem] font-bold">The Journey Ahead...</span>
          <br />
          We're just getting started. <br />
          The next chapter of INREXT will be filled with innovation, expansion,
          and more milestones. <br />
          Expanding across more cities <br />
          Adopting smart tech & AI in real estate <br />
          Eyeing global partnerships <br />
          "From 11 dreamers to a ₹200 Cr powerhouse… this is just the
          beginning."
        </>
      ),
      position: "right",
    },
  ];

  // Debounce function for smoother scroll handling
  function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function(this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const calculateDimensions = useCallback((): number => {
    if (journeyRef.current && svgRef.current) {
      const journeyHeight = journeyRef.current.scrollHeight;
      const viewportHeight = window.innerHeight;
      return journeyHeight - viewportHeight;
    }
    return 0;
  }, []);

  useEffect(() => {
    if (!started) return;

    const debouncedHandleScroll = debounce(() => {
      const scrollPosition = window.scrollY;
      const totalScrollHeight = calculateDimensions();
      const scrollRatio = Math.min(1, Math.max(0, scrollPosition / totalScrollHeight));

      // Update path drawing
      if (svgRef.current && pathLength > 0) {
        const path = svgRef.current.querySelector('path');
        if (path) {
          const drawLength = pathLength * scrollRatio;
          path.style.strokeDashoffset = String(pathLength - drawLength);
        }
      }

      // Update active milestone with smooth transition
      // FIX: Use Math.floor and clamp to ensure last milestone is reached
      const newMilestone = Math.max(
        1,
        Math.min(
          milestones.length,
          Math.floor(scrollRatio * milestones.length) + 1
        )
      );

      if (newMilestone !== activeMilestone) {
        setActiveMilestone(newMilestone);
      }
    }, 16);

    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [started, calculateDimensions, pathLength, activeMilestone, milestones.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartClick = (): void => {
    setStarted(true);
    setActiveMilestone(1);

    // Initialize the path animation
    setTimeout(() => {
      if (svgRef.current) {
        const path = svgRef.current.querySelector('path');
        if (path) {
          const length = path.getTotalLength();
          const pathLengthValue = path.getTotalLength();
          setPathLength(pathLengthValue);
          path.style.transition = 'stroke-dashoffset 0.3s ease-out';
          // @ts-expect-error: SVG path animation for scroll
          path.style.strokeDasharray = length;
          // @ts-expect-error: SVG path animation for scroll
          path.style.strokeDashoffset = length;
          // @ts-expect-error: SVG path animation for scroll
          path.style.strokeDashoffset = length - 10;
        }
      }
    }, 100);

    // Smooth scroll to start position
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
      ref={journeyRef}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center mt-[7rem] mb-[0rem] pb-[0rem] gap-y-0">
        {/* Click To Start */}
        {!started && (
          <div
            className="flex items-center justify-center mb-[4.9rem] h-[0rem] mt-[6rem] cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={handleStartClick}
          >
            <svg width="200" height="200" viewBox="0 0 200 200">
              <defs>
                <path
                  id="topCircle"
                  d="M100,100 m-75,0 a75,75 0 1,1 150,0"
                  fill="none"
                />
                <path
                  id="bottomCircle"
                  d="M100,2 m-75,0 a75,75 0 1,0 150,0"
                  fill="none"
                />
              </defs>

              <text fontSize="13" fill={isDarkMode ? "white" : "black"}>
                <textPath
                  className="tracking-[0.1rem]"
                  href="#topCircle"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  CLICK
                </textPath>
              </text>
              <text className="tracking-[0.1rem]" fontSize="13" fill={isDarkMode ? "white" : "black"}>
                <textPath
                  href="#bottomCircle"
                  startOffset="50%"
                  textAnchor="middle"
                >
                  TOSTART
                </textPath>
              </text>

              <foreignObject x="80" y="23" width="40" height="40">
                <div className="text-blue-500 text-[3rem] flex items-center justify-center hover:text-blue-600 transition-colors duration-300">
                  <IoArrowDownCircleOutline />
                </div>
              </foreignObject>
            </svg>
          </div>
        )}

        {started && (
          <>
            <div className="relative top-10 right-[7rem]">
              {/* Animated Wavy Line */}
              <svg
                ref={svgRef}
                className="absolute top-0 left-1/2 transform translate-x-1/2 z-0"
                width="100"
                height="2000"
                viewBox="0 0 100 1950"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="
                    M 20 0
                    C 210 150, -110 300, 50 450
                    C 210 600, -100 750, 50 900
                    C 210 1050, -110 1200, 50 1350
                  "
                  stroke="#1D4ED8"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              <ul className="flex flex-col justify-center gap-y-20 items-center relative z-0">
                {milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className={`relative flex ${
                      milestone.position === "right" ? "ms-[25rem]" : ""
                    } transition-all duration-500 ease-in-out ${
                      activeMilestone >= milestone.id
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    }`}
                  >
                    {/* Glowing Gradient Effect */}
                    {activeMilestone === milestone.id && (
                      <div
                        className={`w-[0rem] h-[0rem] absolute ${
                          milestone.position === "left"
                            ? "lg:right-[20rem] right-[10rem] top-[5rem]"
                            : "lg:left-[20rem] left-[10rem] top-[5rem]"
                        } rounded-full bg-transparent shadow-[0_0_200px_150px_rgba(59,130,246,0.3)] pointer-events-none z-[-1] transition-opacity duration-500`}
                      />
                    )}

                    {milestone.position === "left" && (
                      <p className={`hidden lg:block w-[25rem] px-2 py-1 font-semibold absolute top-[0.5rem] left-[-26rem] text-[0.8rem] ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}>
                        {milestone.content}
                      </p>
                    )}

                    {milestone.position === "left" && (
                      <li className="cursor-pointer hover:scale-105 transition-transform duration-300">
                        <span className={`w-[5.5rem] h-[5.5rem] mt-[0.5rem] flex items-center text-center text-[0.7rem] p-1.5 font-semibold leading-4 rounded-full ${
                          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
                        }`}>
                          {milestone.title}
                        </span>
                      </li>
                    )}

                    {milestone.position === "right" && (
                      <p className={`hidden lg:block w-[25rem] px-2 py-1 font-semibold absolute top-[3rem] right-[-26rem] text-[0.8rem] ${
                        isDarkMode ? "text-gray-200" : "text-gray-800"
                      }`}>
                        {milestone.content}
                      </p>
                    )}

                    {milestone.position === "right" && (
                      <li className="cursor-pointer hover:scale-105 transition-transform duration-300">
                        <span className={`w-[5.5rem] h-[5.5rem] mt-[3rem] flex items-center text-center text-[0.7rem] p-1.5 font-semibold leading-4 rounded-full ${
                          isDarkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
                        }`}>
                          {milestone.title}
                        </span>
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            </div>

            {/* Start Again */}
            <div 
              className="flex items-center justify-center h-[0rem] mt-[15rem] cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => {
                setStarted(false);
                setActiveMilestone(0);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              {/* <svg width="200" height="200" viewBox="0 0 200 200">
                <defs>
                  <path
                    id="topCircle"
                    d="M100,100 m-75,0 a75,75 0 1,1 150,0"
                    fill="none"
                  />
                  <path
                    id="bottomCircle"
                    d="M100,2 m-75,0 a75,75 0 1,0 150,0"
                    fill="none"
                  />
                </defs>

                <text fontSize="13" fill={isDarkMode ? "white" : "black"}>
                  <textPath
                    className="tracking-[0.1rem]"
                    href="#topCircle"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    START
                  </textPath>
                </text>
                <text fontSize="13" fill={isDarkMode ? "white" : "black"}>
                  <textPath
                    className="tracking-[0.1rem]"
                    href="#bottomCircle"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    AGAIN
                  </textPath>
                </text>
                <foreignObject
                  x="80"
                  y="23"
                  width="40"
                  height="40"
                >
                  <div className="text-blue-500 text-[3rem] flex items-center justify-center hover:text-blue-600 transition-colors duration-300">
                    <IoArrowUpCircleOutline />
                  </div>
                </foreignObject>
              </svg> */}
            </div>

            {/* Thank You */}
            {/* <div className="flex items-center justify-center">
              <p className={`dm-serif-display text-[2.5rem] ${
                isDarkMode ? "text-blue-400" : "text-blue-500"
              }`}>
                Thank<span className="ps-2 cormorant-garamond">You!</span>
              </p>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Journey;

