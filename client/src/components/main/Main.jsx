import './Main.css'
import React from 'react'
import HP from '../../assets/HP.jpg'
import logo from '../../assets/logo.png'
import person from '../../assets/person.png'
import { Link } from 'react-router-dom'

import { useState, useEffect } from 'react'

import movieList from '../movies'

function Main() {

    const [genre, setGenre] = useState(0)

    const handleGenre = (value) => {
        setGenre(value)
    }

    return (
        <>
            <img src={HP} alt="wallpaper" className='background' />

            <div className="userBox white">
                <img src={logo} alt="logo" className="mainLogo" />

                <div className='flex amatic'>
                    <img src={person} alt="person" className='person' />
                    {sessionStorage.getItem('username')}
                </div>
            </div>

            <div className="centerArea">
                <h1 className='amatic white mainHeading'>TODAY'S RECOMENDATIONS</h1>

                <Link to='/movie/22'>
                    <div className="mainMoviesArea">
                        {
                            movieList[genre].map((el, index) => {
                                return <div className='wrapper'>
                                    <div className="image" key={index}>
                                        <img src={el.img} alt="" className="poster" />
                                        <div className="content white inter">
                                            <h1>{el.title.toLocaleUpperCase()}</h1>
                                            <p>{el.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </Link>

                <div className="buttonsArea amatic">
                    <button className={`${genre === 0 ? 'selected' : 'ns'}`} onClick={() => handleGenre(0)}>
                        THRILLER
                    </button>

                    <button className={`${genre === 1 ? 'selected' : 'ns'}`} onClick={() => handleGenre(1)}>
                        ACTION
                    </button>

                    <button className={`${genre === 2 ? 'selected' : 'ns'}`} onClick={() => handleGenre(2)}>
                        COMEDY
                    </button>

                    <button className={`${genre === 3 ? 'selected' : 'ns'}`} onClick={() => handleGenre(3)}>
                        ANIMATED
                    </button>

                    <button className={`${genre === 4 ? 'selected' : 'ns'}`} onClick={() => handleGenre(4)}>
                        HORROR
                    </button>
                </div>
            </div>
        </>
    )
}

export default Main