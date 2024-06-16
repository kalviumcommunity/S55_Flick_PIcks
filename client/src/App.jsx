import { useState } from 'react'
import { Routes,Route } from 'react-router-dom'
import './App.css'

import Home from './components/home/Home'
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
import TvRecs from './components/tvrecs/TvRecs'
import Show from './components/tvshow/Show'
import Login from './components/login/Login'
import SignupPage from './components/signup/Signup'
import Logout from './components/login/Logout'
import TVCast from './components/tvshow/info/Cast'
import TVRecs from './components/tvshow/info/Recs'
import TVSimilar from './components/tvshow/info/Similar'
import List from './components/list/List'

import ScrollToTop from './ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Home/>}/>

        <Route path='/movie/:id' element={<Movie/>}/>
        <Route path='/movie/:id/cast' element={<Cast/>}/>
        <Route path='/movie/:id/recs' element={<Recs/>}/>
        <Route path='/movie/:id/similar' element={<Similar/>}/>
        
        <Route path='/tvshow/:id' element={<Show/>}/>
        <Route path='/tvshow/:id/cast' element={<TVCast/>}/>
        <Route path='/tvshow/:id/recs' element={<TVRecs/>}/>
        <Route path='/tvshow/:id/similar' element={<TVSimilar/>}/>

        <Route path='/person/:id' element={<Person/>}/>
        <Route path='/search' element={<Search/>}/>

        <Route path='/user/:username' element={<User/>}/>
        <Route path='/editProfile/:username' element={<EditProfile/>}/>
        <Route path='/user/:username/lists/:category/:listid/' element={<List/>}/>

        <Route path='/userProfile' element={<UserProfile/>}/>

        <Route path='/recs' element={<FinalRecs/>}/>
        <Route path='/tvrecs' element={<TvRecs/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignupPage/>}/>

        <Route path='/logout' element={<Logout/>}/>
      </Routes>
    </>
  )
}

export default App
