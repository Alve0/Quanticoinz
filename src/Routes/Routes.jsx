import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";

import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: Error,
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);

export default router;
