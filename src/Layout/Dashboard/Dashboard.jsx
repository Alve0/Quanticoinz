import React, { use } from "react";
import DashboardNavber from "../DashboardLayout/DashboardNavber";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Pages/Loading/Loading";
import { Outlet } from "react-router";

function Dashboard() {
  const { loading } = use(AuthContext);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DashboardNavber></DashboardNavber>
        </>
      )}
    </>
  );
}

export default Dashboard;
