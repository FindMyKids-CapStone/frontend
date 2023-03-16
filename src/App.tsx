import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import { theme } from 'theme/theme.config'

import WebRoute from 'router'
import 'react-toastify/dist/ReactToastify.css'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: theme.palette.primary.main,
          },
        }}
      >
        <div className="App">
          <WebRoute />
        </div>
      </ConfigProvider>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  )
}

export default App
