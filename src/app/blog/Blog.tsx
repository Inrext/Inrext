"use client";
import React from 'react'
import { useTheme } from "../content/ThemeContext"; // Importing theme context
import Image from "next/image";

const Blog = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`bg-[#eff6ff6f] h-[100vh] overflow-hidden flex justify-center  ${
        isDarkMode ? "bg-black backdrop-blur-md border " : "bg-blue-50"
      }`}
    >
    <div>
        <Image
          src="/images/about.jpg"
          alt="About Image"
          width={400}
          height={200}
        />
    </div>
    </div>
  )
}

export default Blog
