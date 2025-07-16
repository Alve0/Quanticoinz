import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { IoReorderThreeSharp } from "react-icons/io5";
import { NavLink, Outlet } from "react-router";
import { PiCoinsFill } from "react-icons/pi";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Provider/useAxiosSecure";
import { ToastContainer } from "react-toastify";

function DashboardNavber() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

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
      {userData?.role === "admin" ? (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/messages">Messages</NavLink>
          </li>
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
      {userData?.role === "worker" ? (
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
      ) : (
        <></>
      )}
      {userData?.role === "buyer" ? (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
            <NavLink to={"/Dashboard/buyerstats"}> Buyer Stats </NavLink>
            <NavLink to={"/Dashboard/addtask"}>Add Task</NavLink>
            <NavLink to={"/Dashboard/mytask"}>My Task</NavLink>
            <NavLink to={"/Dashboard/purchasecoin"}>Purchase Coin </NavLink>
            <NavLink to={"/Dashboard/paymenthistory"}>Payment History </NavLink>
            <NavLink to={"/Dashboard/taskreview"}>Task Review</NavLink>
          </li>
        </>
      ) : (
        <></>
      )}
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
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
              <h3 className="text-xl font-bold">quanticoinz</h3>
              <div className="items-center">
                <h3>Available Coin</h3>
                <div className="flex items-center ml-2">
                  <PiCoinsFill size={20} />
                  <h3 className="font-bold ml-1">{userData?.coin || "0"}</h3>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="mr-5 text-right">
                <h3>{userData?.role || "User"}</h3>
                <h3>{user.displayName || "No name"}</h3>
              </div>
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="p-5 ">
          {" "}
          <ToastContainer />
          <Outlet />
        </div>
      </div>

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
