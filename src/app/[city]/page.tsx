"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import Image from "next/image";
import { useTheme } from "../content/ThemeContext";

const properties = [
	{
		id: 1,
		builder: "Urbainia",
		name: "Urbainia Trinity NX ",
		description:
			"Urbainia Trinity NX is a premium residential project offering luxurious 2/3/4 BHK apartments with modern amenities.",
		location: "Techzone 4, Greater Noida West, Greater Noida",
		price: "₹ 60 Lac* Onwards",
		size: "1250 - 2450 Sq. Ft.",
		type: "Residential",
		status: "Ready to Move",
		images: [
			"/images/Urbainia/Urbainai Trinity NX image 3.jpg",
			"/images/Urbainia/Urbainia Trinity NX image 1.jpg",
			"/images/Urbainia/Urbainia Trinity NX image 2.jpg",
		],
	},
	{
		id: 2,
		builder: "Migsun",
		name: "Migsun Rohini Central",
		description:
			"Migsun Rohini Central is a modern residential project offering 2/3 BHK apartments with contemporary design and amenities.",
		location: "Sector 22, Rohini, North Delhi ",
		price: "₹ 1.20 Cr* Onwards",
		size: "850 - 1150 Sq. Ft.",
		type: "Residential",
		status: "Under Construction",
		images: [
			"/images/Migsun Rohini Central/Migsun Rohini Central Image 1.jpg",
			"/images/Migsun Rohini Central/Migsun Rohini Central Image 2.jpg",
			"/images/Migsun Rohini Central/Migsun Rohini Central Image 3.jpg",
		],
	},
	{
		id: 3,
		builder: "KW",
		name: "KW Delhi 6",
		description:
			"KW Delhi 6 is a premium residential project offering luxurious 3/4 BHK apartments with modern amenities in Ghaziabad.",
		location: "NH 58 Bypass, Raj Nagar Extension, Ghaziabad, Uttar Pradesh – 201017",
		price: "₹ 75 Lac* Onwards",
		size: "1500 - 3000 Sq. Ft.",
		type: "Residential",
		status: "Ready to Move",
		images: [
			"/images/KW Delhi 6/KW Delhi 6 Image 2.jpeg",
			"/images/KW Delhi 6/KW Delhi 6 Image 1.jpeg",
			"/images/KW Delhi 6/KW Delhi 6 Image 3.jpeg",
		],
	},
	{
		id: 4,
		builder: "KW",
		name: "KW Blue Pearl",
		description:
			"KW Blue Pearl is a luxurious residential project offering 3/4 BHK apartments with modern design and top-notch amenities.",
		location: "DB Gupta Road, Karol Bagh, Central Delhi ",
		price: "₹ 1.50 Cr* Onwards",
		size: "1800 - 3500 Sq. Ft.",
		type: "Residential",
		status: "Under Construction",
		images: [
			"/images/KW Blue Pearl/KW Blue Pearl image 7.jpg",
			"/images/KW Blue Pearl/KW Blue Pearl image 1.jpg",
			"/images/KW Blue Pearl/KW Blue Pearl image 2.jpg",
		],
	},
	{
		id: 5,
		builder: "Nishtha Homes",
		name: "Eco Village Cottage & Resort",
		description:
			"Eco Village Cottage & Resort offers a unique blend of luxury and nature with its premium cottages and resort facilities in Dehradun.",
		location: "Dehradun, Uttarakhand, India (Proximity to Mussoorie, Rishikesh & Haridwar) ",
		price: "₹ 30 Lac* Onwards",
		size: "600 - 1200 Sq. Ft.",
		type: "Cottage, Resort",
		status: "Ready to Move",
		images: [
			"/images/Eco Village/Eco Village 4.jpg",
			"/images/Eco Village/Eco Village 1.jpg",
			"/images/Eco Village/Eco Village 2.jpg",
		],
	},
	{
		id: 6,
		builder: "Sui Generis",
		name: "Sui generis Residenncy",
		description:
			"Sui generis Residenncy is an exclusive residential project in Dholera, offering luxurious 3/4 BHK apartments with modern amenities.",
		location: "Ratanpur, Dholera, Gujarat  ",
		price: "₹ 40 Lac* Onwards",
		size: "900 - 1800 Sq. Ft.",
		type: "Residential",
		status: "Under Construction",
		images: [
			"/images/Sui generis Residenncy/Sui generis Residenncy.webp",
			"/images/Sui generis Residenncy/Sui generis Residenncy 1.webp",
			"/images/Sui generis Residenncy/Sui generis Residenncy 2.webp",
		],
	},
	{
		id: 7,
		builder: "Teja Buildtech",
		name: "Sky Harbor",
		description:
			"Sky Harbor is a premium residential project offering luxurious 3/4 BHK apartments with modern amenities near Jewar Airport.",
		location: "Jewar-Tappal Major District Road, Yamuna Expressway, Greater Noida",
		price: "₹ 55 Lac* Onwards",
		size: "1200 - 2400 Sq. Ft.",
		type: "Residential",
		status: "Ready to Move",
		images: [
			"/images/Sky Harbor/Sky Harbor.webp",
			"/images/Sky Harbor/Sky Harbor 1.webp",
			"/images/Sky Harbor/Sky Harbor 2.webp",
		],
	},
	{
		id: 8,
		builder: "AADVI Group",
		name: "The Adriatico",
		description:
			"The Adriatico is a luxurious residential project offering 3/4 BHK apartments with stunning views and modern amenities.",
		location: [
			"At the Centre of JP Sports City, Yamuna Expressway, Greater Noida",
			"Strategically located near Yamuna Expressway",
			"Direct connectivity to Noida International Airport",
			"Well connected to Delhi and Agra",
			"Proximity to educational and commercial hubs",
		],
		price: "₹ 1.20 Cr* Onwards",
		size: "1500 - 3000 Sq. Ft.",
		type: "Residential",
		status: "Under Construction",
		images: ["/images/The Adriatico/The Adriatico.webp"],
	},
];

