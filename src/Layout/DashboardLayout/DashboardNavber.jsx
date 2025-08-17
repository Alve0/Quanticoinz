import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  IoReorderThreeSharp,
  IoNotifications,
  IoNotificationsOutline,
} from "react-icons/io5";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { PiCoinsFill } from "react-icons/pi";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Provider/useAxiosSecure";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notifications from "./Notifications";

function DashboardNavber() {
  const { user, signout } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  const { data: userData } = useQuery({
    queryKey: ["userData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/userData/${user.email}`);
      return res.data;
    },
  });

  // Poll notifications every 10s
  useEffect(() => {
    let interval;
    if (user?.email) {
      interval = setInterval(async () => {
        try {
          const res = await axiosSecure.get(`/notifications/${user.email}`);
          if (res.data?.hasNew) {
            setHasNewNotification(true);
          }
        } catch (err) {
          console.error("Error fetching notifications", err);
        }
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [user, axiosSecure]);

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen) {
      setHasNewNotification(false);
      if (user?.email) {
        axiosSecure
          .post(`/notifications/mark-seen/${user.email}`)
          .catch(() => {});
      }
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    signout()
      .then(() => {
        toast.success("Logged out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast.error("Logout failed");
      });
  };

  const navigation = (
    <>
      {userData?.role === "admin" && (
        <>
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
      {user && (
        <li className="mt-4">
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-error text-white w-full"
          >
            Logout
          </button>
        </li>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <div className="w-full navbar bg-base-100 px-4 shadow-md sticky top-0 z-40">
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
              <Link to="/" className="text-xl font-bold ">
                Quanticoinz
              </Link>

              {user && (
                <div className="flex items-center gap-2 ml-4">
                  <span className="hidden sm:inline">Available Coin:</span>
                  <PiCoinsFill size={20} />
                  <span className="font-bold ml-1">
                    {userData?.coin || "0"}
                  </span>
                </div>
              )}
            </div>

            <div className="navbar-end flex items-center gap-4">
              {user ? (
                <>
                  <button
                    className="btn btn-ghost btn-circle relative"
                    onClick={handleNotificationClick}
                  >
                    {hasNewNotification ? (
                      <IoNotifications className="text-2xl text-red-500" />
                    ) : (
                      <IoNotificationsOutline className="text-2xl" />
                    )}
                    {hasNewNotification && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </button>
                  <div className="text-right hidden sm:block">
                    <h3 className="font-semibold">
                      {userData?.role || "User"}
                    </h3>
                    <h3 className="text-sm text-gray-500">
                      {user.displayName || "No name"}
                    </h3>
                  </div>
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "User"}
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                </>
              ) : (
                <div className="flex gap-2">
                  <NavLink to="/login" className="btn btn-sm btn-ghost">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="btn btn-sm btn-ghost">
                    Register
                  </NavLink>
                </div>
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
