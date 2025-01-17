import { Menu, Layout } from "antd";
import { NavLink } from "react-router-dom";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerators";
import { adminPath } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPath } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;
const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};
function Sidebar() {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;
  let sidebarItems;
  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPath, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPath, userRole.STUDENT);
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <NavLink
        to={"/"}
        style={{
          height: "4rem",
          fontSize: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          textTransform: "uppercase",
        }}
      >
        <span style={{ color: "white" }}>Edu</span>
        <span style={{ color: "#1677FF" }}> admin</span>
      </NavLink>
      <div style={{ overflowY: "auto", marginBottom: "20px" }}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items ={sidebarItems}
        />
      </div>
    </Sider>
  );
}

export default Sidebar;
