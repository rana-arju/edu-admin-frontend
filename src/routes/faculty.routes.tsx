import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboardd",
    element: <FacultyDashboard />,
  },
  {
    name: "Faculty Management",

    children: [
      {
        name: "Offered Courses",
        path: "offered-course",
        element: <OfferedCourse />,
      }
      
    ],
  },
];