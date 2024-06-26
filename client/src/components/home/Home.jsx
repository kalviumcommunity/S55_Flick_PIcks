import React,{useState , useEffect} from 'react'
import './Home.css'
import axios from 'axios'
import search2 from '../../assets/image.png'
import logout from '../../assets/logout.png'
import studio from '../../assets/studio.png'
import { useNavigate } from 'react-router-dom'

function Home() {

    return (
        <div className='search white mons'>
            <nav className='white mons'>
        <div className="nav55">
          <img src={studio} alt="" className="logoImg" onClick={() => navigate('/')} />
          <div className="navList">
            <div className="navLIS" onClick={() => navigate('/recs')}>MOVIES</div>
            <div className="navLIS" onClick={() => navigate('/tvrecs')}>TV SHOWS</div>
            <div className="navLI">USERS</div>
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
        </div>
    )
}

export default Home