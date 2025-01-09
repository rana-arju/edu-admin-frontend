import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import {  adminPath } from "./admin.routes";
import { studentPath } from "./student.routes";
import { facultyPaths } from "./faculty.routes";
import { routesGenerator } from "../utils/routesGenerator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routesGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: <App />,
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routesGenerator(studentPath),
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);

export default router;
