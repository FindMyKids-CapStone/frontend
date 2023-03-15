/* eslint-disable react/button-has-type */
import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { Form, Formik, FormikValues } from 'formik'
import * as yup from 'yup'
import { yupTextValidate } from 'consts/common'
import PersonIcon from '@mui/icons-material/Person'
import LockIcon from '@mui/icons-material/Lock'
import { theme } from 'theme/theme.config'

export const Label = styled(Typography)({
  fontSize: '0.9rem',
  fontWeight: 500,
})

const Login = () => {
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
              username: '',
              password: '',
            }}
            onSubmit={(values: FormikValues) => {
              console.log(values)
            }}
            validationSchema={yup.object().shape({
              username: yup.string().required(yupTextValidate.required),
              password: yup.string().required(yupTextValidate.required),
            })}
          >
            {(formik) => {
              return (
                <Form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Label>
                        Username
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
                        name="username"
                        id="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        helperText={formik.errors.username && formik.touched.username ? formik.errors.username : ' '}
                        FormHelperTextProps={{
                          style: {
                            margin: 0,
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon
                                sx={{
                                  color: formik.errors.username && formik.touched.username ? 'red' : 'gray',
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        // eslint-disable-next-line no-unneeded-ternary
                        error={formik.errors.username && formik.touched.username ? true : false}
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
                        <Button
                          fullWidth
                          type="submit"
                          variant="contained"
                          sx={{
                            borderRadius: '10px',
                          }}
                        >
                          Login
                        </Button>
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
