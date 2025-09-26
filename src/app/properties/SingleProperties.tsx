"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../content/ThemeContext";
import { MdOutlineArrowOutward, MdOutlineCurrencyRupee } from "react-icons/md";
import Image from "next/image";

type Property = {
  id: number;
  builder: string;
  name: string;
  features: string[];
  description: string;
  location: string | string[];
  nearby: string[];
  amenities: string[];
  projectHighlights: string[];
  status: string[];
  price: string;
  size: string;
  images: string[];
  locationMap: string;
};

const propertiesData: Property[] = [
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
    size: "500 - 5000/ Sq.Ft.",
    images: [
      "/images/Urbainia/Urbainai Trinity NX image 3.webp",
      "/images/Urbainia/Urbainai Trinity NX image 2.webp",
       "/images/Urbainia/urbania3.webp",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000.123456789012!2d77.12345678901234!3d28.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c123456789abc%3A0x123456789abcdefg!2sUrbainia%20Trinity%20NX%20-%20Techzone%204%2C%20Greater%20Noida%20West%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201031%2C%20India!5e0!3m2!1sen!2us!4v1234567890123",
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
    size: "223 - 428/ Sq.Ft.",
    images: [
      "/images/Migsun Rohini Central/Migsun Rohini Central Image 1.webp",
      "/images/Migsun Rohini Central/Migsun Rohini Central Image 2.webp",
      "/images/Migsun Rohini Central/Migsun Rohini Central Image 3.webp",
      "/images/Migsun Rohini Central/Migsun Rohini Central Image 4.webp",
      "/images/Migsun Rohini Central/Migsun Rohini Central Image 5.webp",
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
    size: "50 - 2000/ Sq.Ft.",
    images: [
      "/images/KW Delhi 6/KW Delhi 6 Image 2.webp",
      "/images/KW Delhi 6/KW Delhi 6 Image 2_1.webp",
     "/images/KW Delhi 6/KW Delhi 6 Image 3.webp",
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
      "KW Blue Pearl is a ready-to-move commercial project located in the prime locality of Karol Bagh, Central Delhi. Built on government-approved, freehold DDA-allotted land, this corner property enjoys maximum exposure on DB Gupta Road. Its ultra-modern global-standard facade, premium finishes, and strategic positioning make it one of the most profitable and desirable commercial investments in Central Delhi. KW Blue Pearl is designed to deliver exceptional returns through high visibility, constant footfall, and long-term value.",
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
    size: "20 - 1000/ Sq.Ft.",
    images: [
      "/images/KW Blue Pearl/KW Blue Pearl image 7.webp",
      "/images/KW Blue Pearl/KW Blue Pearl image 6.webp",
      "/images/KW Blue Pearl/KW Blue Pearl image 1.webp",
      "/images/KW Blue Pearl/KW Blue Pearl image 2.webp",
      "/images/KW Blue Pearl/KW Blue Pearl image 3.webp",
      "/images/KW Blue Pearl/KW Blue Pearl image 4.webp",
      "/images/KW Blue Pearl/KW Blue Pearl image 5.webp",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3848664378797!2d77.19744567485039!3d28.64819278337053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd612d123c1f%3A0x579cf93f8a9d33fe!2sKW%20BLUE%20PEARL!5e0!3m2!1sen!2sin!4v1747826372481!5m2!1sen!2sin",
  },
  {
    id: 5,
    builder: "Nishtha Homes",
    name: "Eco Village Cottage & Resort",
    features: [
      "4 Types: 520 sq.ft. , 710 sq.ft. , 1040 sq.ft. & 1420 sq.ft.",
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
    status: ["Launch Price: ₹7,200 per sq. ft. ", "Loan Facility Available "],
    price: "9,000/ Sq.Ft.",
    size: "520 - 1420/ Sq.Ft.",
    images: [
      "/images/Eco Village/Eco Village 4.webp",
      "/images/Eco Village/Eco Village 3.webp",
      "/images/Eco Village/eco1.webp",
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
    size: "1440 - 1899/ Sq.Ft.",
    images: [
      "/images/Sui generis Residenncy/Sui generis Residenncy.webp",
    
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16113035.973589338!2d79.62300161484644!3d30.15225822711306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395ed9003c1e23d3%3A0x8d2f0f7affce335c!2sSui%20Generis%20Residency!5e0!3m2!1sen!2sin!4v1752383830654!5m2!1sen!2sin",
  },
  {
    id: 7,
    builder: "Teja Buildtech",
    name: "Sky Harbor",
    features: [
      "Residential Plots (Freehold)",
      "Commercial Plots (Freehold) ",
    ],
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
    size: "900 - 1800/ Sq.Ft.",
    images: [
      "/images/Sky Harbor/Sky Harbor.webp",
      "/images/Sky Harbor/Sky Harbor 2.webp",
      "/images/Sky Harbor/Sky Harbor 3.webp",
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
    images: [
      "/images/The Adriatico/The Adriatico.webp",
       "/images/The Adriatico/Aadvi group1.webp",
        "/images/The Adriatico/Aadvi group2.webp",
        "/images/The Adriatico/Aadvi group3.webp",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d1213.4597956740406!2d77.51438111043863!3d28.34216463884489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390cc7007096124d%3A0xb9566fb8973c3bdb!2s8GR8%2BR2%20Cluster_gautam%20Buddha%20Nagar%2017%2C%20Gunpura%2C%20Sector%2025%2C%20Bela%20Khurd%2C%20Uttar%20Pradesh%20203201!3m2!1d28.341844!2d77.5151228!5e1!3m2!1sen!2sin!4v1754138901048!5m2!1sen!2sin",
  },
];

const SingleProperties: React.FC = () => {
  const params = useParams();
  const name = typeof params?.name === "string" ? params.name : Array.isArray(params?.name) ? params.name[0] : "";
  const { isDarkMode } = useTheme();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const decodedName = decodeURIComponent(name).replace(/-/g, " ");
    const foundProperty = propertiesData.find(
      (prop) => prop.name.trim().toLowerCase() === decodedName.trim().toLowerCase()
    );
    setProperty(foundProperty || null);
    setSelectedImage(0);
  }, [name]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!property) {
    return <div>Loading...</div>;
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
              {property.builder}
            </p>
            <h1
              className={`raleway lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[3.5rem] md:leading-[1.8rem] leading-[1.4rem] font-bold pt-0 ${
                isDarkMode ? "text-blue-500 " : "text-black"
              }`}
            >
              {property.name}
            </h1>
            <p
              className={`raleway lg:text-[1rem] md:text-[0.9rem] text-[0.8rem] flex items-center ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <MdOutlineCurrencyRupee />
              {property.price}
            </p>
            <Link
              href="/"
              className="flex items-center gap-1 w-fit text-white lg:px-6 md:px-4 px-2 uppercase lg:text-[0.7rem] md:text-[0.6rem] text-[0.5rem] lg:py-2 md:py-1 py-1 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
            >
              contact agent{" "}
              <MdOutlineArrowOutward className="text-[1.2rem] ms-1" />
            </Link>
          </div>
          <div className="col-span-3">
            {/* Main Image */}
            <div>
              <Image
                src={property.images[0]}
                alt={property.name}
                width={400}
                height={200}
                className="w-full lg:h-[419px] md:h-[300px] h-[200px] object-cover rounded-xl"
              />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 mt-3">
              {property.images.map((img, idx) => (
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
              ))}
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="mt-5">
          {/* Features */}
          <div className="py-5 grid lg:grid-cols-5 lg:gap-x-5 gap-y-5 !border-b border-gray-400 lg:mx-10 items-center">
            <div className="col-span-2">
              <h1
                className={`cormorant-garamond lg:text-[2.5rem] md:text-[2rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                Features
              </h1>
            </div>
            <div
              className={`col-span-3 lg:text-[1rem] md:text-[1rem] text-[0.9rem] lg:leading-[1.1rem] md:leading-[1rem] leading-[0.9rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              <ul className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
              <p>{property.description}</p>
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
                <p>{property.location}</p>
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
                {property.nearby.map((nearby, index) => (
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
                {property.amenities.map((amenitie, index) => (
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
                {property.projectHighlights.map((projectHighlight, index) => (
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
                {property.status.map((statu, index) => (
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
              <iframe
                src={property.locationMap}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperties;