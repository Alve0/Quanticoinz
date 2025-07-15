import React, { use } from "react";
import DashboardNavber from "../../Share/NavberAndFooter/DashboardLayout/DashboardNavber";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Pages/Loading/Loading";

function Dashboard() {
  const { loading } = use(AuthContext);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <DashboardNavber />
        </div>
      )}
    </>
  );
}

export default Dashboard;
