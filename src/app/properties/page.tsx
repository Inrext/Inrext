"use client";
import React, { useState, useEffect } from "react";
import AOS from "aos";
import { CustomArrowProps } from "react-slick";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaBed } from "react-icons/fa6";
import { FiDroplet } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import WhyChooseUs from "../routes/WhyChooseUs/WhyChooseUs";
import Link from "next/link";
import { useTheme } from "../content/ThemeContext";
import Image from "next/image";

// Mock data for properties
const properties = [
  {
    id: 1,
    builder: "Urbainia",
    name: "Urbainia Trinity NX ",
    features: [
      "Office Space",
      "10 Floors",
      " 2 Towers",
      "50% Open Area",
      "Flexible Unit Sizes ",
      "Modern Architecture",
      "High-Speed Elevators ",
      "100% Power Backup ",
      "Advanced Security",
      "Ample Parking Space ",
      "Wi-Fi Enabled Zones",
      "Eco-Friendly Infrastructure",
      "Food Court & Cafeteria ",
      "Conference & Meeting Rooms ",
      "Fire Safety Systems",
      "Strategic Location",
    ],
    description:
      "Discover thoughtfully designed office spaces at prime locations, ideal for startups, SMEs, and established businesses. With flexible sizes, modern amenities, and strategic connectivity, our commercial offerings are crafted to elevate your professional presence and ensure long-term value.Smart investment. Seamless workspaces. Strong returns.",
    location: "Techzone 4, Greater Noida West, Greater Noida",
    nearby: [
      "Gaur Chowk – 5 Km ",
      "Gaur City Mall – 5.3 Km",
      "FNG Expressway – 5.5 Km",
      "Noida Sector 101 Metro Station – 9.3 Km",
      "IGI Airport – 41.3 Km",
    ],
    amenities: [
      "Swimming Pool",
      "Gymnasium",
      "Club House",
      "Golf Course",
      "Children's Play Area",
      "Park",
      "Badminton Court",
      "Basketball Court",
      "Shopping Centre",
    ],
    projectHighlights: [
      "Mixed-Use Development",
      "Prime Location",
      "Excellent Connectivity",
      "Modern Architecture",
      "Retail Opportunities",
      "Serviced Apartments",
      "Ample Parking",
      "High-End Security",
      "Green Spaces",
      "Power Backup",
    ],
    status: [
      "Partially Ready to Move",
      "RERA Registered",
      "Under Construction",
    ],
    price: "6,990/ Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "500 - 5000/ Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/Urbainia/Urbainai Trinity NX image 3.jpg",
      // "/images/Urbainia/Urbainai Trinity NX image 2.jpg",
      // "/images/Urbainia/Urbainai Trinity NX image 1.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000.123456789012!2d77.12345678901234!3d28.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c123456789abc%3A0x123456789abcdefg!2sUrbainia%20Trinity%20NX%20-%20Techzone%204%2C%20Greater%20Noida%20West%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201031%2C%20India!5e0!3m2!1sen!2sus!4v1234567890123",
  },
  {
    id: 2,
    builder: "Migsun",
    name: "Migsun Rohini Central",
    features: [
      "Shops",
      "Office Spaces",
      "4 Floors",
      "1 Tower",
      "Sprawled across 9 acres",
      "Prime location in Sector 22, Rohini, Delhi",
      "Excellent connectivity (metro, highways, bus terminals)",
      "Spread over 9 acres with four-side open plot",
      "Modern commercial design with retail, office, and entertainment zones",
      "Variety of retail shops and business suites",
      "Multiplex and food court included",
      "High-speed elevators and ample parking",
      "Advanced security and 24/7 power & water backup",
      "Centrally air-conditioned",
    ],
    description:
      "Migsun Rohini Central is a new launch commercial project located in Sector 22, Rohini, North Delhi. Designed for modern businesses and investors, this project offers properties that cater to a wide budget range. With maximum visibility and high footfall, it's one of the most desirable investment destinations in North Delhi. The project features a strategically constructed RCC-framed structure, ensuring optimal layout and architectural efficiency. Approved by leading banks like Kotak Mahindra, ICICI, and HDFC, the project is ideal for assured returns and long-term growth. ",
    location: "Sector 22, Rohini, North Delhi ",
    nearby: [
      "Strategically located with excellent connectivity ",
      "Emerging infrastructure in North Delhi ",
      "Surrounded by residential zones and existing commercial hubs ",
    ],
    amenities: [
      "Gymnasium",
      "Food Court",
      "Car Parking",
      "Grocery Shop",
      "24×7 Security",
      "CCTV Surveillance",
      "Lifts",
      "Children's Play Area",
      "Theatre, Power Backup",
    ],
    projectHighlights: [
      "Prime location in Sector 22, Rohini, Delhi",
      "Spread over approx. 9 acres with four-side open plot",
      "Mixed-use commercial development featuring retail shops, business suites, multiplex, and food court",
      "Excellent connectivity: close to metro, Outer Ring Road, NH-9, NH-44, and upcoming UER 2 Highway",
      "Modern architecture with spacious layouts and high visibility",
      "Equipped with high-speed elevators, escalators, and ample parking space",
    ],
    status: [
      "New Launch",
      "Possession by: October 2029 ",
      "RERA Registered ",
      "Bank Approved (Kotak, ICICI, HDFC) ",
      "No Brokerage ",
    ],
    price: "19,449/ Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "223 - 428/ Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/Migsun Rohini Central/Migsun Rohini Central Image 1.jpg",
      // "/images/Migsun Rohini Central/Migsun Rohini Central Image 2.jpg",
      // "/images/Migsun Rohini Central/Migsun Rohini Central Image 3.jpg",
      // "/images/Migsun Rohini Central/Migsun Rohini Central Image 4.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.8953183134913!2d77.06022267485321!3d28.722674279982723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d070071289de7%3A0x45efeb1e8721f96!2sMIGSUN%20ROHINI%20CENTRAL!5e0!3m2!1sen!2sin!4v1747826182471!5m2!1sen!2sin",
  },
  {
    id: 3,
    builder: "KW",
    name: "KW Delhi 6",
    features: [
      "Located on the main Raj Nagar Extension Road",
      "Well-connected to NH-58, Delhi-Meerut Expressway, and UPSIDC industrial areas",
      "Offers retail shops, food court, multi-cuisine restaurants, hypermarket, multiplex, and office spaces",
      "Surrounded by dense residential population",
      "Close to schools, colleges, and hospitals",
      "Centrally air-conditioned building",
      "Multi-level parking space",
      "High-speed elevators and escalators",
      "3-tier security with CCTV surveillance",
      "100% power backup and fire safety systems",
      "Assured return and lease guarantee options available",
      "Attractive for rental income and capital appreciation",
      "Developed by KW Group, known for timely delivery and quality construction",
    ],
    description:
      "KW Delhi 6 is the flagship commercial project by KW Group, located in the vibrant heart of Raj Nagar Extension, Ghaziabad. Strategically positioned on the NH-58 Bypass, it’s not just a modern retail hub but also a tribute to India’s commercial and cultural richness. With FUN, FOOD & SHOPPING all under one roof, KW Delhi 6 offers a complete experience for customers and a lucrative opportunity for investors and retail brands. Backed by strong brand collaborations, this shopping destination has become a magnet for top-tier national and global retailers, making it one of the most desirable commercial investments in North India.",
    location:
      "NH 58 Bypass, Raj Nagar Extension, Ghaziabad, Uttar Pradesh – 201017",
    nearby: [
      "5 min from proposed International Cricket Stadium",
      "15 min from Hindon Domestic Airport ",
      "5 min from Hindon Metro Station ",
      "10 min from Eastern Peripheral Expressway ",
      "10 min from Elevated Road ",
      "Surrounded by 4+ lakh residents ",
    ],
    amenities: [
      "RCC framed structure ",
      "Structure vetted by IIT Roorkee ",
      "Optimum use of natural lighting ",
      "Italian Marble / Granite / Natural Stone / Vitrified tile flooring in common areas ",
      "Stone/tile wall cladding up to ceiling height in washrooms ",
      "3-tier security system with CCTV ",
      "Power backup with premium wiring (Finolex, Polycab, Havells, Universal) ",
      "Water & drainage connections in selected shops (additional cost)",
    ],
    projectHighlights: [
      "Over 85 leading PAN India and global brands already onboard ",
      "Exceptional investment potential for retail shop owners and investors ",
      "A lifestyle destination with food courts, retail outlets, and entertainment ",
      "Premium architectural design integrating Indian cultural flair ",
      "Strong customer pull from dense residential neighborhoods ",
    ],
    status: [
      "Ready to Move ",
      "RERA Registered  ",
      "High Brand Footprint ",
      "Investment-Ready Retail Spaces ",
    ],
    price: "60,000/ Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "50 - 2000/ Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/KW Delhi 6/KW Delhi 6 Image 2.jpeg",
      // "/images/Urbainia/Urbainai Trinity NX image 2.jpg",
      // "/images/Urbainia/Urbainai Trinity NX image 1.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7462833188956!2d77.4328492748522!3d28.697235281140706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1058629babd%3A0xf7f849287ea2b43c!2zS1cgRGVsaGkgNiBNYWxsICjgpJXgpYcg4KSh4KSs4KWN4KSy4KWN4KSv4KWCIOCkpuCkv-CksuCljeCksuClgCA2IOCkruClieCksik!5e0!3m2!1sen!2sin!4v1748418713378!5m2!1sen!2sin",
  },
  {
    id: 4,
    builder: "KW",
    name: "KW Blue Pearl",
    features: [
      "Shops",
      "Office Spaces",
      "3 Floors",
      "1 Tower",
      "32 Units",
      "Total Area: 0.247 acres",
      "Corner Property with Two Side Roads",
      "DDA Allotted Land",
      "Ultra-modern facade",
      "Spacious lift",
      "SS & glass finish railing",
      "Fully air-conditioned complex",
      "Premium quality wiring and switches (Finolex, Polycab, Havells, Universal)",
      "Sufficient power load compatibility",
      "Optimum use of natural light ",
      "Italian Marble / Granite / Vitrified tile flooring in common areas ",
      "Full-height tile/stone cladding in common washrooms",
    ],
    description:
      "KW Blue Pearl is a ready-to-move commercial project located in the prime locality of Karol Bagh, Central Delhi. Built on government-approved, freehold DDA allotted land, this corner property enjoys maximum exposure on DB Gupta Road. Its ultra-modern global standard facade, premium finishes, and strategic positioning make it one of the most profitable and desirable commercial investments in Central Delhi. KW Blue Pearl is designed to deliver exceptional returns through high visibility, constant footfall, and long-term value.",
    location: "DB Gupta Road, Karol Bagh, Central Delhi ",
    nearby: [
      "Direct METRO connectivity",
      "Located on Main DB Gupta Road",
      "Surrounded by dense residential and commercial catchment",
    ],

    amenities: [
      "Air Conditioned Complex",
      "Conference Room",
      "Spacious Lift",
      "CCTV Camera Security",
      "24×7 Power Backup",
      "Elegant SS & Glass Finish Railing",
      "Modern Common Toilets",
    ],
    projectHighlights: [
      "Government-approved DDA allotted land ",
      "Freehold ownership ",
      "Grand and lavish entrance ",
      "Corner property with dual road access",
      "Strong metro and road connectivity ",
      "High-end, dynamic global-standard facade ",
    ],
    status: [
      "Ready to Move ",
      "Freehold Land ",
      "RERA Registered ",
      "Government Approved  ",
      "No Brokerage ",
    ],
    price: "1,60,000/ Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "20 - 1000/ Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/KW Blue Pearl/KW Blue Pearl image 7.jpg",
      // "/images/KW Blue Pearl/KW Blue Pearl image 6.jpg",
      // "/images/KW Blue Pearl/KW Blue Pearl image 1.jpg",
      // "/images/KW Blue Pearl/KW Blue Pearl image 2.jpg",
      // "/images/KW Blue Pearl/KW Blue Pearl image 3.jpg",
      // "/images/KW Blue Pearl/KW Blue Pearl image 4.jpg",
      // "/images/KW Blue Pearl/KW Blue Pearl image 5.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3848664378797!2d77.19744567485039!3d28.64819278337053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd612d123c1f%3A0x579cf93f8a9d33fe!2sKW%20BLUE%20PEARL!5e0!3m2!1sen!2sin!4v1747826372481!5m2!1sen!2sin",
  },
  {
    id: 5,
    builder: "Nishtha Homes",
    name: "Eco Village Cottage & Resort",
    features: [
      "2 Types: 500 sq. ft. & 700 sq. ft.",
      "Villas, Cottages & Poolside Units",
      "60 Exclusive Units ",
    ],
    description:
      "Welcome to Eco Village Resort and Cottages, an exclusive luxury retreat in Dehradun by Holistic Living by Inrext. Nestled amidst the lush Himalayan foothills, this limited-edition resort blends modern comfort with the tranquility of nature. Designed as a serene escape and a smart investment opportunity, it offers premium villas and cottages, world-class amenities, and promising rental returns of up to 8%. ",
    location:
      "Dehradun, Uttarakhand, India (Proximity to Mussoorie, Rishikesh & Haridwar) ",
    nearby: [
      "Dehradun Airport – 30 min",
      "Mussoorie – 1 hr",
      "Rishikesh – 1.5 hrs",
      "Haridwar – 2 hrs",
      "Dhanolti – 2.5 hrs",
    ],
    amenities: [
      "Infinity Swimming Pool",
      "Spa & Wellness Center",
      "Multi-Cuisine Restaurant ",
      "Clubhouse & Lounge",
      "Landscaped Gardens",
      "Yoga & Meditation Zones",
      "24/7 Security & Concierge",
      "Dedicated Parking Spaces",
      "Kids’ Play Area",
      "Walking & Cycling Trails ",
    ],
    projectHighlights: [
      "Sustainable, Nature-Immersed Setting ",
      "Fully Furnished Luxury Cottages & Villas",
      "Outdoor Swimming Pool",
      "In-Unit Kitchen Facilities",
      "Climate-Controlled Comfort",
      "Complimentary High-Speed Wi-Fi",
      "Ample Free Parking & Laundry",
      "Vegetarian-Friendly Dining",
      "Proximity to Local Attractions",
    ],
    status: ["Launch Price: ₹7,200 per sq. ft. ", "Loan Facility Available"],
    price: "9,000/ Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "520 - 1420/ Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/Eco Village/Eco Village 4.jpg",
      // "/images/Eco Village/Eco Village 3.jpg",
      // "/images/Eco Village/Eco Village 7.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1719.7757717077272!2d77.90124117629986!3d30.448812416472794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f2d1ab8db6c31%3A0xddfcb4a4dd1ea387!2sEco%20Village%20Cottage%20%26%20Resort!5e0!3m2!1sen!2sin!4v1747826918275!5m2!1sen!2sin",
  },
  {
    id: 6,
    builder: "Sui Generis",
    name: "Sui generis Residenncy",
    features: [
      "India's 1st IGBC Certified Platinum Rated Ready to Live Global Industrial Smart City ",
      "Dholera SIR ",
      "Total Area: 91,790 Ha / 920 sq km ",
      "Population Expected: 20 Lakh ",
      "New Jobs Expected: 8.27 Lakh ",
      "4 Way Connectivity ",
      "Plug & Play Infrastructure",
      "12 Different Zones",
      "World-Class Facilities",
      "SUI GENERIS RESIDENCY",
      "10 Min. to City Center",
      "10 Min. to Dholera International Airport ",
      "8 Min. to ABCD Building  ",
      "10 Min. to Knowledge & IT Zone ",
      "5 Min. to Ahmedabad-Dholera Expressway",
      "5 Min. to Metro Station",
    ],
    description:
      "Welcome to SUI Generis Residency, our newest residential plot township in Ratanpur, Dholera. As leading real estate developers, we're excited to unveil this visionary project. Spanning acres of pristine landscape, SUI Generis Residency offers meticulously planned plots and thoughtfully designed amenities. Join us as we redefine modern living and invite you to discover the extraordinary at SUI Generis Residency – your sanctuary, your haven, your home. ",
    location: "Ratanpur, Dholera, Gujarat  ",
    nearby: ["Dholera"],
    amenities: [
      "Children's Play Area ",
      "Club House ",
      "Tap Water Line ",
      "Drinking Water Line ",
      "Underground Electrification ",
      "Underground ICT Duct ",
      "Attractive Gate with Security Cabin ",
      "Underground Sewage Line ",
      "Internal Roads with Plantation ",
      "Gazebo ",
      "Smart Security System ",
      "Street Light ",
      "Project Wall ",
    ],
    projectHighlights: [
      "Project Boundary Wall ",
      "Entrance Gate ",
      "Security Cabin ",
      "CCTV Camera in Common Areas ",
      "Streetlights ",
      "Landscaping in Common Open Plot Area ",
      "Children’s Play Area ",
      "Senior Citizen Area ",
      "Internal Roads with Roadside Plantation ",
      "Underground Water Pipeline till Plot Boundary ",
      "Underground Electric Line till Common Electric Junction",
      "Underground Sewage Line till Plot Boundary ",
      "Underground ICT Duct till Plot Boundary ",
      "Soil Filling up to 1 Meter Below from Road Top Level ",
      "Company Maintenance for 2 Years Post Infrastructure Completion ",
    ],
    status: ["Under Construction"],
    price: "833/ Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "1440 - 1899/ Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/Sui generis Residenncy/Sui generis Residenncy.webp",
      // "/images/Eco Village/Eco Village 3.jpg",
      // "/images/Eco Village/Eco Village 7.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16113035.973589338!2d79.62300161484644!3d30.15225822711306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395ed9003c1e23d3%3A0x8d2f0f7affce335c!2sSui%20Generis%20Residency!5e0!3m2!1sen!2sin!4v1752383830654!5m2!1sen!2sin",
  },
  {
    id: 7,
    builder: "Teja Buildtech",
    name: "Sky Harbor",
    features: ["Residential Plots (Freehold)", "Commercial Plots (Freehold) "],
    description:
      "Sky Harbor is a thoughtfully planned plotting project offering freehold residential and commercial plots in the rapidly developing region of JewarTappal, near the Yamuna Expressway. Strategically located just minutes away from the upcoming Jewar International Airport, Film City, and major infrastructure hubs, the project is ideal for both investment and future living. With essential amenities, a gated community, and seamless connectivity, Sky Harbor presents a high-growth opportunity in NCR's most promising zone. ",
    location: "Jewar-Tappal Major District Road, Yamuna Expressway ",
    nearby: [
      "7.7 KM from Jewar Internation Airport",
      "17 KM from Film City ",
      "26 KM from F1 Racing Track (Buddh International Circuit) ",
      "7.4 KM from DMIC Direct connected to Airport ",
      "2.5 KM Aligarh- Palwal NH 334D ",
      "Patanjali Food and Herbal Park ",
      "Proposed Metro (Future connectivity) ",
      "Parichowk (Greater Noida) - 28 mins ",
    ],
    amenities: [
      "2 Parks ",
      "Sports Zone ",
      "Clubhouse ",
      "Commercial Complex ",
      "24x7 Security with Camera ",
      "Gated Community ",
      "Kids Play Area ",
    ],
    projectHighlights: [
      "700 Mtr. Kailash Hospital, Jewar",
      "36-30 Ft. Main Road, 25 Ft. Internal Roads",
      "Complete Registration and Mutation ",
      "Residential and Commercial Freehold Plots ",
      "Essential for plot development ",
      "High appreciation potential ",
      "Strategic location near upcoming infrastructure projects. ",
      "Diverse nearby developments (Airport, Film City, Industrial Corridor, etc.) ",
    ],
    status: ["Under Construction"],
    price: "3,889/ Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "900 - 1800/ Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/Sky Harbor/Sky Harbor.webp",
      // "/images/Eco Village/Eco Village 3.jpg",
      // "/images/Eco Village/Eco Village 7.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3184.8354608006816!2d77.55484387548168!3d28.105127275956907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDA2JzE4LjUiTiA3N8KwMzMnMjYuNyJF!5e1!3m2!1sen!2sin!4v1752402253036!5m2!1sen!2sin",
  },
  {
    id: 8,
    builder: "AADVI Group",
    name: "The Adriatico",
    features: [
      "Project Area: 5 Acers",
      "Unit Types: 2 BHK to 4 BHK with premium finishes",
      "Green Certified Building",
      "Double-glazed windows & thermal insulation",
      "UPVC sliding windows & laminated flush doors",
      "Modular kitchens with granite countertops",
      "Jaguar bathroom fittings with concealed WC & diverters",
      "Premium vitrified tiles in all rooms",
      "Stainless steel and toughened glass balcony railings",
      "Firefighting systems with photothermal detectors",
      "CCTV surveillance & gated security",
      "Solar panels & natural light optimization",
      "Rainwater harvesting & STP system",
      "712 dedicated parking slots",
      "Skywalk on the 21st floor with BBQ area and café",
    ],
    description:
      "Adriatico is a luxurious and eco-conscious residential project located in the high-potential region of the Yamuna Expressway. Designed for modern families, it blends contemporary architecture with sustainable living. From 2 BHK to 4 BHK units with premium specifications to an exclusive rooftop pool, skywalk café, and business-ready amenities, every element is crafted to elevate your lifestyle. Certified as a green building, Adriatico ensures comfort, luxury, and responsibility, all in one address.",
    location: [
      "At the Centre of JP Sports City, Yamuna Expressway",
      "Strategically located near Yamuna Expressway",
      "Direct connectivity to Noida International Airport",
      "Well connected to Delhi and Agra",
      "Proximity to educational and commercial hubs",
    ],
    nearby: [
      "Jewar International Airport - 25 Mins ",
      "Galgotias University - 05 Mins ",
      "Film City - 20 Mins ",
      "Buddh International Circuit - 03 Mins",
      "Noida International University - 10 Mins",
      "Yamuna Expressway - 05 Mins",
      "Delhi - 1 hr by road",
      "Agra - 2 hrs by road",
    ],
    amenities: [
      "Rooftop swimming pool",
      "Spa, salon, and gymnasium",
      "Indoor games: table tennis, billiards",
      "Multicuisine restaurant & café",
      "Banquet halls",
      "Business lounge and conference rooms",
      "Departmental store (3,800 sq.ft.)",
      "Skywalk café and BBQ area on the 21st floor",
      "Landscaped terraces and green relaxation zones",
      "Double-height premium entrance lobby",
    ],
    projectHighlights: [
      "Prime connectivity to Noida International Airport, Delhi, and Agra",
      "Certified green building with eco-friendly design",
      "High-end amenities including rooftop pool, banquet halls, business zone",
      "Premium 2 BHK to 4 BHK apartments with top-tier finishes",
      "21st floor skywalk with panoramic views",
    ],
    status: ["Possession on: January 2029", "RERA No. UPRERAPRJ13904"],
    price: "7,990/ Sq.Ft.",
    size: "1335 - 2675/ Sq.Ft.",
    images: ["/images/The Adriatico/The Adriatico.webp"],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1213.4597956740406!2d77.51438111043863!3d28.34216463884489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390cc7007096124d%3A0xb9566fb8973c3bdb!2s8GR8%2BR2%20Cluster_gautam%20Buddha%20Nagar%2017%2C%20Gunpura%2C%20Sector%2025%2C%20Bela%20Khurd%2C%20Uttar%20Pradesh%20203201!3m2!1d28.341844!2d77.5151228!5e1!3m2!1sen!2sin!4v1754138901048!5m2!1sen!2sin",
  },
];

