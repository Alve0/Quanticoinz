import React from "react";
import { Outlet } from "react-router";
import Navber from "../../Share/NavberAndFooter/Navber";
import Footer from "../../Share/NavberAndFooter/Footer";

function Root() {
  return (
    <div>
      <Navber />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Root;
