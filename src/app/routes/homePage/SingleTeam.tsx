// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { useTheme } from "../../content/ThemeContext";

// const SingleTeam: React.FC = () => {
//   const { isDarkMode } = useTheme();
//   const [activeTab, setActiveTab] = useState("experience");
//   const [isMobile, setIsMobile] = useState(false);
//   const { name } = useParams();

//   // Mock data for properties
//   const properties = [
//     {
//       id: 1,
//       builder: "Urbainia",
//       name: "Urbainia Trinity NX ",
//       features: [
//         "Office Space",
//         "10 Floors",
//         " 2 Towers",
//         "50% Open Area",
//         "Flexible Unit Sizes ",
//         "Modern Architecture",
//         "High-Speed Elevators ",
//         "100% Power Backup ",
//         "Advanced Security",
//         "Ample Parking Space ",
//         "Wi-Fi Enabled Zones",
//         "Eco-Friendly Infrastructure",
//         "Food Court & Cafeteria ",
//         "Conference & Meeting Rooms ",
//         "Fire Safety Systems",
//         "Strategic Location",
//       ],
//       description:
//         "Discover thoughtfully designed office spaces at prime locations, ideal for startups, SMEs, and established businesses. With flexible sizes, modern amenities, and strategic connectivity, our commercial offerings are crafted to elevate your professional presence and ensure long-term value.Smart investment. Seamless workspaces. Strong returns.",
//       location: "Techzone 4, Greater Noida West, Greater Noida",
//       nearby: [
//         "Gaur Chowk – 5 Km ",
//         "Gaur City Mall – 5.3 Km",
//         "FNG Expressway – 5.5 Km",
//         "Noida Sector 101 Metro Station – 9.3 Km",
//         "IGI Airport – 41.3 Km",
//       ],
//       amenities: [
//         "Swimming Pool",
//         "Gymnasium",
//         "Club House",
//         "Golf Course",
//         "Children's Play Area",
//         "Park",
//         "Badminton Court",
//         "Basketball Court",
//         "Shopping Centre",
//       ],
//       projectHighlights: [
//         "Mixed-Use Development",
//         "Prime Location",
//         "Excellent Connectivity",
//         "Modern Architecture",
//         "Retail Opportunities",
//         "Serviced Apartments",
//         "Ample Parking",
//         "High-End Security",
//         "Green Spaces",
//         "Power Backup",
//       ],
//       status: [
//         "Partially Ready to Move",
//         "RERA Registered",
//         "Under Construction",
//       ],
//       price: "6,990 Sq.Ft.",
//       // bedrooms: 5,
//       // bathrooms: 4.5,
//       size: "500 - 5000 Sq.Ft.",
//       // image: "/images/Rectangle 21.png",
//       images: [
//         "/images/Urbainia/Urbainai Trinity NX image 3.jpg",
//         // "/images/Urbainia/Urbainai Trinity NX image 2.jpg",
//         // "/images/Urbainia/Urbainai Trinity NX image 1.jpg",
//       ],
//       locationMap:
//         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14000.123456789012!2d77.12345678901234!3d28.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c123456789abc%3A0x123456789abcdefg!2sUrbainia%20Trinity%20NX%20-%20Techzone%204%2C%20Greater%20Noida%20West%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20201031%2C%20India!5e0!3m2!1sen!2sus!4v1234567890123",
//     },
//     {
//       id: 2,
//       builder: "Migsun",
//       name: "Migsun Rohini Central",
//       features: [
//         "Shops",
//         "Office Spaces",
//         "4 Floors",
//         "1 Tower",
//         "Sprawled across 9 acres",
//         "Prime location in Sector 22, Rohini, Delhi",
//         "Excellent connectivity (metro, highways, bus terminals)",
//         "Spread over 9 acres with four-side open plot",
//         "Modern commercial design with retail, office, and entertainment zones",
//         "Variety of retail shops and business suites",
//         "Multiplex and food court included",
//         "High-speed elevators and ample parking",
//         "Advanced security and 24/7 power & water backup",
//         "Centrally air-conditioned",
//       ],
//       description:
//         "Migsun Rohini Central is a new launch commercial project located in Sector 22, Rohini, North Delhi. Designed for modern businesses and investors, this project offers properties that cater to a wide budget range. With maximum visibility and high footfall, it's one of the most desirable investment destinations in North Delhi. The project features a strategically constructed RCC-framed structure, ensuring optimal layout and architectural efficiency. Approved by leading banks like Kotak Mahindra, ICICI, and HDFC, the project is ideal for assured returns and long-term growth. ",
//       location: "Sector 22, Rohini, North Delhi ",
//       nearby: [
//         "Strategically located with excellent connectivity ",
//         "Emerging infrastructure in North Delhi ",
//         "Surrounded by residential zones and existing commercial hubs ",
//       ],
//       amenities: [
//         "Gymnasium",
//         "Food Court",
//         "Car Parking",
//         "Grocery Shop",
//         "24×7 Security",
//         "CCTV Surveillance",
//         "Lifts",
//         "Children's Play Area",
//         "Theatre, Power Backup",
//       ],
//       projectHighlights: [
//         "Prime location in Sector 22, Rohini, Delhi",
//         "Spread over approx. 9 acres with four-side open plot",
//         "Mixed-use commercial development featuring retail shops, business suites, multiplex, and food court",
//         "Excellent connectivity: close to metro, Outer Ring Road, NH-9, NH-44, and upcoming UER 2 Highway",
//         "Modern architecture with spacious layouts and high visibility",
//         "Equipped with high-speed elevators, escalators, and ample parking space",
//       ],
//       status: [
//         "New Launch",
//         "Possession by: October 2029 ",
//         "RERA Registered ",
//         "Bank Approved (Kotak, ICICI, HDFC) ",
//         "No Brokerage ",
//       ],
//       price: "19,449 Sq.Ft.",
//       // bedrooms: 5,
//       // bathrooms: 4.5,
//       size: "223 - 428 Sq.Ft.",
//       // image: "/images/Rectangle 21.png",
//       images: [
//         "/images/Migsun Rohini Central/Migsun Rohini Central Image 1.jpg",
//         // "/images/Migsun Rohini Central/Migsun Rohini Central Image 2.jpg",
//         // "/images/Migsun Rohini Central/Migsun Rohini Central Image 3.jpg",
//         // "/images/Migsun Rohini Central/Migsun Rohini Central Image 4.jpg",
//       ],
//       locationMap:
//         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3498.8953183134913!2d77.06022267485321!3d28.722674279982723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d070071289de7%3A0x45efeb1e8721f96!2sMIGSUN%20ROHINI%20CENTRAL!5e0!3m2!1sen!2sin!4v1747826182471!5m2!1sen!2sin",
//     },
//     {
//       id: 3,
//       builder: "KW",
//       name: "KW Blue Pearl",
//       features: [
//         "Shops",
//         "Office Spaces",
//         "3 Floors",
//         "1 Tower",
//         "32 Units",
//         "Total Area: 0.247 acres",
//         "Corner Property with Two Side Roads",
//         "DDA Allotted Land",
//         "Ultra-modern facade",
//         "Spacious lift",
//         "SS & glass finish railing",
//         "Fully air-conditioned complex",
//         "Premium quality wiring and switches (Finolex, Polycab, Havells, Universal)",
//         "Sufficient power load compatibility",
//         "Optimum use of natural light ",
//         "Italian Marble / Granite / Vitrified tile flooring in common areas ",
//         "Full-height tile/stone cladding in common washrooms",
//       ],
//       description:
//         "KW Blue Pearl is a ready-to-move commercial project located in the prime locality of Karol Bagh, Central Delhi. Built on government-approved, freehold DDA allotted land, this corner property enjoys maximum exposure on DB Gupta Road. Its ultra-modern global standard facade, premium finishes, and strategic positioning make it one of the most profitable and desirable commercial investments in Central Delhi. KW Blue Pearl is designed to deliver exceptional returns through high visibility, constant footfall, and long-term value.",
//       location: "DB Gupta Road, Karol Bagh, Central Delhi ",
//       nearby: [
//         "Direct METRO connectivity",
//         "Located on Main DB Gupta Road",
//         "Surrounded by dense residential and commercial catchment",
//       ],

