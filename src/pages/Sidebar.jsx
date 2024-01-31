import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  LoginOutlined 
} from '@ant-design/icons';
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const CustomSider = ({ selectedMenuItem, handleMenuClick }) => {
  const location = useLocation();
  selectedMenuItem = location.pathname.replace("/main/", "");
  return (
    <Sider theme="dark" style={{position:'fixed', zIndex: 1, overflowY: "auto", height:"100%"}}>
      <Menu
        activeKey={selectedMenuItem}
        mode="inline"
        selectedKeys={[selectedMenuItem]}
        onClick={handleMenuClick}
        theme="dark"
        style={{
          marginTop: "90px",
          padding: "25px",
          fontWeight: 500,
          fontStyle: "normal",
        }}
      >
        <Menu>
          <Menu.Item key="dashboard">
            <Link to="/main/dashboard"> <DesktopOutlined/> <span styles={{padding:'30px'}}> DashBoard </span> </Link>
          </Menu.Item>
          <Menu.Item key="applications">
            <Link to="/main/applications"> <FileOutlined/> <span styles={{padding:'30px'}}> Applications </span></Link>
          </Menu.Item>
          <Menu.Item key="Logout">
            <Link to="/"> <LoginOutlined/> <span styles={{padding:'30px'}}> Logout </span></Link>
          </Menu.Item>
        </Menu>
      </Menu>
    </Sider>
  );
};
export default CustomSider;
