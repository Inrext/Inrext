"use client";
import React, { useEffect, useState } from "react";
type ChildProperty = any;
import { useParams } from "next/navigation";
import { useTheme } from "../../../content/ThemeContext";
import { propertyService } from "../../../../services/propertyService";
import { MdOutlineArrowOutward, MdOutlineCurrencyRupee } from "react-icons/md";
import Image from "next/image";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("../../MapView"), { ssr: false });
import type { Property } from "../../../../services/propertyService";

const PropertyDetails: React.FC = () => {
  // ...existing code from SingleProperties...
  const [showChildModal, setShowChildModal] = useState(false);
  const [childDetails, setChildDetails] = useState<ChildProperty | null>(null);
  const [childImages, setChildImages] = useState<string[]>([]);
  const [childLoading, setChildLoading] = useState(false);
  const params = useParams();
  const name =
    typeof params?.name === "string"
      ? params.name
      : Array.isArray(params?.name)
      ? params.name[0]
      : "";
  const displayName = name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  const { isDarkMode } = useTheme();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [subProperties, setSubProperties] = useState<any[]>([]);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;
    // Log the name and displayName for debugging
    console.log("URL param name:", name);
    console.log("Transformed displayName:", displayName);
    // Call API for parent data based on transformed property name
    const fetchData = async () => {
      try {
        const res = await propertyService.getAllProperties(
          displayName,
          1,
          1,
          "true",
          "false"
        );
        console.log("API response:", res);
        let parent = res?.data?.[0] || null;
        // Patch missing required fields for Property type
        if (parent) {
          parent = {
            ...parent,
            builderName: parent.builderName ?? "",
            projectName: parent.projectName ?? "",
            description: parent.description ?? "",
            location: parent.location ?? "",
            nearby: parent.nearby ?? [],
            amenities: parent.amenities ?? [],
            projectHighlights: parent.projectHighlights ?? [],
            status: parent.status ?? [],
            price: parent.price ?? "",
            minPrice: typeof parent.minPrice === "number" ? parent.minPrice : 0,
            minSize: parent.minSize ?? "",
            maxSize: parent.maxSize ?? "",
            sizeUnit: parent.sizeUnit ?? "",
            images: parent.images ?? [],
            mapLocation: parent.mapLocation ?? undefined,
          };
        }
        setProperty(parent);
        setPropertyId(parent?._id || null);
        // Always fetch sub-properties from backend by parentId to ensure only direct children are shown
        if (parent?._id) {
          try {
            const subRes = await propertyService.getSubProperties(parent._id);
            // Filter to only those whose parentId matches parent._id (should already be the case, but for safety)
            const filtered = (subRes?.data || []).filter(
              (sp: any) =>
                sp.parentId === parent._id || sp.parentId === parent?._id
            );
            setSubProperties(filtered);
          } catch (subErr) {
            setSubProperties([]);
          }
        } else {
          setSubProperties([]);
        }
      } catch (err) {
        setProperty(null);
        setSubProperties([]);
        setPropertyId(null);
      }
    };
    fetchData();
  }, [name]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const normalizeImages = (imgs: any[]): string[] =>
    Array.isArray(imgs) && imgs.length > 0
      ? imgs
          .map((img) => {
            if (typeof img === "string") return img;
            if (typeof img === "object" && img && "url" in img) return img.url;
            return undefined;
          })
          .filter((img): img is string => Boolean(img))
      : [];

  let images = normalizeImages(property.images ?? []);
  if (images.length === 0) images = ["/images/no-image-available.png"];

  return (
    <div
      className={`overflow-hidden ${
        isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Property */}
        <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-x-5 gap-y-5">
          <div className="col-span-2 relative flex flex-col justify-center lg:gap-y-6 gap-y-[0.8rem] lg:mx-10">
            <p
              className={`raleway lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] font-semibold ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              {property.builderName}
            </p>
            <h1
              className={`raleway lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-14 md:leading-[1.8rem] leading-[1.4rem] font-bold pt-0 ${
                isDarkMode ? "text-blue-500 " : "text-black"
              }`}
            >
              {property.projectName}
            </h1>
            <p
              className={`raleway lg:text-[1rem] md:text-[0.9rem] text-[0.8rem] flex items-center ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              {property.minPrice}
              {property.sizeUnit ? ` / ${property.sizeUnit}` : ""}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 w-fit text-white lg:px-6 md:px-4 px-2 uppercase lg:text-[0.7rem] md:text-[0.6rem] text-[0.5rem] lg:py-2 md:py-1 py-1 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              Show Interest
              <MdOutlineArrowOutward className="text-[1.2rem] ms-1" />
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
          {/* Description */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
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
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-4 leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <p>{property.description}</p>
            </div>
          </div>
          {/* Child Property Cards */}
          <div className="py-5 lg:mx-10">
            {subProperties.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No sub-properties found.
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {subProperties.map((child, idx) => {
                  // Normalize images for card
                  let cardImages: string[] = [];
                  if (Array.isArray(child.images) && child.images.length > 0) {
                    cardImages = child.images
                      .map((img: any) => {
                        if (typeof img === "string") return img;
                        if (typeof img === "object" && img && "url" in img)
                          return img.url;
                        return undefined;
                      })
                      .filter((img: any): img is string => Boolean(img));
                  }
                  if (cardImages.length === 0)
                    cardImages = ["/images/no-image-available.png"];

                  return (
                    <div
                      key={child._id || idx}
                      className={`rounded-xl shadow-lg border flex flex-row transition-colors duration-300 overflow-hidden w-full max-w-3xl ${
                        isDarkMode
                          ? "bg-black border-white text-white"
                          : "bg-white border-blue-200 text-black"
                      }`}
                      style={{ minHeight: "120px" }}
                    >
                      {/* Image Section */}
                      <div className="w-40 h-40 relative">
                        <Image
                          src={cardImages[0]}
                          alt={
                            child.projectName ||
                            child.propertyName ||
                            "Child Property"
                          }
                          width={100}
                          height={60}
                          className="object-cover w-full h-full"
                          style={{ objectFit: "cover" }}
                        />
                        {cardImages.length > 1 && (
                          <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="inline-block"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0zm3.5-5a5 5 0 1 0 0 10A5 5 0 0 0 8 3z" />
                            </svg>
                            {cardImages.length}
                          </div>
                        )}
                      </div>
                      {/* Details Section */}
                      <div className="flex flex-col justify-between p-2">
                        <div>
                          <div className="flex flex-col gap-1 ">
                            <span className="font-bold text-2xl">
                              {child.propertyName ||
                                child.projectName ||
                                "Child Property"}
                            </span>
                            <span className="text-lg  capitalize font-extrabold">
                              {child.propertyType || "-"}
                            </span>
                          </div>
                          <div className="flex flex-row gap-4 mt-2">
                            <span className="text-lg font-extralight">
                              <b>Price:</b> {child.price || "-"}
                            </span>
                            <span className="text-lg font-extralight">
                              <b>Size:</b>{" "}
                              {child.size ||
                                (child.minSize
                                  ? `${child.minSize}${
                                      child.sizeUnit ? ` ${child.sizeUnit}` : ""
                                    }`
                                  : "-")}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-6 text-base mb-3">
                            {child.roomType && (
                              <span className="flex items-center gap-1">
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <rect
                                    x="3"
                                    y="7"
                                    width="18"
                                    height="13"
                                    rx="2"
                                  />
                                  <path d="M16 3v4M8 3v4" />
                                </svg>
                                {child.roomType}
                              </span>
                            )}
                            {child.bathroomType && (
                              <span className="flex items-center gap-1">
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M7 10v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-6" />
                                  <path d="M3 10h18" />
                                </svg>
                                {child.bathroomType}
                              </span>
                            )}
                            {child.kitchenType && (
                              <span className="flex items-center gap-1">
                                <svg
                                  width="20"
                                  height="20"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <rect
                                    x="3"
                                    y="7"
                                    width="18"
                                    height="13"
                                    rx="2"
                                  />
                                  <path d="M16 3v4M8 3v4" />
                                </svg>
                                {child.kitchenType}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2">
                          <button
                            className="text-blue-600 font-semibold flex items-center  hover:underline text-md"
                            onClick={async () => {
                              setShowChildModal(true);
                              setChildLoading(true);
                              setChildDetails(null);
                              setChildImages([]);
                              // Fetch child property details from backend
                              let childKey =
                                child.slug || child.name || child.projectName;
                              if (childKey) {
                                try {
                                  const res = await fetch(
                                    `/api/v0/property/${encodeURIComponent(
                                      childKey
                                    )}`
                                  );
                                  const result = await res.json();
                                  let data = result.data || result;
                                  setChildDetails(data);
                                  let imgs = normalizeImages(data.images);
                                  if (imgs.length === 0)
                                    imgs = ["/images/no-image-available.png"];
                                  setChildImages(imgs);
                                } catch (err) {
                                  setChildDetails(null);
                                  setChildImages([
                                    "/images/no-image-available.png",
                                  ]);
                                }
                              }
                              setChildLoading(false);
                            }}
                          >
                            View More Details
                            <svg
                              width="18"
                              height="18"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Child Property Modal */}
          {showChildModal && (
            <div className="fixed inset-0 z-1000 flex justify-center items-center backdrop-blur-md bg-black/40">
              <div
                className={`relative z-1010 rounded-2xl shadow-2xl p-8 w-[90vw] max-w-5xl border-2 transition-colors duration-300 ${
                  isDarkMode
                    ? "bg-black text-white border-white"
                    : "bg-white text-black border-blue-200"
                }`}
              >
                <button
                  className={`absolute top-4 right-6 text-2xl font-bold transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                  onClick={() => {
                    setShowChildModal(false);
                    setChildDetails(null);
                    setChildImages([]);
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
                {childLoading ? (
                  <div className="text-center py-16">Loading...</div>
                ) : childDetails ? (
                  <>
                    <h2 className="text-3xl font-bold mb-6 text-center tracking-tight">
                      {childDetails.projectName ||
                        childDetails.propertyName ||
                        "Property Details"}
                    </h2>
                    {/* Images Section */}
                    <div className="mb-8 flex flex-col items-center">
                      <Image
                        src={childImages[0]}
                        alt={childDetails.projectName || "Property"}
                        width={400}
                        height={250}
                        className="rounded-xl object-cover w-full max-w-md h-[250px]"
                        style={{ objectFit: "cover" }}
                      />
                      <div className="flex gap-2 mt-3 flex-wrap justify-center">
                        {childImages.map((img, idx) => (
                          <Image
                            key={idx}
                            src={img}
                            alt={`Child Thumbnail ${idx + 1}`}
                            width={60}
                            height={40}
                            className={`rounded-lg border-2 cursor-pointer ${
                              childImages[0] === img
                                ? "border-blue-500"
                                : "border-transparent"
                            }`}
                            style={{ width: "60px", height: "40px" }}
                            onClick={() => {
                              setChildImages((prev) => [
                                img,
                                ...prev.filter((i) => i !== img),
                              ]);
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    {/* Details Section */}
                    <div className="mb-8">
                      <div className="font-semibold text-xl mb-3 text-left border-b pb-2">
                        Room Details
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-8 text-base">
                        <div>
                          <span className="font-semibold">Builder:</span>{" "}
                          {childDetails.builderName || "-"}
                        </div>
                        <div>
                          <span className=" capitalize font-semibold">
                            Type:
                          </span>{" "}
                          {childDetails.propertyType
                            ? childDetails.propertyType
                                .charAt(0)
                                .toUpperCase() +
                              childDetails.propertyType.slice(1)
                            : "-"}
                        </div>
                        <div>
                          <span className="font-semibold">Price:</span>{" "}
                          {childDetails.price || childDetails.minPrice || "-"}
                        </div>
                        <div>
                          <span className="font-semibold">Location:</span>{" "}
                          {childDetails.location || "-"}
                        </div>
                        <div>
                          <span className="font-semibold">Size:</span>{" "}
                          {childDetails.minSize
                            ? `${childDetails.minSize}${
                                childDetails.sizeUnit
                                  ? ` ${childDetails.sizeUnit}`
                                  : ""
                              }`
                            : "-"}
                        </div>
                        <div>
                          <span className="font-semibold">Status:</span>{" "}
                          {(childDetails.status || []).join(", ") || "-"}
                        </div>
                      </div>
                    </div>
                    {/* Amenities Section */}
                    <div className="mb-8">
                      <div className="font-semibold text-xl mb-3 text-left border-b pb-2">
                        Room Amenities
                      </div>
                      <div className="text-base">
                        <span className="font-semibold">Amenities:</span>{" "}
                        {(childDetails.amenities || []).join(", ") || "-"}
                      </div>
                    </div>
                    {/* Description Section */}
                    <div>
                      <div className="font-semibold text-xl mb-3 text-left border-b pb-2">
                        Description
                      </div>
                      <div className="text-base text-left whitespace-pre-line">
                        {childDetails.description || "-"}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-16 text-red-500">
                    Failed to load property details.
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Location */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
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
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-4 leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              {Array.isArray(property.location) ? (
                <ul className="grid grid-cols-2 gap-2">
                  {(property.location || []).map((location, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span> {location}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{property.location}</p>
              )}
            </div>
          </div>
          {/* NearBy */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
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
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-4 leading-[0.9rem] ${
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
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
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
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-4 leading-[0.9rem] ${
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
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Project Highlights
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-4 leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <ul className="grid grid-cols-2 gap-2">
                {(property.projectHighlights || []).map(
                  (projectHighlight, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-2">•</span> {projectHighlight}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          {/* Status */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
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
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-4 leading-[0.9rem] ${
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
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 border-b! border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Map
              </h1>
            </div>
            <div
              className="col-span-3"
              style={{ position: "relative", zIndex: 10 }}
            >
              <MapView
                location={{
                  lat: property?.mapLocation?.lat ?? 0,
                  lng: property?.mapLocation?.lng ?? 0,
                }}
                propertyName={property?.projectName || "Property Location"}
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
              ${
                isDarkMode
                  ? "bg-black text-white border-blue-900"
                  : "bg-white text-black border-blue-200"
              }`}
          >
            <button
              className={`absolute top-4 right-6 text-1xl font-bold transition-colors duration-200
                ${
                  isDarkMode
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              onClick={() => {
                setShowModal(false);
                setSubmitted(false);
              }}
              aria-label="Close"
            >
              ×
            </button>
            <h2
              className={`text-2xl font-bold mb-6 text-center transition-colors duration-200
              ${isDarkMode ? "text-blue-400" : "text-blue-500"}`}
            >
              Show Interest
            </h2>
            {submitted ? (
              <div className="text-green-600 font-semibold py-16 text-center text-lg">
                Thank you for your interest!
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await fetch("/api/interest", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        ...form,
                        propertyName: property?.projectName || "",
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
                  <label
                    htmlFor="name"
                    className={`font-semibold text-base transition-colors duration-200
                    ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    Name:
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200
                      ${
                        isDarkMode
                          ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400"
                          : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"
                      } border-2`}
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="phone"
                    className={`font-semibold text-base transition-colors duration-200
                    ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    Phone Number:
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200
                      ${
                        isDarkMode
                          ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400"
                          : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"
                      } border-2`}
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: e.target.value }))
                    }
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className={`font-semibold text-base transition-colors duration-200
                    ${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    Email:
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`rounded-lg px-4 py-2 text-lg focus:outline-none transition-colors duration-200
                      ${
                        isDarkMode
                          ? "bg-gray-800 border-blue-900 text-white placeholder-gray-400 focus:border-blue-400"
                          : "bg-white border-blue-200 text-black placeholder-gray-500 focus:border-blue-500"
                      } border-2`}
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                  />
                </div>
                <button
                  type="submit"
                  className={`rounded-lg px-1 py-3 mt-4 font-semibold text-lg transition
                    ${
                      isDarkMode
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

export default PropertyDetails;