// SSR: Use static value for dark mode
const isDarkMode = false;

const Properties = () => {
  const { isDarkMode } = useTheme();
  // Add missing state hooks
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  // Add missing activeSlide state
  const [activeSlide, setActiveSlide] = useState(0);

  // Add arrow style states
  const [nextArrowStyle, setNextArrowStyle] = useState({});
  const [prevArrowStyle, setPrevArrowStyle] = useState({});

  useEffect(() => {
    AOS.init({
      once: true,
    });

    // Set arrow styles on client only
    function responsiveStyles(breakpoints: Record<string, any>) {
      if (typeof window === "undefined") {
        return breakpoints.desktop;
      }
      const windowWidth = window.innerWidth;
      if (windowWidth < 768) {
        return breakpoints.mobile;
      } else if (windowWidth >= 768 && windowWidth < 1024) {
        return breakpoints.tablet;
      } else if (windowWidth >= 1024 && windowWidth < 1280) {
        return breakpoints.laptop;
      } else {
        return breakpoints.desktop;
      }
    }

    setNextArrowStyle(
      responsiveStyles({
        mobile: { marginTop: "9.9rem", right: "2.6rem", zIndex: 1 },
        tablet: { marginTop: "9.9rem", right: "1.8rem", zIndex: 1 },
        laptop: { marginTop: "-8.4rem", right: "1.9rem", zIndex: 1 },
        desktop: { marginTop: "11.9rem", right: "2.4rem", zIndex: 1 },
      })
    );
    setPrevArrowStyle(
      responsiveStyles({
        mobile: { marginTop: "9.9rem", left: "18.1rem", zIndex: 2 },
        tablet: { marginTop: "9.9rem", left: "42.2rem", zIndex: 2 },
        laptop: { marginTop: "-8.4rem", left: "47.9rem", zIndex: 2 },
        desktop: { marginTop: "11.9rem", left: "73.7rem", zIndex: 2 },
      })
    );
  }, []);

  const handleBeforeChange = (current: number, next: number) => {
    setActiveSlide(next);
  };

  function NextArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...nextArrowStyle,
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: CustomArrowProps) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          ...prevArrowStyle,
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 1200,
    autoplaySpeed: 4000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: handleBeforeChange,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentProperties = properties.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(properties.length / cardsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setGradientPos({ x, y });
  };

  return (
    <>
      <div
        className={`lg:h-[100vh] h-[50vh] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        {/* Image with black overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/properties.jpg"
            alt=""
            fill
            className="w-full h-full object-cover"
            style={{ objectFit: "cover" }}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center lg:gap-y-[3rem] gap-y-[1.5rem] p-4">
          <h1
            className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
              isDarkMode ? "text-blue-500" : "text-white"
            }`}
          >
            Find Your Dream <br /> Property
          </h1>
          <p className="raleway text-white text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.6rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase">
            Your Dream Property is Just a Click Away – Start Your Search Today!
          </p>
          {/* <Link
            to="/properties"
            className="w-fit text-white px-6 uppercase text-[0.6rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            EXPLORE OUR LISTING
          </Link> */}
        </div>
      </div>
      {/* ===================================== */}
      <div
        className={`overflow-hidden  ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div
          className="overflow-hidden py-[5rem]"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="flex flex-col gap-y-[0.6rem]">
            <div className="max-w-7xl mx-auto px-6 pb-[0.5rem] flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
                featured
                <span
                  className={`cormorant-garamond ps-2 pe-2 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Properties
                </span>
              </h1>
            </div>
            <div className="max-w-7xl mx-auto pt-[0rem] lg:pb-[0rem] flex flex-col justify-center items-center text-[1.1rem]">
              <p
                className={`raleway uppercase font-semibold lg:pb-[0rem] pb-[0rem] lg:text-2xl text-[1rem] text-center lg:px-0 px-5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Your Dream Property is Just a Click Away – Start Your Search
                Today!
              </p>
            </div>
          </div>
          {/* Slider Section */}
          <div className="max-w-7xl mx-auto px-0 pt-[0rem] pb-[0rem] overflow-hidden">
            <div className="slider-container pb-[3rem] overflow-hidden ps-0 pe-[0rem]">
              <Slider {...settings} className=" h-[22rem] pt-[2.5rem]">
                {currentProperties.map((properties, index) => (
                  <div key={properties.id} className="px-[0.8rem]">
                    <Link
                      href={`/properties/${encodeURIComponent(
                        properties.name.replace(/\s+/g, "-").toLowerCase()
                      )}`}
                    >
                      <div
                        className="cursor-pointer relative h-[12rem] flex flex-col justify-center items-center bg-cover bg-center transition-all duration-500 hover:scale-[1.05] rounded-lg"
                        style={{
                          backgroundImage: `url('${properties.images[0]}')`,
                        }}
                      >
                        <div className="relative top-[6.8rem] bg-white p-4 rounded w-[16rem] flex flex-col gap-y-2.5">
                          <h1 className="capitalize text-black lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] font-semibold flex items-center gap-x-0 ">
                            <MdOutlineCurrencyRupee />
                            <span>{properties.price}</span>
                          </h1>
                          <p className="capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] flex items-center gap-x-0">
                            <IoLocationOutline />{" "}
                            {/* <span>
                              {properties.location.length > 20
                                ? properties.location.substring(0, 20) + "..."
                                : properties.location}
                            </span> */}
                            <span>
                              {Array.isArray(properties.location)
                                ? properties.location[0].length > 15
                                  ? properties.location[0].substring(0, 15) +
                                    "..."
                                  : properties.location[0]
                                : properties.location.length > 15
                                ? properties.location.substring(0, 15) + "..."
                                : properties.location}
                            </span>
                          </p>
                          <div className="flex items-center justify-between text-[1rem]">
                            <p className="capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] flex items-center gap-x-2">
                              <SlSizeFullscreen className="" />{" "}
                              <span>{properties.size}</span>
                            </p>
                            {/* <p className="text-gray-500 flex items-center gap-x-2">
                          <FiDroplet /> <span>3</span>
                        </p>
                        <p className="text-gray-500 flex items-center gap-x-2">
                          <FaBed /> <span>2</span>
                        </p> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
              {/* <div className="w-[4.5rem] h-[1.9rem] bg-white relative rounded-full lg:bottom-[0rem] md:bottom-[2rem] bottom-[2rem] lg:left-[73.5rem] md:left-[42rem] left-[17.8rem]"></div> */}
            </div>
          </div>
        </div>
        {/* ===================== exclusiveListing ================================ */}
        <div
          className="overflow-hidden pb-[3rem]"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="flex flex-col gap-y-[0.6rem]">
            <div className="max-w-7xl mx-auto px-6 pb-[0.5rem] flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] capitalize">
                exclusive
                <span
                  className={`cormorant-garamond ps-2 pe-2 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Listing
                </span>
              </h1>
            </div>
            <div className="max-w-7xl mx-auto pt-[0rem] lg:pb-[0rem] flex flex-col justify-center items-center text-[1.1rem]">
              <p
                className={`raleway uppercase font-semibold lg:pb-[0rem] pb-[0rem] lg:text-2xl text-[1rem] text-center lg:px-0 px-5 ${
                  isDarkMode ? "text-white  backdrop-blur-md " : "text-blue-500"
                }`}
              >
                Explore, Compare, and Choose from the Best Real Estate Listings.
              </p>
            </div>
          </div>
          {/* --------- */}
          <div className="max-w-7xl mx-auto lg:px-6 px-2 py-[5rem] ">
            <div className="grid lg:grid-cols-2 grid-cols-1  lg:justify-normal justify-center gap-[3.5rem]">
              {currentProperties.map((properties, index) => (
                <div
                  key={properties.name}
                  className="w-full flex justify-center overflow-hidden lg:description rounded-xl"
                >
                  <Link
                    href={`/properties/${encodeURIComponent(
                      properties.name.replace(/\s+/g, "-").toLowerCase()
                    )}`}
                    className={`flex p-2 lg:gap-2.5 md:gap-2.5 gap-4 lg:description rounded-xl overflow-hidden ${
                      index % 4 < 2 ? "flex-row" : "flex-row-reverse"
                    } hover:scale-105 transition-transform duration-300`}
                  >
                    {/* Image */}
                    <div className="lg:w-[15rem] md:w-[15rem] w-[12rem] lg:h-[15rem] md:h-[15rem] h-[12rem] ">
                      <Image
                        src={Array.isArray(properties.images) ? properties.images[0] : properties.images}
                        className="w-full h-full lg:description rounded-xl object-cover"
                        alt=""
                        width={240}
                        height={240}
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, 240px"
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div className="relative lg:w-[20.9rem] md:w-[20.9rem] w-[10rem] lg:py-5 md:py-5 lg:px-5 flex flex-col h-full">
                      <div className="flex flex-col gap-y-3">
                        <h1
                          className={`capitalize text-black lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] font-semibold ${
                            isDarkMode
                              ? "text-white backdrop-blur-md"
                              : "text-black"
                          }`}
                        >
                          {properties.name}
                        </h1>
                        <p
                          className={`capitalize text-black lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] font-light ${
                            isDarkMode
                              ? "text-white backdrop-blur-md"
                              : "text-gray-700"
                          }`}
                        >
                          {/* {properties.description} */}
                          {properties.description.length > 100
                            ? properties.description.substring(0, 100) + "..."
                            : properties.description}
                        </p>
                      </div>
                      <div className=" relative lg:bottom-[-2.5rem] md:bottom-[-5.8rem] bottom-[-1.2rem] left-0 right-0 flex flex-col gap-y-2.5 lg:pt-3 md:pt-3 pt-2">
                        <div className="flex justify-between mt-auto items-center text-blue-500 font-medium">
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem]">
                            <SlSizeFullscreen className="" />
                            <span className="ps-1">{properties.size}</span>
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-between mt-auto items-center text-blue-500 font-medium">
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem]">
                            <IoLocationOutline />
                            <span>
                              {/* {properties.location} */}
                              {/* {properties.location.length > 15
                                ? properties.location.substring(0, 15) + "..."
                                : properties.location} */}
                              <span>
                                {Array.isArray(properties.location)
                                  ? properties.location[0].length > 15
                                    ? properties.location[0].substring(0, 15) +
                                      "..."
                                    : properties.location[0]
                                  : properties.location.length > 15
                                  ? properties.location.substring(0, 15) + "..."
                                  : properties.location}
                              </span>
                            </span>
                          </p>
                          <p className="flex items-center capitalize text-blue-500 lg:text-[0.9rem] md:text-[0.8rem] text-[0.8rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem]">
                            <MdOutlineCurrencyRupee />
                            <span>{properties.price}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 w-6 h-6 flex items-center rounded-full ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronLeft />
                </button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 w-6 h-6 flex items-center rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  <FaChevronRight />
                </button>
              </nav>
            </div>
          </div>
        </div>
        {/* ================ Step By StepGuide ========================== */}
        <div
          className="overflow-hidden lg: py-[0rem]"
          data-aos="fade-up"
          data-aos-duration="1200"
          onMouseMove={handleMouseMove}
          style={{
            background: `radial-gradient(circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(59,130,246,0.7), transparent 20%)`,
            transition: "background-position 0.1s ease",
          }}
        >
          <div className="max-w-7xl mx-auto px-6 flex flex-col justify-center items-center overflow-hidden py-[3rem]">
            <div className="max-w-4xl mx-auto   ">
              <p
                className={`uppercase raleway font-semibold text-center lg:text-[1.3rem] md:text-[1.2rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1.2rem] leading-[1.1rem] ${
                  isDarkMode ? "text-white backdrop-blur-md " : "text-black"
                }`}
              >
                Start Investing Like a Pro – Here’s Your
              </p>
            </div>
            <div className="max-w-7xl mx-auto px-6 pt-[0rem] lg:mt-[1rem] flex flex-col justify-center items-center overflow-hidden">
              <h1 className="dm-serif-display text-center text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] uppercase">
                step by step
                <span
                  className={`cormorant-garamond  ps-2.5 pe-1.5 ${
                    isDarkMode
                      ? "text-white  backdrop-blur-md "
                      : "text-blue-500"
                  }`}
                >
                  Guide
                </span>
              </h1>
            </div>
          </div>
          <div className="w-[0rem] h-[0rem] absolute pointer-events-none" />
          <div className="max-w-7xl mx-auto lg:px-6 px-2 py-[5rem] flex justify-around items-center relative">
            <div className="absolute lg:left-[6.2rem] md:left-[2.5rem] left-[0.8rem] lg:right-[6.2rem] md:right-[2.5rem] right-[0.8rem] top-1/2 h-[2px] bg-gray-200 -translate-y-1/2 z-0"></div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Search & <br /> Explore
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Shortlist & <br /> Compare
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Schedule a<br /> Visit
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Consult &<br /> Negotiate
              </p>
            </div>

            <div className="lg:h-[7.5rem] lg:w-[7.5rem] md:h-[6rem] md:w-[6rem] h-[4rem] w-[4rem] font-semibold text-center flex items-center justify-center bg-gray-200 rounded-full relative z-10">
              <p className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.6rem] lg:leading-[1rem] md:leading-[0.8rem] leading-[0.6rem]">
                Secure Your
                <br /> Deal
              </p>
            </div>
          </div>
          <div className="w-[0rem] h-[0rem] absolute  pointer-events-none" />
        </div>
      </div>
      {/* ================ Why Choose Us? ========================== */}
      <div>
        <WhyChooseUs />
      </div>
    </>
  );
};

export default Properties;