//       amenities: [
//         "Air Conditioned Complex",
//         "Conference Room",
//         "Spacious Lift",
//         "CCTV Camera Security",
//         "24×7 Power Backup",
//         "Elegant SS & Glass Finish Railing",
//         "Modern Common Toilets",
//       ],
//       projectHighlights: [
//         "Government-approved DDA allotted land ",
//         "Freehold ownership ",
//         "Grand and lavish entrance ",
//         "Corner property with dual road access",
//         "Strong metro and road connectivity ",
//         "High-end, dynamic global-standard facade ",
//       ],
//       status: [
//         "Ready to Move ",
//         "Freehold Land ",
//         "RERA Registered ",
//         "Government Approved  ",
//         "No Brokerage ",
//       ],
//       price: "1,60,000 Sq.Ft.",
//       // bedrooms: 5,
//       // bathrooms: 4.5,
//       size: "20 - 1000 Sq.Ft.",
//       // image: "/images/Rectangle 21.png",
//       images: [
//         "/images/KW Blue Pearl/KW Blue Pearl image 7.jpg",
//         // "/images/KW Blue Pearl/KW Blue Pearl image 6.jpg",
//         // "/images/KW Blue Pearl/KW Blue Pearl image 1.jpg",
//         // "/images/KW Blue Pearl/KW Blue Pearl image 2.jpg",
//         // "/images/KW Blue Pearl/KW Blue Pearl image 3.jpg",
//         // "/images/KW Blue Pearl/KW Blue Pearl image 4.jpg",
//         // "/images/KW Blue Pearl/KW Blue Pearl image 5.jpg",
//       ],
//       locationMap:
//         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.3848664378797!2d77.19744567485039!3d28.64819278337053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd612d123c1f%3A0x579cf93f8a9d33fe!2sKW%20BLUE%20PEARL!5e0!3m2!1sen!2sin!4v1747826372481!5m2!1sen!2sin",
//     },
//     {
//       id: 4,
//       builder: "KW",
//       name: "KW Delhi-6",
//       features: [
//         "Located on the main Raj Nagar Extension Road",
//         "Well-connected to NH-58, Delhi-Meerut Expressway, and UPSIDC industrial areas",
//         "Offers retail shops, food court, multi-cuisine restaurants, hypermarket, multiplex, and office spaces",
//         "Surrounded by dense residential population",
//         "Close to schools, colleges, and hospitals",
//         "Centrally air-conditioned building",
//         "Multi-level parking space",
//         "High-speed elevators and escalators",
//         "3-tier security with CCTV surveillance",
//         "100% power backup and fire safety systems",
//         "Assured return and lease guarantee options available",
//         "Attractive for rental income and capital appreciation",
//         "Developed by KW Group, known for timely delivery and quality construction",
//       ],
//       description:
//         "KW Delhi 6 is the flagship commercial project by KW Group, located in the vibrant heart of Raj Nagar Extension, Ghaziabad. Strategically positioned on the NH-58 Bypass, it’s not just a modern retail hub but also a tribute to India’s commercial and cultural richness. With FUN, FOOD & SHOPPING all under one roof, KW Delhi 6 offers a complete experience for customers and a lucrative opportunity for investors and retail brands. Backed by strong brand collaborations, this shopping destination has become a magnet for top-tier national and global retailers, making it one of the most desirable commercial investments in North India.",
//       location:
//         "NH 58 Bypass, Raj Nagar Extension, Ghaziabad, Uttar Pradesh – 201017",
//       nearby: [
//         "5 min from proposed International Cricket Stadium",
//         "15 min from Hindon Domestic Airport ",
//         "5 min from Hindon Metro Station ",
//         "10 min from Eastern Peripheral Expressway ",
//         "10 min from Elevated Road ",
//         "Surrounded by 4+ lakh residents ",
//       ],
//       amenities: [
//         "RCC framed structure ",
//         "Structure vetted by IIT Roorkee ",
//         "Optimum use of natural lighting ",
//         "Italian Marble / Granite / Natural Stone / Vitrified tile flooring in common areas ",
//         "Stone/tile wall cladding up to ceiling height in washrooms ",
//         "3-tier security system with CCTV ",
//         "Power backup with premium wiring (Finolex, Polycab, Havells, Universal) ",
//         "Water & drainage connections in selected shops (additional cost)",
//       ],
//       projectHighlights: [
//         "Over 85 leading PAN India and global brands already onboard ",
//         "Exceptional investment potential for retail shop owners and investors ",
//         "A lifestyle destination with food courts, retail outlets, and entertainment ",
//         "Premium architectural design integrating Indian cultural flair ",
//         "Strong customer pull from dense residential neighborhoods ",
//       ],
//       status: [
//         "Ready to Move ",
//         "RERA Registered  ",
//         "High Brand Footprint ",
//         "Investment-Ready Retail Spaces ",
//       ],
//       price: "60,000 Sq.Ft.",
//       // bedrooms: 5,
//       // bathrooms: 4.5,
//       size: "50 - 2000 Sq.Ft.",
//       // image: "/images/Rectangle 21.png",
//       images: [
//         "/images/KW Delhi 6/KW Delhi 6 Image 2.jpeg",
//         // "/images/Urbainia/Uurbainai Trinity NX image 2.jpg",
//         // "/images/Urbainia/Urbainai Trinity NX image 1.jpg",
//       ],
//       locationMap:
//         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.7462833188956!2d77.4328492748522!3d28.697235281140706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1058629babd%3A0xf7f849287ea2b43c!2zS1cgRGVsaGkgNiBNYWxsICjgpJXgpYcg4KSh4KSs4KWN4KSy4KWN4KSv4KWCIOCkpuCkv-CksuCljeCksuClgCA2IOCkruClieCksik!5e0!3m2!1sen!2sin!4v1748418713378!5m2!1sen!2sin",
//     },
//     {
//       id: 5,
//       builder: "Nishtha Homes",
//       name: "Eco Village Cottage & Resort",
//       features: [
//         "2 Types: 500 sq. ft. & 700 sq. ft.",
//         "Villas, Cottages & Poolside Units",
//         "64 Exclusive Units ",
//       ],
//       description:
//         "Welcome to Eco Village Resort and Cottages, an exclusive luxury retreat in Dehradun by Holistic Living by Inrext. Nestled amidst the lush Himalayan foothills, this limited-edition resort blends modern comfort with the tranquility of nature. Designed as a serene escape and a smart investment opportunity, it offers premium villas and cottages, world-class amenities, and promising rental returns of up to 8%. ",
//       location:
//         "Dehradun, Uttarakhand, India (Proximity to Mussoorie, Rishikesh & Haridwar) ",
//       nearby: [
//         "Dehradun Airport – 30 min",
//         "Mussoorie – 1 hr",
//         "Rishikesh – 1.5 hrs",
//         "Haridwar – 2 hrs",
//         "Dhanolti – 2.5 hrs",
//       ],
//       amenities: [
//         "Infinity Swimming Pool",
//         "Spa & Wellness Center",
//         "Multi-Cuisine Restaurant ",
//         "Clubhouse & Lounge",
//         "Landscaped Gardens",
//         "Yoga & Meditation Zones",
//         "24/7 Security & Concierge",
//         "Dedicated Parking Spaces",
//         "Kids’ Play Area",
//         "Walking & Cycling Trails ",
//       ],
//       projectHighlights: [
//         "Sustainable, Nature-Immersed Setting ",
//         "Fully Furnished Luxury Cottages & Villas",
//         "Outdoor Swimming Pool",
//         "In-Unit Kitchen Facilities",
//         "Climate-Controlled Comfort",
//         "Complimentary High-Speed Wi-Fi",
//         "Ample Free Parking & Laundry",
//         "Vegetarian-Friendly Dining",
//         "Proximity to Local Attractions",
//       ],
//       status: [
//         "Launch Price: ₹7,200 per sq. ft. ",
//         "Loan Facility Available via ICICI Bank ",
//       ],
//       price: "7,200 Sq.Ft.",
//       // bedrooms: 5,
//       // bathrooms: 4.5,
//       size: "520 - 1420 Sq.Ft.",
//       // image: "/images/Rectangle 21.png",
//       images: [
//         "/images/Eco Village/Eco Village 4.jpg",
//         // "/images/Eco Village/Eco Village 3.jpg",
//         // "/images/Eco Village/Eco Village 7.jpg",
//       ],
//       locationMap:
//         "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1719.7757717077272!2d77.90124117629986!3d30.448812416472794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f2d1ab8db6c31%3A0xddfcb4a4dd1ea387!2sEco%20Village%20Cottage%20%26%20Resort!5e0!3m2!1sen!2sin!4v1747826918275!5m2!1sen!2sin",
//     },
//   ];

