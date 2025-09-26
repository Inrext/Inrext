// "use client";
// import React, { useContext, useState, useEffect, useCallback } from "react";
// import { useTheme } from "../content/ThemeContext";
// import { AuthContext } from "../content/AuthContext";
// import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
// import {
//   FaAddressBook,
//   FaCar,
//   FaChalkboardUser,
//   FaGift,
//   FaStreetView,
//   FaUsers,
//   FaChevronLeft,
//   FaChevronRight,
//   FaSitemap,
//   FaChevronDown,
// } from "react-icons/fa6";
// import { FaHome, FaFileContract, FaMapMarkedAlt } from "react-icons/fa";
// import { BiCalendarEvent } from "react-icons/bi";
// import { RxUpdate } from "react-icons/rx";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import Link from "next/link";
// import Image from "next/image";

// const Dashboard = () => {
//   const { isDarkMode } = useTheme();
//   const authContext = useContext(AuthContext);
//   const user = authContext?.user;
//   const [activeTab, setActiveTab] = useState("dashboard");
//   interface BookingType {
//     _id: string;
//     employeeName?: string;
//     requestedDateTime?: string;
//     teamHeadName?: string;
//     [key: string]: any;
//   }
//   interface SiteVisitType {
//     _id: string;
//     employeeName?: string;
//     createdAt?: string;
//     [key: string]: any;
//   }
//   interface LeadType {
//     _id: string;
//     name: string;
//     phone: string;
//     email: string;
//     propertyName: string;
//     createdAt?: string;
//     [key: string]: any;
//   }

//   const [leads, setLeads] = useState<LeadType[]>([]);
//   const [leadsLoading, setLeadsLoading] = useState<boolean>(false);
//   const [leadsError, setLeadsError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");
//   const [employeeFilter, setEmployeeFilter] = useState<string | null>(null);
//   const [filteredBookings, setFilteredBookings] = useState<BookingType[]>([]);
//   const [teamHeadFilter, setTeamHeadFilter] = useState<string | null>(null);
//   const [employeeSiteVisitFilter, setEmployeeSiteVisitFilter] = useState<string | null>(null);
//   const [filteredSiteVisits, setFilteredSiteVisits] = useState<SiteVisitType[]>([]);
//   const [filteredBookingLogins, setFilteredBookingLogins] = useState<BookingType[]>([]);
//   const [showSiteVisitsFilter, setShowSiteVisitsFilter] = useState(false);
//   const [showTeamMemberFilter, setShowTeamMeberFilter] = useState(false);
//   const [showBookingFilter, setShowBookingFilter] = useState(false);
//   const [showCabBookingsFilter, setShowCabBookingsFilter] = useState(false);
//   const [rewards, setRewards] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [windowWidth, setWindowWidth] = useState(0);
//   const [hierarchicalData, setHierarchicalData] = useState<TreeNodeType[]>([]);
//   const [expandedNodes, setExpandedNodes] = useState(new Set());

//   const videoIds = [
//     "8l2MIAmPYAo&t=73s",
//     "gNqP1-mpOY4&t=3621s",
//     "l34GR2evlmo&t=5s",
//     "dEntqAGApc4&t=4098s",
//     "wNyY0Nrs8GM&t=39s",
//     "Lh1dzp8Yiv4&t=14s",
//     "RDgYrQMhNKI",
//   ].filter(Boolean);

//   // TreeNode component for hierarchical view
//   interface TreeNodeType {
//     _id: string;
//     username: string;
//     role: string;
//     children: TreeNodeType[];
//     mouData: any[];
//     hierarchyPath?: string;
//     photoURL?: string;
//   }

//   interface TreeNodeProps {
//     node: TreeNodeType;
//     level?: number;
//   }

//   const TreeNode: React.FC<TreeNodeProps> = ({ node, level = 0 }) => {
//   const isExpanded = expandedNodes.has(node._id);
//   const hasChildren = node.children && node.children.length > 0;
//   const hasMOUs = node.mouData && node.mouData.length > 0;

