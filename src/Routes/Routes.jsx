import { createBrowserRouter } from "react-router";
import Error from "../Pages/Error/Error";

import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home/Home";
import LoginAndReg from "../Layout/LoginAndRe/LoginAndReg";
import Login from "../Pages/LoginAndReg/Login";
import Register from "../Pages/LoginAndReg/Register";
import Dashboard from "../Layout/Dashboard/Dashboard";
import PrivateRoute from "../Provider/PrivateRoute";
import AddTaskForm from "../Pages/Dashboard/Buyer/AddTask";
import MyTasks from "../Pages/Dashboard/Buyer/MyTask";
import PurchaseCoin from "../Pages/Dashboard/Buyer/PurchaseCoin";
import PaymentHistory from "../Pages/Dashboard/Buyer/PaymentHistory";
import TaskList from "../Pages/Dashboard/Worker/TaskLish";
import TaskDetails from "../Pages/Dashboard/Worker/TaskDetails";
import BuyerStats from "../Pages/Dashboard/Buyer/BuyerStats";
import TaskReview from "../Pages/Dashboard/Buyer/TaskReview";
import WorkerStats from "../Pages/Dashboard/Worker/WorkerStats";
import ApprovedSubmissions from "../Pages/Dashboard/Worker/ApprovedSubmissions";

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
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/Dashboard/addtask",
        element: (
          <PrivateRoute>
            <AddTaskForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/mytask",
        element: (
          <PrivateRoute>
            <MyTasks />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/purchasecoin",
        element: (
          <PrivateRoute>
            <PurchaseCoin />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/paymenthistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/tasklist",
        element: (
          <PrivateRoute>
            <TaskList />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/task/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/buyerstats",
        element: (
          <PrivateRoute>
            <BuyerStats />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/taskreview",
        element: (
          <PrivateRoute>
            <TaskReview />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/workerstats",
        element: (
          <PrivateRoute>
            <WorkerStats />
          </PrivateRoute>
        ),
      },
      {
        path: "/Dashboard/approvedsubmissions",
        element: (
          <PrivateRoute>
            <ApprovedSubmissions />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