// Helper to get city slug for a property
function getCitySlug(prop: any): string {
	const locationStr = Array.isArray(prop.location)
		? prop.location.join(" ").toLowerCase()
		: prop.location.toLowerCase();

	if (locationStr.includes("delhi")) return "delhi";
	if (locationStr.includes("greater noida")) return "greater-noida";
	if (locationStr.includes("ghaziabad")) return "ghaziabad";
	if (locationStr.includes("dehradun")) return "dehradun";
	if (locationStr.includes("dholera")) return "dholera";
	if (locationStr.includes("yamuna expressway")) return "greater-noida";
	// fallback: use first word as city
	return (locationStr.split(",")[0] || "city").replace(/\s+/g, "-");
}

// Update PropertyCard to accept isDarkMode as a prop
function PropertyCard({ prop, isDarkMode }: { prop: any; isDarkMode: boolean }) {
	const citySlug = getCitySlug(prop);
	const nameSlug = encodeURIComponent(prop.name.replace(/\s+/g, "-").toLowerCase());
	return (
		<Link
			href={`/${citySlug}/${nameSlug}`}
			className={`flex flex-col sm:flex-row p-2 gap-4 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow ${
				isDarkMode ? "bg-[#181818]" : "bg-white"
			}`}
		>
			{/* Image */}
			<div className="w-full sm:w-[12rem] h-[10rem] sm:h-[12rem] flex-shrink-0 flex justify-center items-center">
				<Image
					src={Array.isArray(prop.images) ? prop.images[0] : prop.images}
					className="w-full h-full rounded-xl object-cover"
					alt={prop.name}
					width={300}
					height={200}
				/>
			</div>
			{/* Content */}
			<div className="flex flex-col justify-between flex-1 py-2 sm:py-2 px-1 sm:px-0">
				<div>
					<h2
						className={`capitalize font-semibold text-[1.1rem] mb-1 sm:mb-2 ${
							isDarkMode ? "text-white" : "text-black"
						}`}
					>
						{prop.name}
					</h2>
					<p
						className={`text-[0.9rem] mb-2 ${
							isDarkMode ? "text-gray-300" : "text-gray-700"
						}`}
					>
						{prop.description.length > 100
							? prop.description.substring(0, 100) + "..."
							: prop.description}
					</p>
				</div>
				<div className={`flex flex-col sm:flex-row flex-wrap sm:justify-between items-start sm:items-center gap-1 sm:gap-0 font-medium ${
					isDarkMode ? "text-blue-400" : "text-blue-500"
				}`}>
					<p className="flex items-center text-[0.95rem]">
						<SlSizeFullscreen className="mr-1" />
						<span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>{prop.size}</span>
					</p>
					<p className="flex items-center text-[0.95rem]">
						<IoLocationOutline className="mr-1" />
						<span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>
							{Array.isArray(prop.location)
								? prop.location[0].length > 20
									? prop.location[0].substring(0, 20) + "..."
									: prop.location[0]
								: prop.location.length > 20
								? prop.location.substring(0, 20) + "..."
								: prop.location}
						</span>
					</p>
					<p className="flex items-center text-[0.95rem]">
						<MdOutlineCurrencyRupee className="mr-1" />
						<span className={isDarkMode ? "text-blue-400" : "text-blue-600"}>{prop.price}</span>
					</p>
				</div>
			</div>
		</Link>
	);
}

