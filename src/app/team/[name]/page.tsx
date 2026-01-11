"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTheme } from "../../content/ThemeContext";
import Image from "next/image";

const SingleTeam = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("experience");
  const [isMobile, setIsMobile] = useState(false);
  const { name } = useParams();
  const [visionaries, setVisionaries] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch all categories in parallel from API
        const [
          visionariesRes,
          strategicForceRes,
          powerhouseTeamRes,
          growthNavigatorsRes,
        ] = await Promise.all([
          fetch("/api/pillar?category=the-visionaries").then((r) => r.json()),
          fetch("/api/pillar?category=the-strategic-force").then((r) =>
            r.json()
          ),
          fetch("/api/pillar?category=the-powerhouse-team").then((r) =>
            r.json()
          ),
          fetch("/api/pillar?category=growth-navigators").then((r) => r.json()),
        ]);
        setVisionaries(Array.isArray(visionariesRes) ? visionariesRes : []);
        setTeamMembers([
          ...(Array.isArray(strategicForceRes) ? strategicForceRes : []),
          ...(Array.isArray(powerhouseTeamRes) ? powerhouseTeamRes : []),
          ...(Array.isArray(growthNavigatorsRes) ? growthNavigatorsRes : []),
        ]);
      } catch (err) {
        setError("Failed to fetch team data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Check screen size on component mount
   const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
      if (window.innerWidth < 1024) {
        setActiveTab("bio");
      } else {
        setActiveTab("experience");
      }
    };
    checkScreenSize();
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const res = await fetch("/api/v0/property");
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setProperties(data.data);
        }
      } catch (err) {
        // Optionally handle error
      }
    }
    fetchProperties();
  }, []);

  // Decode the URL-encoded name and find the team member
  const decodedName = decodeURIComponent(
    typeof name === "string" ? name : Array.isArray(name) ? name[0] ?? "" : ""
  );

  // Find the member in visionaries or teamMembers
  const visionary = visionaries.find(
    (v) => v.name.trim().toLowerCase() === decodedName.trim().toLowerCase()
  );
  const teamMember = !visionary
    ? teamMembers.find(
        (member) =>
          member.name.trim().toLowerCase() === decodedName.trim().toLowerCase()
      )
    : null;

  const member = visionary || teamMember;
  const isVisionary = !!visionary;

  // Images logic: support both image and profileImages
  // Show secondary image if available, otherwise fallback to primary
  let memberImages: string[] = [];
  if (member) {
    if (member.profileImages && member.profileImages.length > 1) {
      // Use the second image as secondary
      memberImages = [
        typeof member.profileImages[1] === "string"
          ? member.profileImages[1]
          : member.profileImages[1].url,
      ];
    } else if (member.profileImages && member.profileImages.length > 0) {
      // Only one image, use as fallback
      memberImages = [
        typeof member.profileImages[0] === "string"
          ? member.profileImages[0]
          : member.profileImages[0].url,
      ];
    } else if (member.image) {
      memberImages = [member.image];
    }
  }

  const renderContent = () => {
    if (!member) return null;
    if (isVisionary) {
      // Special rendering for visionaries - just show bio
      return (
        <div
          className={`p-4 flex flex-col gap-y-[1.5rem] ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          <p>{member.about}</p>
        </div>
      );
    }
    // Original rendering for team members
 switch (activeTab) {
  case "bio":
    return (
      <div className="p-4 flex flex-col gap-y-[1.5rem]">
        {[member.about, member.about1].map(
          (text, index) =>
            text && (
              <p
                key={index}
                className={`lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem]
                lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem]
                ${isDarkMode ? "text-white" : "text-black"}`}
              >
                {text}
              </p>
            )
        )}

        <Link
          href="/contact"
          className="flex items-center justify-center w-full text-white px-2 py-2 capitalize
          text-[0.7rem] lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
        >
          schedule meeting
        </Link>
      </div>
    );


      case "experience":
        return (
          <p className={`p-4 ${isDarkMode ? "text-white " : "text-black"}`}>
            {member.experience}
          </p>
        );
      case "projects":
        // Fix: get project ids from member.projects array if it exists
        let projectIds = [];
        if (Array.isArray(member?.projects) && member.projects.length > 0) {
          // If member.projects is an array of property ids (strings)
          if (typeof member.projects[0] === "string") {
            projectIds = member.projects;
          } else if (
            typeof member.projects[0] === "object" &&
            member.projects[0]._id
          ) {
            // If member.projects is an array of objects with _id
            projectIds = member.projects.map((p: any) => p._id);
          }
        }
        // If no project id(s) on member, do not show anything
        if (!properties || properties.length === 0 || projectIds.length === 0) {
          return null;
        }
        const filteredProjects = properties.filter((project: any) =>
          projectIds.includes(project._id)
        );
        if (filteredProjects.length === 0) {
          return null;
        }
        return (
          <div className="p-4">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {filteredProjects.map((project: any, index: number) => {
                const imgSrc =
                  project.images && project.images.length > 0
                    ? project.images[0].url || project.images[0]
                    : project.image || "";
                // Use project.slug or project.name or project._id for the link
                const projectSlug = project.slug || project.name || project._id;
                return (
                  <Link
                    key={index}
                    href={projectSlug ? `/properties/${encodeURIComponent(projectSlug)}` : '#'}
                    className="relative rounded-xl overflow-hidden opacity-50 shadow-lg bg-black/30  hover:scale-110 transition-all duration-500"
                    style={{ minHeight: "220px" }}
                  >
                    {imgSrc && (
                      <img
                        src={imgSrc}
                        alt={project.projectName || `Project ${index + 1}`}
                        className="w-full h-56 object-cover"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3 flex items-end">
                      <span className="w-full text-white text-center font-bold text-lg block">
                        {project.projectName ||
                          project.propertyName ||
                          project.name ||
                          `Project ${index + 1}`}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      case "expertise":
        return member.expertise && member.expertise.length > 0 ? (
          <ul
            className={`grid grid-cols-2 gap-2 p-4 ${
              isDarkMode ? "text-white " : "text-black"
            }`}
          >
            {member.expertise.map((expertise: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span> {expertise}
              </li>
            ))}
          </ul>
        ) : (
          <p className={`p-4 ${isDarkMode ? "text-white " : "text-black"}`}>
            No expertise listed
          </p>
        );
      case "skills":
        return member.skills && member.skills.length > 0 ? (
          <ul
            className={`grid grid-cols-2 gap-2 p-4 ${
              isDarkMode ? "text-white " : "text-black"
            }`}
          >
            {member.skills.map((skill: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span> {skill}
              </li>
            ))}
          </ul>
        ) : (
          <p className={`p-4 ${isDarkMode ? "text-white " : "text-black"}`}>
            No skills listed
          </p>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  if (!member) {
    return <div className="text-center py-10">Member not found</div>;
  }

  return (
    <div
      className={` ${isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"}`}
    >
         <div className="max-w-7xl mx-auto px-6 py-[5rem] ">
        <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-x-0 gap-y-0">
          <div className="col-span-1 flex justify-center lg:justify-start relative">
            <div className="flex justify-center relative w-full max-w-[90vw] md:max-w-none">
              {/* Gradient overlay centered on the image - made larger for mobile */}
              <div className="absolute inset-0 flex justify-center items-center">
                <div
                  className="w-0 h-0 rounded-full bg-transparent 
                    shadow-[0_0_200px_150px_rgba(59,130,246,0.3)]
                    sm:shadow-[0_0_250px_180px_rgba(59,130,246,0.3)]
                    pointer-events-none"
                ></div>
              </div>

              {/* Centered at the bottom - hidden on small screens */}
               <div className="absolute lg:block hidden justify-center items-center w-[13.5rem] h-[15.5rem] filter drop-shadow-[0_0_11px_rgba(0,0,0,1)] bottom-0 left-[6.3rem]">
                <div className="bg-gray-950 w-[13.5rem] h-[15.5rem] rounded"></div>
              </div>

              <div className="relative flex justify-center w-full">
                {memberImages.length > 0 && (
                  <div className="lg:h-full lg:w-full md:h-[55vh] h-[60vh] w-full max-w-[90vw] sm:max-w-[30rem] relative">
                    <img
                      src={memberImages[0]}
                      alt={`${member.name}`}
                      className="w-full h-full object-cover mx-auto"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:ps-[5rem] flex flex-col justify-center items-center lg:text-start text-center relative">
            <div
              className={`absolute z-[2] flex flex-col ${
                isVisionary ? "lg:top-[6.5rem]" : "lg:bottom-0"
              } bottom-6 lg:gap-y-[1.2rem] md:gap-y-[1rem] gap-y-[0.3rem]`}
            >
                <h1
                className={`dm-serif-display lg:text-[3.1rem] md:text-[2.5rem] text-[1.4rem] lg:leading-[2.8rem] md:leading-[1.8rem] leading-[1.4rem] pt-0 ${
                  isDarkMode ? "lg:text-blue-500 text-white" : "text-black"
                }`}
              >
                {member.name}
              </h1>
              <p
                className={`inter lg:text-[1.1rem] md:text-[1.3rem] text-[0.9rem] lg:leading-[1.25rem] md:leading-[1rem] leading-[0.7rem] ${
                  isDarkMode ? "text-white " : "text-black"
                }`}
              >
                {member.designation}
              </p>

              {member.about && (
                 <p
                  className={`lg:text-[0.9rem] hidden lg:block md:text-[0.8rem] text-[0.7rem] lg:leading-[1.25rem] md:leading-[1.1rem] leading-[1rem] ${
                    isDarkMode ? "text-white " : "text-black"
                  }`}
                >
                  {member.about}
                </p>
              )}

              {!isVisionary && (
                <Link
                  href="/contact"
                  className="lg:block hidden items-center w-fit text-white px-2 py-2 capitalize text-[0.7rem] lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold mt-4"
                >
                  schedule meeting
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="absolute z-[-1] inset-0 flex lg:hidden justify-center items-center top-[5rem]">
          <div
            className="w-0 h-0 rounded-full bg-transparent 
        shadow-[0_0_200px_150px_rgba(59,130,246,0.9)]
        sm:shadow-[0_0_200px_150px_rgba(59,130,246,0.9)]
        pointer-events-none"
          ></div>
        </div>

        {/* Only show tabs for team members, not visionaries */}
        {!isVisionary && (
          <div className="">
            <div className="lg:mt-[3rem] mt-[1rem]">
              <div className="text-white">
                {/* Navigation Tabs */}
                <div className="flex overflow-x-auto scrollbar-hide px-0 lg:py-[1rem]">
                  <div className="flex justify-center font-semibold space-x-10 mx-auto">
                    <button
                      className={`pb-2 cursor-pointer lg:hidden whitespace-nowrap ${
                        activeTab === "bio"
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : isDarkMode
                          ? "text-white hover:text-gray-700"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("bio")}
                    >
                      About
                    </button>
                    <button
                      className={`pb-2 cursor-pointer whitespace-nowrap ${
                        activeTab === "experience"
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : isDarkMode
                          ? "text-white hover:text-gray-700"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("experience")}
                    >
                      Experience
                    </button>
                    <button
                      className={`pb-2 cursor-pointer whitespace-nowrap ${
                        activeTab === "projects"
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : isDarkMode
                          ? "text-white hover:text-gray-700"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("projects")}
                    >
                      Projects
                    </button>
                    <button
                      className={`pb-2 cursor-pointer whitespace-nowrap ${
                        activeTab === "expertise"
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : isDarkMode
                          ? "text-white hover:text-gray-700"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("expertise")}
                    >
                      Expertise
                    </button>
                    <button
                      className={`pb-2 cursor-pointer whitespace-nowrap ${
                        activeTab === "skills"
                          ? "border-b-2 border-blue-500 text-blue-500"
                          : isDarkMode
                          ? "text-white hover:text-gray-700"
                          : "text-gray-900 hover:text-gray-700"
                      }`}
                      onClick={() => setActiveTab("skills")}
                    >
                      Skills
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="mx-auto rounded-lg shadow-lg lg:p-6 py-4">
                  <h2
                    className={`text-xl font-bold mb-2 capitalize ${
                      isDarkMode ? "text-white " : "text-black"
                    }`}
                  >
                    {activeTab}
                  </h2>
                  <div
                    className={`rounded p-2 ${
                      isDarkMode
                        ? "border border-blue-500 "
                        : "border border-blue-500"
                    }`}
                  >
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* For visionaries, just show the bio content */}
        {isVisionary && (
          <div className="mx-auto lg:hidden rounded-lg shadow-lg lg:p-6 py-4 lg:mt-[3rem] mt-[1rem]">
            <h2
              className={`text-xl font-bold mb-2 capitalize ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              About
            </h2>
            <div
              className={`rounded p-2 ${
                isDarkMode
                  ? "border border-blue-500 "
                  : "border border-blue-500"
              }`}
            >
              {renderContent()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleTeam;
