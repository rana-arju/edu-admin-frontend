import MySchedule from "../pages/student/MySchedule";
import OfferedCourses from "../pages/student/OfferedCourses";
import StudentDashboard from "../pages/student/StudentDashboard";
import { IUserPaths } from "../types";

export const studentPath: IUserPaths[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
      },
      {
        name: "My schedule",
        path: "my-schedule",
        element: <MySchedule />,
      },
    ],
  },
];
