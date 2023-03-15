import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

import { theme } from 'theme/theme.config'
import { getTest } from 'api/testApi'
import { MyButton } from 'styles/Button'

const Home = () => {
  const hanldleGetTest = async () => {
    const data = await getTest()
    console.log(data)
  }

  React.useEffect(() => {
    hanldleGetTest()
  }, [])
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <MyButton variant="outlined">Engineering</MyButton>
      <Button variant="contained">Find out more</Button>
      <Button color="primary" variant="outlined">
        Find out more
      </Button>
      <Typography color="primary" fontWeight={700}>
        Join for free
      </Typography>
      <Typography
        color="primary"
        sx={{
          color: theme.palette.grey[200],
        }}
      >
        Login
      </Typography>
      <TextField placeholder="Search" />
    </Box>
  )
}

export default Home
