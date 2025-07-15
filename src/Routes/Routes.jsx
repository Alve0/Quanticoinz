import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";

import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home/Home";
import LoginAndReg from "../Layout/LoginAndRe/LoginAndReg";
import Login from "../Pages/LoginAndReg/Login";
import Register from "../Pages/LoginAndReg/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: Error,
    Component: Root,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
    ],
  },
  {
    path: "/log-reg",
    ErrorBoundary: Error,
    Component: LoginAndReg,
    children: [
      {
        path: "/log-reg/login",
        Component: Login,
      },
      {
        path: "/log-reg/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/Dashboard",
    ErrorBoundary: Error,
    Component: Dashboard,
  },
]);

export default router;
