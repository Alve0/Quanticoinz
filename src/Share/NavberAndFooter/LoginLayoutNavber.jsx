import React from "react";
import { Link } from "react-router";

function LoginLayoutNavber() {
  return (
    <div className="w-full border-b-2 text-2xl font-bold p-5 border-gray-600 ">
      <Link to={"/"}>
        <h3 text-2xl font-bold text-left ml-2>
          quanticoinz
        </h3>
      </Link>
    </div>
  );
}

export default LoginLayoutNavber;
