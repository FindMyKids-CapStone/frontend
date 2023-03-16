import React from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import type { ColumnsType } from 'antd/es/table'

import TableAdmin from 'components/Table/Table'
import { getUser } from 'api/manageUser'
import { UserType } from 'types/userType'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { theme } from 'theme/theme.config'

interface SearchProps {
  search?: string
  sortBy?: 'createdAt' | 'fullName' | 'all'
  sort?: 'asc' | 'desc' | 'all'
}

const columns: ColumnsType<UserType> = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (_: UserType, data: UserType) => (
      <Link to={`/user/kid/${data.id}`}>
        <Typography
          sx={{
            color: theme.palette.primary.main,
            cursor: 'pointer',
          }}
        >
          {data.id}
        </Typography>
      </Link>
    ),
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phoneNumber',
    key: 'phoneNumber',
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
]

const KidPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [dataKids, setDataKids] = React.useState<any>()
  const [search, setSearch] = React.useState<SearchProps>({
    search: '',
    sortBy: 'all',
    sort: 'all',
  })
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalUser, setTotalUser] = React.useState(1)
  const [loading, setLoading] = React.useState(true)

  const hanldleData = async (searchTemp: SearchProps, pageFetch: number) => {
    let url = ''
    if (searchTemp.search) {
      url += `&search=${searchTemp.search}`
    }
    if (searchTemp.sortBy !== 'all') {
      url += `&sortBy=${searchTemp.sortBy}`
    }
    if (searchTemp.sort !== 'all') {
      url += `&sort=${searchTemp.sort}`
    }
    const res = await getUser({ param: `?role=children&page=${pageFetch}&pageSize=10${url}` })
    if (res?.status === 200) {
      setDataKids(
        res?.data?.data?.users?.map((item: any) => ({
          ...item,
          key: item.id,
          phoneNumber: item.phoneNumber ? item.phoneNumber : 'Chưa cập nhật',
          address: item.address ? item.address : 'Chưa cập nhật',
          fullName: item.fullName ? item.fullName : 'Chưa cập nhật',
        })),
      )
      setTotalUser(res?.data?.data?.pagination?.total)
      setCurrentPage(res?.data?.data?.pagination?.currentPage)
      setLoading(false)
    }
  }

  const onChangePage = async (page: number) => {
    navigate(`/user/kid?search=${search.search}&sortBy=${search.sortBy}&sort=${search.sort}&page=${page}`)
  }

  React.useEffect(() => {
    setSearch({
      search: searchParams.get('search')?.replace('%20', ' ') || '',
      sortBy: searchParams.get('sortBy') ? (searchParams.get('sortBy') as 'createdAt' | 'fullName' | 'all') : 'all',
      sort: searchParams.get('sortBy') ? (searchParams.get('sort') as 'asc' | 'desc' | 'all') : 'all',
    })
    setCurrentPage(searchParams.get('page') ? Number(searchParams.get('page')) || 1 : 1)
    hanldleData(
      {
        search: searchParams.get('search') || '',
        sortBy: searchParams.get('sortBy') ? (searchParams.get('sortBy') as 'createdAt' | 'fullName' | 'all') : 'all',
        sort: searchParams.get('sortBy') ? (searchParams.get('sort') as 'asc' | 'desc' | 'all') : 'all',
      },
      searchParams.get('page') ? Number(searchParams.get('page')) || 1 : 1,
    )
  }, [searchParams])

  return (
    <Box>
      <Grid
        container
        sx={{
          padding: '24px',
          backgroundColor: 'white',
          borderRadius: '10px',
          my: '24px',
        }}
      >
        <Grid
          item
          xs={10.5}
          sx={{
            pr: '24px',
          }}
        >
          <TextField
            placeholder="Tìm kiếm"
            fullWidth
            value={search.search}
            onChange={(e) => {
              setSearch({ ...search, search: e.target.value })
            }}
          />
        </Grid>

        <Grid
          item
          xs={1.5}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexFlow: 'column',
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/user/kid?search=${search.search}&sortBy=${search.sortBy}&sort=${search.sort}&page=1`)
            }}
          >
            Áp dụng
          </Button>
        </Grid>
      </Grid>
      <TableAdmin
        columns={columns}
        data={dataKids}
        totalReconds={totalUser}
        currentPage={currentPage}
        loading={loading}
        onChangePage={onChangePage}
      />
    </Box>
  )
}

export default KidPage
