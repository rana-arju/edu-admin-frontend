import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import {  adminRoutes } from "./admin.routes";
import { studentPath } from "./student.routes";
import { facultyPaths } from "./faculty.routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <App />,
    children: adminRoutes,
  },
  {
    path: "/faculty",
    element: <App />,
    children: facultyPaths,
  },
  {
    path: "/student",
    element: <App />,
    children: studentPath,
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

export default router;