//   return (
//     <div className={isDarkMode ? "text-white" : "text-gray-800"}>
//       <div
//         className={`flex items-center py-2 px-4 hover:${
//           isDarkMode ? "bg-gray-700" : "bg-gray-100"
//         } cursor-pointer`}
//         style={{ paddingLeft: `${level * 20}px` }}
//         onClick={() => {
//           const newExpanded = new Set(expandedNodes);
//           if (newExpanded.has(node._id)) {
//             newExpanded.delete(node._id);
//           } else {
//             newExpanded.add(node._id);
//           }
//           setExpandedNodes(newExpanded);
//         }}
//       >
//         {/* Always show chevron for all nodes */}
//         <span className="mr-2">
//           {isExpanded ? (
//             <FaChevronDown size={12} />
//           ) : (
//             <FaChevronRight size={12} />
//           )}
//         </span>

//         <div className="flex-1">
//           <div className="font-medium">
//             {node.username}
//             {node.role === "team_head" && (
//               <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded">
//                 Team Head
//               </span>
//             )}
//             {node.role === "associate" && (
//               <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
//                 Associate
//               </span>
//             )}
//           </div>
//           <div className="text-xs opacity-60 mt-1">
//             {hasMOUs 
//               ? `${node.mouData.length} MOUs created` 
//               : "No MOUs created"}
//           </div>
//         </div>
//       </div>

//       {isExpanded && (
//         <div className="border-l-2 border-gray-300 ml-5">
//           {/* Show child associates if any */}
//           {hasChildren ? (
//             node.children.map((child) => (
//               <TreeNode key={child._id} node={child} level={level + 1} />
//             ))
//           ) : (
//             <div
//               className={`py-2 px-4 text-sm ${
//                 isDarkMode ? "text-gray-400" : "text-gray-500"
//               }`}
//               style={{ paddingLeft: `${(level + 1) * 20}px` }}
//             >
//               No associates under this user
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

//   // Transform flat data to hierarchical structure
//   interface MOUType {
//     _id: string;
//     createdBy: { _id: string };
//     [key: string]: any;
//   }

//   // Reuse TreeNodeType from above
//   // interface TreeNodeType { ... }

//   const transformToHierarchy = (mous: MOUType[], users: TreeNodeType[]): TreeNodeType[] => {
//     // Ensure users is an array
//     const usersArray: TreeNodeType[] = Array.isArray(users) ? users : [];

//     // Create a map of all users by their ID (including both team heads and associates)
//     const usersMap: { [key: string]: TreeNodeType } = {};
//     usersArray.forEach((user: TreeNodeType) => {
//       if (user && user._id) {
//         usersMap[user._id] = {
//           ...user,
//           children: [],
//           mouData: [],
//         };
//       }
//     });

//     // Add MOUs to their creators
//     mous.forEach((mou: MOUType) => {
//       if (mou.createdBy && mou.createdBy._id && usersMap[mou.createdBy._id]) {
//         usersMap[mou.createdBy._id].mouData.push(mou);
//       }
//     });

//     // Build hierarchy for all users
//     Object.values(usersMap).forEach((user: TreeNodeType) => {
//       if (user.hierarchyPath) {
//         const pathParts = user.hierarchyPath.split(",");
//         if (pathParts.length > 0) {
//           const parentId = pathParts[pathParts.length - 1];
//           if (usersMap[parentId] && parentId !== user._id.toString()) {
//             if (!usersMap[parentId].children.some(
//               (child: TreeNodeType) => child._id.toString() === user._id.toString()
//             )) {
//               usersMap[parentId].children.push(user);
//             }
//           }
//         }
//       }
//     });

//     // Find root nodes - users who are not children of anyone else
//     const rootNodes = Object.values(usersMap).filter((user: TreeNodeType) => {
//       // A user is a root node if:
//       // 1. They have no hierarchyPath (shouldn't happen in your system)
//       // 2. Their hierarchyPath ends with their own ID (self-referential)
//       // 3. They are not a child of any other node
//       return !user.hierarchyPath ||
//         user.hierarchyPath.endsWith(user._id.toString()) ||
//         !Object.values(usersMap).some((u: TreeNodeType) =>
//           u.children.some((c: TreeNodeType) => c._id.toString() === user._id.toString())
//         );
//     });

