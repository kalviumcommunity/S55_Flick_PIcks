import './Movie.css'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Watchlist from '../../assets/watchlist.png'
import next from '../../assets/next.png'
import arrow from '../../assets/arrow.png'
import { useNavigate } from 'react-router-dom';
import WatchProvider from './WatchProvider';
import profile from '../../assets/profile.png'
import heart from '../../assets/heart.png'
import Nav from '../nav/Nav'
import user from '../../assets/user.png'
import search from '../../assets/search.png'
import close from '../../assets/close.png'

import Alert from '@mui/material/Alert';

import watchlistInLogo from '../../assets/watchlist in.png'
import watchlistOutLogo from '../../assets/watchlist out.png'

import likedInLogo from '../../assets/liked in.png'
import likedOutLogo from '../../assets/liked out.png'

import watchedIn from '../../assets/watchedIn.png'
import watchedOut from '../../assets/watchedOut.png'

import studio from '../../assets/studio.png'
import search2 from '../../assets/image.png'
import logout from '../../assets/logout.png'

import recommended from '../../assets/recommendedTile.png'


function Movie() {

  const [loading,setLoading] = useState(true)

  async function getUserInfoForNav(){
    const ID = localStorage.getItem('userID')
    const res = axios.get(`https://studio-backend-alpha.vercel.app/userByID/${ID}`)
    .then(res => {
        navigate(`/user/${res.data.username}`)
    })
    .catch(err => console.log(err))
}

  const RENDER_LINK = "https://studio-backend-alpha.vercel.app/"

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [cast, setCast] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [similar, setSimilar] = useState([])    
  const [watch, setWatch] = useState([])
  const [review, setReview] = useState([])
  const [loginNA, setLoginNA] = useState(false)

  const { id } = useParams()

  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const CREDIS_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
  const RECOMMENDATIONS_URL = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`
  const SIMILAR_URL = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
  const WATCH_URL = `https://api.themoviedb.org/3/movie/${id}/watch/providers`
  const REVIEW_URL = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`


  const API_METHOD = (passed_url) => {
    return {
      method: 'GET',
      url: passed_url,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjYxNmNlYTAzZmFiNTU0YWM1NGEyZTdlMWE4YzIwMiIsInN1YiI6IjY1ZjI4Y2MxMmZkZWM2MDE4OTIzM2E4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eccxvzxCctqBTZ8lXeSUHgTBcc5r17hhsNLVy845QA4`
      }
    }
  }

  const axios_request = (URL, location) => {
    axios.request(API_METHOD(URL))
      .then(function (response) {
        location(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {

    axios_request(MOVIE_URL, setData)
    axios_request(CREDIS_URL, setCast)
    axios_request(RECOMMENDATIONS_URL, setRecommendations)
    axios_request(SIMILAR_URL, setSimilar)
    axios_request(WATCH_URL, setWatch)
    axios_request(REVIEW_URL, setReview)

  }, [id])

  const [showAllReviews, setShowAllReviews] = useState(false)

  const handleMovieClick = (movie_id) => {
    navigate(`/movie/${movie_id}`)
  }

  const findDirector = cast.crew && cast.crew.find(el => {
    return el.job == "Director"
  })

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  const redirectClass = () => {
    navigate(`/movie/${id}/cast`)
  }

  const redirectRecs = () => {
    navigate(`/movie/${id}/recs`)
  }

  const redirectSimilar = () => {
    navigate(`/movie/${id}/similar`)
  }

  const addToList = async (listName) => {
    const ID = localStorage.getItem("userID")
    if(ID){
    try {
      const response = await axios.post(`https://studio-backend-alpha.vercel.app/addTo${listName}/${ID}`, data)
      if (listName == "Watchlist") {
        if (response.status == 200) {
          setWatchlistAdded(true)
          setTimeout(() => {
            setWatchlistAdded(false)
          }, 3000)
        }
        else if (response.status == 201) {
          setWatchlistRemoved(true)
          setTimeout(() => {
            setWatchlistRemoved(false)
          }, 3000)
        }
      }
      else if (listName == "Liked") {
        if (response.status == 200) {
          setLikedAdded(true)
          setTimeout(() => {
            setLikedAdded(false)
          }, 3000)
        }
        else if (response.status == 201) {
          setLikedRemoved(true)
          setTimeout(() => {
            setLikedRemoved(false)
          }, 3000)
        }
      }
      else if (listName == "Watched") {
        if (response.status == 200) {
          setWatchedAdded(true)
          setTimeout(() => {
            setWatchedAdded(false)
          }, 3000)
        }
        else if (response.status == 201) {
          setWatchedRemoved(true)
          setTimeout(() => {
            setWatchedRemoved(false)
          }, 3000)
        }
      }
    }
    catch (err) {
      alert("Unable to add movie. Try sigining in!")
    }
    handle()
  }
  else{
    setLoginNA(true)
    setTimeout(() => {
      setLoginNA(false)
    },3000)
  }
  }

  const [watchlistAdded, setWatchlistAdded] = useState(false)
  const [watchlistRemoved, setWatchlistRemoved] = useState(false)

  const [likedAdded, setLikedAdded] = useState(false)
  const [likedRemoved, setLikedRemoved] = useState(false)

  const [watchedAdded, setWatchedAdded] = useState(false)
  const [watchedRemoved, setWatchedRemoved] = useState(false)

  const [inWachlist, setInWachlist] = useState(false)
  const [inLiked, setInLiked] = useState(false)
  const [inWatched, setInWatched] = useState(false)

  useEffect(() => {
    if (data) {
      handle()
    }
  }, [data, inWachlist, inLiked, inWatched])

  const handle = async () => {

    const ID = localStorage.getItem('userID')
    if(ID){
    
    const res1 = await axios.post(`https://studio-backend-alpha.vercel.app/isInWatchlist/${ID}`, data)
    if (res1.status == 200) {
      setInWachlist(true)
    }
    else {
      setInWachlist(false)
    }

    const res2 = await axios.post(`https://studio-backend-alpha.vercel.app/isInLiked/${ID}`, data)
    if (res2.status == 200) {
      setInLiked(true)
    }
    else {
      setInLiked(false)
    }

    const res3 = await axios.post(`https://studio-backend-alpha.vercel.app/isInWatched/${ID}`, data)
    if (res3.status == 200) {
      setInWatched(true)
    }
    else {
      setInWatched(false)
    }
  }
  }

  const [users, setUsers] = useState([])
  const [searchInput, setSearchInput] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [userData, setUserData] = useState({})
  const [showRecommendedAlert, setShowRecommendedAlert] = useState(false)

  async function getData() {
    const res = await axios.get(`https://studio-backend-alpha.vercel.app/users2`)
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  function handleSearch() {
    setSearchInput(event.target.value)
    if (event.target.value == "") {
      setShowAll(true)
    }
    else {
      setShowAll(false)
    }
  }

  const filterUsers = () => {
    return users.filter(user =>
      user.username.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  async function postMovie(el, second) {
    const res = await axios.put(`https://studio-backend-alpha.vercel.app/userMovieRec/${el._id}`, {
      from: {
        "name": second.name,
        "username": second.username,
        "profilePic": second.profilePic,
        "id": second._id
      },
      data: data,
      message: message
    })
      .then(res => console.log("Movie Recommended"))
      .catch(err => console.log(err))
  }

  async function postOwnMovie(el, second) {
    const res = await axios.put(`https://studio-backend-alpha.vercel.app/userMovieOwnRec/${second._id}`, {
      to: {
        "name": el.name,
        "username": el.username,
        "profilePic": el.profilePic,
        "id": el._id
      },
      data: data,
      message: message
    })
      .then(res => console.log("Movie Recommended"))
      .catch(err => console.log(err))
  }

  async function getUserData() {
    const ID = localStorage.getItem("userID")
    const res = await axios.get(`https://studio-backend-alpha.vercel.app/userByID/${ID}`)
      .then(res => {
        setShowRecommendedAlert(true)
        setTimeout(()=>{
          setShowRecommendedAlert(false)
        },3000)
        setUserData(res.data)
        postMovie(to, res.data)
        postOwnMovie(to, res.data)
        setShowRecommendedArea(false)
      })
      .catch(err => console.log(err))
  }

  function handleUserClick(el) {
    setShowRecommendedArea(false)
    setShowMessage(true)
    setTo(el)
  }

  async function sendMovieEveryone(dt) {
    const res = await axios.put(`https://studio-backend-alpha.vercel.app/recMovieEveryone/${dt._id}`, {
      from: {
        "name": dt.name,
        "username": dt.username,
        "profilePic": dt.profilePic,
        "id": dt._id
      },
      data: data,
      message: everyoneMessage
    })
      .then(res => console.log("Movie Sent"))
      .catch(err => console.log(err))
  }

  async function sendMovieOwn(dt) {
    const res = await axios.put(`https://studio-backend-alpha.vercel.app/userMovieOwnRec/${dt._id}`, {
      to: {
        "name": "Everyone"
      },
      data: data,
      message: everyoneMessage
    })
      .then(res => console.log("Movie Sent"))
      .catch(err => console.log(err))
  }

  async function handleRecommendEveryone() {
    const ID = localStorage.getItem("userID")
    const res = await axios.get(`https://studio-backend-alpha.vercel.app/userByID/${ID}`)
      .then(res => {
        setShowRecommendedAlert(true)
        setTimeout(()=>{
          setShowRecommendedAlert(false)
        },3000)
        sendMovieEveryone(res.data)
        sendMovieOwn(res.data)
      })
      .catch(err => console.log(err))
  }

  const [showPersonal, setShowPersonal] = useState(true)
  const [showRecommendedArea, setShowRecommendedArea] = useState(false)

  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [to, setTo] = useState({})

  const [showEveryoneMessage, setShowEveryoneMessage] = useState(false)
  const [everyoneMessage, setEveryoneMessage] = useState('')

  useEffect(() => {
    document.title = `${data.title}`
  }, [data])

  function checkLogin(){
    if(localStorage.getItem('userID')){
      setShowRecommendedArea(true)
    }
    else{
      setLoginNA(true)
      setTimeout(() => {
        setLoginNA(false)
      },3000)
    }
  }

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

  return (
    <>
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
      <div className={`alertArea ${watchlistAdded || watchlistRemoved || likedAdded || likedRemoved || watchedAdded || watchedRemoved || showRecommendedAlert || loginNA ? 'show' : ''}`}>
        {watchlistAdded && <Alert variant="filled" severity="success" className='alert'>
          <h2>
            Movie added to Watchlist
          </h2>
        </Alert>}

        {watchlistRemoved && <Alert variant="filled" severity="error" className='alert'>
          <h2>
            Movie removed from Watchlist
          </h2>
        </Alert>}

        {likedAdded && <Alert variant="filled" severity="success" className='alert'>
          <h2>
            Movie added to Liked list
          </h2>
        </Alert>}

        {likedRemoved && <Alert variant="filled" severity="error" className='alert'>
          <h2>
            Movie removed from Liked list
          </h2>
        </Alert>}

        {watchedAdded && <Alert variant="filled" severity="success" className='alert'>
          <h2>
            Movie added to Watched list
          </h2>
        </Alert>}

        {watchedRemoved && <Alert variant="filled" severity="error" className='alert'>
          <h2>
            Movie removed from Watched list
          </h2>
        </Alert>}
        
        {showRecommendedAlert && <Alert variant="filled" severity="success" className='alert'>
          <h2>
            Movie Recommended
          </h2>
        </Alert>}

        {loginNA && <Alert variant="filled" severity="info" className='alert'>
          <h2>
            Please Login / Signup to use this feature
          </h2>
        </Alert>}
      </div>

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

                    {loading ? <div className="screenBlack">
            <div className="loader mt"></div>
        </div> : <div>

        {data.backdrop_path && <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} className='backdrop' loading="lazy" />}
        <div className="gradient">
          <Nav></Nav>
          <div className="description">
            <div className="descArea mons white">

              {data.poster_path && <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} className="poster" loading="lazy" />}
              <div className="movieInfo">
                <div className="title">{data.title}</div>
                <div className="general">
                  <span>{data.release_date && data.release_date.split("-")[0]}</span>
                  <span>{data.runtime}M</span>
                  {
                    data.genres && data.genres.map((el, index) => {
                      if (index < 3) {
                        return <span key={index}>{el.name}</span>
                      }
                    })
                  }
                </div>
                  {data.tagline && <div className="tagline">{data.tagline}</div>}
                <div className="overview">
                  {data.overview}
                </div>

                {/* <div className="movieButtonsArea">

                  <button className='addToWatchlist' onClick={() => addToList("Watched")}>
                    <img src={inWatched ? watchedIn : watchedOut} className='watchlist' loading="lazy" />
                  </button>

                  <button className='addToWatchlist' onClick={() => addToList("Watchlist")}>
                    <img src={inWachlist ? watchlistInLogo : watchlistOutLogo} className='watchlist' loading="lazy" />
                  </button>

                  <button className='addToWatchlist bg-black' onClick={() => addToList("Liked")}>
                    <img src={inLiked ? likedInLogo : likedOutLogo} className='watchlist' loading="lazy" />
                  </button>

                  <button className='addToWatchlist bg-black'  onClick={() => setShowRecommendedArea(true)}>
                    <img src={recommended} className='watchlist' loading="lazy" />
                  </button>
                </div> */}
              </div>
              <div className="anotherDiv2">
                {!inWachlist ? <div className="impButtons" onClick={() => addToList("Watchlist")} >Add to Watchlist</div>
                  : <div className="impButtons" onClick={() => addToList("Watchlist")} >Remove from Watchlist</div>}
                {!inWatched ? <div className="impButtons" onClick={() => addToList("Watched")} >Add to Watched</div>
                  : <div className="impButtons" onClick={() => addToList("Watched")} >Remove from Watched</div>}
                {!inLiked ? <div className="impButtons" onClick={() => addToList("Liked")} >Add to Liked</div>
                  : <div className="impButtons" onClick={() => addToList("Liked")} >Remove from Liked</div>}
                <div className="impButtons" onClick={() => checkLogin()}>Recommend Movie</div>
              </div>
            </div>
          </div>
        </div>
        <div className="black mons">

          <div className="centerMovie">

            {/* {CAST AREA} */}

            <h1 className='white cast flex-center'>
              Cast and Crew
              <img src={next} alt="" className='' loading="lazy" />
            </h1>

            <div className='profileArea scrollbar'>
              {cast.cast && cast.cast.map((el, index) => {
                if (index < 10) {
                  if (el.profile_path) {
                    return (
                      <div className='profile white' key={index} onClick={() => navigate(`/person/${el.id}`)}>
                        {<img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} alt="profile" loading="lazy" />}
                        <h2>{el.name}</h2>
                        <h3>{el.character}</h3>
                      </div>
                    )
                  }
                  else {
                    return (
                      <div className='noPhotoProfile white' key={index} onClick={() => navigate(`/person/${el.id}`)}>
                        <div className='noPhotoArea'>{<img src={user} alt="profile" loading="lazy" />}
                        </div>
                        <div>
                          <h2 className='noPhotoText'>{el.name}</h2>
                          <h3>{el.character}</h3>
                        </div>
                      </div>
                    )
                  }
                }
              })}

              <div className="more white" onClick={redirectClass}>
                <div>SEE MORE</div>
                <img src={arrow} alt="arrow" className='moreArrow' loading="lazy" />
              </div>
            </div>

            {/* {CAST AREA OVER} */}

            <div className="generalInfo">


              {/* MOVIE INFO AREA */}

              {data && <div className="movieDetails white">
                <h1 className="cast white flex-center">
                  Details
                  <img src={next} alt="" className='' loading="lazy" />
                </h1>

                <div className="watchArea">

                  <div className="flex">
                    <div className="movieDetailKey">
                      Directed by:
                    </div>
                    <div className="movieDetailField" onClick={() => navigate(`/person/${findDirector.id}`)}>
                      {findDirector && `${findDirector.name}`}
                    </div>
                  </div>

                  {data.release_date && <div className="flex">
                    <div className="movieDetailKey">
                      Release Year:
                    </div>
                    <div className="movieDetailField">
                      {data.release_date && data.release_date.split("-")[0]}
                    </div>
                  </div>}

                  {data.vote_average && <div className="flex">
                    <div className="movieDetailKey">
                      Rating:
                    </div>
                    <div className="movieDetailField">
                      {`${data.vote_average && String(data.vote_average * 10).slice(0, 2)}%`}
                    </div>
                  </div>}

                  {data.original_language && <div className="flex">
                    <div className="movieDetailKey">
                      Original Language:
                    </div>
                    <div className="movieDetailField">
                      {data.original_language && data.original_language.toUpperCase()}
                    </div>
                  </div>}

                  {data.budget && data.budget != 0 && <div className="flex">
                    <div className="movieDetailKey">
                      Budget:
                    </div>
                    <div className="movieDetailField">
                      {data.budget && `$${addCommas(data.budget)}`}
                    </div>
                  </div>}

                  {data.revenue &&  data.revenue != 0 && <div className="flex">
                    <div className="movieDetailKey">
                      Collection:
                    </div>
                    <div className="movieDetailField">
                      {data.revenue && `$${addCommas(data.revenue)}`}
                    </div>
                  </div>}

                  {data.genres && <div className="flex">
                    <div className="movieDetailKey">
                      Genre:
                    </div>
                    <div className="genreField">
                      {data.genres && data.genres.map((el, index) => {
                        if (data.genres.length - 1 == index) {
                          return (<span key={index}> {el.name}</span>)
                        }
                        else {
                          return (<span key={index}> {el.name} |</span>)
                        }
                      })}
                    </div>
                  </div>}

                </div>
              </div>}

              {/* MOVIE INFO AREA OVER*/}

              {/* {WATCH AREA} */}

              {watch.results && watch.results.IN && <div className="watch">

                <h1 className="cast white flex-center">
                  Watch Providers
                  <img src={next} alt="" className='' loading="lazy" />
                </h1>

                <div className="watchArea white">
                  {
                    watch.results.IN.flatrate &&
                    <div className="stream">

                      <h2>Stream</h2>

                      {watch && watch.results && watch.results.IN.flatrate && <WatchProvider data={watch.results.IN.flatrate} />}

                    </div>
                  }

                  {
                    watch.results.IN.rent &&
                    <div className="stream">

                      <h2>Rent</h2>

                      {watch && watch.results && watch.results.IN.rent && <WatchProvider data={watch.results.IN.rent} />}

                    </div>
                  }

                  {
                    watch.results.IN.buy &&
                    <div className="stream">

                      <h2>Buy</h2>

                      {watch && watch.results && watch.results.IN.buy && <WatchProvider data={watch.results.IN.buy} />}

                    </div>
                  }

                </div>

              </div>}

              {/* {WATCH AREA OVER} */}

            </div>

            {/* {RECCOMENDATIONS AREA} */}

            {recommendations && recommendations.results && recommendations.results.length && <h1 className="cast white flex-center">
              Recommendations
              <img src={next} alt="" className='' loading="lazy" />
            </h1>}

            {recommendations && recommendations.results && recommendations.results.length && <div className='profileArea scrollbar'>
              {recommendations.results && recommendations.results.map((el, index) => {
                if (index < 10 && el.backdrop_path && el.poster_path) {
                  return (
                    <div className='rec white' key={index} onClick={() => handleMovieClick(el.id)}>
                      {el.backdrop_path && <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} className='recBackdrop' loading="lazy" />}
                      <div className="partialGrad white"></div>
                      <div className="recDesc">
                        {el.poster_path && <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} className='recPoster' loading="lazy" />}
                        <div className="recTitle"></div>
                      </div>
                      <div className='mons white recT'>
                        {el.title} ({el.release_date && el.release_date.split("-")[0]})
                      </div>
                    </div>
                  )
                }
              })}

              <div className="more white" onClick={redirectRecs}>
                <div>SEE MORE</div>
                <img src={arrow} alt="arrow" className='moreArrow' loading="lazy" />

              </div>
            </div>}

            {/* {RECCOMENDATIONS AREA OVER} */}

            {/* {SIMILAR AREA} */}

            {similar && similar.results && similar.results.length && <h1 className="cast white flex-center">
              Similar
              <img src={next} alt="" className='' loading="lazy" />
            </h1>}

            {similar && similar.results && similar.results.length && <div className='profileArea scrollbar'>
              {similar.results && similar.results.map((el, index) => {
                if (index < 10 && el.backdrop_path && el.poster_path) {
                  return (
                    <div className='rec white' key={index} onClick={() => handleMovieClick(el.id)}>
                      {el.backdrop_path && <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} className='recBackdrop' loading="lazy" />}
                      <div className="partialGrad white"></div>
                      <div className="recDesc">
                        {el.poster_path && <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt="poster" className='recPoster' loading="lazy" />}
                        <div className="recTitle"></div>
                      </div>
                      <div className='mons white recT'>
                        {el.title} ({el.release_date && el.release_date.split("-")[0]})
                      </div>
                    </div>
                  )
                }
              })}

              <div className="more white" onClick={redirectSimilar}>
                <div>SEE MORE</div>
                <img src={arrow} alt="arrow" className='moreArrow' loading="lazy" />

              </div>
            </div>}

            {/* {SIMILAR AREA OVER} */}


            {/* REVIEW AREA */}

            {review && review.results && review.results.length != 0 && <div className="reviewArea">
              <h1 className="cast white flex-center">
                Reviews
                <img src={next} alt="" className='' loading="lazy" />
              </h1>

              <div className="reviewGrid">
                {review && !showAllReviews && review.results && review.results.map((el, index) => {
                  if (index < 4) {
                    return (<div className='review white' key={index}>
                      <div className="reviewTop">
                        {el.author_details.avatar_path ? <img src={`https://image.tmdb.org/t/p/original/${el.author_details.avatar_path}`} alt="" loading="lazy" />
                          : <div className='imgNA'> <img src={user} /></div>}
                        <div className="author">{el.author}</div>
                      </div>
                      <div className="reviewRating">
                        {el.author_details.rating && `${el.author_details.rating} / 10`}
                      </div>
                      <div className="reviewContent">
                        {el.content}
                      </div>
                    </div>)
                  }
                })}
                {review && showAllReviews && review.results && review.results.map((el, index) => {
                  return (<div className='review white'>
                    <div className="reviewTop">
                      {el.author_details.avatar_path ? <img src={`https://image.tmdb.org/t/p/original/${el.author_details.avatar_path}`} alt="" loading="lazy" />
                        : <img src={profile} loading="lazy" />}
                      <div className="author">{el.author}</div>
                    </div>
                    <div className="reviewRating">
                      {el.author_details.rating && `${el.author_details.rating} / 10`}
                    </div>
                    <div className="reviewContent">
                      {el.content}
                    </div>
                  </div>)
                })}
              </div>

              {review.total_results > 4 && !showAllReviews && <div className='white seeAll' onClick={() => setShowAllReviews(true)}>
                <h3>SEE ALL</h3>
                <img src={next} loading="lazy" />
              </div>}

              {review.total_results > 4 && showAllReviews && <div className='white seeAll seeLess' onClick={() => setShowAllReviews(false)}>
                <img src={next} loading="lazy" />
                <h3>SEE LESS</h3>
              </div>}

            </div>}

            {/* REVIEW AREA OVER*/}



          </div>


        </div>
      </div>}

      {showRecommendedArea && <div className='RecommendMovie white mons'>
        <div className={showPersonal ? "addFilmToFav2" : "addFilmToFav3"}>

          <div className="blockArea">
            <div className={showPersonal ? "block" : "blockNS1"} onClick={() => setShowPersonal(true)}>PERSONAL</div>
            <div className={!showPersonal ? "block" : "blockNS"} onClick={() => setShowPersonal(false)}>PUBLIC</div>
          </div>

          {showPersonal && <div className="searchAreaFav">
            <div className="searchIconFav">
              <img src={search} />
            </div>
            <input type="text" onChange={() => handleSearch()} />
          </div>}

          {showPersonal && <div className="FavSearchResults">
            <h3>USERS</h3>
            <hr className='red' />

            {showAll && users && users.filter((el) => {
              return el._id !== localStorage.getItem("userID");
            }).map((el, index) => (
              <div className='favMovieAddResult' key={index} onClick={() => handleUserClick(el)}>
                <h3>{el.name}</h3>
              </div>
            ))}

            {!showAll && users &&
              (filterUsers().filter((el) => el._id !== localStorage.getItem("userID")).length > 0 ?
                filterUsers().filter((el) => el._id !== localStorage.getItem("userID")).map((el, index) => (
                  <div className='favMovieAddResult' key={index} onClick={() => handleUserClick(el)}>
                    <h3>{el.name}</h3>
                  </div>
                )) :
                <div className='centerMid'>
                  <h3>No results found</h3>
                </div>
              )
            }

          </div>}

          {!showPersonal && <div className='showPublic'>
            Are you sure you want to recommend this movie to everyone?

            <div className="publicButtons">
              <div className="publicButton pbNo" onClick={() => setShowRecommendedArea(false)}>NO</div>
              <div className="publicButton pbYes" onClick={() => {
                setShowEveryoneMessage(true)
                setShowRecommendedArea(false)
              }}>YES</div>
            </div>

          </div>}

          <img src={close} alt="" className="AddFavClose" onClick={() => setShowRecommendedArea(false)} />
        </div>

      </div>}

      {showMessage && <div className='RecommendMovie white mons'>
        <div className="addFilmToFav3">
          <div className='sendMessage'>
            Enter a message you want to send them
            <textarea name="" placeholder='Enter a message' onChange={() => setMessage(event.target.value)} />

            <div className="publicButtons">
              <div className="publicButton pbNo" onClick={() => {
                setShowMessage(false)
                setShowRecommendedArea(true)
              }}>BACK</div>
              <div className="publicButton pbYes" onClick={() => {
                setShowMessage(false)
                getUserData()
              }}>SEND</div>
            </div>
          </div>
          <img src={close} alt="" className="AddFavClose" onClick={() => setShowMessage(false)} />

        </div>
      </div>}

      {showEveryoneMessage && <div className='RecommendMovie white mons'>
        <div className="addFilmToFav3">
          <div className='sendMessage'>
            Enter a message you want to send them
            <textarea name="" placeholder='Enter a message' onChange={() => setEveryoneMessage(event.target.value)} />

            <div className="publicButtons">
              <div className="publicButton pbNo" onClick={() => {
                setShowEveryoneMessage(false)
                setShowRecommendedArea(true)
              }}>BACK</div>
              <div className="publicButton pbYes" onClick={() => {
                setShowEveryoneMessage(false)
                handleRecommendEveryone()
              }}>SEND</div>
            </div>
          </div>
          <img src={close} alt="" className="AddFavClose" onClick={() => setShowEveryoneMessage(false)} />

        </div>
      </div>}
    </>
  )
}

export default Movie