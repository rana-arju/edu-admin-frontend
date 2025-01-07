import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import { adminSidebarItems } from "../../routes/admin.routes";
const { Content, Footer, Header, Sider } = Layout;

function MainLayout() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
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
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={adminSidebarItems}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Rana Arju</Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