//   // Team member data array (should match your Teams component)

//   const visionaries = [
//     {
//       id: 1,
//       name: "Mr. Amit Kumar Srivastava ",
//       position: "Founder & Managing Director",
//       image: "/images/Our team/Amit sir.png",
//       bio: "In a world where real estate often walks the tightrope between tradition and transformation, Mr. Amit Kumar Srivastava stands as a bold innovator who chose to redraw the blueprint. As the founder of Inrext Private Limited, Mr. Srivastava brings more than just business acumen to the table he brings purpose, precision, and a passion for redefining the way India experiences real estate. ",
//       bio1: "With trust at the core and technology as his tool, Mr. Srivastava has shaped Inrext into a modern real estate force simplifying property solutions, boosting investment value, and redefining client service. Blending deep industry insight with bold innovation, he doesn’t follow trends-he sets them.  ",
//     },
//     {
//       id: 2,
//       name: "Mr. Awadhesh Kumar",
//       position: "Joint Managing Director",
//       image: "/images/Our team/Awadhesh sir.png",
//       bio: "Where vision meets execution, you’ll find Mr. Awadhesh Kumar leading from the front. As Joint Director of Inrext, he is the powerhouse of excellence translating strategies into action and teams into high-performing units. With a leadership style rooted in discipline, empathy, and results, Mr. Kumar has been instrumental in shaping a culture of accountability, motivation, and momentum across the organization. ",
//       bio1: "His strength lies in aligning people with purpose ensuring that every process, every project, and every person is moving with clarity and direction. Under his watchful eye, Inrext doesn’t just run it thrives. ",
//     },
//   ];

