import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserType } from 'types/userType'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { getDetailUser } from 'api/manageUser'
import { Box, Grid, Typography } from '@mui/material'
import { theme } from 'theme/theme.config'

const DetailParentPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = React.useState<UserType>()

  const fetchData = async () => {
    const response = await getDetailUser({ id })
    setData(response.data)
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  console.log(data)

  return (
    <Box>
      <Grid
        container
        sx={{
          padding: '16px 24px',
          borderRadius: '10px 10px 0 0',
          mt: '24px',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowBackIcon
            sx={{ mr: 1, color: 'white', cursor: 'pointer' }}
            onClick={() => {
              navigate(-1)
            }}
          />
          <Typography variant="h6" fontSize="1.15rem" color="white">
            Thông tin phụ huynh
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          backgroundColor: 'white',
          borderRadius: '0 0 10px 10px',
          width: '100%',
          margin: 'auto',
          pb: 3,
        }}
        spacing={3}
      >
        <Grid item xs={6}>
          <Typography fontWeight={500}>Mã người dùng</Typography>
          <Typography>{id}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={500}>Họ và tên</Typography>
          <Typography>Trần Tấn Kha</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={500}>Số điện thoại</Typography>
          <Typography>0938728837</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={500}>Địa chỉ</Typography>
          <Typography>65 Nguyễn bỉnh khiêm, phường 2, quận 10</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography fontWeight={500}>Ngày sinh</Typography>
          <Typography>2001-01-20</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DetailParentPage
