import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import { adminPath } from "./admin.routes";
import { studentPath } from "./student.routes";
import { facultyPaths } from "./faculty.routes";
import { routesGenerator } from "../utils/routesGenerator";
import ProtectRoute from "../components/layout/ProtectRoute";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectRoute role="admin">
        <App />
      </ProtectRoute>
    ),
    children: routesGenerator(adminPath),
  },
  {
    path: "/superAdmin",
    element: (
      <ProtectRoute role="superAdmin">
        <App />
      </ProtectRoute>
    ),
    children: routesGenerator(adminPath),
  },
  {
    path: "/faculty",
    element: (
      <ProtectRoute role="faculty">
        <App />
      </ProtectRoute>
    ),
    children: routesGenerator(facultyPaths),
  },
  {
    path: "/student",
    element: (
      <ProtectRoute role="student">
        <App />
      </ProtectRoute>
    ),
    children: routesGenerator(studentPath),
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "change-password", element: <ChangePassword /> },
]);

export default router;
