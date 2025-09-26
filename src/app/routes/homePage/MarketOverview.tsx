// "use client";

// import React, { useEffect, useState } from "react";
// import { FaArrowUp } from "react-icons/fa6";
// import { useTheme } from "../../content/ThemeContext";
// import AOS from "aos";
// import "aos/dist/aos.css";

// type Method = "Cash" | "Mortgage";
// type Option = "Both" | "1st Sale" | "ReSale";

// type Stats = {
//   salesValue: string;
//   transactions: string;
//   pricePerSqft?: string;
//   changes: {
//     salesValue: string;
//     transactions: string;
//     pricePerSqft?: string;
//   };
// };

// type StatsData = {
//   [key in Option]: {
//     [method in Method]: Stats;
//   };
// };

// const statsData: StatsData = {
//   Both: {
//     Cash: {
//       salesValue: "45.32 lakh crore",
//       transactions: "173,241",
//       pricePerSqft: "6,163K",
//       changes: {
//         salesValue: "33%",
//         transactions: "10.6%",
//         pricePerSqft: "09%",
//       },
//     },
//     Mortgage: {
//       salesValue: "450.0B",
//       transactions: "160.0K",
//       changes: {
//         salesValue: "28%",
//         transactions: "35%",
//       },
//     },
//   },
//   "1st Sale": {
//     Cash: {
//       salesValue: "300.2B",
//       transactions: "100.0K",
//       pricePerSqft: "1.2K",
//       changes: { salesValue: "20%", transactions: "25%", pricePerSqft: "8%" },
//     },
//     Mortgage: {
//       salesValue: "270.0B",
//       transactions: "90.0K",
//       changes: {
//         salesValue: "18%",
//         transactions: "22%",
//       },
//     },
//   },
//   ReSale: {
//     Cash: {
//       salesValue: "200.1B",
//       transactions: "58.9K",
//       pricePerSqft: "1.3K",
//       changes: {
//         salesValue: "18%",
//         transactions: "22%",
//         pricePerSqft: "10%",
//       },
//     },
//     Mortgage: {
//       salesValue: "180.0B",
//       transactions: "50.0K",
//       changes: {
//         salesValue: "15%",
//         transactions: "20%",
//       },
//     },
//   },
// };

// const MarketOverview: React.FC = () => {
//   const { isDarkMode } = useTheme();
//   const [selectedOption, setSelectedOption] = useState<Option>("Both");
//   const [selectedMethod, setSelectedMethod] = useState<Method>("Cash");

//   const currentData = statsData[selectedOption][selectedMethod];

//   useEffect(() => {
//     AOS.init({
//       once: true,
//     });
//   }, []);

//   return (
//     <div
//       className={`py-[0rem] ${
//         isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
//       }`}
//     >
//       <div
//         className="lg:px-14 lg:py-0 px-5 py-0 overflow-hidden"
//         data-aos="fade-up"
//         data-aos-duration="1200"
//       >
//         <div
//           className={`w-full h-auto rounded-3xl lg:px-8 px-5 py-10 ${
//             isDarkMode ? "bg-transparent backdrop-blur-md" : "bg-blue-50"
//           }`}
//         >
//           <h1
//             className={`inter font-bold lg:text-[1.3rem] text-[1.2rem] lg:leading-[1.25rem] leading-[1.1rem] ${
//               isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"
//             }`}
//           >
//             Property Market Overview
//           </h1>

//           {/* Buttons */}
//           <div className="flex lg:flex-nowrap flex-wrap justify-between lg:pt-[2.5rem] pt-[2rem] w-[45vw] lg:gap-10 gap-2">
//             {/* Cash Button */}
//             <div className="text-lg flex flex-row ">
//               {(["Cash", "Mortgage"] as Method[]).map((method) => (
//                 <button
//                   key={method}
//                   onClick={() => setSelectedMethod(method)}
//                   className={`${
//                     selectedMethod === method
//                       ? "bg-blue-500 text-white lg:text-[0.8rem] text-[0.7rem]"
//                       : "bg-white lg:text-[0.8rem] text-[0.7rem] text-gray-900 border border-blue-500"
//                   } px-5 py-2 lg:w-[5rem] w-[8rem] cursor-pointer ${
//                     method === "Cash" ? "rounded-s-lg" : "rounded-e-lg"
//                   }`}
//                 >
//                   {method}
//                 </button>
//               ))}
//             </div>

