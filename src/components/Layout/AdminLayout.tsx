import React, { useState } from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

import { theme } from 'theme/theme.config'
import { dataSlider } from 'consts/menuSlider'
// import styles from './styles.css'

const { Header, Content, Sider } = Layout

export interface LayoutProps {
  children: React.ReactNode
}

const AdminLayout = ({ children }: LayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const [nameLink, setNameLink] = useState([]) as any

  React.useEffect(() => {
    let temp = location?.pathname.split('/')
    temp = temp.filter((item) => item !== '')
    setNameLink(temp?.map((item) => ({ title: item })))
  }, [location?.pathname])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
        <div style={{ height: 32, margin: 16, background: theme.palette.secondary.main }} />
        <Menu
          // className={styles.menuLayout}
          theme="light"
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
          <Breadcrumb style={{ margin: '16px 0' }} items={nameLink} />
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
