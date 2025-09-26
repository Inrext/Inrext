/* eslint-disable no-unused-vars */
// Properties.jsx
import React, { useState } from "react";
import type { ComponentProps } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from "../../content/ThemeContext";
import Link from "next/link";
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
    price: "6,990 Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "500 - 5000 Sq.Ft.",
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
    price: "19,449 Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "223 - 428 Sq.Ft.",
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
    price: "1,60,000 Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "20 - 1000 Sq.Ft.",
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
    id: 4,
    builder: "KW",
    name: "KW Delhi-6",
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
      "KW Delhi 6 is the flagship commercial project by KW Group, located in the vibrant heart of Raj Nagar Extension, Ghaziabad. Strategically positioned on the NH-58 Bypass, it’s not just a modern retail hub but also a tribute to India’s commercial and cultural richness. With FUN, FOOD & SHOPPING all under one roof, KW Delhi 6 offers a complete experience for customers and a lucrative opportunity for investors and retail brands. Backed by strong brand collaborations, this shopping destination has become a magnet for top-tier national and global retailers, making it one of the most desirable commercial investments in North India. ",
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
    brands: [
      "Reliance Smart",
      "Max Fashion",
      "Invent Apple Store",
      "Domino's",
      "Barista",
      "US Polo",
      "Levi’s",
      "Jockey",
      "Monte Carlo",
      "Mufti",
      "Killer ",
      "Biba",
      "Kiaasa ",
      "Paislei",
      "Adda",
      "New U",
      "Looks ",
      "Metro",
      "Khadim",
      "Wow Momos",
      "MOC",
      "Giani’s",
      "Amritsari Express",
      "Kathi Nation & many more",
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
    price: "60,000 Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "50 - 2000 Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/KW Delhi 6/KW Delhi 6 Image 2.jpeg",
      // "/images/KW Delhi 6/KW Delhi 6 Image 1.jpg",
      // "/images/KW Delhi 6/KW Delhi 6 Image 2.jpg",
      // "/images/KW Delhi 6/KW Delhi 6 Image 3.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.746283318895!2d77.43284927485222!3d28.69723528114072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1058629babd%3A0xf7f849287ea2b43c!2zS1cgRGVsaGkgNiBNYWxsICjgpJXgpYcg4KSh4KSs4KWN4KSy4KWN4KSv4KWCIOCkpuCkv-CksuCljeCksuClgCA2IOCkruClieCksik!5e0!3m2!1sen!2sin!4v1747826700744!5m2!1sen!2sin",
  },
  {
    id: 5,
    builder: "Nishtha Homes",
    name: "Eco Village Cottage & Resort",
    features: [
      "2 Types: 500 sq. ft. & 700 sq. ft.",
      "Villas, Cottages & Poolside Units",
      "64 Exclusive Units ",
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
    status: [
      "Launch Price: ₹7,200 per sq. ft. ",
      "Loan Facility Available via ICICI Bank ",
    ],
    price: "7,200 Sq.Ft.",
    // bedrooms: 5,
    // bathrooms: 4.5,
    size: "520 - 1420 Sq.Ft.",
    // image: "/images/Rectangle 21.png",
    images: [
      "/images/Eco Village/Eco Village 4.jpg",
      // "/images/Eco Village/Eco Village 3.jpg",
      // "/images/Eco Village/Eco Village 7.jpg",
    ],
    locationMap:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1719.7757717077272!2d77.90124117629986!3d30.448812416472794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f2d1ab8db6c31%3A0xddfcb4a4dd1ea387!2sEco%20Village%20Cottage%20%26%20Resort!5e0!3m2!1sen!2sin!4v1747826918275!5m2!1sen!2sin",
  },
];

const Properties = () => {
  const { isDarkMode } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  function NextArrow(props: {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          // Static styles for SSR
          marginTop: "6rem",
          right: "3.1rem",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props: {
    className?: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
  }) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          position: "absolute",
          // Static styles for SSR
          marginTop: "6rem",
          left: "62.2rem",
          zIndex: 1,
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  beforeChange: (oldIndex: number, newIndex: number) => setActiveIndex(newIndex),
    responsive: [
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 3,
          centerMode: true
        } 
      },
      { 
        breakpoint: 768, 
        settings: { 
          slidesToShow: 3,
          centerMode: true
        } 
      },
      { 
        breakpoint: 480, 
        settings: { 
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "0px"
        } 
      },
    ],
  };

  return (
    <div
      className={`overflow-hidden  lg:pt-[0rem] ${
        isDarkMode ? "bg-black" : "bg-blue-50"
      }`}
    >
      <div className="overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-[3rem] pb-[0.6rem] text-center">
          <h1 className="dm-serif-display text-blue-500 lg:text-[3.1rem] md:text-[2.1rem] text-[1.5rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem]">
            Properties <br />
            <span
              className={`cormorant-garamond ${
                isDarkMode ? "text-white" : "text-blue-500"
              }`}
            >
              To Fall In Love With
            </span>
          </h1>
        </div>
        <div className="max-w-6xl mx-auto lg:px-6  pt-2 pb-6">
          <Slider {...settings} className="py-[2rem] lg:px-[0rem] overflow-hidden">
            {properties.map((property, index) => (
              <div
                key={property.name}
                className="px-0 transition-all duration-500"
                style={{
                  zIndex:
                    index === activeIndex
                      ? 10
                      : index === activeIndex - 1 || index === activeIndex + 1
                      ? 5
                      : 1,
                }}
              >
                <div
                  className={`lg:h-[20rem] md:h-[20rem] h-[10rem] lg:w-full md:w-full w-[8.7rem] flex flex-col justify-center items-center px-0 py-0 overflow-hidden lg:rounded-4xl rounded-3xl transition-all duration-500 transform ${
                    index === activeIndex
                      ? "scale-95 z-10"
                      : "scale-90 opacity-80"
                  } ${
                    index === activeIndex
                      ? "rotate-0 border-5 border-blue-500"
                      : "rotate-[-5deg] border-5 border-white"
                  }`}
                >
                  <Link
                    href={`/properties/${encodeURIComponent(property.name.replace(/\s+/g, '-').toLowerCase())}`}
                    className="w-full h-full hover:scale-110 transition-all duration-500 transform"
                  >
                    <Image
                      className="w-full h-full object-cover"
                      src={property.images[0]}
                      alt={property.name}
                      width={400}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-black opacity-20 hover:opacity-0 rounded-lg"></div>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Properties;
