import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import AdminLayout from 'components/Layout/AdminLayout'
import KidPage from 'pages/User/Kid'
import ParentPage from 'pages/User/Parent'

const RegularRoute = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route exact path="/" element={<Home />} />

        {/* User Router */}
        <Route exact path="/user/kid" element={<KidPage />} />
        <Route exact path="/user/parent" element={<ParentPage />} />
      </Routes>
    </AdminLayout>
  )
}

export default RegularRoute
