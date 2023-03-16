import React, { useState } from 'react'
import { Breadcrumb, Dropdown, Layout, Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'

import { dataSlider } from 'consts/menuSlider'
import { Avatar, Box, CardMedia } from '@mui/material'
import userStore from 'stores/user'
import logo from 'images/logo.png'
// import styles from './styles.css'

const { Header, Content, Sider } = Layout

export interface LayoutProps {
  children: React.ReactNode
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <Box
        onClick={() => {
          userStore.getState().logout()
        }}
      >
        Đăng xuất
      </Box>
    ),
  },
]

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
        <Box
          sx={{
            width: '100%',
          }}
        >
          <CardMedia
            component="img"
            src={logo}
            sx={{
              width: '100%',
              height: '64px',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Menu
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
        <Header
          style={{
            padding: '0 16px',
            background: 'white',
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center',
          }}
        >
          <Dropdown menu={{ items }} placement="bottomRight">
            <Avatar
              sx={{
                marginLeft: '16px',
                cursor: 'pointer',
              }}
            />
          </Dropdown>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={nameLink} />
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