//     return rootNodes;
//   };

//   // Track window size
//   useEffect(() => {
//     // Only access window in useEffect (client-side)
//     setWindowWidth(typeof window !== "undefined" ? window.innerWidth : 0);
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//       // Auto-close sidebar if window is resized to desktop
//       if (window.innerWidth >= 768) {
//         setSidebarOpen(false);
//         setMobileMenuOpen(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Close sidebar when switching tabs on mobile
//   useEffect(() => {
//     if (windowWidth < 768) {
//       setSidebarOpen(false);
//     }
//   }, [activeTab, windowWidth]);

//   const [dashboardData, setDashboardData] = useState({
//     stats: {
//       teamMembers: 0,
//       totalBookings: 0,
//       totalSiteVisits: 0,
//       totalCabBookings: 0,
//       trainingSessions: 0,
//       upcomingEvents: 0,
//       newUpdates: 0,
//       totalRewards: 0,
//       totalPropertyLeads: 0, // Add this property
//     },
//     recentSiteVisits: [],
//     recentCabBookings: [],
//     recentBookingLogins: [],
//     allSiteVisits: [],
//     allCabBookings: [],
//     allBookingLogins: [],
//   });

//   // Fetch all necessary data for dashboard
//   const fetchDashboardData = useCallback(async (): Promise<void> => {
//     setLoading(true);
//     setError("");
//     setEmployeeFilter(null);
//     setTeamHeadFilter(null);
//     setFilteredBookingLogins([]);
//     setFilteredBookings([]);
//     try {
//       // Fetch property leads count
//       const res = await fetch("/api/interest");
//       const data = await res.json();
//       const totalLeads = Array.isArray(data) ? data.length : 0;
//       setDashboardData((prev) => ({
//         ...prev,
//         stats: {
//           teamMembers: 0,
//           trainingSessions: videoIds.length,
//           upcomingEvents: 0,
//           newUpdates: 5,
//           totalBookings: 0,
//           totalSiteVisits: 0,
//           totalCabBookings: 0,
//           totalRewards: 0,
//           totalPropertyLeads: totalLeads,
//         },
//       }));
//     } catch (err) {
//       setDashboardData((prev) => ({
//         ...prev,
//         stats: {
//           ...prev.stats,
//           totalPropertyLeads: 0,
//         },
//       }));
//       setError("Failed to fetch property leads count");
//     }
//     setLoading(false);
//   }, [videoIds.length]);

//   // Filter site visits by employee
//   const filterSiteVisitsByEmployee = useCallback((employeeName: string) => {
//     if (!employeeName) {
//       setEmployeeSiteVisitFilter(null);
//       setFilteredSiteVisits([]);
//       return;
//     }

//     const filtered = (dashboardData.allSiteVisits as SiteVisitType[]).filter(
//       (siteVisit: SiteVisitType) => siteVisit.employeeName === employeeName
//     );
//     setFilteredSiteVisits(filtered);
//     setEmployeeSiteVisitFilter(employeeName);
//   }, [dashboardData.allSiteVisits]);

//   // Filter cab bookings by employee
//   const filterByEmployee = useCallback((employeeName: string) => {
//     if (!employeeName) {
//       setEmployeeFilter(null);
//       setFilteredBookings([]);
//       return;
//     }

//     const filtered = (dashboardData.allCabBookings as BookingType[]).filter(
//       (booking: BookingType) => booking.employeeName === employeeName
//     );
//     setFilteredBookings(filtered);
//     setEmployeeFilter(employeeName);
//   }, [dashboardData.allCabBookings]);

//   // Filter booking logins by team head
//   const filterBookingsByTeamHead = useCallback((teamHeadName: string) => {
//     if (!teamHeadName) {
//       setTeamHeadFilter(null);
//       setFilteredBookingLogins([]);
//       return;
//     }

