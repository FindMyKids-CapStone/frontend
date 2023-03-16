import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserType } from 'types/userType'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

import { getDetailUser, updateUser } from 'api/manageUser'
import { Box, Grid, Typography } from '@mui/material'
import { theme } from 'theme/theme.config'
import { ButtonAdmin } from 'styles/Button'
import { Input, Space } from 'antd'
import { toast } from 'react-toastify'
import Loading from 'components/Loading'
import { validateEmail, validatePhone } from 'consts/common'

const DetailKidPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [data, setData] = React.useState<UserType>({
    fullName: '',
    email: '',
    address: '',
    birthday: '',
    phoneNumber: '',
    role: '',
    id: '',
    avatar: '',
  })
  const [edit, setEdit] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(true)

  const fetchData = async () => {
    const res = await getDetailUser({ id })
    if (res?.status === 200) {
      setData(res?.data?.data)
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!data?.fullName || !data?.email || !data?.address || !data?.birthday || !data?.phoneNumber || !data?.id) {
      toast.error('Vui lòng điền đầy đủ thông tin')
      return
    }
    if (!validateEmail(data?.email)) {
      toast.error('Email không hợp lệ')
      return
    }

    if (!validatePhone(data?.phoneNumber)) {
      toast.error('Số điện thoại không hợp lệ')
      return
    }
    const formData = new FormData()
    formData.append('fullName', data?.fullName)
    formData.append('email', data?.email)
    formData.append('address', data?.address)
    formData.append('birthday', data?.birthday)
    formData.append('phoneNumber', data?.phoneNumber)
    formData.append('id', data?.id)

    setLoading(true)
    const res = await updateUser({ data: formData })
    if (res?.data?.error?.message === '"email" is not allowed') {
      toast.error('Email đã tồn tại')
      return
    }
    if (
      res?.data?.error?.message === '"phoneNumber" with value "1" fails to match the required pattern: /^[0-9]{10}$/'
    ) {
      toast.error('Số điện thoại không hợp lệ')
      return
    }
    if (res?.status === 200) {
      toast.success('Cập nhật thành công')
      setEdit(!edit)
      fetchData()
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box>
      {' '}
      {loading ? (
        <Loading />
      ) : (
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
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box
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
                    {edit ? 'Chỉnh sửa thông tin phụ huynh' : 'Thông tin phụ huynh'}
                  </Typography>
                </Box>
                <Box>
                  {edit ? (
                    <Space>
                      <ButtonAdmin variant="contained" color="success" onClick={handleSave}>
                        lưu
                      </ButtonAdmin>
                      <ButtonAdmin
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setEdit(!edit)
                          fetchData()
                        }}
                      >
                        hủy
                      </ButtonAdmin>
                    </Space>
                  ) : (
                    <ButtonAdmin
                      variant="contained"
                      color="success"
                      onClick={() => {
                        setEdit(!edit)
                      }}
                    >
                      Chỉnh sửa
                    </ButtonAdmin>
                  )}
                </Box>
              </Box>
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
              <Typography fontWeight={500}>
                Mã người dùng <span style={{ color: 'red' }}> *</span>
              </Typography>
              <Typography>{data?.id}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={500}>
                Email<span style={{ color: 'red' }}> *</span>
              </Typography>
              {edit ? (
                <Input
                  style={{ width: '80%' }}
                  value={data?.email}
                  onChange={(e) => {
                    setData({
                      ...data,
                      email: e.target.value as string,
                    })
                  }}
                />
              ) : (
                <Typography>{data?.email ? data.email : 'Chưa cập nhật'}</Typography>
              )}
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={500}>
                Họ và tên<span style={{ color: 'red' }}> *</span>
              </Typography>
              {edit ? (
                <Input
                  style={{ width: '80%' }}
                  value={data?.fullName}
                  onChange={(e) => {
                    setData({
                      ...data,
                      fullName: e.target.value as string,
                    })
                  }}
                />
              ) : (
                <Typography>{data?.fullName ? data.fullName : 'Chưa cập nhật'}</Typography>
              )}
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={500}>
                Số điện thoại<span style={{ color: 'red' }}> *</span>
              </Typography>
              {edit ? (
                <Input
                  style={{ width: '80%' }}
                  value={data?.phoneNumber}
                  onChange={(e) => {
                    setData({
                      ...data,
                      phoneNumber: e.target.value as string,
                    })
                  }}
                />
              ) : (
                <Typography>{data?.phoneNumber ? data.phoneNumber : 'Chưa cập nhật'}</Typography>
              )}
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={500}>
                Địa chỉ<span style={{ color: 'red' }}> *</span>
              </Typography>
              {edit ? (
                <Input
                  style={{ width: '80%' }}
                  value={data?.address}
                  onChange={(e) => {
                    setData({
                      ...data,
                      address: e.target.value as string,
                    })
                  }}
                />
              ) : (
                <Typography>{data?.address ? data.address : 'Chưa cập nhật'}</Typography>
              )}
            </Grid>

            <Grid item xs={6}>
              <Typography fontWeight={500}>
                Ngày sinh<span style={{ color: 'red' }}> *</span>
              </Typography>
              {edit ? (
                <Input
                  type="date"
                  style={{ width: '80%' }}
                  value={data?.birthday}
                  onChange={(e) => {
                    setData({
                      ...data,
                      birthday: e.target.value as string,
                    })
                  }}
                />
              ) : (
                <Typography>{data?.birthday ? data.birthday : 'Chưa cập nhật'}</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  )
}

export default DetailKidPage
