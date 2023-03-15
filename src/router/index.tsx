import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import userStore from 'stores/user'
import Login from 'pages/Login'

import RegularRoute from './regular'

export default function WebRoute() {
  const { user } = userStore()
  console.log(user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<RegularRoute />} />
      </Routes>
    </BrowserRouter>
  )
}
