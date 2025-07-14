import React, { use } from "react";
import { Outlet } from "react-router";
import Navber from "../../Share/NavberAndFooter/Navber";
import Footer from "../../Share/NavberAndFooter/Footer";
import { AuthContext } from "../../Provider/AuthProvider";
import Loading from "../../Pages/Loading/Loading";

function Root() {
  const { loading } = use(AuthContext);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Navber />
          <Outlet />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Root;
