/* eslint-disable react/button-has-type */
import React, { useState } from 'react'
import { Box, Card, CardContent, FormControl, Grid, InputAdornment, styled, TextField, Typography } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form, Formik, FormikValues } from 'formik'
import * as yup from 'yup'
import { yupTextValidate } from 'consts/common'
import LockIcon from '@mui/icons-material/Lock'
import EmailIcon from '@mui/icons-material/Email'
import { theme } from 'theme/theme.config'
import { signInWithEmail } from 'firebaseConfig'
import { useNavigate } from 'react-router-dom'

export const Label = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 500,
})

const Login = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: theme.palette.primary.main,
      }}
    >
      <Card sx={{ width: 500, p: 3, borderRadius: '10px' }}>
        <CardContent>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={async (values: FormikValues) => {
              if (isLoading) return
              setIsLoading(true)
              const res = await signInWithEmail(values.email, values.password)
              if (res) {
                navigate('/')
              }
              setIsLoading(false)
            }}
            validationSchema={yup.object().shape({
              email: yup.string().email('Vui lòng điền đúng định dạng email').required(yupTextValidate.required),
              password: yup.string().required(yupTextValidate.required),
            })}
          >
            {(formik) => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Label>
                        Email
                        <span
                          style={{
                            color: 'red',
                          }}
                        >
                          {' '}
                          *
                        </span>
                      </Label>
                      <TextField
                        variant="standard"
                        fullWidth
                        name="email"
                        id="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ' '}
                        FormHelperTextProps={{
                          style: {
                            margin: 0,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon
                                sx={{
                                  color: formik.errors.email && formik.touched.email ? 'red' : 'gray',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        // eslint-disable-next-line no-unneeded-ternary
                        error={formik.errors.email && formik.touched.email ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Label>
                        Password
                        <span
                          style={{
                            color: 'red',
                          }}
                        >
                          {' '}
                          *
                        </span>
                      </Label>
                      <TextField
                        fullWidth
                        type="password"
                        variant="standard"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        helperText={formik.errors.password && formik.touched.password ? formik.errors.password : ' '}
                        FormHelperTextProps={{
                          style: {
                            margin: 0,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon
                                sx={{
                                  color: formik.errors.password && formik.touched.password ? 'red' : 'gray',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        // eslint-disable-next-line no-unneeded-ternary
                        error={formik.errors.password && formik.touched.password ? true : false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <LoadingButton
                          fullWidth
                          type="submit"
                          variant="contained"
                          sx={{
                            borderRadius: '10px',
                          }}
                          loading={isLoading}
                        >
                          Login
                        </LoadingButton>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Form>
              )
            }}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
