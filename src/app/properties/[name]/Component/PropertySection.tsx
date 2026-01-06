import React from "react";

type PropertySectionProps = {
  title: string;
  children: React.ReactNode;
  isDarkMode: boolean;
};

const PropertySection: React.FC<PropertySectionProps> = ({ title, children, isDarkMode }) => (
  <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
    <div className="col-span-2">
      <h1 className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${isDarkMode ? "text-white " : "text-black"}`}>{title}</h1>
    </div>
    <div className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-4 leading-[0.9rem] ${isDarkMode ? "text-white " : "text-black"}`}>{children}</div>
  </div>
);

export default PropertySection;
