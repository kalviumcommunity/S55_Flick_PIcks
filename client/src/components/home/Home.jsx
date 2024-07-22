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
import frame from '../../assets/frame1.png'
import fWatchlist from '../../assets/fWatchlist.png'
import fProfile from '../../assets/fProfile.png'
import fRecs from '../../assets/fRecs.png'
import fList from '../../assets/fList.png'
import fGenres from '../../assets/fGenres.png'
import fUsers from '../../assets/fUsers.png'
import studioLogo from '../../assets/studioLogo.png'

function Home() {

  useEffect(() => {
    document.title = `Studio`
  }, [])

  const navigate = useNavigate()

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

  function handlePrev() {

    if (current == 0) {
      setCurrent(nowPlaying.length - 1)
    }
    else {
      setCurrent(current - 1)
    }
  }

  function handleNext() {
    if (current == nowPlaying.length - 1) {
      setCurrent(0)
    }
    else {
      setCurrent(current + 1)
    }
  }

  async function getData() {
    const res = await axios.get('https://studio-backend-alpha.vercel.app/recs')
  }

  useEffect(() => {
    getData()
  }, [])

  const [scrollProgress, setScrollProgress] = useState(0);

  const calculateScrollProgress = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const totalHeight = scrollHeight - clientHeight
    const scrollPosition = (scrollTop / totalHeight) * 100
    setScrollProgress(scrollPosition)
  }

  useEffect(() => {
    window.addEventListener('scroll', calculateScrollProgress)
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress)
    }
  }, [])

  async function getUserInfoForNav() {
    const ID = localStorage.getItem('userID')
    const res = axios.get(`https://studio-backend-alpha.vercel.app/userByID/${ID}`)
      .then(res => {
        navigate(`/user/${res.data.username}`)
      })
      .catch(err => console.log(err))
  }


  return (
    <div className='search2 white mons'>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 99868250386 }}>
        <div
          style={{
            height: '5px',
            width: `${scrollProgress}%`,
            backgroundColor: 'white',
            transition: 'width 0.25s',
          }}
        />
      </div>
      <nav className='white mons'>
        <div className="nav55">
          <img src={studio} alt="" className="logoImg" />
          <div className="navList">
            <div className="navLIS" onClick={() => navigate('/recs')}>MOVIES</div>
            <div className="navLIS" onClick={() => navigate('/tvrecs')}>TV SHOWS</div>
            <div className="navLIS" onClick={() => navigate('/users')}>USERS</div>
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

      <div className="frameDiv">

        <img src={frame} alt="" className='frame' />
        <div className="frameGradient"></div>
        <div className="frameGradient2"></div>
        <div className="frameGradient3"></div>
        <div className="frameWrite mons white">
          <div>
            <div className="frameTitle">
              STUDIO
            </div>

            Your go to place for Movies & TV Shows.
            <br />
            Save Movies you want to watch.
            <br />
            Customize your profile & Recommend movies.
            <br />
            Create Lists and so Much More...

          </div>

          <button onClick={() => navigate('/login')} className='recsSeeMore2'>
            Get Started!
          </button>
        </div>

      </div>
      <div className="featuresArea white mons">
        <div className="feature">
          <img src={fGenres} alt="" className='featureImg' />
          <div className="featureDesc">
            Get recommendations tailored to your mood.
            <br />We have a pick for your every feeling.
          </div>
        </div>
        <div className="feature">
          <div className="featureDesc">
            Customize your Profile
            <br />Showcase your favourite films
          </div>
          <img src={fProfile} alt="" className='featureImg' />
        </div>
        <div className="feature">
          <img src={fWatchlist} alt="" className='featureImg' />
          <div className="featureDesc">
            Add Movies & TV Shows to you Watchlist
            <br />Save them to watch later
            <br />Like Films to tell others whats good
          </div>
        </div>
        <div className="feature">
          <div className="featureDesc">
            Recommend movies to your friends
            <br />Tell them whats good
            <br /> Explore the world of cinema together
          </div>
          <img src={fRecs} alt="" className='featureImg' />
        </div>
        <div className="feature">
          <img src={fList} alt="" className='featureImg' />
          <div className="featureDesc">
            Create Lists
            <br />A list of underrated movies?
            <br />Or a List of your favourite Actors...?
            <br />Show your creativity!
          </div>
        </div>
        <div className="feature">
          <div className="featureDesc">
            Join the Community Now!
          </div>
          <img src={fUsers} alt="" className='featureImg' />
        </div>
      </div>

      <div className="footer">
        <div className="footer50">


          <img src={studioLogo} alt="" />

          <div className="footerLink">
            Quick Access
            <div className="footerLinks" onClick={() => navigate('/recs')}>Movies</div>
            <div className="footerLinks" onClick={() => navigate('/tvrecs')}>TV Shows</div>
            <div className="footerLinks" onClick={() => navigate('/users')}>Users</div>
          </div>

          <div className="footerLinkL">
            Contact Us
            <div className="footerLinks">Email: jiwanishaaz@gmail.com</div>
            <div className="footerLinks">Github: shaaaaz</div>
            <div className="footerLinks">Number: 702059897</div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home