//     const filtered = (dashboardData.allBookingLogins as BookingType[]).filter(
//       (booking: BookingType) => booking.teamHeadName === teamHeadName
//     );
//     setFilteredBookingLogins(filtered);
//     setTeamHeadFilter(teamHeadName);
//   }, [dashboardData.allBookingLogins]);

//   // Get data for monthly cab bookings chart
//   const getMonthlyChartData = useCallback(() => {
//     const bookingsToUse: BookingType[] = employeeFilter
//       ? filteredBookings
//       : (dashboardData.allCabBookings as BookingType[]);

//     const monthlyData = Array.from({ length: 12 }, (_, i) => ({
//       name: new Date(0, i).toLocaleString("default", { month: "short" }),
//       visits: 0,
//     }));

//     bookingsToUse.forEach((booking: BookingType) => {
//       if (booking.requestedDateTime) {
//         const month = new Date(booking.requestedDateTime).getMonth();
//         monthlyData[month].visits++;
//       }
//     });

//     return monthlyData;
//   }, [employeeFilter, filteredBookings, dashboardData.allCabBookings]);

//   // Get data for monthly site visits chart
//   const getMonthlySiteVisitChartData = useCallback(() => {
//     const visitsToUse: SiteVisitType[] = employeeSiteVisitFilter
//       ? filteredSiteVisits
//       : (dashboardData.allSiteVisits as SiteVisitType[]);

//     const monthlyData = Array.from({ length: 12 }, (_, i) => ({
//       name: new Date(0, i).toLocaleString("default", { month: "short" }),
//       visits: 0,
//     }));

//     visitsToUse?.forEach((visit: SiteVisitType) => {
//       if (visit.createdAt) {
//         const month = new Date(visit.createdAt).getMonth();
//         monthlyData[month].visits++;
//       }
//     });

//     return monthlyData;
//   }, [employeeSiteVisitFilter, filteredSiteVisits, dashboardData.allSiteVisits]);

//   // Get employee booking statistics
//   const getEmployeeStats = useCallback(() => {
//     const employeeMap: { [key: string]: number } = {};

//     (dashboardData.allCabBookings as BookingType[])?.forEach((booking: BookingType) => {
//       const empName = booking.employeeName || "Unassigned";
//       employeeMap[empName] = (employeeMap[empName] || 0) + 1;
//     });

//     return Object.entries(employeeMap)
//       .sort((a, b) => (b[1] as number) - (a[1] as number))
//       .map(([name, count]) => ({ name, count }));
//   }, [dashboardData.allCabBookings]);

//   // Get employee site visit statistics
//   const getEmployeeSiteVisitStats = useCallback(() => {
//     const employeeMap: { [key: string]: number } = {};

//     (dashboardData.allSiteVisits as SiteVisitType[])?.forEach((siteVisit: SiteVisitType) => {
//       const empName = siteVisit.employeeName || "Unassigned";
//       employeeMap[empName] = (employeeMap[empName] || 0) + 1;
//     });

//     return Object.entries(employeeMap)
//       .sort((a, b) => (b[1] as number) - (a[1] as number))
//       .map(([name, count]) => ({ name, count }));
//   }, [dashboardData.allSiteVisits]);

//   // Get team head statistics for booking logins
//   const getTeamHeadStats = useCallback(() => {
//     const teamHeadMap: { [key: string]: number } = {};

//     (dashboardData.allBookingLogins as BookingType[])?.forEach((booking: BookingType) => {
//       const teamHead = booking.teamHeadName || "Unassigned";
//       teamHeadMap[teamHead] = (teamHeadMap[teamHead] || 0) + 1;
//     });

//     return Object.entries(teamHeadMap)
//       .sort((a, b) => (b[1] as number) - (a[1] as number))
//       .map(([name, count]) => ({ name, count }));
//   }, [dashboardData.allBookingLogins]);

//   useEffect(() => {
//     if (user) {
//       fetchDashboardData();
//     }
//   }, [user, fetchDashboardData]);

