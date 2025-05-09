import { useState,useEffect } from 'react'
import Home from './Scenes/Home'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './Scenes/Login'
import HealthForm from './Scenes/HealthForm'
import Signin from './Scenes/Signin'
import Dashboard from './Scenes/Dashboard'
import About from  './Scenes/About'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('userInfo')
    !user ? navigate('/') : navigate('dashboard')
  }, [])

  return (
    <>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='login'element={<Login/>} />
          <Route path='health-details'element={<HealthForm/>} />
          <Route path='signUp' element={<Signin/>} />
          <Route path='dashboard' element={<Dashboard/>} />
          <Route path='about' element={<About/>} />
          <Route />
      </Routes>
    </>
  )
}

export default App
