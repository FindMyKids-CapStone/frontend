import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

export const dataSlider: MenuItem[] = [
  getItem('Người dùng', '/user', <UserOutlined />, [
    getItem('Trẻ em', '/user/kid'),
    getItem('Phụ huynh', '/user/parent'),
  ]),
]