//   // Fetch property leads from backend when tab is selected
//   useEffect(() => {
//     if (activeTab === "total_property_leads") {
//       setLeadsLoading(true);
//       setLeadsError("");
//       fetch("/api/interest") // <-- Changed from /api/leads to /api/interest
//         .then((res) => res.json())
//         .then((data) => {
//           setLeads(Array.isArray(data) ? data : []);
//           setLeadsLoading(false);
//         })
//         .catch((err) => {
//           setLeadsError("Failed to fetch leads");
//           setLeadsLoading(false);
//         });
//     }
//   }, [activeTab]);

//   const getNavItems = () => {
//     const nav = [];
//     // Only show Total Property Leads for super_admin and accounts
//     if (user?.role === "super_admin" || user?.role === "accounts") {
//       nav.unshift({
//         id: "total_property_leads",
//         label: "Total Property Leads",
//         icon: (
//           <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             <FaHome />
//           </span>
//         ),
//       });
//     }
//     return nav;
//   };

//   const DashboardHome = () => {
//     return (
//       <div className="px-4 sm:px-6">
//         <h1
//           className={`text-xl lg:text-start md:text-start text-center sm:text-2xl font-bold mb-4 sm:mb-6 ${
//             isDarkMode ? "text-white " : "text-gray-950"
//           }`}
//         >
//           Welcome, {user?.username}
//         </h1>

//         {loading && (
//           <div className="flex justify-center items-center py-8">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//           </div>
//         )}

//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}

//         {/* Stats Cards */}
//         <div
//           className={`grid ${
//             mobileMenuOpen
//               ? "grid-cols-1"
//               : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
//           } gap-4 mb-6 sm:mb-8`}
//         >
//           {/* Total Property Leads Card */}
//           <div
//             className={`group flex justify-between items-center p-3 sm:py-2 sm:px-4 rounded-lg shadow transition-colors duration-300 ${
//               isDarkMode ? "border border-blue-500" : "bg-white"
//             } cursor-pointer`}
//           >
//             <div>
//               <h3
//                 className={`text-xs sm:text-sm md:text-[1rem] font-semibold ${
//                   isDarkMode ? "text-white " : "text-gray-950"
//                 }`}
//               >
//                 Total Property Leads
//               </h3>
//               <p className="text-lg sm:text-xl md:text-[1.7rem] font-bold text-blue-500">
//                 {dashboardData.stats.totalPropertyLeads}
//               </p>
//             </div>
//             <div className="text-sm sm:text-[1.2rem] bg-blue-500 rounded-lg text-white h-8 sm:h-10 w-8 sm:w-10 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600">
//               <FaHome />
//             </div>
//           </div>
//         </div>

