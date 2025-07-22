import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoReorderThreeSharp, IoNotifications } from "react-icons/io5";
import { NavLink, Link } from "react-router-dom";
import { PiCoinsFill } from "react-icons/pi";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Provider/useAxiosSecure";
import { ToastContainer } from "react-toastify";
import Notifications from "./Notifications";
import { Outlet } from "react-router";

function DashboardNavber() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`);
      return res.data;
    },
  });

  const navigation = (
    <>
      {userData?.role === "admin" && (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/adminsummary">Admin Summary</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/adminwithdrawals">
              Worker Withdraw Request
            </NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/manageusers">Manage Users</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/adminmanagetasks">
              Admin Manage Tasks
            </NavLink>
          </li>
        </>
      )}
      {userData?.role === "worker" && (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/workerstats">Worker Stats</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/approvedsubmissions">
              Approved Submissions
            </NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/tasklist">Task List</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/withdrawform">Withdraw Form</NavLink>
          </li>
        </>
      )}
      {userData?.role === "buyer" && (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/buyerstats">Buyer Stats</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/addtask">Add Task</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/mytask">My Task</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/purchasecoin">Purchase Coin</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/paymenthistory">Payment History</NavLink>
          </li>
          <li>
            <NavLink to="/Dashboard/taskreview">Task Review</NavLink>
          </li>
        </>
      )}
      <li className="mt-4">
        <a
          href="https://github.com/Alveom/Assinginment12-Clintside.git"
          target="_blank"
          rel="noopener noreferrer"
        >
          Join as Developer
        </a>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="w-full navbar bg-base-100 px-4 shadow-md">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-ghost btn-circle mr-4"
              aria-label="Toggle sidebar"
            >
              <IoReorderThreeSharp className="text-2xl" />
            </label>
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="navbar-start flex items-center gap-6">
              <Link to="/" className="text-xl font-bold">
                quanticoinz
              </Link>

              {user && (
                <div className="flex items-center gap-2 ml-4">
                  <span>Available Coin:</span>
                  <PiCoinsFill size={20} />
                  <span className="font-bold ml-1">
                    {userData?.coin || "0"}
                  </span>
                </div>
              )}
            </div>

            <div className="navbar-end flex items-center gap-4">
              <a
                href="https://github.com/Alveom/Assinginment12-Clintside.git"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                Join as Developer
              </a>

              {user ? (
                <>
                  <button
                    className="btn btn-ghost btn-circle"
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  >
                    <IoNotifications className="text-2xl" />
                  </button>
                  <div className="text-right hidden sm:block">
                    <h3>{userData?.role || "User"}</h3>
                    <h3>{user.displayName || "No name"}</h3>
                  </div>
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full"
                  />
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-sm btn-ghost">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-sm btn-ghost">
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-5">
          <ToastContainer />
          <Notifications
            isOpen={isNotificationOpen}
            onClose={() => setIsNotificationOpen(false)}
          />
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-gray-100 text-base-content">
          {navigation}
        </ul>
      </div>
    </div>
  );
}

export default DashboardNavber;
