"use client";
/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import { LuPhoneCall } from "react-icons/lu";
import { IoLocationOutline, IoLogoWhatsapp } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa6";

// Contact information
const contactInfo = {
  phone: "+918010178010",
  email: "info@inrext.com",
  whatsapp: "+918010178010",
  address: "3rd Floor, D4, Block -D, Sector 10, noida, uttar Pradesh 201301",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.3358070040404!2d77.33233017484815!3d28.58970108602565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef516be044bb%3A0x10bbfa5c449d905c!2sInrext%20Private%20Limited!5e0!3m2!1sen!2sin!4v1748689599064!5m2!1sen!2sin"
};

const isDarkMode = true;

const Contact = () => {
  // Click handlers
  const handlePhoneClick = () => {
    window.open(`tel:${contactInfo.phone}`, '_self');
  };

  const handleEmailClick = () => {
    window.open(`mailto:${contactInfo.email}`, '_self');
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\+/g, '')}`, '_blank');
  };

  const handleLocationClick = () => {
    window.open('https://www.google.com/maps/place/Inrext+Private+Limited/@28.5897011,77.3323302,17z/data=!3m1!4b1!4m6!3m5!1s0x390cef516be044bb:0x10bbfa5c449d905c!8m2!3d28.5897011!4d77.3349051!16s%2Fg%2F11y3k8h8qw', '_blank');
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
            src="/images/contact.jpg"
            alt="Contact background"
            className="w-full h-full object-cover object-bottom"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center lg:gap-y-[1rem] gap-y-[1rem] p-4">
          <h1
            className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
              isDarkMode ? "text-blue-500" : "text-white"
            }`}
          >
            contact us
          </h1>
          <p className="raleway text-white text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.7rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase">
            Have Questions? Let's Build Answers Together.
          </p>
          <Link
            href="/properties"
            className="w-fit text-white px-6 lg:mt-10 md:mt-10 mt-0 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            Send Message
          </Link>
        </div>
      </div>
      {/* =============================== */}
      <div
        className={`overflow-hidden ${
          isDarkMode ? "bg-black backdrop-blur-md" : "bg-blue-50"
        }`}
      >
        <div className="grid lg:grid-cols-2 grid-cols-1 max-w-7xl mx-auto lg:px-20 md:px-20 px-5 py-[3rem] gap-10">
          <div className=" col-span-1 ">
            <div className="  flex items-center justify-center">
              <form className=" w-full ">
                <h2 className="lg:text-[1.3rem] md:text-[1.2rem] text-[1.1rem] font-semibold text-blue-500">
                  Get In Touch
                </h2>

                <div className="mt-5 flex flex-col gap-y-3">
                  <div
                    className={`${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    <label className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] block mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className={`w-full px-4 py-2 border text-[0.8rem] border-blue-500 rounded-full outline-none ${
                        isDarkMode
                          ? "text-gray-500 placeholder-gray-500"
                          : "text-gray-500 placeholder-gray-500"
                      }`}
                    />
                  </div>

                  <div
                    className={`${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    <label className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] block mb-1">
                      Contact Number*
                    </label>
                    <input
                      type="text"
                      placeholder="We'll Reach Out On This Number For Your Onboarding Call."
                      className={`w-full px-4 py-2 border text-[0.8rem] border-blue-500 rounded-full outline-none ${
                        isDarkMode
                          ? "text-gray-500 placeholder-gray-500"
                          : "text-gray-500 placeholder-gray-500"
                      }`}
                    />
                  </div>

                  <div
                    className={`${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    <label className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] block mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      placeholder="For Updates And Official Communication."
                      className={`w-full px-4 py-2 border text-[0.8rem] border-blue-500 rounded-full outline-none ${
                        isDarkMode
                          ? "text-gray-500 placeholder-gray-500"
                          : "text-gray-500 placeholder-gray-500"
                      }`}
                    />
                  </div>

                  <div
                    className={`${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    <label className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] block mb-1">
                      Subject*
                    </label>
                    <input
                      type="text"
                      placeholder="Topic"
                      className={`w-full px-4 py-2 border text-[0.8rem] border-blue-500 rounded-full outline-none ${
                        isDarkMode
                          ? "text-gray-500 placeholder-gray-500"
                          : "text-gray-500 placeholder-gray-500"
                      }`}
                    />
                  </div>

                  <div
                    className={`${isDarkMode ? "text-white" : "text-black"}`}
                  >
                    <label className="lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] block mb-1">
                      Message*
                    </label>
                    <textarea
                      placeholder="Type Your Message Here"
                      rows={4}
                      className={`w-full px-4 py-2 border text-[0.8rem] border-blue-500 rounded-xl outline-none ${
                        isDarkMode
                          ? "text-gray-500 placeholder-gray-500"
                          : "text-gray-500 placeholder-gray-500"
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 lg:w-[7rem] w-full text-[0.9rem] text-white font-semibold py-2  lg:rounded-lg rounded-full"
                  >
                    SEND NOW
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-span-1 lg:px-10 lg:py-2 flex flex-col gap-y-[1rem] ">
            <p
              className={`lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] lg:leading-[1.25rem] md:leading-[1rem] leading-[0.9rem] text-center ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Whether you're ready to invest, explore, or just curious — our
              doors, inbox, and phone lines are always open. Let's build
              something remarkable together.
            </p>

            <div className="mt-5">
              <ul className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-2 gap-10">
                {/* Phone number */}
                <li
                  className="flex flex-col gap-y-1 items-center cursor-pointer transition-transform hover:scale-105"
                  onClick={handlePhoneClick}
                >
                  <span
                    className={`lg:p-[1rem] md:p-[1rem] p-[0.8rem] rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white text-blue-400 hover:bg-blue-400 hover:text-white"
                        : "bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                    }`}
                  >
                    <LuPhoneCall className="lg:text-[1.5rem] text-[1.2rem]" />
                  </span>
                  <div
                    className={`text-center lg:leading-[1.25rem] md:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <span className="capitalize font-medium lg:text-[1.1rem] md:text-[1.1rem] text-[0.9rem]">
                      phone number
                    </span>
                    <br />
                    <span
                      className={`font-light lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {contactInfo.phone}
                    </span>
                  </div>
                </li>

                {/* Email address */}
                <li
                  className="flex flex-col gap-y-1 items-center cursor-pointer transition-transform hover:scale-105"
                  onClick={handleEmailClick}
                >
                  <span
                    className={`lg:p-[1rem] md:p-[1rem] p-[0.8rem] rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white text-blue-400 hover:bg-blue-400 hover:text-white"
                        : "bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                    }`}
                  >
                    <FaRegEnvelope className="lg:text-[1.5rem] text-[1.2rem]" />
                  </span>
                  <div
                    className={`text-center lg:leading-[1.25rem] md:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <span className="capitalize font-medium lg:text-[1.1rem] md:text-[1.1rem] text-[0.9rem]">
                      email address
                    </span>
                    <br />
                    <span
                      className={`font-light lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {contactInfo.email}
                    </span>
                  </div>
                </li>

                {/* WhatsApp */}
                <li
                  className="flex flex-col gap-y-1 items-center cursor-pointer transition-transform hover:scale-105"
                  onClick={handleWhatsAppClick}
                >
                  <span
                    className={`lg:p-[1rem] md:p-[1rem] p-[0.8rem] rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white text-blue-400 hover:bg-blue-400 hover:text-white"
                        : "bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                    }`}
                  >
                    <IoLogoWhatsapp className="lg:text-[1.5rem] text-[1.2rem]" />
                  </span>
                  <div
                    className={`text-center lg:leading-[1.25rem] md:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <span className="capitalize font-medium lg:text-[1.1rem] md:text-[1.1rem] text-[0.9rem]">
                      whatsapp
                    </span>
                    <br />
                    <span
                      className={`font-light lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {contactInfo.whatsapp}
                    </span>
                  </div>
                </li>

                {/* Location */}
                <li
                  className="flex flex-col gap-y-1 items-center cursor-pointer transition-transform hover:scale-105"
                  onClick={handleLocationClick}
                >
                  <span
                    className={`lg:p-[1rem] md:p-[1rem] p-[0.8rem] rounded-full transition-all duration-300 ${
                      isDarkMode
                        ? "bg-white text-blue-400 hover:bg-blue-400 hover:text-white"
                        : "bg-blue-400 text-white hover:bg-white hover:text-blue-400"
                    }`}
                  >
                    <IoLocationOutline className="lg:text-[1.5rem] text-[1.2rem]" />
                  </span>
                  <div
                    className={`text-center lg:leading-[1.3rem] md:leading-[1.25rem] leading-[1.1rem] ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <span className="capitalize font-medium lg:text-[1.1rem] md:text-[1.1rem] text-[0.9rem]">
                      location
                    </span>
                    <br />
                    <span
                      className={`font-light lg:text-[0.9rem] md:text-[0.8rem] text-[0.7rem] ${
                        isDarkMode ? "text-gray-500" : "text-gray-500"
                      }`}
                    >
                      {contactInfo.address}
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <iframe
                src={contactInfo.mapUrl}
                className="w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      {/* ================================ */}
      <div
        className={`lg:h-[80vh] h-[50vh] overflow-hidden flex justify-center items-center relative ${
          isDarkMode ? "bg-black" : "bg-blue-50"
        }`}
      >
        {/* Image with black overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/Contact 1.png"
            alt="Contact section background"
            className="w-full h-full object-cover object-bottom"
            fill
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative flex flex-col justify-center items-center lg:gap-y-[1rem] gap-y-[1rem] p-4">
          <h1
            className={`dm-serif-display  lg:text-[5rem] md:text-[3.5rem] text-[1.5rem] lg:leading-[5rem] md:leading-[3.8rem] leading-[1.8rem] capitalize text-center ${
              isDarkMode ? "text-blue-500" : "text-white"
            }`}
          >
            One world. Many roles. <br />
            One conversation.
          </h1>
          <p className="raleway text-white text-center font-semibold lg:text-[1.7rem] md:text-[1.4rem] text-[0.7rem] lg:leading-normal md:leading-[1.8rem] leading-[1rem] uppercase">
            Need guidance? Our experts are ready.
          </p>
          <Link
            href="/properties"
            className="w-fit text-white px-6 lg:mt-10 md:mt-10 mt-0 uppercase text-[0.7rem] py-2 lg:rounded-lg rounded-full bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            Send Message
          </Link>
        </div>
      </div>
    </>
  );
};

export default Contact;