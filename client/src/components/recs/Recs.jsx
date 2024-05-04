import React, { useEffect, useState } from 'react'
import './Recs.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import back from '../../assets/back.png'
import r1 from '../../assets/r1.png'
import r2 from '../../assets/r2.png'
import r3 from '../../assets/r3.png'

import animated from '../../assets/logos/animated.png'
import action from '../../assets/logos/action.png'
import comedy from '../../assets/logos/comedy.png'
import horror from '../../assets/logos/horror.png'
import romcom from '../../assets/logos/romcom.png'
import thriller from '../../assets/logos/thriller.png'
import crime from '../../assets/logos/crime.png'
import sports from '../../assets/logos/sports.png'
import scifi from '../../assets/logos/scifi.png'
import random from '../../assets/logos/random.png'


function Recs() {

    const navigate = useNavigate()

    const IMAGE_LINK = "https://image.tmdb.org/t/p/original/"

    const [recommendations, setRecommendations] = useState([])
    const [genre, setCurrGenre] = useState("random")
    const [show, setShow] = useState([])
    const [display, setDisplay] = useState([])
    const [current, setCurrent] = useState(1)

    function getRecs() {
        const res = axios.get('https://s55-shaaz-capstone-flickpicks.onrender.com/recs')
            .then(res => {
                setRecommendations(res.data)
                setShow(res.data.random)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getRecs()
        console.log("blank use effect 44")
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
            case 'crime':
                setShow(recommendations.crime)
                break
            case 'horror':
                setShow(recommendations.horror)
                break
            case 'romcom':
                setShow(recommendations.romcom)
                break
            case 'sports':
                setShow(recommendations.sports)
                break
            case 'scifi':
                setShow(recommendations.scifi)
                break
            case 'thriller':
                setShow(recommendations.thriller)
                break
            case 'random':
                setShow(recommendations.random)
                break
        }
    }

    function shuffleShow(array, setDisplay) {
        if(array){
            const arr = [...array]
            arr.sort(() => Math.random() - 0.5)
            setDisplay(arr)
        }
    }

    useEffect(() => {
        shuffleShow(show, setDisplay)
    }, [show])

    const [mouseEnter,setMouseEnter] = useState(false)

    function keyPress(event){
        if(event.key == 'ArrowRight'){
            if(show[current + 1]){
                setCurrent(current + 1)
            }
        }
        if(event.key == "ArrowLeft"){
            if(current != 1){
                setCurrent(current-1)
            }
        }
    }

    return (
        <div className='mons white' onKeyDown={keyPress} tabIndex={0}>
            {display && <div className="recsBackdrop">
                {display && display[current] && <img src={`${IMAGE_LINK}${display[current].backdrop_path}`} className='recsBackdropImg' />}
                <div className='recsGrad'>
                    <div className='recsInfo'>
                        <div className="recsTitle">
                            {display && display[current] && display[current].title } ({display[current] && display[current].release_date.split("-")[0]})
                        </div>
                        <div className="recsDesc">
                            {display && display[current] && display[current].overview}                        
                        </div>
                        <div className="recsSeeMore" onClick={() => navigate(`/movie/${display[current].id}`)}>
                            See More
                        </div>
                    </div>
                    <div className="otherRecsArea">
                        {display && display[current + 1] && <img src={`${IMAGE_LINK}${display[current + 1].poster_path}`} className='r1' onClick={() => setCurrent(current+1)}/>}
                        {display && display[current + 2] && <img src={`${IMAGE_LINK}${display[current +2].poster_path}`} className='r2'  onClick={() => setCurrent(current+2)}/>}
                        {display && display[current + 3] && <img src={`${IMAGE_LINK}${display[current + 3].poster_path}`} className='r3'  onClick={() => setCurrent(current+3)}/>}
                    </div>
                </div>
                <div className={mouseEnter ? "genreBigArea hoverBlackBG" : "genreBigArea"}  onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>

                <div className="genreLogos">
                    <div className={genre == "action" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("action")} >
                        <img src={action} />
                        <span>
                            ACTION
                        </span>
                    </div>
                    <div className={genre == "animated" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("animated")} >
                        <img src={animated}  />
                        <span>
                            ANIMATED
                        </span>
                    </div>
                    <div className={genre == "comedy" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("comedy")} >
                        <img src={comedy}  />
                        <span>
                            COMEDY
                        </span>
                    </div>
                    <div className={genre == "crime" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("crime")} >
                        <img src={crime}/>
                        <span>
                            CRIME
                        </span>
                    </div>
                    <div className={genre == "horror" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("horror")} >
                        <img src={horror}/>
                        <span>
                            HORROR
                        </span>
                    </div>
                    <div className={genre == "romcom" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("romcom")} >
                        <img src={romcom}/>
                        <span>
                            ROM-COM
                        </span>
                    </div>
                    <div className={genre == "sports" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("sports")} >
                        <img src={sports}/>
                        <span>
                            SPORTS
                        </span>
                    </div>
                    <div className={genre == "scifi" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("scifi")} >
                        <img src={scifi}/>
                        <span>
                            SCI-FI
                        </span>
                    </div>
                    <div className={genre == "thriller" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("thriller")} >
                        <img src={thriller}/>
                        <span>
                            THRILLER
                        </span>
                    </div>
                    <div className={genre == "random" ? "genreBlocks activeGenre" : "genreBlocks"} onClick={() => setGenre("random")} >
                        <img src={random}/>
                        <span>
                            RANDOM
                        </span>
                    </div>
                </div>

                </div>

            </div>}
        </div>
    )
}

export default Recs 