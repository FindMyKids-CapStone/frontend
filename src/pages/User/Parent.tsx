import React from 'react'
import { Box } from '@mui/material'
import { Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface DataType {
  key: string
  name: string
  age: number
  address: string
  tags: string[]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <div>{text}</div>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green'
          if (tag === 'loser') {
            color = 'volcano'
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          )
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <div>Invite {record.name}</div>
        <div>Delete</div>
      </Space>
    ),
  },
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '5',
    name: 'Jake White',
    age: 18,
    address: 'Dublin No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '6',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '7',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '8',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '9',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    key: '10',
    name: 'Jake White',
    age: 18,
    address: 'Dublin No. 2 Lake Park',
    tags: ['loser'],
  },
]

const ParentPage = () => {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: 'background.default',
        borderRadius: 2,
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          hideOnSinglePage: true,
        }}
        style={{
          minHeight: '500px',
        }}
      />
    </Box>
  )
}

export default ParentPage
