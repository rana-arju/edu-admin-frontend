import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDataTable from "../pages/admin/userManagement/AdminDataTable";
import AdminDetails from "../pages/admin/userManagement/AdminDetails";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";

import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import FacultyDataTable from "../pages/admin/userManagement/FacultyDataTable";
import FacultyDetails from "../pages/admin/userManagement/FacultyDetails";
import StudentDataTable from "../pages/admin/userManagement/StudentDataTable";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";
import { IUserPaths } from "../types";

export const adminPath: IUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create Semester",
        path: "create-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },

      {
        name: "Create A. Faculty",
        path: "create-a-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create Department",
        path: "create-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "All Student",
        path: "student-data",
        element: <StudentDataTable />,
      },
      {
        path: "student-data/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        path: "faculty-details/:facultyId",
        element: <FacultyDetails />,
      },
      {
        name: "All Faculty",
        path: "all-faculty",
        element: <FacultyDataTable />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "All Admin",
        path: "all-admin",
        element: <AdminDataTable />,
      },
      {
        path: "admin-details/:adminId",
        element: <AdminDetails />,
      },
    ],
  },
];
