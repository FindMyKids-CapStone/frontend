import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from 'pages/Home'
import AdminLayout from 'components/Layout/AdminLayout'
import ParentPage from 'pages/User/Parent/Parent'
import DetailParentPage from 'pages/User/Parent/DetailParent'
import KidPage from 'pages/User/Kid/Kid'
import DetailKidPage from 'pages/User/Kid/DetailKid'

const RegularRoute = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route exact path="/" element={<Home />} />

        {/* User Router */}
        <Route exact path="/user/kid" element={<KidPage />} />
        <Route exact path="/user/parent" element={<ParentPage />} />
        <Route exact path="/user/parent/:id" element={<DetailParentPage />} />
        <Route exact path="/user/kid/:id" element={<DetailKidPage />} />
      </Routes>
    </AdminLayout>
  )
}

export default RegularRoute
