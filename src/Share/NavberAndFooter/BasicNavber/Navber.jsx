import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Provider/useAxiosSecure";
import { PiCoinsFill } from "react-icons/pi";

const Navber = () => {
  const { user, signout, setUser } = useContext(AuthContext);
  const axiosscure = useAxiosSecure();
  const [coin, setCoin] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        if (user?.email) {
          const res = await axiosscure.get(`/users/${user?.email}`);
          setCoin(res.data.coin);
          setRole(res.data.role);
        }
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    fetchCoin();
  }, [user, axiosscure]);

  const handleClick = async () => {
    try {
      const res = await signout();
      if (res) setUser(null);
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

  const getDashboardUrl = () => {
    switch (role) {
      case "buyer":
        return "/Dashboard/buyerstats";
      case "worker":
        return "/Dashboard/workerstats";
      case "admin":
        return "/Dashboard/adminsummary";
      default:
        return "/";
    }
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-2 ${isActive ? "text-lime-600 font-semibold" : "hover:text-lime-600"}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to={getDashboardUrl()}
        className={({ isActive }) =>
          `px-2 ${isActive ? "text-lime-600 font-semibold" : "hover:text-lime-600"}`
        }
      >
        Dashboard
      </NavLink>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100 shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile hamburger */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>

            {/* Mobile dropdown content */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-56 p-2 shadow"
            >
              {user && (
                <>
                  <li>{navItems}</li>
                  <li><hr className="my-1" /></li>
                </>
              )}

              {/* Join as Developer — mobile only (in dropdown) */}
              <li className="lg:hidden">
                <a
                  href="https://github.com/Alveom/Assinginment12-Clintside.git"
                  target="_blank"
                  rel="noreferrer"
                >
                  Join as Developer
                </a>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="font-bold ml-2 text-2xl text-lime-600">
            Quanticoinz
          </Link>
        </div>

        {/* CENTER (desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">{user && navItems}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end flex items-center gap-3">
          {/* Join as Developer — desktop only */}
          <a
            href="https://github.com/Alveom/Assinginment12-Clintside.git"
            target="_blank"
            rel="noreferrer"
            className="btn border-lime-500 text-lime-600 hover:bg-lime-500 hover:text-white font-semibold hidden lg:inline-flex"
          >
            Join as Developer
          </a>

          {user ? (
            <>
              {/* Coins (kept compact for small screens) */}
              <div className="hidden sm:flex items-center gap-1 bg-gray-200 px-3 py-1.5 rounded-full">
                <PiCoinsFill size={18} className="text-yellow-600" />
                <span className="font-medium text-sm">{coin ?? 0}</span>
              </div>

              {/* Profile dropdown */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-10 sm:w-12 rounded-full border-2 border-lime-500">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/MBtjqXQ/user.png"}
                      alt="User profile"
                      loading="lazy"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleClick}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link to="/log-reg/login">
                <button className="btn border-2 border-lime-500 hover:bg-lime-500 hover:text-white font-bold w-20">
                  Login
                </button>
              </Link>
              <Link to="/log-reg/register">
                <button className="btn bg-lime-500 hover:bg-lime-600 text-white font-bold border-none w-20">
                  Join
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
