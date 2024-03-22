import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'

import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
