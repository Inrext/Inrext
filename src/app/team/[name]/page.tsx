/* eslint-disable no-unused-vars */
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTheme } from "../../content/ThemeContext";
import Image from "next/image";
import { fetchPillarsByCategory, PillarMember, ProfileImage } from "../../../services/pillarService";

const SingleTeam = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("experience");
  const { name } = useParams();
  const [visionaries, setVisionaries] = useState<PillarMember[]>([]);
  const [teamMembers, setTeamMembers] = useState<PillarMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const v = await fetchPillarsByCategory("the-visionaries");
        const t1 = await fetchPillarsByCategory("the-strategic-force");
        const t2 = await fetchPillarsByCategory("the-powerhouse-team");
        const t3 = await fetchPillarsByCategory("growth-navigators");
        setVisionaries(v);
        setTeamMembers([...t1, ...t2, ...t3]);
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
      if (window.innerWidth < 1024) {
        setActiveTab("bio");
      } else {
        setActiveTab("experience");
      }
    };
    checkScreenSize();
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Decode the URL-encoded name and find the team member
  const decodedName = decodeURIComponent(typeof name === "string" ? name : Array.isArray(name) ? name[0] ?? "" : "");

  // Find the member in visionaries or teamMembers
  const visionary = visionaries.find(
    (v) => v.name.trim().toLowerCase() === decodedName.trim().toLowerCase()
  );
  const teamMember = !visionary
    ? teamMembers.find(
        (member) => member.name.trim().toLowerCase() === decodedName.trim().toLowerCase()
      )
    : null;

  const member = visionary || teamMember;
  const isVisionary = !!visionary;

  // Images logic: support both image and profileImages
  let memberImages: string[] = [];
  if (member) {
    if (member.profileImages && member.profileImages.length > 0) {
      memberImages = member.profileImages.map((img: ProfileImage) => typeof img === 'string' ? img : img.url);
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
          <>
            <p
              className={`p-4 flex flex-col gap-y-[1.5rem] ${
                isDarkMode ? "text-white " : "text-black"
              }`}
            >
              {member.about}
              <Link
                href="/contact"
                className="flex items-center justify-center w-full text-white px-2 py-2 capitalize text-[0.7rem] lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
              >
                schedule meeting
              </Link>
            </p>
          </>
        );
      case "experience":
        return (
          <p className={`p-4 ${isDarkMode ? "text-white " : "text-black"}`}>
            {member.experience}
          </p>
        );
      case "projects":
        if (!member.projects || member.projects.length === 0) {
          return (
            <p className={`p-4 ${isDarkMode ? "text-white " : "text-black"}`}>
              No projects listed
            </p>
          );
        }
        return (
          <div className="p-4">
            <ul className={`list-disc pl-6 ${isDarkMode ? "text-white" : "text-black"}`}>
              {member.projects.map((projectName: string, index: number) => (
                <li key={index}>{projectName}</li>
              ))}
            </ul>
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
                {member.position}
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