//   const teamMembers = [
//     {
//       id: 1,
//       name: "Mr. Shiva Karki",
//       position: "Assistant Vice President",
//       images: "/images/Our team/1.5.png",
//       bio: "Shiva is a seasoned real estate consultant with a decade of experience, particularly in the Delhi NCR region. He has helped hundreds of clients find dream homes and high-return investments across residential, commercial, and farmhouse projects.  ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: ["Dholera", "Aqua Green", " Migsun Rohini Central"],
//       expertise: [
//         " Residential & Commercial Real Estate",
//         "Farmhouse Propertie",
//       ],
//       skills: [
//         "Local Market Expertise",
//         " Client Advising",
//         " Site Visits ",
//         "  Investment Consulting ",
//       ],
//     },
//     // {
//     //   id: 2,
//     //   name: "Mr. Harish Kumar",
//     //   position: "Assistant Vice President",
//     //   images: "/images/Our team/2.5.png",
//     //   bio: "Harish is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.  ",
//     //   // linkedin: "https://linkedin.com/in/shivakarki",
//     //   experience: "10 Years",
//     //   projects: [
//     //     "Dholera",
//     //     "Aqua Green",
//     //     " Migsun Rohini Central",
//     //     " KW Blue Pearl",
//     //     "KW Delhi 6",
//     //     " ECO Village",
//     //     "Urbainia",
//     //   ],
//     //   expertise: ["Real Estate Strategy", " Team Leadership"],
//     //   skills: [
//     //     "High-Ticket Closures",
//     //     " Deal Structuring",
//     //     " Project Launches",
//     //     " CRM ",
//     //   ],
//     // },
//     {
//       id: 3,
//       name: "Mr. Sartaj Ali",
//       position: "Assistant Vice President",
//       images: "/images/Our team/3.5.png",
//       bio: "Sartaj is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.   ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 4,
//       name: "Ms. Pooja",
//       position: "Assistant Vice President",
//       images: "/images/Our team/4.5.png",
//       bio: "Pooja is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.  ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 5,
//       name: "Mr. Raghunandan Kumar",
//       position: "Assistant Vice President",
//       images:"/images/Our team/5.5.png",
//       bio: "Raghunandan is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.  ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 6,
//       name: "Mr. Rahul Singh Parihar",
//       position: "Chief Project Officer (CPO) - KW Delhi 6 ",
//       images: "/images/Our team/6.5.png",
//       bio: "Rahul is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 7,
//       name: "Mr. Shivam Tripathi",
//       position:
//         "Chief Project Officer (CPO) – Dholera ( Sui Generis Residenncy) ",
//       images: "/images/Our team/7.5.png",
//       bio: "Shivam is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.  ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 8,
//       name: "Mr. Santosh Kumar Singh",
//       position: "Assistant Vice President",
//       images:"/images/Our team/8.5.png",
//       bio: "Santosh is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 9,
//       name: "Mr. Nitin Kumar Sharma",
//       position: "Assistant Vice President",
//       images: "/images/Our team/9.5.png",
//       bio: "Nitin is a result driven professional with 11 years of experience in real estate sales. He started his career with Imperia Structures Ltd as a Business Development Manager and is now a key contributor to Inrext’s vision of transparency and fairness in real estate.",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "11 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         "ECO Village",
//         "KW Blue Pearl",
//         "Kw Delhi 6",
//         " Migsun Rohini Central",
//       ],
//       expertise: ["Business Development", " Residential & Commercial Sales"],
//       skills: [
//         " Real Estate Negotiation",
//         "Team Collaboration",
//         "Customer Service",
//         " Sales Analytics",
//       ],
//     },
//     {
//       id: 10,
//       name: "Mr. Pankaj Mohapatra",
//       position: "Assistant Vice President",
//       images: "/images/Our team/10.5.png",
//       bio: "Pankaj is a dynamic sales leader with 11 years of experience across reputed real estate firms. He brings deep knowledge in market trends, negotiation, client servicing, and marketing. Previously associated with Earth Infrastructure Ltd, Imperia Structures Ltd, and Nivesh Global in senior leadership roles. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "11 Years",
//       projects: [
//         "Dholera",
//         "Migsun Rohini Central",
//         "  KW Blue Pearl",
//         "KW Delhi 6",
//         "Aqua Green",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: [
//         "Market Analysis",
//         "Property Valuation",
//         " Client Relations",
//         " Strategic Sales",
//       ],
//       skills: [
//         " Negotiation",
//         " Presentation",
//         "  Transaction Management",
//         " Team Leadership ",
//         "Real Estate Marketing ",
//       ],
//     },
//     {
//       id: 12,
//       name: "Mr. Dinesh Kumar Diwakar",
//       position: "Assistant Vice President",
//       images: "/images/Our team/12.5.png",
//       bio: "Dinesh  is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.  ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 13,
//       name: "Mr. Biraj Kumar Byapari",
//       position: "Assistant Vice President",
//       images: "/images/Our team/13.5.png",
//       bio: "Biraj is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 14,
//       name: "Mr. S.S. Dwivedi",
//       position: "Assistant Vice President",
//       images: "/images/Our team/14.5.png",
//       bio: "With over a decade of experience in the real estate domain, Shyam has held portfolio management positions in companies like Imperia Group, Signature Global, and Elpida Homes. His in-depth knowledge in both residential and commercial real estate helps clients make well-informed decisions. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "11 Years",
//       projects: [
//         "Dholera",
//         "Migsun Rohini Central",
//         "Aqua Green",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: [
//         "Strategic Planning",
//         "Client Onboarding",
//         "Site Management",
//         " Sales Coordination",
//       ],
//       skills: [
//         " Deal Negotiation",
//         " Lead Generation",
//         " Client Relationship Management",
//         " CRM",
//       ],
//     },
//     {
//       id: 15,
//       name: "Mr. Sujeet Mehta",
//       position: "Assistant Vice President",
//       images: "/images/Our team/15.5.png",
//       bio: "A seasoned sales professional with 9 years of experience, Sujeet began his journey in 2011 in the BPO sector before transitioning into real estate in 2016. Currently serving as Associate Vice President at Inrext, he specializes in plot and commercial property sales, delivering expert consultation and customer-focused strategies. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "9 Years",
//       projects: [
//         "Dholera",
//         "Migsun Rohini Central",
//         "  KW Blue Pearl",
//         "KW Delhi 6",
//         "Aqua Green",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Plots", " Commercial Properties "],
//       skills: [
//         "Sales Strategy",
//         " Client Handling",
//         " Market Analysis",
//         " Relationship Management ",
//       ],
//     },
//     {
//       id: 16,
//       name: "Mr. Deepak Kumar",
//       position: "Assistant Vice President",
//       images: "/images/Our team/16.5.png",
//       bio: "Deepak has over 15 years of multi-industry experience, combining real estate consulting with financial and insurance expertise. His tenure includes roles at Acres N Inches, LIC, and HDFC Bank, offering clients 360° investment guidance. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "15 Years",
//       projects: [
//         "Dholera",
//         "Migsun Rohini Central",
//         "  KW Blue Pearl",
//         "KW Delhi 6",
//         "Aqua Green",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: [
//         "Property Consulting",
//         " Financial Planning",
//         "Insurance Advisory ",
//       ],
//       skills: [
//         " Investment Planning",
//         " Cross-Selling",
//         " Risk Assessment",
//         " Client Consultation",
//       ],
//     },
//     {
//       id: 17,
//       name: "Mohd. Kaleem",
//       position: "Assistant Vice President",
//       images: "/images/Our team/17.5.png",
//       bio: "Kaleem is a senior real estate professional with 13 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "13 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         "ECO Village",
//         "KW Blue Pearl",
//         "Kw Delhi 6",
//         " Migsun Rohini Central",
//       ],
//       expertise: ["Real Estate Strategy", "Team Leadership "],
//       skills: [
//         " High Ticket Closures",
//         "Deal Structuring",
//         "Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 18,
//       name: "Mr. Manish Kumar",
//       position: "Assistant Vice President",
//       images: "/images/Our team/18.5.png",
//       bio: "Manish is a motivated sales and marketing expert with 5 years of real estate experience. Previously General Manager at Acres N Inches, he has a proven track record in both residential and commercial property sales.  ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "5 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         "ECO Village",
//         "KW Blue Pearl",
//         "Kw Delhi 6",
//         " Migsun Rohini Central",
//       ],
//       expertise: [
//         " Residential & Commercial Real Estate",
//         "Marketing Strategy  ",
//       ],
//       skills: [
//         "  Negotiation",
//         " Digital Campaigns",
//         " Property Evaluation ",
//         " CRM ",
//       ],
//     },
//     {
//       id: 19,
//       name: "Mr. Rajendra Chauhan",
//       position: "Assistant Vice President",
//       images: "/images/Our team/19.5.png",
//       bio: "Rajendra is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.  ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "10 Years",
//       projects: [
//         "Dholera",
//         "Aqua Green",
//         " Migsun Rohini Central",
//         " KW Blue Pearl",
//         "KW Delhi 6",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: ["Real Estate Strategy", " Team Leadership"],
//       skills: [
//         "High-Ticket Closures",
//         " Deal Structuring",
//         " Project Launches",
//         " CRM ",
//       ],
//     },
//     {
//       id: 20,
//       name: "Mr. Subodh Khantwal",
//       position: "Assistant Vice President",
//       images: "/images/Our team/20.5.png",
//       bio: "Subodh is a goal-oriented real estate expert with 9 years of hands-on experience in property sales and marketing. His professional approach and client-centric strategies consistently drive high conversion sales. ",
//       // linkedin: "https://linkedin.com/in/shivakarki",
//       experience: "09 Years",
//       projects: [
//         "Dholera",
//         "Migsun Rohini Central",
//         "Aqua Green",
//         " ECO Village",
//         "Urbainia",
//       ],
//       expertise: [" Sales & Marketing", "  Residential & Commercial Advisory"],
//       skills: [
//         " Deal Negotiation",
//         " Lead Generation",
//         " Client Relationship Management",
//         " CRM",
//       ],
//     },
//     // {
//     //   id: 11,
//     //   name: "Mr. Arun Kumar",
//     //   position: "Assistant Vice President",
//     //   images: "/images/Our team/11.5.png",
//     //   bio: "Arun is a senior real estate professional with 10 years of experience, including a decade as an Assistant Vice President. His leadership in managing large teams and guiding clients across various property transactions makes him a trusted advisor.  ",
//     //   // linkedin: "https://linkedin.com/in/shivakarki",
//     //   experience: "10 Years",
//     //   projects: [
//     //     "Dholera",
//     //     "Aqua Green",
//     //     " Migsun Rohini Central",
//     //     " KW Blue Pearl",
//     //     "KW Delhi 6",
//     //     " ECO Village",
//     //     "Urbainia",
//     //   ],
//     //   expertise: ["Real Estate Strategy", " Team Leadership"],
//     //   skills: [
//     //     "High-Ticket Closures",
//     //     " Deal Structuring",
//     //     " Project Launches",
//     //     " CRM ",
//     //   ],
//     // },
//   ];

