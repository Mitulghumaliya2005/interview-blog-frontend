import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './componets/LoginPage'
import Users from './pages/User'
import Blogs from './pages/Blogs'
import UserBlog from './pages/UserBlog'

import Navbar from './componets/Navbar'
import SignUpPage from './componets/SignUpPage'
import { Navigate } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        {/* Exact Path Routing */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/posts" element={<UserBlog />} />
      </Routes>
    </>
  )
}

export default App
