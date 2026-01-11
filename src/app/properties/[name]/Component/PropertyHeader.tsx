import React from "react";

type PropertyHeaderProps = {
  builderName: string;
  projectName: string;
  minPrice: string | number;
  sizeUnit: string;
  isDarkMode: boolean;
  onShowInterest: () => void;
};

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ builderName, projectName, minPrice, sizeUnit, isDarkMode, onShowInterest }) => (
  <div className="col-span-2 relative flex flex-col justify-center lg:gap-y-6 gap-y-[0.8rem] lg:mx-10">
    <p className={`raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] font-semibold ${isDarkMode ? "text-white " : "text-black"}`}>{builderName}</p>
    <h1 className={`raleway lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-14 md:leading-[1.8rem] leading-[1.4rem] font-bold pt-0 ${isDarkMode ? "text-blue-500 " : "text-black"}`}>{projectName}</h1>
    <p className={`raleway lg:text-[1rem] md:text-[0.9rem] text-[0.8rem] flex items-center ${isDarkMode ? "text-white " : "text-black"}`}>{minPrice}{sizeUnit ? ` / ${sizeUnit}` : ""}</p>
    <button onClick={onShowInterest} className="flex items-center gap-1 w-fit text-white lg:px-6 md:px-4 px-2 uppercase lg:text-[0.7rem] md:text-[0.6rem] text-[0.5rem] lg:py-2 md:py-1 py-1 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold">Show Interest</button>
  </div>
);

export default PropertyHeader;
