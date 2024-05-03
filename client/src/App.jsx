import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'

import Home from './components/home/Home'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import Main from './components/main/Main'
import Movie from './components/movie/Movie'
import Person from './components/person/Person'
import Cast from './components/movie/info/Cast'
import Recs from './components/movie/info/Recs'
import Similar from './components/movie/info/Similar'
import Search from './components/search/Search'
import User from './components/user/User'
import UserProfile from './components/user/UserProfile'
import EditProfile from './components/user/EditProfile'
import FinalRecs from './components/recs/Recs'

function App() {
  {console.log("Hi!")}
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/main' element={<Main/>}/>

        <Route path='/movie/:id' element={<Movie/>}/>
        <Route path='/movie/:id/cast' element={<Cast/>}/>
        <Route path='/movie/:id/recs' element={<Recs/>}/>
        <Route path='/movie/:id/similar' element={<Similar/>}/>
        
        <Route path='/person/:id' element={<Person/>}/>
        <Route path='/search' element={<Search/>}/>

        <Route path='/user/:username' element={<User/>}/>
        <Route path='/editProfile/:username' element={<EditProfile/>}/>
        <Route path='/userProfile' element={<UserProfile/>}/>

        <Route path='/recs' element={<FinalRecs/>}/>
      </Routes>
    </>
  )
}

export default App
