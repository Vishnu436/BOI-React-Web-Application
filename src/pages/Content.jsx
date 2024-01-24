import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar'; 
import Dashboard from '../Mainmenu/Dashboard';
 
const { Content } = Layout;
 
const Contentt = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>       
        <Content style={{marginLeft:'200px', marginTop:'12px', padding: 24, background: '#fff', minHeight: 280 }}>
           <Dashboard/>
        </Content>
      </Layout>
    </Layout>
  );
};
 
export default Contentt;