export default function CityPage() {
	const { city } = useParams();
	const { isDarkMode } = useTheme();

	// Normalize city param for comparison
	const cityParam = (city as string).toLowerCase().replace(/\s+/g, "");

	const isGreaterNoida =
		cityParam.includes("greaternoida") ||
		cityParam.includes("gnoida") ||
		cityParam.includes("noidaextension");

	const cityProperties = properties.filter((prop) => {
		const isUrbainia = prop.builder.toLowerCase() === "urbainia";
		const isAdriatico = prop.name.toLowerCase().includes("adriatico");
		const isSkyHarbor = prop.name.toLowerCase().includes("sky harbor");
		const locationStr = Array.isArray(prop.location)
			? prop.location.join(" ").toLowerCase()
			: prop.location.toLowerCase();

		if (isUrbainia || isAdriatico || isSkyHarbor) {
			// Only show Urbainia, The Adriatico, and Sky Harbor in Greater Noida section
			return isGreaterNoida && locationStr.includes("greater noida");
		}
		// For other properties, match as before
		if (Array.isArray(prop.location)) {
			return prop.location.some((loc) =>
				loc.toLowerCase().includes(cityParam)
			);
		}
		return locationStr.includes(cityParam);
	});

	// Use the first property as the city data for header, or fallback to city name
	const data = cityProperties[0] || {
		name: city,
		description: `Explore properties in ${city}.`,
		img: "/images/default-city.jpg", // fallback image
	};

	// Compute clean city name for heading
	const cleanCityName = (() => {
		const c = (city as string).toLowerCase();
		if (c.includes("delhi")) return "Delhi";
		if (c.includes("gnoida") || c.includes("greaternoida") || c.includes("noidaextension")) return "Greater Noida";
		return data.name;
	})();

	return (
		<div className={`${isDarkMode ? "bg-black" : "bg-white"} min-h-screen w-full`}>
			{/* Exclusive Listing Heading and Subheading at top */}
			<div className="w-full max-w-7xl mx-auto px-4 pt-32">
				<h1 className={`dm-serif-display text-center ${isDarkMode ? "text-blue-400" : "text-blue-500"} lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize mb-2`}>
					{cleanCityName}{" "}
					<span
						className={`cormorant-garamond ps-2 pe-2 ${
							isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"
						}`}
					>
						Exclusive Listing
					</span>
				</h1>
				<p
					className={`raleway uppercase font-semibold lg:text-2xl text-[1rem] text-center mb-16 ${
						isDarkMode ? "text-white backdrop-blur-md" : "text-blue-500"
					}`}
				>
					{`Explore, Compare, and Choose from the Best Real Estate Listings in ${cleanCityName}.`}
				</p>
			</div>
			{/* Property Cards moved to top, just below heading */}
			<div className="w-full max-w-7xl mx-auto px-4 pb-16">
				<div className="grid lg:grid-cols-2 grid-cols-1 gap-8">
					{cityProperties.length === 0 && (
						<div className={`col-span-2 text-center ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
							No properties found for {data.name}.
						</div>
					)}
					{cityProperties.map((prop) => (
						<PropertyCard key={prop.id} prop={prop} isDarkMode={isDarkMode} />
					))}
				</div>
			</div>
			{/*if you want extra spacing below then use pb-16 below otherwise left it as is */}
		</div>
	);
}

