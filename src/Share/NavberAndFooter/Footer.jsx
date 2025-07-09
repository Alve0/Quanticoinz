import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-lime-600/90 text-white p-8 mt-8">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
          <p className="mb-4">
            Subscribe to our newsletter for the latest updates.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white text-gray-800 rounded-l-full py-2 px-4 w-64 focus:outline-none"
            />
            <button className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r-full">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaFacebook size={32} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaInstagram size={32} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300"
          >
            <FaTwitter size={32} />
          </a>
        </div>
        <p>
          &copy; {new Date().getFullYear()} quanticoinz. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