//   useEffect(() => {
//     // Check screen size on component mount
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
//       if (window.innerWidth < 1024) {
//         setActiveTab("bio");
//       } else {
//         setActiveTab("experience");
//       }
//     };

//     // Initial check
//     checkScreenSize();

//     // Cleanup
//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Decode the URL-encoded name and find the team member
//   const decodedName = decodeURIComponent(name);

//   // First check if it's a visionary
//   const visionary = visionaries.find(
//     (v) => v.name.toLowerCase() === decodedName.toLowerCase()
//   );

//   // const member = teamMembers.find(
//   //   (member) => member.name.toLowerCase() === decodedName.toLowerCase()
//   // );

//   // if (!member) {
//   //   return <div>Team member not found</div>;
//   // }

//   // If not a visionary, check if it's a team member
//   const teamMember = !visionary
//     ? teamMembers.find(
//         (member) => member.name.toLowerCase() === decodedName.toLowerCase()
//       )
//     : null;

//   if (!visionary && !teamMember) {
//     return <div>Member not found</div>;
//   }

//   const member = visionary || teamMember;
//   const isVisionary = !!visionary;

//   // Ensure images is always an array
//   // const memberImages = Array.isArray(member.images)
//   //   ? member.images
//   //   : [member.images];
//   // Ensure images is always an array
//   const memberImages = isVisionary
//     ? [member.image]
//     : Array.isArray(member.images)
//     ? member.images
//     : [member.images];

