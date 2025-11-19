"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../../content/ThemeContext";
import { MdOutlineArrowOutward, MdOutlineCurrencyRupee } from "react-icons/md";
import Image from "next/image";
import dynamic from "next/dynamic";
// Dynamically import MapView with SSR disabled
const MapView = dynamic(() => import("../../properties/MapView"), { ssr: false });

type PropertyImage = string | { url: string };
type Property = {
  _id?: string;
  slug?: string;
  builderName?: string;
  name?: string;
  projectName?: string;
  features?: string[];
  description?: string;
  location?: string | string[];
  nearby?: string[];
  amenities?: string[];
  projectHighlights?: string[];
  status?: string[];
  price?: string;
  minSize?: string;
  maxSize?: string;
  sizeUnit?: string;
  images?: PropertyImage[];
  locationMap?: string;
  mapLocation?: {
    lat?: number;
    lng?: number;
  };
};



const SingleProperties: React.FC = () => {
  const params = useParams();
  const name =
    typeof params?.name === "string"
      ? params.name
      : Array.isArray(params?.name)
      ? params.name[0]
      : "";
  const { isDarkMode } = useTheme();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    if (!name) return;
    const fetchProperty = async () => {
      try {
        // Use slug (name param) to fetch property from backend
        const res = await fetch(`/api/v0/property/${encodeURIComponent(name)}`);
        const result = await res.json();
        let data = result.data || result;
        // Remove 'features' if present
        if (data && data.features) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { features, ...rest } = data;
          data = rest;
        }
        setProperty(data);
        setSelectedImage(0);
      } catch (err) {
        setProperty(null);
      }
    };
    fetchProperty();
  }, [name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  if (!property) {
    return <div>Loading...</div>;
  }


  // Normalize images: support array of objects (with url) or array of strings
  let images: string[] = [];
  if (Array.isArray(property.images) && property.images.length > 0) {
    images = property.images
      .map((img) => {
        if (typeof img === "string") return img;
        if (typeof img === "object" && img && "url" in img) return img.url;
        return undefined;
      })
      .filter((img): img is string => Boolean(img));
  }
  if (images.length === 0) {
    images = ["/images/no-image-available.png"];
  }

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-[5rem]">
        {/* Property */}
        <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-x-5 gap-y-5">
          <div className="col-span-2 relative flex flex-col justify-center lg:gap-y-[1.5rem] gap-y-[0.8rem] lg:mx-10">
            <p
              className={`raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] font-semibold ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              {property.builderName || ""}
            </p>
            <h1
              className={`raleway lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[3.5rem] md:leading-[1.8rem] leading-[1.4rem] font-bold pt-0 ${
                isDarkMode ? "text-blue-500 " : "text-black"
              }`}
            >
              {property.projectName || ""}
            </h1>
            <p
              className={`raleway lg:text-[1rem] md:text-[0.9rem] text-[0.8rem] flex items-center ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <MdOutlineCurrencyRupee />
              {property.price || ""}
            </p>
            {/* Show Interest Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 w-fit text-white lg:px-6 md:px-4 px-2 uppercase lg:text-[0.7rem] md:text-[0.6rem] text-[0.5rem] lg:py-2 md:py-1 py-1 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              Show Interest <MdOutlineArrowOutward className="text-[1.2rem] ms-1" />
            </button>
          </div>
          <div className="col-span-3">
            {/* Main Image */}
            <div>
              {images[selectedImage] && (
                <Image
                  src={images[selectedImage]}
                  alt={`Property ${selectedImage + 1}`}
                  width={800}
                  height={419}
                  className="w-full lg:h-[419px] md:h-[300px] h-[200px] object-cover rounded-xl"
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              )}
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3">
              {images.map((img, idx) =>
                img ? (
                  <Image
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={80}
                    height={60}
                    className={`cursor-pointer object-cover rounded-lg border-2 ${
                      selectedImage === idx
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    style={{
                      width: "80px",
                      height: "60px",
                      opacity: selectedImage === idx ? 1 : 0.8,
                      transition: "border 0.2s, opacity 0.2s",
                    }}
                    onClick={() => setSelectedImage(idx)}
                    sizes="80px"
                    priority={selectedImage === idx}
                  />
                ) : null
              )}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-5">
          {/* Features section removed as 'features' is excluded from backend data */}
          {/* Description */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Description
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-[1rem] leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <p>{property.description || ""}</p>
            </div>
          </div>
          {/* Location */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Location
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-[1rem] leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              {Array.isArray(property.location) ? (
                <ul className="grid grid-cols-2 gap-2">
                  {property.location.map((location, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span> {location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{property.location || ""}</p>
              )}
            </div>
          </div>
          {/* NearBy */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                NearBy
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-[1rem] leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <ul className="grid grid-cols-2 gap-2">
                {(property.nearby || []).map((nearby, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span> {nearby}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Amenities */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Amenities
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-[1rem] leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <ul className="grid grid-cols-2 gap-2">
                {(property.amenities || []).map((amenitie, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span> {amenitie}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Project Highlights */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Project Highlights{" "}
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-[1rem] leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <ul className="grid grid-cols-2 gap-2">
                {(property.projectHighlights || []).map((projectHighlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span> {projectHighlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Status */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Status
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-[1rem] leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <ul className="grid grid-cols-2 gap-2">
                {(property.status || []).map((statu, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span> {statu}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        {/* Map */}
<div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
  <div className="col-span-2">
    <h1
      className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
        isDarkMode ? "text-white " : "text-black"
      }`}
    >
      Map
    </h1>
  </div>

  <div className="col-span-3">
    <MapView 
      location={{
        lat: property?.mapLocation?.lat ?? 0,
        lng: property?.mapLocation?.lng ?? 0
      }}
      propertyName={property?.projectName || property?.name || "Property Location"}
    />
  </div>
</div>

        </div>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex justify-center mt-20 items-start backdrop-blur-md bg-opacity-40">
          <div
            className={`mt-10 rounded-2xl shadow-2xl p-8 w-[90vw] max-w-md relative border-2 transition-colors duration-300
              ${isDarkMode
                ? "bg-black text-white border-blue-900"
                : "bg-white text-black border-blue-200"
              }`}
          >
            <button
              className={`absolute top-4 right-6 text-1xl font-bold transition-colors duration-200
                ${isDarkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-400 hover:text-gray-700"}`}
              onClick={() => {
                setShowModal(false);
                setSubmitted(false);
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className={`text-2xl font-bold mb-6 text-center transition-colors duration-200
              ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}>
              Show Interest
            </h2>
            {submitted ? (
              <div className="text-green-600 font-semibold py-16 text-center text-lg">
                Thank you for your interest!
              </div>
            ) : (
              <form
                onSubmit={async e => {
                  e.preventDefault();
                  try {
                    await fetch("/api/interest", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...form,
                        propertyName: property?.name || "",
                      }),
                    });
                  } catch (err) {
                    // Optionally handle error
                  }
                  setSubmitted(true);
                }}
                className="flex flex-col gap-6"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className={`font-semibold text-base transition-colors duration-200
                    ${isDarkMode ? "text-white" : "text-black"}`}>
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200
                      ${isDarkMode
                        ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400"
                        : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"
                      } border-2`}
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className={`font-semibold text-base transition-colors duration-200
                    ${isDarkMode ? "text-white" : "text-black"}`}>
                    Phone Number:
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200
                      ${isDarkMode
                        ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400"
                        : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"
                      } border-2`}
                    required
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className={`font-semibold text-base transition-colors duration-200
                    ${isDarkMode ? "text-white" : "text-black"}`}>
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200
                      ${isDarkMode
                        ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400"
                        : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"
                      } border-2`}
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <button
                  type="submit"
                  className={`rounded-lg px-1 py-3 mt-4 font-semibold text-lg transition
                    ${isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProperties;