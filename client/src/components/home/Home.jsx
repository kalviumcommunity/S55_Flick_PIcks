import './Home.css'
import React from 'react'
import homeWP from '../../assets/homeWP.png'
import logo from '../../assets/logo.png'

import { Link } from 'react-router-dom'

function Home() {
    return (
        <>
            <img src={homeWP} alt="background" className="background" />

            <div className="centerArea">
                <img src={logo} alt="logo" className="logo" />

                <div className="subheading koulen white">
                    Are you tired of endlessly scrolling through streaming platforms, unsure of what to watch next? Look no further! Flick Picks is your go-to destination for discovering the perfect movie for every mood.
                </div>

                <Link to='/login'>
                    <button className="startButton koulen white">
                        GET STARTED
                    </button>
                </Link>
            </div>

        </>
    )
}

export default Home