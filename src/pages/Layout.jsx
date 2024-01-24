import React, { useState } from 'react';
import { Layout } from 'antd';
import CustomSider from './Sidebar';
import { Outlet } from 'react-router-dom';
import CustomHeader from '../layout/Header';
import CustomFooter from '../layout/Footer';
 
const { Content } = Layout;
 
const ParentComponent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('dashboard');
 
  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
  };
 
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <CustomSider selectedMenuItem={selectedMenuItem} handleMenuClick={handleMenuClick} />
      <Layout>
      <CustomHeader/>
        <Content style={{ marginLeft:200, padding: '30px', background: '#EAEDED', minHeight: 280 }}>
          <Outlet /> 
        </Content>
        <CustomFooter/>
      </Layout>
    </Layout>
  );
};
 
export default ParentComponent;
