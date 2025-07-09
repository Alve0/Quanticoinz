import React from "react";
import { Link } from "react-router";

const Navber = () => {
  return (
    <nav className="p-4 sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/">quanticoinz</a>
        </div>
        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search..."
              className=" rounded-full py-2 px-4 focus:outline-none ring-lime-400/40 ring-2  "
            />
          </div>
          <Link>
            <button className="btn hover:bg-lime-600 hover:text-white">
              login
            </button>
          </Link>
          <Link>
            <button className="btn bg-lime-600 text-white mr-2 ml-3">
              {" "}
              Join
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navber;