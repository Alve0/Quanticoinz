import React, { useState } from "react";
import Login from "../../Pages/LoginAndReg/Login";
import Register from "../../Pages/LoginAndReg/Register";

import Footer from "../../Share/NavberAndFooter/Footer";
import { Outlet } from "react-router";
import LoginLayoutNavber from "../../Share/NavberAndFooter/LoginNavber/LoginLayoutNavber";

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
