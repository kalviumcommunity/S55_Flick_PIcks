import './TvRecs.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Nav from '../nav/Nav'

import animated from '../../assets/logos/animated.png'
import action from '../../assets/logos/action.png'
import comedy from '../../assets/logos/comedy.png'
import horror from '../../assets/logos/horror.png'
import drama from '../../assets/drama.png'
import sitcom from '../../assets/sitcom.png'
import scifi from '../../assets/logos/scifi.png'
import random from '../../assets/logos/random.png'
import logout from '../../assets/logout.png'

import movie from '../../assets/movieWhite.png'
import tvShow from '../../assets/showWhite.png'


import studio from '../../assets/studio.png'
import search2 from '../../assets/image.png'

function TvRecs() {

    const navigate = useNavigate()

    const IMAGE_LINK = "https://image.tmdb.org/t/p/original/"

    const [recommendations, setRecommendations] = useState([])
    const [genre, setCurrGenre] = useState("random")
    const [show, setShow] = useState([])
    const [display, setDisplay] = useState([])
    const [current, setCurrent] = useState(1)

    function getRecs() {
        const res = axios.get('http://localhost:3000/tvshows')
            .then(res => {
                setRecommendations(res.data)
                setShow(res.data.random)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getRecs()
    }, [])

    function setGenre(passedGenre) {
        console.log(passedGenre)
        setCurrGenre(passedGenre)
        setCurrent(1)

        switch (passedGenre) {
            case 'action':
                setShow(recommendations.action)
                break
            case 'animated':
                setShow(recommendations.animated)
                break
            case 'comedy':
                setShow(recommendations.comedy)
                break
            case 'horror':
                setShow(recommendations.horror)
                break
            case 'scifi':
                setShow(recommendations.scifi)
                break
            case 'drama':
                setShow(recommendations.drama)
                break
            case 'sitcom':
                setShow(recommendations.sitcoms)
                break
            case 'random':
                setShow(recommendations.random)
                break
        }
    }

    function shuffleShow(array, setDisplay) {
        if (array) {
            const arr = [...array]
            arr.sort(() => Math.random() - 0.5)
            setDisplay(arr)
        }
    }

    useEffect(() => {
        shuffleShow(show, setDisplay)
    }, [show])

    const [mouseEnter, setMouseEnter] = useState(false)

    function keyPress(event) {
        if (event.key == 'ArrowRight') {
            if (show[current + 1]) {
                setCurrent(current + 1)
            }
        }
        if (event.key == "ArrowLeft") {
            if (current != 1) {
                setCurrent(current - 1)
            }
        }
    }

    useEffect(() => {
        document.title = 'TV Shows - STUDIO'
    }, [])

    async function getUserInfoForNav(){
        const ID = localStorage.getItem('userID')
        const res = axios.get(`http://localhost:3000/userByID/${ID}`)
        .then(res => {
            console.log(res)
            navigate(`/user/${res.data.username}`)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <nav className='white mons'>
                        <div className="nav55">
                            <img src={studio} alt="" className="logoImg" onClick={() => navigate('/')}/>
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
            {console.log(display)}
            {recommendations && console.log(recommendations)}
            <div className='mons white' onKeyDown={keyPress} tabIndex={0}>
                {display && <div className="recsBackdrop">
                    {display && display[current] && <img src={`${IMAGE_LINK}${display[current].backdrop_path}`} className='recsBackdropImg' />}
                    <div className='recsGrad'>
                        <div className='recsInfo'>
                            <div className="recsTitle">
                                {display && display[current] && display[current].name}
                            </div>
                            <div className="recsDesc">
                                {display && display[current] && display[current].overview}
                            </div>
                            <div className="recsSeeMore" onClick={() => navigate(`/tvshow/${display[current].id}`)}>
                                See More
                            </div>
                        </div>
                        <div className="otherRecsArea">
                            {display && display[current + 1] && <img src={`${IMAGE_LINK}${display[current + 1].poster_path}`} className='r1' onClick={() => setCurrent(current + 1)} />}
                            {display && display[current + 2] && <img src={`${IMAGE_LINK}${display[current + 2].poster_path}`} className='r2' onClick={() => setCurrent(current + 2)} />}
                            {display && display[current + 3] && <img src={`${IMAGE_LINK}${display[current + 3].poster_path}`} className='r3' onClick={() => setCurrent(current + 3)} />}
                        </div>
                    </div>
                    <div className={mouseEnter ? "genreBigArea hoverBlackBG" : "genreBigArea"} onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>

                        <div className="genreLogos">
                            <div className={genre == "action" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("action")} >
                                <img src={action} />
                                <span>
                                    ACTION
                                </span>
                            </div>
                            <div className={genre == "animated" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("animated")} >
                                <img src={animated} />
                                <span>
                                    ANIMATED
                                </span>
                            </div>
                            <div className={genre == "comedy" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("comedy")} >
                                <img src={comedy} />
                                <span>
                                    COMEDY
                                </span>
                            </div>
                            <div className={genre == "horror" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("horror")} >
                                <img src={horror} />
                                <span>
                                    HORROR
                                </span>
                            </div>
                            <div className={genre == "sitcom" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("sitcom")} >
                                <img src={sitcom} />
                                <span>
                                    SITCOM
                                </span>
                            </div>
                            <div className={genre == "scifi" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("scifi")} >
                                <img src={scifi} />
                                <span>
                                    SCI-FI
                                </span>
                            </div>
                            <div className={genre == "drama" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("drama")} >
                                <img src={drama} />
                                <span>
                                    DRAMA
                                </span>
                            </div>
                            <div className={genre == "random" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("random")} >
                                <img src={random} />
                                <span>
                                    RANDOM
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="switchTab">
                    <div className="movieArea2 blackText"  onClick={() => navigate('/recs')}>
                        <img src={movie}/>
                    </div>
                    <div className="showArea2">
                        <img src={tvShow}/> TV SHOWS
                    </div>
                </div>

                </div>}
            </div>
        </div>


    )
}

export default TvRecs