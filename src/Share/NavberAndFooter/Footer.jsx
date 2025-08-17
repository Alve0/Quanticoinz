import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const Subscrib = (e) => {
    e.preventDefault();
    toast.success("Subscribed successfully!");
    console.log("Subscribed successfully!");
  };

  return (
    <footer className="bg-[#727D73] text-white p-8 mt-8">
      <div className="container mx-auto text-center">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold mb-2">Stay Updated</h3>
          <p className="mb-4 ">
            Subscribe to our newsletter for the latest updates.
          </p>
          <div className="flex justify-center">
            <form onSubmit={Subscrib} className="flex">
              {" "}
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="bg-white text-[#727D73] rounded-l-full py-2 px-4 w-64 focus:outline-none"
              />
              <button className="bg-[#AAB99A] hover:bg-[#79856d] text-[#3f443f] font-bold py-2 px-4 rounded-r-full">
                Subscribe
              </button>
            </form>
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
