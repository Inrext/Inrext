"use client";
import React, {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DialogPanel, PopoverGroup } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../content/ThemeContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { isDarkMode, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isPage = [
    "/about",
    "/properties",
    "/events",
    "/achievements",
    "/careers",
    "/journey",
    "/contact",
    "/dashboard",
  ].includes(pathname);

  const isDarkTextPage = [
    "/about",
    "/achievements",
    "/careers",
    "/journey",
    "/profile",
    "/dashboard",
  ].includes(pathname);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const getTextColorClass = (isActive: boolean) => {
    if (isActive) {
      return "text-blue-500 after:absolute after:-bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-500";
    }
    if (isDarkTextPage) {
      return isDarkMode
        ? "text-white hover:text-gray-300"
        : "text-gray-900 hover:text-gray-700";
    }
    if (isHomePage) {
      return isDarkMode
        ? "text-white hover:text-gray-300"
        : "text-gray-900 hover:text-gray-700";
    }
    if (isPage) {
      return isDarkTextPage
        ? "text-gray-900 hover:text-gray-700"
        : "text-white hover:text-gray-300";
    }
    return isDarkMode
      ? "text-white hover:text-gray-300"
      : "text-gray-900 hover:text-gray-700";
  };

  const getIconColorClass = () => {
    if (isDarkTextPage) {
      return isDarkMode
        ? "text-white hover:text-gray-300"
        : "text-gray-900 hover:text-gray-700";
    }
    if (isHomePage) {
      return isDarkMode
        ? "text-white"
        : isScrolled
        ? "text-gray-900"
        : "text-gray-900";
    }
    if (isPage) {
      return isDarkTextPage ? "text-gray-900" : "text-white";
    }
    return isDarkMode ? "text-white" : "text-gray-700";
  };

  return (
    <header
      className={`fixed w-full z-[2] transition-all duration-300 ease-in-out ${
        showNavbar ? "top-0" : "-top-24"
      } ${isScrolled ? "backdrop-blur-md shadow-md" : "bg-transparent"}`}
    >
      <div className={`${isDarkMode ? "" : "bg-transparent"}`}>
        <nav className="mx-auto outline-none flex max-w-7xl items-center justify-between py-3 lg:px-8 px-2">
          <PopoverGroup className="hidden lg:flex items-center lg:gap-x-12">
            {/* About, Properties */}
            <Link
              href="/about"
              className={`relative text-sm font-semibold transition-colors ${getTextColorClass(
                pathname === "/about"
              )}`}
            >
              About
            </Link>
            <Link
              href="/properties"
              className={`relative text-sm font-semibold transition-colors ${getTextColorClass(
                pathname === "/properties"
              )}`}
            >
              Properties
            </Link>
            {/* Removed Post Property */}
          </PopoverGroup>

          <Link href="/" className="lg:-m-1.5 lg:p-0 px-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                isDarkMode
                  ? "/images/Inrext logo with white tagline.png"
                  : "/images/Inrext logo.png"
              }
              alt="Inrext Logo"
              className="h-[50px] w-[157px]"
            />
          </Link>

          <div className="flex items-center lg:gap-x-12">
            {/* Hamburger menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:-m-2.5 p-0"
              aria-label="Open menu"
            >
              <Bars3Icon
                className={`lg:size-6 size-8 cursor-pointer ${getIconColorClass()}`}
              />
            </button>

            <button
              onClick={toggleTheme}
              className="hidden lg:flex p-1 cursor-pointer rounded-full border-2 border-blue-500 outline-none items-center"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <MoonIcon className="lg:size-5 text-white" />
              ) : (
                <SunIcon className={`lg:size-5 ${getIconColorClass()}`} />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-y-0 z-[2] right-0 w-full lg:max-w-[20rem] md:max-w-md px-6 py-6 ${
            isDarkMode ? "bg-gray-900" : "bg-blue-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  isDarkMode
                    ? "/images/Inrext logo with white tagline.png"
                    : "/images/Inrext logo.png"
                }
                alt="Inrext Logo"
                className="h-8"
              />
            </Link>
            <div className="flex gap-5">
              <button
                onClick={toggleTheme}
                className="lg:flex p-1 cursor-pointer rounded-full border-2 border-blue-500 outline-none items-center"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <MoonIcon className="size-5 text-white" />
                ) : (
                  <SunIcon className="size-5 text-gray-900" />
                )}
              </button>
              <button onClick={() => setMobileMenuOpen(false)}>
                <XMarkIcon
                  className={`size-6 ${
                    isDarkMode ? "text-white cursor-pointer" : "text-gray-700"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-6">
            {["Home",
              "About",
              "Properties",
              "Events",
              "Achievements",
              "Careers",
              "Journey",
              "Contact",
            ].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`block py-2 px-5 rounded-full text-base font-semibold ${
                  isDarkMode
                    ? "text-white hover:bg-gray-800"
                    : "text-gray-900 hover:bg-gray-50"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}