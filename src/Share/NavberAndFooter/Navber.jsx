import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router"; // Updated import to use react-router-dom
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Provider/useAxiosSecure";

import { PiCoinsFill } from "react-icons/pi";
const Navber = () => {
  const { user, signout, serUser } = useContext(AuthContext);
  const axiosscure = useAxiosSecure();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        if (user?.email) {
          const res = await axiosscure.get(`/users/${user?.email}`);
          setCoin(res.data.coin);
          console.log(res);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCoin();
  }, [user, axiosscure]);

  const handleClick = async () => {
    try {
      const res = await signout();
      if (res) {
        serUser(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navber = (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink className="lg:mx-3" to="/dashboard">
        Dashboard
      </NavLink>
    </>
  );

  console.log(coin);

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {user ? navber : null}
          </ul>
        </div>
        <a href="/" className="font-bold ml-2 text-2xl">
          quanticoinz
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{user ? navber : null}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="flex  gap-2 bg-gray-300 px-5 py-2 mr-4 rounded-4xl">
              <PiCoinsFill size={23} />
              <h3> {coin}</h3>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="m-1 rounded-full">
                <img
                  className="w-12 rounded-full"
                  src={user?.photoURL}
                  alt="User profile"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-sm"
              >
                <li>
                  <a>Profile</a>
                </li>
                <li>
                  <a onClick={handleClick}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div>
            <Link to={"/log-reg/login"}>
              {" "}
              <button className="btn border-2 border-lime-500 hover:bg-lime-500 hover:text-white font-bold mx-5 w-16">
                login
              </button>
            </Link>
            <Link to={"/log-reg/login"}>
              <button className="btn bg-lime-500 hover:bg-lime-600 text-white font-bold border-none w-16">
                join
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navber;