//   // const renderContent = () => {
//   const renderContent = () => {
//     if (isVisionary) {
//       // Special rendering for visionaries - just show bio
//       return (
//         <div
//           className={`p-4 flex flex-col gap-y-[1.5rem] ${
//             isDarkMode ? "text-white" : "text-black"
//           }`}
//         >
//           <p>{member.bio}</p>
//           <p>{member.bio1}</p>
//         </div>
//       );
//     }
//     // Original rendering for team members
//     switch (activeTab) {
//       case "bio":
//         return (
//           <>
//             <p
//               className={`p-4 flex flex-col gap-y-[1.5rem] ${
//                 isDarkMode ? "text-white " : "text-black"
//               }`}
//             >
//               {member.bio}
//               <Link
//                 to="/contact"
//                 className="flex items-center justify-center w-full text-white px-2 py-2 capitalize text-[0.7rem] lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
//               >
//                 schedule meeting
//               </Link>
//             </p>
//           </>
//         );
//       case "experience":
//         return (
//           <p className={`p-4 ${isDarkMode ? "text-white " : "text-black"}`}>
//             {member.experience}
//           </p>
//         );
//       case "projects":
//         if (!member.projects || member.projects.length === 0) {
//           return (
//             <p className={`p-4 ${isDarkMode ? "text-white " : "text-black"}`}>
//               No projects listed
//             </p>
//           );
//         }

