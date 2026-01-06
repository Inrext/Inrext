/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// Navbar.jsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Dialog, DialogPanel, PopoverGroup } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
  EyeSlashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../content/ThemeContext";
import { toast } from "react-toastify";

type PasswordResetRequestProps = {
  isDarkMode: boolean;
  onClose: () => void;
  onOtpSent: (email: string) => void;
};

const PasswordResetRequest: React.FC<PasswordResetRequestProps> = ({ isDarkMode, onClose, onOtpSent }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: Replace with your API call
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace with your API call
      // const response = await api.post("/auth/forgot-password", { email });
      // toast.success(response.data.message || "OTP sent to your email");
      toast.success("OTP sent to your email");
      onOtpSent(email);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-md w-full mx-auto p-4 sm:p-6 ${
        isDarkMode ? "bg-black border border-blue-500" : "bg-white"
      } rounded-lg `}
    >
      <h2
        className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="reset-email"
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            id="reset-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${
              isDarkMode
                ? " border-blue-500 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="your@email.com"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-blue-500 hover:text-blue-600 text-sm"
          onClick={onClose}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};


type PasswordResetProps = {
  isDarkMode: boolean;
  onClose: () => void;
  initialEmail?: string;
};

const PasswordReset: React.FC<PasswordResetProps> = ({ isDarkMode, onClose, initialEmail = "" }) => {
  const [formData, setFormData] = useState({
    email: initialEmail,
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFormData((prev) => ({ ...prev, email: initialEmail }));
  }, [initialEmail]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // TODO: Replace with your API call
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    try {
      // Replace with your API call
      // const response = await api.post("/auth/reset-password", { ... });
      toast.success("Password reset successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-md w-full mx-auto p-4 sm:p-6 ${
        isDarkMode ? "bg-black border border-blue-500" : "bg-white"
      } rounded-lg `}
    >
      <h2
        className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="reset-email"
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${
              isDarkMode
                ? " border-blue-500 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            } ${initialEmail ? " cursor-not-allowed" : ""}`}
            required
            readOnly={!!initialEmail}
          />
        </div>

        <div>
          <label
            htmlFor="otp"
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            OTP Code
          </label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${
              isDarkMode
                ? " border-blue-500 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            required
          />
        </div>

        <div className="relative">
          <label
            htmlFor="newPassword"
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            New Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${
              isDarkMode
                ? " border-blue-500 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="••••••••"
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-8 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        <div className="relative">
          <label
            htmlFor="confirmPassword"
            className={`block mb-1 text-sm font-medium ${
              isDarkMode ? "text-white" : "text-gray-700"
            }`}
          >
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg ${
              isDarkMode
                ? " border-blue-500 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
            placeholder="••••••••"
            required
            minLength={6}
          />
          <button
            type="button"
            className="absolute right-3 top-8 cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeSlashIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <EyeIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          type="button"
          className="text-blue-500 hover:text-blue-600 text-sm"
          onClick={onClose}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

// Login Form Component
// LoginForm removed



const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signupModalOpen, setSignUpModalOpen] = useState(false);
  const [passwordResetModalOpen, setPasswordResetModalOpen] = useState(false);
  const [passwordResetStep, setPasswordResetStep] = useState<'request' | 'reset'>("request");
  const [resetEmail, setResetEmail] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const { isDarkMode, toggleTheme } = useTheme();
  // AuthContext removed

  const isHomePage = pathname === "/";
  const isPage = [
    "/about",
    "/properties",
    "/events",
    "/achievements",
    "/careers",
    "/journey",
    "/contact",
     
  ].includes(pathname);

  const isDarkTextPage = [
    "/about",
    "/achievements",
    "/careers",
    "/journey",
     
   
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

  const handlePasswordResetClose = () => {
    setPasswordResetModalOpen(false);
    setPasswordResetStep("request");
    setResetEmail("");
    setLoginModalOpen(true);
  };

  const handleOtpSent = (email: string) => {
    setResetEmail(email);
    setPasswordResetStep("reset");
  };

  return (
    <header
      className={`fixed w-full z-2 transition-all duration-300 ease-in-out ${
        showNavbar ? "top-0" : "-top-24"
      } ${isScrolled ? "backdrop-blur-md shadow-md" : "bg-transparent"}`}
    >
      <div className={`${isDarkMode ? "" : "bg-transparent"}`}>
        <nav className="mx-auto outline-none flex max-w-7xl items-center justify-between py-3 lg:px-8 px-2">
          {/* Desktop Navigation */}
          <PopoverGroup className="hidden lg:flex items-center lg:gap-x-12">
            {["About", "Properties"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`relative text-sm font-semibold transition-colors ${getTextColorClass(pathname === `/${item.toLowerCase()}`)}`}
              >
                {item}
              </Link>
            ))}
          </PopoverGroup>

          {/* Logo */}
          <Link href="/" className="lg:-m-1.5 lg:p-0 px-2">
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

          {/* Right Side */}
          <div className="flex items-center lg:gap-x-12">
            {/* Simple Login Button (desktop) */}
            <button
              type="button"
              onClick={() => router.push('https://dashboard.inrext.com/')}
                className={`relative hidden lg:flex text-sm font-semibold cursor-pointer transition-colors ${getTextColorClass(
                  false
                )}`}
            >
              Login
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:-m-2.5 p-0"
              aria-label="Open menu"
            >
              <Bars3Icon
                className={`lg:size-6 size-8 cursor-pointer ${getIconColorClass()}`}
              />
            </button>

            {/* Theme Toggle */}
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

      {/* Login Modal */}


      {/* Password Reset Modal */}
      <Dialog
        open={passwordResetModalOpen}
        onClose={() => {
          setPasswordResetModalOpen(false);
          setPasswordResetStep("request");
          setResetEmail("");
        }}
      >
        <div className="fixed inset-0 bg-black/30 z-3" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4 z-4">
          <DialogPanel
            className={`max-w-sm w-full rounded-2xl ${
              isDarkMode ? "bg-black border border-blue-500" : "bg-white"
            } p-2`}
          >
            {passwordResetStep === "request" ? (
              <PasswordResetRequest
                isDarkMode={isDarkMode}
                onClose={handlePasswordResetClose}
                onOtpSent={handleOtpSent}
              />
            ) : (
              <PasswordReset
                isDarkMode={isDarkMode}
                initialEmail={resetEmail}
                onClose={handlePasswordResetClose}
              />
            )}
          </DialogPanel>
        </div>
      </Dialog>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <DialogPanel
          className={`fixed inset-y-0 z-2 right-0 w-full lg:max-w-[20rem] md:max-w-md px-0 py-6 ${
            isDarkMode ? "bg-black border-l border-blue-500" : "bg-blue-50"
          }`}
        >
          <div
            className={`flex items-center justify-between border-b border-blue-500 px-6 pb-2 ${
              isDarkMode
                ? "border-b border-blue-500"
                : "border-b border-gray-900"
            }`}
          >
            <Link href="/">
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
              {[
                "Home",
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
                  className={`block py-2 px-5 mx-5 rounded-full text-base font-semibold ${
                    isDarkMode
                      ? " text-white hover:border hover:border-blue-500"
                      : "text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export default Header;