//         {/* Site Visits Filter */}
//         {showSiteVisitsFilter && (
//           <>
//             <div
//               className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
//                 isDarkMode ? "border border-blue-500" : "bg-white"
//               }`}
//             >
//               <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//                 Site Visits by Employee
//               </h2>
//               <div
//                 className={`grid ${
//                   mobileMenuOpen
//                     ? "grid-cols-1"
//                     : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
//                 } gap-2 sm:gap-3`}
//               >
//                 {getEmployeeSiteVisitStats().map(({ name, count }) => (
//                   <div
//                     key={name}
//                     className={`p-2 sm:p-3 rounded-lg cursor-pointer ${
//                       isDarkMode
//                         ? "border border-blue-500 hover:border-blue-600"
//                         : "bg-blue-50 hover:bg-blue-100"
//                     } ${
//                       employeeSiteVisitFilter === name
//                         ? isDarkMode
//                           ? "ring-2 ring-blue-500"
//                           : "bg-blue-200"
//                         : ""
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       filterSiteVisitsByEmployee(
//                         name === "Unassigned" ? "" : name
//                       );
//                     }}
//                   >
//                     <p className="text-xs sm:text-sm font-medium truncate">
//                       {name}
//                     </p>
//                     <p className="text-xs sm:text-sm text-blue-500">
//                       {count} visits
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 gap-4 mb-4 sm:gap-6">
//               {/* Monthly Visits Chart */}
//               <div className="grid grid-cols-1 gap-4 sm:gap-6">
//                 <div
//                   className={`p-3 sm:p-4 rounded-lg ${
//                     isDarkMode ? "border border-blue-500" : "bg-white"
//                   }`}
//                 >
//                   <h2 className="text-sm sm:text-[1rem] font-semibold mb-3 sm:mb-4">
//                     Monthly Site Visits{" "}
//                     {employeeFilter && `(Filtered by ${employeeFilter})`}
//                   </h2>
//                   <div className="h-[250px] sm:h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={getMonthlySiteVisitChartData()}
//                         margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar
//                           dataKey="visits"
//                           fill="#3b82f6"
//                           name="Visits"
//                           radius={[4, 4, 0, 0]}
//                         />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Team Member Filter */}
//         {showTeamMemberFilter && (
//           <div
//             className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
//               isDarkMode ? "border border-blue-500" : "bg-white"
//             }`}
//           >
//             <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//               Team Members
//             </h2>
            
//             {loading ? (
//               <div className="flex justify-center items-center py-8">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//               </div>
//             ) : hierarchicalData.length === 0 ? (
//               <p className="text-center py-4">No team members found</p>
//             ) : (
//               <div className={`border rounded ${
//                 isDarkMode ? "border-gray-600" : "border-gray-300"
//               }`}>
//                 {hierarchicalData.map((node) => (
//                   <TreeNode key={node._id} node={node} />
//                 ))}
//               </div>
//             )}
//           </div>
//         )}

//         {/* Booking Login Filter */}
//         {showBookingFilter && (
//           <div
//             className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
//               isDarkMode ? "border border-blue-500" : "bg-white"
//             }`}
//           >
//             <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//               Bookings by Team Head
//             </h2>
//             <div
//               className={`grid ${
//                 mobileMenuOpen
//                   ? "grid-cols-1"
//                   : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
//               } gap-2 sm:gap-3`}
//             >
//               {getTeamHeadStats().map(({ name, count }) => (
//                 <div
//                   key={name}
//                   className={`p-2 sm:p-3 rounded-lg cursor-pointer ${
//                     isDarkMode
//                       ? "border border-blue-500 hover:border-blue-600"
//                       : "bg-blue-50 hover:bg-blue-100"
//                   } ${
//                     teamHeadFilter === name
//                       ? isDarkMode
//                         ? "ring-2 ring-blue-500"
//                         : "bg-blue-200"
//                       : ""
//                   }`}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     filterBookingsByTeamHead(name === "Unassigned" ? "" : name);
//                   }}
//                 >
//                   <p className="text-xs sm:text-sm font-medium truncate">
//                     {name}
//                   </p>
//                   <p className="text-xs sm:text-sm text-blue-500">
//                     {count} bookings
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {showCabBookingsFilter && (
//           <>
//             <div
//               className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 ${
//                 isDarkMode ? "border border-blue-500" : "bg-white"
//               }`}
//             >
//               <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//                 Cab Bookings by Employee
//               </h2>
//               <div
//                 className={`grid ${
//                   mobileMenuOpen
//                     ? "grid-cols-1"
//                     : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
//                 } gap-2 sm:gap-3`}
//               >
//                 {getEmployeeStats().map(({ name, count }) => (
//                   <div
//                     key={name}
//                     className={`p-2 sm:p-3 rounded-lg cursor-pointer ${
//                       isDarkMode
//                         ? "bg-gray-700 hover:bg-gray-600"
//                         : "bg-blue-50 hover:bg-blue-100"
//                     } ${
//                       employeeFilter === name
//                         ? isDarkMode
//                           ? "ring-2 ring-blue-500"
//                           : "bg-blue-200"
//                         : ""
//                     }`}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       filterByEmployee(name === "Unassigned" ? "" : name);
//                     }}
//                   >
//                     <p className="text-xs sm:text-sm font-medium truncate">
//                       {name}
//                     </p>
//                     <p className="text-xs sm:text-sm text-blue-500">
//                       {count} bookings
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="grid grid-cols-1 mb-4 gap-4 sm:gap-6">
//               {/* Monthly Cab Visits Chart */}
//               <div className="grid grid-cols-1 gap-4 sm:gap-6">
//                 <div
//                   className={`p-3 sm:p-4 rounded-lg ${
//                     isDarkMode ? "border border-blue-500" : "bg-white"
//                   }`}
//                 >
//                   <h2 className="text-sm sm:text-[1rem] font-semibold mb-3 sm:mb-4">
//                     Monthly Cab Booking{" "}
//                     {employeeFilter && `(Filtered by ${employeeFilter})`}
//                   </h2>
//                   <div className="h-[250px] sm:h-[300px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <BarChart
//                         data={getMonthlyChartData()}
//                         margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
//                       >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar
//                           dataKey="visits"
//                           fill="#3b82f6"
//                           name="Visits"
//                           radius={[4, 4, 0, 0]}
//                         />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}

//         {/* FreelancerGrowthPlan */}
//         {/*
//         <div className="grid grid-cols-1 gap-4 sm:gap-6">
//           <div className="grid grid-cols-1 gap-4 sm:gap-6">
//             <div
//               className={`p-3 sm:p-4 rounded-lg ${
//                 isDarkMode ? "border border-blue-500" : "bg-white"
//               }`}
//             >
//               <FreelancerGrowthPlan />
//             </div>
//           </div>
//         </div>
//         */}
//       </div>
//     );
//   };

//   // Component mappings for different roles
//   interface ComponentMap {
//     [key: string]: React.FC<any>;
//   }
//   const SuperAdminComponents: ComponentMap = {
//     dashboard: DashboardHome,
//     users: () => (
//       <div className="p-4 sm:p-6">
//         <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
//           User Management
//         </h1>
//         <p className="text-sm sm:text-base">Manage all users and permissions</p>
//       </div>
//     ),
//   };

//   const AccountsComponents: ComponentMap = {};

//   const TeamHeadComponents: ComponentMap = {
//     dashboard: DashboardHome,
//   };

//   const AssociateComponents: ComponentMap = {};

//   const CabManagementComponents: ComponentMap = {
//     dashboard: DashboardHome,
//   };

//   const getComponents = (): ComponentMap => {
//     switch (user?.role) {
//       case "super_admin":
//         return SuperAdminComponents;
//       case "accounts":
//         return AccountsComponents;
//       case "team_head":
//         return TeamHeadComponents;
//       case "associate":
//         return AssociateComponents;
//       case "cab_management":
//         return CabManagementComponents;
//       default:
//         return { dashboard: DashboardHome };
//     }
//   };

//   // Component for showing property leads
//   const PropertyLeadsList = () => (
//     <div className="px-4 sm:px-6">
//       <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//         Property Leads
//       </h2>
//       {leadsLoading ? (
//         <div className="flex justify-center items-center py-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       ) : leadsError ? (
//         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{leadsError}</div>
//       ) : leads.length === 0 ? (
//         <div className="text-center py-4">No leads found.</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className={`min-w-full border rounded-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
//             <thead>
//               <tr className={`${isDarkMode ? "bg-blue-900" : "bg-blue-100"}`}>
//                 <th className="px-4 py-2 text-left">ID</th>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Phone</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Property Name</th>
//                 <th className="px-4 py-2 text-left">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead: any) => (
//                 <tr key={lead._id} className="border-t">
//                   <td className="px-4 py-2">{lead._id}</td>
//                   <td className="px-4 py-2">{lead.name}</td>
//                   <td className="px-4 py-2">{lead.phone}</td>
//                   <td className="px-4 py-2">{lead.email}</td>
//                   <td className="px-4 py-2">{lead.propertyName}</td>
//                   <td className="px-4 py-2">{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : ""}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );

//   // Main content mapping
//   const ActiveComponent =
//     activeTab === "total_property_leads"
//       ? (user?.role === "super_admin" || user?.role === "accounts"
//           ? PropertyLeadsList
//           : () => (
//               <div className="px-4 sm:px-6">
//                 <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
//                   Access Denied
//                 </h2>
//                 <div className="text-gray-500">You do not have permission to view property leads.</div>
//               </div>
//             )
//       )
//     : getComponents()[activeTab] || DashboardHome;

//   return (
//     <ProtectedRoute
//       roles={["super_admin", "accounts", "team_head", "associate", "cab_management"]}
//     >
//       <div
//         className={`flex flex-col md:flex-row min-h-screen ${
//           isDarkMode ? "bg-black text-white" : "bg-blue-50"
//         }`}
//       >
//         {/* Mobile menu button */}
//         {windowWidth < 768 && (
//           <button
//             className={`fixed top-[4rem]  text-white bg-blue-500  p-2 rounded-e-full transition-all duration-300 ${
//               sidebarOpen ? "left-[11rem]" : "left-0"
//             }`}
//             onClick={() => {
//               setSidebarOpen(!sidebarOpen);
//               setMobileMenuOpen(!sidebarOpen);
//             }}
//           >
//             {sidebarOpen ? (
//               <FaChevronLeft className="text-lg font-bold" />
//             ) : (
//               <FaChevronRight className="text-lg font-bold" />
//             )}
//           </button>
//         )}

//         {/* Sidebar */}
//         <div
//           className={`lg:w-[16rem] md:w-[14rem] w-[11rem] p-0 py-[3.9rem] fixed min-h-screen transition-transform duration-300  ${
//             isDarkMode ? "bg-black shadow-r shadow-xl" : "bg-blue-50"
//           } shadow-lg  ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
//           }`}
//         >
//           <div className="px-4">
//             {/* User Profile Section */}
//             <Link href="/profile">
//               <div
//                 className={`flex items-center mb-4 p-2 rounded-lg ${
//                   isDarkMode ? "bg-blue-500 " : "bg-blue-100"
//                 }`}
//               >
//                 {user?.photoURL ? (
//                   <Image
//                     src={user.photoURL}
//                     alt="Profile"
//                     className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3"
//                     width={48}
//                     height={48}
//                     priority
//                   />
//                 ) : (
//                   <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg sm:text-xl mr-3">
//                     {user?.username?.charAt(0).toUpperCase()}
//                   </div>
//                 )}
//                 <div>
//                   <h3
//                     className={`text-sm sm:text-base font-semibold ${
//                       isDarkMode ? "text-white " : "text-gray-950"
//                     }`}
//                   >
//                     {user?.username}
//                   </h3>
//                   <p className="text-xs sm:text-sm opacity-75">
//                     {user?.role
//                       .split("_")
//                       .map((w: string) => w[0].toUpperCase() + w.slice(1))
//                       .join(" ")}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           </div>
//           <nav className=" p-4 h-screen  hover:overflow-scroll scrollbar-thin">
//             <ul className="space-y-1 sm:space-y-2">
//               {getNavItems().map((item) => (
//                 <li key={item.id}>
//                   <button
//                     onClick={() => setActiveTab(item.id)}
//                     className={`w-full text-left p-2 sm:p-2 rounded-lg flex items-center cursor-pointer ${
//                       activeTab === item.id
//                         ? isDarkMode
//                           ? "bg-blue-500"
//                           : "bg-blue-500 text-white"
//                         : isDarkMode
//                         ? "hover:bg-gray-700"
//                         : "hover:bg-blue-100"
//                     } transition-colors duration-200`}
//                   >
//                     <span className="mr-2 sm:mr-3 text-sm sm:text-base ">
//                       {item.icon}
//                     </span>
//                     <span className="text-xs sm:text-sm">{item.label}</span>
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>

//         {/* Main Content */}
//         <div
//           className={`flex-1 min-h-screen lg:py-[3.9rem] py-[5.9rem]  overflow-auto transition-margin duration-300 ${
//             sidebarOpen && windowWidth < 768 ? "ml-44" : "lg:ml-64 md:ml-55"
//           }`}
//         >
//           <ActiveComponent />
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default Dashboard;
