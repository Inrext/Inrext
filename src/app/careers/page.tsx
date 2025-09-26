"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useTheme } from "../content/ThemeContext";
import { GoDotFill } from "react-icons/go";
import { MdArrowOutward, MdClose } from "react-icons/md";
import dynamic from "next/dynamic";
import Image from "next/image";

// Replace Modal import with dynamic import to avoid SSR issues
const Modal = dynamic(() => import("react-modal").then(mod => mod.default), { ssr: false });

type FormData = {
  name: string;
  email: string;
  phone: string;
  workplace: string;
  joblocation: string;
  employment: string;
  jobrole: string;
  resume: File | null;
};

const Careers: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    workplace: "",
    joblocation: "",
    employment: "",
    jobrole: "",
    resume: null,
  });

  // Fix: setAppElement in useEffect (client only)
  useEffect(() => {
    // Only set app element if Modal is loaded and running in the browser
    if (typeof window !== "undefined" && Modal && (Modal as any).setAppElement) {
      (Modal as any).setAppElement("body");
    }
  }, []);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      resume: e.target.files ? e.target.files[0] : null,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Typically send formData to backend here
    console.log("Form submitted:", formData);
    closeModal();
    setFormData({
      name: "",
      email: "",
      phone: "",
      workplace: "",
      joblocation: "",
      employment: "",
      jobrole: "",
      resume: null,
    });
  };

  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: isDarkMode ? "#111827" : "#fff",
      border: "none",
      borderRadius: "12px",
      padding: "0",
      width: "100%",
      maxWidth: "50rem",
      color: isDarkMode ? "#fff" : "#000",
    },
    overlay: {
      backgroundColor: isDarkMode
        ? "rgba(0, 0, 0, 0.85)"
        : "rgba(0, 0, 0, 0.65)",
      zIndex: 1000,
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div
        className={`lg:h-[100vh] h-[50vh] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        {/* Content */}
        <div className="relative flex flex-col justify-center items-center lg:gap-y-[3rem] gap-y-[1.5rem] p-4">
          <h1
            className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
              isDarkMode ? "text-blue-500" : "text-blue-500"
            }`}
          >
            Be More Than Just an Employee
            <br /> — Become a Visionary.
          </h1>
          <p
            className={`raleway text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.7rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            We’re a team of thinkers, doers, and dreamers who believe that the
            future is something you build, not just wait for.
          </p>
        </div>
      </div>
      {/* ============================= 1 ================================= */}
      <div
        className={`overflow-hidden py-[3rem] flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-5 px-6 w-full max-w-7xl ">
          <div className="relative rounded-xl overflow-hidden lg:h-[25rem] md:h-[18rem] h-[12rem]">
            <div className="absolute inset-0">
              <Image
                className="rounded-xl w-full h-full"
                src="/images/Careers.jpg"
                alt="Team photo"
                width={400}
                height={200}
              />
              <div className="absolute inset-0 bg-black opacity-30"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[60%] rounded-b-xl bg-gradient-to-t from-[#3785FF9C] to-[#D9D9D900]"></div>
          </div>
          <div className="flex justify-center items-center lg:h-[25rem] ">
            <div className="grid lg:grid-cols-2 md:grid-cols-4 grid-cols-2 justify-items-center items-center mx-auto max-w-max lg:h-[15rem] lg:gap-10 gap-5">
              <div className="relative leading-[1.25rem]  bg-blue-500 text-white rounded-xl w-[10rem] lg:h-[6rem] md:h-[6rem] h-[5rem] flex flex-col justify-center items-center text-center overflow-hidden">
                {/* Gradient overlay for inner shadow effect */}
                <div
                  className={` ${
                    isDarkMode
                      ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100 "
                      : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                  }`}
                ></div>
                {/* Content */}
                <span className="font-bold lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative z-0">
                  200
                </span>
                <span className="text-[0.8rem] relative z-0">FOLKS SO FAR</span>
              </div>
              <div className="relative leading-[1.25rem]  bg-blue-500 text-white rounded-xl w-[10rem] lg:h-[6rem] md:h-[6rem] h-[5rem] flex flex-col justify-center items-center text-center overflow-hidden">
                {/* Gradient overlay for inner shadow effect */}
                <div
                  className={` ${
                    isDarkMode
                      ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100 "
                      : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                  }`}
                ></div>
                {/* Content */}
                <span className="font-bold lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative z-0">
                  20%
                </span>
                <span className="text-[0.8rem] relative z-0">REMOTE FOLKS</span>
              </div>
              <div className="relative leading-[1.25rem]  bg-blue-500 text-white rounded-xl w-[10rem] lg:h-[6rem] md:h-[6rem] h-[5rem] flex flex-col justify-center items-center text-center overflow-hidden">
                {/* Gradient overlay for inner shadow effect */}
                <div
                  className={` ${
                    isDarkMode
                      ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100 "
                      : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                  }`}
                ></div>
                {/* Content */}
                <span className="font-bold lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative z-0">
                  02
                </span>
                <span className="text-[0.8rem] relative z-0">CITIES</span>
              </div>
              <div className="relative leading-[1.25rem]  bg-blue-500 text-white rounded-xl w-[10rem] lg:h-[6rem] md:h-[6rem] h-[5rem] flex flex-col justify-center items-center text-center overflow-hidden">
                {/* Gradient overlay for inner shadow effect */}
                <div
                  className={` ${
                    isDarkMode
                      ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100 "
                      : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                  }`}
                ></div>
                {/* Content */}
                <span className="font-bold lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative z-0">
                  03
                </span>
                <span className="text-[0.8rem] relative z-0">OFFICES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ============================= 2 ================================= */}
      <div
        className={`  overflow-hidden py-[3rem] ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center overflow-hidden py-[3rem]">
          <div className="max-w-7xl mx-auto px-6 pt-[0rem] flex flex-col justify-center items-center overflow-hidden">
            <h1 className="dm-serif-display pb-1.5 text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
              why
              <span
                className={`cormorant-garamond capitalize  ps-2.5 pe-1.5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Work
              </span>
              with us?
            </h1>
          </div>
          <div className="max-w-4xl mx-auto lg:mt-[1rem] md:mt-[1rem] mt-[0rem]">
            <p
              className={`uppercase raleway font-semibold text-center lg:text-[1.3rem] md:text-[1.2rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem] ${
                isDarkMode ? "text-white backdrop-blur-md " : "text-black"
              }`}
            >
              perks of being a part of inrext
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6  flex flex-col justify-center items-center lg:h-[20rem]">
          <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 justify-center items-center mx-auto lg:h-[20rem] lg:gap-14 gap-5 ">
            {/* ...perks cards... */}
            {/* Cards code unchanged for brevity */}
            <div className="relative uppercase  bg-blue-500 text-white rounded-xl lg:w-[13rem] w-[10rem] lg:h-[8rem] h-[6.5rem] flex flex-col gap-y-[0.8rem] justify-center items-center text-center overflow-hidden">
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              <Image src="/images/3.png" className="w-8 h-8 z-0" alt="" width={32} height={32} />
              <div className="flex flex-col items-center gap-y-[-0.5rem]">
                <span className="text-sm relative z-0">Competitive</span>
                <span className="text-sm relative z-0 text-blue-500 font-medium">
                  Salary
                </span>
              </div>
            </div>
            <div className="relative uppercase  bg-blue-500 text-white rounded-xl lg:w-[13rem] w-[10rem] lg:h-[8rem] h-[6.5rem] flex flex-col gap-y-[0.8rem] justify-center items-center text-center overflow-hidden">
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              <Image src="/images/2.png" className="w-8 h-8 z-0" alt="" width={32} height={32} />
              <div className="flex flex-col items-center gap-y-[-0.5rem]">
                <span className="text-sm relative z-0">health and</span>
                <span className="text-sm relative z-0 text-blue-500 font-medium">
                  wellness program
                </span>
              </div>
            </div>
            <div className="relative uppercase  bg-blue-500 text-white rounded-xl lg:w-[13rem] w-[10rem] lg:h-[8rem] h-[6.5rem] flex flex-col gap-y-[0.8rem] justify-center items-center text-center overflow-hidden">
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              <Image src="/images/6.png" className="w-8 h-8 z-0" alt="" width={32} height={32} />
              <div className="flex flex-col items-center gap-y-[-0.5rem]">
                <span className="text-sm relative z-0">work life</span>
                <span className="text-sm relative z-0 text-blue-500 font-medium">
                  balance
                </span>
              </div>
            </div>
            <div className="relative uppercase  bg-blue-500 text-white rounded-xl lg:w-[13rem] w-[10rem] lg:h-[8rem] h-[6.5rem] flex flex-col gap-y-[0.8rem] justify-center items-center text-center overflow-hidden">
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              <Image src="/images/1.png" className="w-10 h-10 z-0" alt="" width={40} height={40} />
              <div className="flex flex-col items-center gap-y-[-0.5rem]">
                <span className="text-sm relative z-0">innovation &</span>
                <span className="text-sm relative z-0 text-blue-500 font-medium">
                  growth
                </span>
              </div>
            </div>
            <div className="relative uppercase  bg-blue-500 text-white rounded-xl lg:w-[13rem] w-[10rem] lg:h-[8rem] h-[6.5rem] flex flex-col gap-y-[0.8rem] justify-center items-center text-center overflow-hidden">
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              <Image src="/images/5.png" className="w-8 h-8 z-0" alt="" width={32} height={32} />
              <div className="flex flex-col items-center gap-y-[-0.5rem]">
                <span className="text-sm relative z-0">team building</span>
                <span className="text-sm relative z-0 text-blue-500 font-medium">
                  activities
                </span>
              </div>
            </div>
            <div className="relative uppercase  bg-blue-500 text-white rounded-xl lg:w-[13rem] w-[10rem] lg:h-[8rem] h-[6.5rem] flex flex-col gap-y-[0.8rem] justify-center items-center text-center overflow-hidden">
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              <Image src="/images/4.png" className="w-10 h-10 z-0" alt="" width={40} height={40} />
              <div className="flex flex-col items-center gap-y-[-0.5rem]">
                <span className="text-sm relative z-0">Professional Growth</span>
                <span className="text-sm relative z-0 text-blue-500 font-medium">
                  & Training
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ============================= 3 ================================== */}
      <div
        className={`overflow-hidden py-[3rem] ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center overflow-hidden py-[3rem]">
          <div className="max-w-7xl mx-auto px-6 pt-[0rem] flex flex-col justify-center items-center overflow-hidden">
            <h1 className="dm-serif-display pb-1.5 text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
              find your next
              <span
                className={`cormorant-garamond capitalize  ps-2.5 pe-1.5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Opportunity
              </span>
            </h1>
          </div>
          <div className="max-w-4xl  mx-auto lg:mt-[1rem] md:mt-[1rem] mt-[0rem]">
            <p
              className={`uppercase raleway font-semibold text-center lg:text-[1.3rem] md:text-[1.2rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem] ${
                isDarkMode ? "text-white backdrop-blur-md " : "text-black"
              }`}
            >
              explore your career with inrext
            </p>
          </div>
        </div>

        <div className="max-w-7xl px-6 mx-auto flex flex-col justify-center items-center h-full ">
          <div className="grid lg:grid-cols-2 grid-cols-1 justify-items-center items-center mx-auto h-full w-full gap-10 ">
            <div className="relative  bg-blue-500 text-white rounded-xl w-full lg:h-[14rem] h-[12rem] flex flex-col justify-center px-10 overflow-hidden lg:gap-y-5 gap-y-3">
              {/* Gradient overlay for inner shadow effect */}
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              {/* Content */}
              <span
                className={`font-bold uppercase raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative justify-between z-0 flex items-center  ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Real Estate freelancer
                <MdArrowOutward
                  className={`  ${isDarkMode ? "text-gray-900" : "text-white"}`}
                />
              </span>
              <span
                className={`lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] font-light relative z-0 capitalize text-gray-700 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Join us as a freelance real estate consultant and earn per sale.
                Ideal for self-motivated individuals with strong networking
                skills.
              </span>
              <span
                className={`raleway lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] relative justify-between z-0 flex items-center text-gray-900 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ₹70,000 - ₹1,00,000/Sale
                <span className="raleway flex items-center lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] gap-x-2">
                  <span className="text-blue-500 rounded-full [box-shadow:inset_0_0_8px_0_rgba(59,130,246,0.8)] animate-pulse">
                    <GoDotFill />
                  </span>
                  Full Time
                </span>
              </span>
            </div>
            <div className="relative  bg-blue-500 text-white rounded-xl w-full lg:h-[14rem] h-[12rem] flex flex-col justify-center px-10 overflow-hidden lg:gap-y-5 gap-y-3">
              {/* Gradient overlay for inner shadow effect */}
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              {/* Content */}
              <span
                className={`font-bold uppercase raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative justify-between z-0 flex items-center  ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                telecaller
                <MdArrowOutward
                  className={`  ${isDarkMode ? "text-gray-900" : "text-white"}`}
                />
              </span>
              <span
                className={`lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] font-light relative z-0 capitalize text-gray-700 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Connect with potential clients, schedule meetings, and support
                the sales team. Strong communication skills and confidence are a
                must.
              </span>
              <span
                className={`raleway lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] relative justify-between z-0 flex items-center text-gray-900 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ₹12,000 - ₹15,000/Mo
                <span className="raleway flex items-center lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] gap-x-2">
                  <span className="text-blue-500 rounded-full [box-shadow:inset_0_0_8px_0_rgba(59,130,246,0.8)] animate-pulse">
                    <GoDotFill />
                  </span>
                  Full Time
                </span>
              </span>
            </div>
            <div className="relative  bg-blue-500 text-white rounded-xl w-full lg:h-[14rem] h-[12rem] flex flex-col justify-center px-10 overflow-hidden lg:gap-y-5 gap-y-3">
              {/* Gradient overlay for inner shadow effect */}
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              {/* Content */}
              <span
                className={`font-bold uppercase raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative justify-between z-0 flex items-center  ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                REal Estate Sales Executive
                <MdArrowOutward
                  className={`  ${isDarkMode ? "text-gray-900" : "text-white"}`}
                />
              </span>
              <span
                className={`lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] font-light relative z-0 capitalize text-gray-700 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Drive sales, guide clients, and close property deals. A
                rewarding role for enthusiastic and target-driven individuals.
              </span>
              <span
                className={`raleway lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] relative justify-between z-0 flex items-center text-gray-900 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ₹18,000 - ₹25,000/Mo, + incentive
                <span className="raleway flex items-center lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] gap-x-2">
                  <span className="text-blue-500 rounded-full [box-shadow:inset_0_0_8px_0_rgba(59,130,246,0.8)] animate-pulse">
                    <GoDotFill />
                  </span>
                  Full Time
                </span>
              </span>
            </div>
            <div className="relative  bg-blue-500 text-white rounded-xl w-full lg:h-[14rem] h-[12rem] flex flex-col justify-center px-10 overflow-hidden lg:gap-y-5 gap-y-3">
              {/* Gradient overlay for inner shadow effect */}
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              {/* Content */}
              <span
                className={`font-bold uppercase raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative justify-between z-0 flex items-center  ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Real Estate Sales manager
                <MdArrowOutward
                  className={`  ${isDarkMode ? "text-gray-900" : "text-white"}`}
                />
              </span>
              <span
                className={`lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] font-light relative z-0 capitalize text-gray-700 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Lead a sales team, strategize campaigns, and ensure targets are
                met. Experience in real estate leadership is essential.
              </span>
              <span
                className={`raleway lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] relative justify-between z-0 flex items-center text-gray-900 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Depends upon interview & experience
                <span className="raleway flex items-center lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] gap-x-2">
                  <span className="text-blue-500 rounded-full [box-shadow:inset_0_0_8px_0_rgba(59,130,246,0.8)] animate-pulse">
                    <GoDotFill />
                  </span>
                  Full Time
                </span>
              </span>
            </div>
            <div className="relative  bg-blue-500 text-white rounded-xl w-full lg:h-[14rem] h-[12rem] flex flex-col justify-center px-10 overflow-hidden lg:gap-y-5 gap-y-3">
              {/* Gradient overlay for inner shadow effect */}
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              {/* Content */}
              <span
                className={`font-bold uppercase raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative justify-between z-0 flex items-center  ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Graphic Designer/editor
                <MdArrowOutward
                  className={`  ${isDarkMode ? "text-gray-900" : "text-white"}`}
                />
              </span>
              <span
                className={`lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] font-light relative z-0 capitalize text-gray-700 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Create compelling visuals and edit content for campaigns, social
                media, and marketing materials. Creativity and Adobe skills
                required.
              </span>
              <span
                className={`raleway lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] relative justify-between z-0 flex items-center text-gray-900 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ₹25,000 - ₹35,000
                <span className="raleway flex items-center lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] gap-x-2">
                  <span className="text-blue-500 rounded-full [box-shadow:inset_0_0_8px_0_rgba(59,130,246,0.8)] animate-pulse">
                    <GoDotFill />
                  </span>
                  Full Time
                </span>
              </span>
            </div>
            <div className="relative  bg-blue-500 text-white rounded-xl w-full lg:h-[14rem] h-[12rem] flex flex-col justify-center px-10 overflow-hidden lg:gap-y-5 gap-y-3">
              {/* Gradient overlay for inner shadow effect */}
              <div
                className={` ${
                  isDarkMode
                    ? "absolute inset-0 bg-gradient-to-b from-[#1c398e]  to-[#000000] to-100% opacity-100"
                    : "absolute inset-0 bg-gradient-to-b from-[#51a2ff]  to-[#FFFFFF] to-100% opacity-90"
                }`}
              ></div>
              {/* Content */}
              <span
                className={`font-bold uppercase raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] relative justify-between z-0 flex items-center  ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Coming Soon
                <MdArrowOutward
                  className={`  ${isDarkMode ? "text-gray-900" : "text-white"}`}
                />
              </span>
              <span
                className={`lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] font-light relative z-0 capitalize text-gray-700 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                A new opportunity is around the corner. Stay tuned for our
                upcoming job opening!
              </span>
              <span
                className={`raleway lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] relative justify-between z-0 flex items-center text-gray-900 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                ₹0
                <span className="raleway flex items-center lg:text-[0.9rem] text-[0.8rem] lg:leading-[1.25rem] leading-[1.1rem] gap-x-2">
                  <span className="text-blue-500 rounded-full [box-shadow:inset_0_0_8px_0_rgba(59,130,246,0.8)] animate-pulse">
                    <GoDotFill />
                  </span>
                  Full Time
                </span>
              </span>
            </div>
          </div>
          <div className="flex  flex-col justify-center items-center mt-[3rem] w-full">
            <p
              className={`uppercase raleway font-semibold text-center lg:text-[1.3rem] md:text-[1.2rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem] ${
                isDarkMode ? "text-white backdrop-blur-md " : "text-blue-500"
              }`}
            >
              explore your career with inrext
            </p>
            <button
              onClick={openModal}
              className={`my-8 capitalize flex items-center justify-between w-[12rem] text-center px-2 py-[0.5rem] rounded-full border-t border-blue-500 font-medium ${
                isDarkMode ? "text-white" : "text-blue-500"
              }`}
            >
              <span className="rounded-full [box-shadow:inset_0_0_8px_0_rgba(59,130,246,0.8)] animate-pulse">
                <GoDotFill />
              </span>
              submit your resume
            </button>
          </div>
        </div>
      </div>
      {/* Resume Submission Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Submit Resume"
      >
        <div className={`p-6 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
          <div className="flex justify-between items-center mb-6">
            <h2
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Submit Your Resume
            </h2>
            <button
              onClick={closeModal}
              className={`p-1 rounded-full ${
                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
              }`}
            >
              <MdClose className="text-2xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Your Phone Number"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Workplace Type
                </label>
                <input
                  type="workplace"
                  name="workplace"
                  value={formData.workplace}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Your Workplace type"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Job Location
                </label>
                <input
                  type="joblocation"
                  name="joblocation"
                  value={formData.joblocation}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Your Job location"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Employment Type
                </label>
                <input
                  type="employment"
                  name="employment"
                  value={formData.employment}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Your Employment type"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Job Role
                </label>
                <input
                  type="jobrole"
                  name="jobrole"
                  value={formData.jobrole}
                  onChange={handleInputChange}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-black"
                  }`}
                  placeholder="Your Job role"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className={`block mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Upload Resume
                </label>
                <div
                  className={`p-3 rounded-lg border ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    className="w-full"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <p
                    className={`text-xs mt-1 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    PDF or Word documents only
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-start gap-4">
              <button
                type="button"
                onClick={closeModal}
                className={`px-6 py-2 rounded-lg font-medium ${
                  isDarkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Careers;
