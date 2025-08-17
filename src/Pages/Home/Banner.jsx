import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import bgVideo from "../../Assets/Banner.mp4";
import { Link, Navigate, useNavigate } from "react-router";

function Banner() {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Navigation = () => {
    navigate("/log-reg/register");
  };

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

        {/* join us btn  */}
        <motion.button
          className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white cursor-pointer overflow-hidden"
          initial={{ width: 140, backgroundColor: "#727D73" }}
          whileHover={{
            width: 180,
            backgroundColor: "#727D73",
            transition: { type: "spring", stiffness: 300, damping: 20 },
          }}
          onClick={() => Navigation()}
        >
          <span>Join us</span>
          <motion.span
            className="ml-2 text-white"
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            ➔
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Banner;
