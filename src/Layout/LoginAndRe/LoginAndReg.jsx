import React, { useState } from "react";
import Login from "../../Pages/LoginAndReg/Login";
import Register from "../../Pages/LoginAndReg/Register";

import Footer from "../../Share/NavberAndFooter/Footer";
import { Outlet } from "react-router";
import LoginLayoutNavber from "../../Share/NavberAndFooter/LoginNavber/LoginLayoutNavber";
import { ToastContainer } from "react-toastify";

function LoginAndReg() {
  return (
    <div>
      <div>
        <LoginLayoutNavber />
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default LoginAndReg;
