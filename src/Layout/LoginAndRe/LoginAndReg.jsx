import React, { useState } from "react";
import Login from "../../Pages/LoginAndReg/Login";
import Register from "../../Pages/LoginAndReg/Register";
import LoginLayoutNavber from "../../Share/NavberAndFooter/LoginLayoutNavber";
import Footer from "../../Share/NavberAndFooter/Footer";
import { Outlet } from "react-router";

function LoginAndReg() {
  return (
    <div>
      <div>
        <LoginLayoutNavber />
      </div>
      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LoginAndReg;
