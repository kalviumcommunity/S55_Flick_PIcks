import React, { useState, useEffect } from 'react'
import './Home.css'
import axios from 'axios'
import search2 from '../../assets/image.png'
import logout from '../../assets/logout.png'
import studio from '../../assets/studio.png'
import next from '../../assets/nextB.png'
import prev from '../../assets/prevB.png'
import mm from '../../assets/mm.jpg'
import { useNavigate } from 'react-router-dom'

function Home() {

  const [nowPlaying, setNowPlaying] = useState([])

  const NOWPLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing`

  const API_METHOD = (passed_url) => {
    return {
      method: 'GET',
      url: passed_url,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjYxNmNlYTAzZmFiNTU0YWM1NGEyZTdlMWE4YzIwMiIsInN1YiI6IjY1ZjI4Y2MxMmZkZWM2MDE4OTIzM2E4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eccxvzxCctqBTZ8lXeSUHgTBcc5r17hhsNLVy845QA4'
      }
    }
  }

  const axios_request = (URL, location) => {
    axios.request(API_METHOD(URL))
      .then(function (response) {
        location(response.data.results)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {

    axios_request(NOWPLAYING_URL, setNowPlaying)

  }, [])

  const [current, setCurrent] = useState(0)

  function handlePrev(){

    if(current == 0){
      setCurrent(nowPlaying.length - 1)
    }
    else{
      setCurrent(current - 1)
    }
  }

  function handleNext(){
    if(current == nowPlaying.length - 1){
      setCurrent(0)
    }
    else{
      setCurrent(current + 1)
    }
  }


  return (
    <div className='search2 white mons'>
      <nav className='white mons'>
        <div className="nav55">
          <img src={studio} alt="" className="logoImg" onClick={() => navigate('/')} />
          <div className="navList">
            <div className="navLIS" onClick={() => navigate('/recs')}>MOVIES</div>
            <div className="navLIS" onClick={() => navigate('/tvrecs')}>TV SHOWS</div>
            <div className="navLIS" onClick={() => navigate('/tvrecs')}>USERS</div>
            {localStorage.getItem('userID') && <div className="navLIS" onClick={() => getUserInfoForNav()}>PROFILE</div>}
            <div className="navLIS" onClick={() => navigate('/search')}><img src={search2} alt="" /></div>
            {localStorage.getItem('userID') && <div className="" onClick={() => {
              localStorage.setItem('userID', '')
              location.reload()
            }}><img src={logout} className='logoutImg' /></div>}
            {!localStorage.getItem('userID') && <div className="loginButtonNav" onClick={() => navigate('/login')}>LOGIN / SIGNUP</div>}
          </div>
        </div>
      </nav>

      <img src={mm} alt="" className='mm'/>

      <div className="mainPageT mons">
        Your go to place for Movies & TV Shows
        <br/>
        Save Movies you want to watch
        <br/>
        Customize your profile & Recommend movies
        <br/>
        Create Lists and so Much More...

        <button>
          Get Started!
        </button>
      </div>

    </div>
  )
}

export default Home