//         return (
//           <div className="p-4">
//             <div
//               className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${
//                 isDarkMode ? "text-white" : "text-black"
//               }`}
//             >
//               {member.projects.map((projectName, index) => {
//                 // Find the property that matches this project name
//                 const property = properties.find((prop) =>
//                   prop.name
//                     .toLowerCase()
//                     .includes(projectName.toLowerCase().trim())
//                 );

//                 if (!property) {
//                   return (
//                     <div key={index} className="border rounded-lg p-4">
//                       <h3 className="font-bold">{projectName}</h3>
//                       <p>Details not available</p>
//                     </div>
//                   );
//                 }

//                 return (
//                   <div
//                     key={index}
//                     className={`rounded-lg ${isDarkMode ? "" : ""}`}
//                   >
//                     <Link
//                       to={`/properties/${property.name
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}`}
//                       className="flex flex-col items-center relative rounded-lg overflow-hidden"
//                     >
//                       <div className="rounded-lg relative inset-0 transition-all duration-500 hover:scale-110 ">
//                         {property.images && property.images.length > 0 && (
//                           <img
//                             src={property.images[0]}
//                             alt={property.name}
//                             className="w-full h-48 object-cover rounded-lg "
//                           />
//                         )}
//                         <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
//                       </div>
//                       <div className="absolute inter bottom-2 text-white">
//                         <h3 className="font-bold text-lg mb-2">
//                           {property.name}
//                         </h3>
//                       </div>
//                     </Link>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       case "expertise":
//         return (
//           <ul
//             className={`grid grid-cols-2 gap-2 p-4 ${
//               isDarkMode ? "text-white " : "text-black"
//             }`}
//           >
//             {member.expertise.map((expertise, index) => (
//               <li key={index} className="flex items-center">
//                 <span className="mr-2">•</span> {expertise}
//               </li>
//             ))}
//           </ul>
//         );
//       case "skills":
//         return (
//           <ul
//             className={`grid grid-cols-2 gap-2 p-4 ${
//               isDarkMode ? "text-white " : "text-black"
//             }`}
//           >
//             {member.skills.map((skill, index) => (
//               <li key={index} className="flex items-center">
//                 <span className="mr-2">•</span> {skill}
//               </li>
//             ))}
//           </ul>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className={` ${isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"}`}
//     >
//       <div className="max-w-7xl mx-auto px-6 py-[5rem] ">
//         <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-0 gap-y-0">
//           <div className="col-span-1 flex justify-center lg:justify-start relative">
//             <div className="flex justify-center relative w-full max-w-[90vw] md:max-w-none">
//               {/* Gradient overlay centered on the image - made larger for mobile */}
//               <div className="absolute inset-0 flex justify-center items-center">
//                 <div
//                   className="w-0 h-0 rounded-full bg-transparent 
//                     shadow-[0_0_200px_150px_rgba(59,130,246,0.3)]
//                     sm:shadow-[0_0_250px_180px_rgba(59,130,246,0.3)]
//                     pointer-events-none"
//                 ></div>
//               </div>

//               {/* Centered at the bottom - hidden on small screens */}
//               <div className="absolute lg:block hidden justify-center items-center w-[13.5rem] h-[15.5rem] filter drop-shadow-[0_0_11px_rgba(0,0,0,1)] bottom-0 left-[6.3rem]">
//                 <div className="bg-gray-950 w-[13.5rem] h-[15.5rem] rounded"></div>
//               </div>

//               <div className="relative flex justify-center w-full">
//                 {memberImages.length > 0 && (
//                   <div className="lg:h-full lg:w-full md:h-[55vh] h-[60vh] w-full max-w-[90vw] sm:max-w-[30rem] relative">
//                     <img
//                       src={memberImages[0]}
//                       alt={`${member.name}`}
//                       className="w-full h-full object-cover mx-auto"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="col-span-2 lg:ps-[5rem] flex flex-col justify-center items-center lg:text-start text-center relative">
//             <div
//               className={`absolute z-[2] flex flex-col ${
//                 isVisionary ? "lg:top-[6.5rem]" : "lg:bottom-0"
//               } bottom-6 lg:gap-y-[1.2rem] md:gap-y-[1rem] gap-y-[0.3rem]`}
//             >
//               <h1
//                 className={`dm-serif-display lg:text-[3.1rem] md:text-[2.5rem] text-[1.4rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] pt-0 ${
//                   isDarkMode ? "lg:text-blue-500 text-white" : "text-black"
//                 }`}
//               >
//                 {member.name}
//               </h1>
//               <p
//                 className={`inter lg:text-[1.1rem] md:text-[1.3rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1rem] leading-[0.7rem] ${
//                   isDarkMode ? "text-white " : "text-black"
//                 }`}
//               >
//                 {member.position}
//               </p>

//               {member.bio && (
//                 <p
//                   className={`lg:text-[0.9rem] hidden lg:block md:text-[0.8rem] text-[0.7rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] ${
//                     isDarkMode ? "text-white " : "text-black"
//                   }`}
//                 >
//                   {member.bio}
//                 </p>
//               )}
//               {member.bio1 && (
//                 <p
//                   className={`lg:text-[0.9rem] hidden lg:block md:text-[0.8rem] text-[0.7rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] ${
//                     isDarkMode ? "text-white " : "text-black"
//                   }`}
//                 >
//                   {member.bio1}
//                 </p>
//               )}

//               {!isVisionary && (
//                 <Link
//                   to="/contact"
//                   className="lg:block hidden items-center w-fit text-white px-2 py-2 capitalize text-[0.7rem] lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold mt-4"
//                 >
//                   schedule meeting
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//         <div className="absolute z-[-1] inset-0 flex lg:hidden justify-center items-center top-[5rem]">
//           <div
//             className="w-0 h-0 rounded-full bg-transparent 
//         shadow-[0_0_200px_150px_rgba(59,130,246,0.9)]
//         sm:shadow-[0_0_200px_150px_rgba(59,130,246,0.9)]
//         pointer-events-none"
//           ></div>
//         </div>

//         {/* Only show tabs for team members, not visionaries */}
//         {!isVisionary && (
//           <div className="">
//             <div className="lg:mt-[3rem] mt-[1rem]">
//               <div className="text-white">
//                 {/* Navigation Tabs */}
//                 <div className="flex overflow-x-auto scrollbar-hide px-0 lg:py-[1rem]">
//                   <div className="flex justify-center font-semibold space-x-10 mx-auto">
//                     <button
//                       className={`pb-2 cursor-pointer lg:hidden whitespace-nowrap ${
//                         activeTab === "bio"
//                           ? "border-b-2 border-blue-500 text-blue-500"
//                           : isDarkMode
//                           ? "text-white hover:text-gray-700"
//                           : "text-gray-900 hover:text-gray-700"
//                       }`}
//                       onClick={() => setActiveTab("bio")}
//                     >
//                       About
//                     </button>
//                     <button
//                       className={`pb-2 cursor-pointer whitespace-nowrap ${
//                         activeTab === "experience"
//                           ? "border-b-2 border-blue-500 text-blue-500"
//                           : isDarkMode
//                           ? "text-white hover:text-gray-700"
//                           : "text-gray-900 hover:text-gray-700"
//                       }`}
//                       onClick={() => setActiveTab("experience")}
//                     >
//                       Experience
//                     </button>
//                     <button
//                       className={`pb-2 cursor-pointer whitespace-nowrap ${
//                         activeTab === "projects"
//                           ? "border-b-2 border-blue-500 text-blue-500"
//                           : isDarkMode
//                           ? "text-white hover:text-gray-700"
//                           : "text-gray-900 hover:text-gray-700"
//                       }`}
//                       onClick={() => setActiveTab("projects")}
//                     >
//                       Projects
//                     </button>
//                     <button
//                       className={`pb-2 cursor-pointer whitespace-nowrap ${
//                         activeTab === "expertise"
//                           ? "border-b-2 border-blue-500 text-blue-500"
//                           : isDarkMode
//                           ? "text-white hover:text-gray-700"
//                           : "text-gray-900 hover:text-gray-700"
//                       }`}
//                       onClick={() => setActiveTab("expertise")}
//                     >
//                       Expertise
//                     </button>
//                     <button
//                       className={`pb-2 cursor-pointer whitespace-nowrap ${
//                         activeTab === "skills"
//                           ? "border-b-2 border-blue-500 text-blue-500"
//                           : isDarkMode
//                           ? "text-white hover:text-gray-700"
//                           : "text-gray-900 hover:text-gray-700"
//                       }`}
//                       onClick={() => setActiveTab("skills")}
//                     >
//                       Skills
//                     </button>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="mx-auto rounded-lg shadow-lg lg:p-6 py-4">
//                   <h2
//                     className={`text-xl font-bold mb-2 capitalize ${
//                       isDarkMode ? "text-white " : "text-black"
//                     }`}
//                   >
//                     {activeTab}
//                   </h2>
//                   <div
//                     className={`rounded p-2 ${
//                       isDarkMode
//                         ? "border border-blue-500 "
//                         : "border border-blue-500"
//                     }`}
//                   >
//                     {renderContent()}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* For visionaries, just show the bio content */}
//         {isVisionary && (
//           <div className="mx-auto lg:hidden rounded-lg shadow-lg lg:p-6 py-4 lg:mt-[3rem] mt-[1rem]">
//             <h2
//               className={`text-xl font-bold mb-2 capitalize ${
//                 isDarkMode ? "text-white " : "text-black"
//               }`}
//             >
//               About
//             </h2>
//             <div
//               className={`rounded p-2 ${
//                 isDarkMode
//                   ? "border border-blue-500 "
//                   : "border border-blue-500"
//               }`}
//             >
//               {renderContent()}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SingleTeam;
