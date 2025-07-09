import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import bgVideo from "../../Assets/Banner.mp4";

function Banner() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          src={bgVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col justify-center h-full text-white text-left px-8 sm:px-8 md:px-16 lg:px-24"
        animate={{ y: -scrollY * 0.5 }}
      >
        {/* Title */}
        <motion.h3
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Our freelancers <br /> will take it from here
        </motion.h3>

        {/* Search Box */}
        <motion.div
          className="relative mt-5 w-full max-w-md sm:max-w-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <input
            type="text"
            placeholder="Search for any service..."
            className="bg-white text-gray-900 rounded-lg w-full h-12 sm:h-14 p-4 pr-12 font-semibold border-none focus:outline-none"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <div className="bg-black p-2 rounded-lg hover:text-2xl transition-all duration-300 ease-in-out hover:bg-lime-600">
              <FaSearch className="text-white" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Banner;
