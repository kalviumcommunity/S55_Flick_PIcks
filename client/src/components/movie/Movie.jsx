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

import Alert from '@mui/material/Alert';

import watchlistInLogo from '../../assets/watchlist in.png'
import watchlistOutLogo from '../../assets/watchlist out.png'

import likedInLogo from '../../assets/liked in.png'
import likedOutLogo from '../../assets/liked out.png'

import watchedIn from '../../assets/watchedIn.png'
import watchedOut from '../../assets/watchedOut.png'


function Movie() {

  const RENDER_LINK = "https://s55-shaaz-capstone-flickpicks.onrender.com/"

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [cast, setCast] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [similar, setSimilar] = useState([])
  const [watch, setWatch] = useState([])
  const [review, setReview] = useState([])

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
    console.log("el is",el)
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
    const username = sessionStorage.getItem("username")
    try {
      const response = await axios.post(`https://s55-shaaz-capstone-flickpicks.onrender.com/addTo${listName}/${username}`, data)
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
      console.log(err)
    }
    handle()
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
  }, [data, inWachlist, inLiked,inWatched])

  const handle = async () => {

    const username = sessionStorage.getItem("username")

    console.log("handle is working")

    const res1 = await axios.post(`https://s55-shaaz-capstone-flickpicks.onrender.com/isInWatchlist/${username}`, data)
    if (res1.status == 200) {
      setInWachlist(true)
    }
    else {
      setInWachlist(false)
    }

    const res2 = await axios.post(`https://s55-shaaz-capstone-flickpicks.onrender.com/isInLiked/${username}`, data)
    if (res2.status == 200) {
      setInLiked(true)
    }
    else {
      setInLiked(false)
    }

    const res3 = await axios.post(`https://s55-shaaz-capstone-flickpicks.onrender.com/isInWatched/${username}`, data)
    if (res3.status == 200) {
      setInWatched(true)
    }
    else {
      setInWatched(false)
    }
  }

  return (
    <>

      <div className={`alertArea ${watchlistAdded || watchlistRemoved || likedAdded || likedRemoved || watchedAdded || watchedRemoved ? 'show' : ''}`}>
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
      </div>
      {data && <div>
        {data.backdrop_path && <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} className='backdrop' loading="lazy" />}
        <div className="gradient">
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
                        return <span>{el.name}</span>
                      }
                    })
                  }
                </div>
                <div className="overview">
                  {data.overview}
                </div>

                <div className="movieButtonsArea">

                  <button className='addToWatchlist' onClick={() => addToList("Watched")}>
                    <img src={inWatched ? watchedIn : watchedOut} className='watchlist' loading="lazy" />
                  </button>

                  <button className='addToWatchlist' onClick={() => addToList("Watchlist")}>
                    <img src={inWachlist ? watchlistInLogo : watchlistOutLogo} className='watchlist' loading="lazy" />
                  </button>

                  <button className='addToWatchlist bg-black' onClick={() => addToList("Liked")}>
                    <img src={inLiked ? likedInLogo : likedOutLogo}className='watchlist' loading="lazy" />
                  </button>
                </div>
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
                  return (
                    <div className='profile white' key={index} onClick={() => navigate(`/person/${el.id}`)}>
                      {el.profile_path && <img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} alt="profile" loading="lazy" />}
                      <h2>{el.name}</h2>
                      <h3>{el.character}</h3>
                    </div>
                  )
                }
              })}

              <div className="more white" onClick={redirectClass}>
                <div>SEE MORE</div>
                <img src={arrow} alt="arrow" className='moreArrow' loading="lazy" />
              </div>
            </div>

            {/* {CAST AREA OVER} */}

            {/* {RECCOMENDATIONS AREA} */}

            <h1 className="cast white flex-center">
              Recommendations
              <img src={next} alt="" className='' loading="lazy" />
            </h1>

            <div className='profileArea scrollbar'>
              {recommendations.results && recommendations.results.map((el, index) => {
                if (index < 10) {
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
            </div>

            {/* {RECCOMENDATIONS AREA OVER} */}

            {/* {SIMILAR AREA} */}

            <h1 className="cast white flex-center">
              Similar
              <img src={next} alt="" className='' loading="lazy" />
            </h1>

            <div className='profileArea scrollbar'>
              {similar.results && similar.results.map((el, index) => {
                if (index < 10 && index > 0) {
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
            </div>

            {/* {SIMILAR AREA OVER} */}

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

                  <div className="flex">
                    <div className="movieDetailKey">
                      Genre:
                    </div>
                    <div className="movieDetailField genreField">
                      {data.genres && data.genres.map((el, index) => {
                        return (<div className='genreKey'>{el.name}</div>)
                      })}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="movieDetailKey">
                      Release Year:
                    </div>
                    <div className="movieDetailField">
                      {data.release_date && data.release_date.split("-")[0]}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="movieDetailKey">
                      Budget:
                    </div>
                    <div className="movieDetailField">
                      {data.budget && `$${addCommas(data.budget)}`}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="movieDetailKey">
                      Collection:
                    </div>
                    <div className="movieDetailField">
                      {data.revenue && `$${addCommas(data.revenue)}`}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="movieDetailKey">
                      Original Language:
                    </div>
                    <div className="movieDetailField">
                      {data.original_language && data.original_language.toUpperCase()}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="movieDetailKey">
                      Runtime:
                    </div>
                    <div className="movieDetailField">
                      {`${data.runtime} Minutes`}
                    </div>
                  </div>

                  <div className="flex">
                    <div className="movieDetailKey">
                      Rating:
                    </div>
                    <div className="movieDetailField">
                      {`${data.vote_average && String(data.vote_average * 10).slice(0, 2)} %`}
                    </div>
                  </div>


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

            {/* REVIEW AREA */}

            {review && <div className="reviewArea">
              <h1 className="cast white flex-center">
                Reviews
                <img src={next} alt="" className='' loading="lazy" />
              </h1>

              <div className="reviewGrid">
                {review && !showAllReviews && review.results && review.results.map((el, index) => {
                  if (index < 4) {
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
    </>
  )
}

export default Movie