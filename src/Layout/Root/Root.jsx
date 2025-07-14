import React, { use } from "react";
import { Outlet } from "react-router";
import Navber from "../../Share/NavberAndFooter/Navber";
import Footer from "../../Share/NavberAndFooter/Footer";
import { AuthContext } from "../../Provider/AuthProvider";

function Root() {
  const { loading } = use(AuthContext);
  return (
    <div>
      {loading ? (
        <h3>loading</h3>
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