//             {/* Both, 1st Sale, ReSale Buttons */}
//             <div className="text-lg flex flex-row">
//               {(["Both", "1st Sale", "ReSale"] as Option[]).map(
//                 (option, index, array) => (
//                   <button
//                     key={option}
//                     onClick={() => setSelectedOption(option)}
//                     className={`px-5 py-2 lg:w-[5.5rem] w-[5.3rem] leading-5 border border-blue-500 cursor-pointer 
//           ${index === 0 ? "rounded-s-lg  " : ""} 
//           ${index === array.length - 1 ? "rounded-e-lg  " : ""} 
//           ${
//             selectedOption === option
//               ? "bg-blue-400 text-white lg:text-[0.8rem] text-[0.7rem]"
//               : "bg-white text-black lg:text-[0.8rem] text-[0.7rem]"
//           }`}
//                   >
//                     {option}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div
//             className="h-auto rounded-xl lg:mt-[2.5rem] mt-[2rem] p-[2px]"
//             style={{
//               background:
//                 "conic-gradient(from 215deg at 50% 50%, #f424b4 0deg, #bd2ae9 calc(360deg / 7 * 1), #ffee55 calc(360deg / 7 * 2), #abf6f9 calc(360deg / 7 * 3), #677eff calc(360deg / 7 * 4), #ffad52 calc(360deg / 7 * 5), #ff3867 calc(360deg / 7 * 6), #f424b4 360deg)",
//             }}
//           >
//             <div
//               className={`h-full w-full rounded-xl flex flex-wrap justify-between items-center lg:px-10 px-5 py-10 lg:gap-10 gap-5 ${
//                 isDarkMode ? "bg-black backdrop-blur-md " : "bg-white"
//               }`}
//             >
//               {(["salesValue", "transactions", "pricePerSqft"] as (keyof Stats)[]).map((key) => (
//                 <div
//                   key={key}
//                   className={`${
//                     isDarkMode
//                       ? "text-white  backdrop-blur-md "
//                       : "text-gray-900"
//                   }`}
//                 >
//                   <h1 className="lg:text-[1.3rem] text-[1.2rem] lg:leading-[1.25rem] leading-[1rem] font-bold">
//                     {currentData[key] ?? "--"}
//                   </h1>
//                   <p className="text-[#a1a1a6] lg:text-[0.8rem] text-[0.7rem] lg:leading-[1.25rem] leading-[1rem]  py-2">
//                     {key === "salesValue"
//                       ? selectedMethod === "Mortgage"
//                         ? "Mortgage value (INR)"
//                         : "Sales value (INR)"
//                       : key === "transactions"
//                       ? selectedMethod === "Mortgage"
//                         ? "Mortgage transactions (Volume)"
//                         : "Sales transactions (Volume)"
//                       : selectedMethod === "Mortgage"
//                       ? null
//                       : "Price per sqft (INR)"}
//                   </p>
//                   {key !== "pricePerSqft" || selectedMethod !== "Mortgage" ? (
//                     <h2 className="lg:text-[0.8rem] text-[0.7rem] lg:leading-[1.25rem] leading-[1rem] flex items-center gap-1">
//                       <span className="flex items-center gap-1 text-green-600">
//                         <FaArrowUp />
//                         {currentData.changes[key as keyof typeof currentData.changes] ?? "--"}
//                       </span>
//                       YoY change
//                     </h2>
//                   ) : null}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MarketOverview;