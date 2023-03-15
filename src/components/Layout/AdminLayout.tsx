import React, { useState } from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'

import { theme } from 'theme/theme.config'
import { dataSlider } from 'consts/menuSlider'
import { useLocation, useNavigate } from 'react-router-dom'

const { Header, Content, Sider } = Layout

export interface LayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="dark">
        <div style={{ height: 32, margin: 16, background: theme.palette.secondary.main }} />
        <Menu
          theme="dark"
          defaultSelectedKeys={[location?.pathname]}
          mode="inline"
          items={dataSlider}
          onClick={(e) => {
            navigate(e.key)
          }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: 'white' }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
