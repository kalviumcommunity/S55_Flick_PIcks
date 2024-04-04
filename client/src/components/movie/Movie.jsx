import './Movie.css'
import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Watchlist from '../../assets/watchlist.png'
import next from '../../assets/next.png'
import arrow from '../../assets/arrow.png'

function Movie() {

  const [data, setData] = useState([])
  const [cast, setCast] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [similar, setSimilar] = useState([])

  const { id } = useParams()
  // const MOVIE_ID = '157336'

  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const CREDIS_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
  const RECOMMENDATIONS_URL = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`
  const SIMILAR_URL = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`

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

  const axios_request = (URL,location) => {
    axios.request(API_METHOD(URL))
      .then(function (response) {
        console.log(response.data);
        location(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {

      axios_request(MOVIE_URL,setData)
      axios_request(CREDIS_URL,setCast)
      axios_request(RECOMMENDATIONS_URL,setRecommendations)
      axios_request(SIMILAR_URL,setSimilar)

  }, [])

  return (
    <>
      <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} alt="" className='backdrop' />
      <div className="gradient">
        <div className="description">
          <div className="descArea mons white">
            <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="poster" className="poster" />
            <div className="movieInfo">
              <div className="title">{data.original_title}</div>
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

              <button className='addToWatchlist'>
                <div>
                  ADD TO WATCHLIST
                </div>
                <img src={Watchlist} alt="watchlist logo" className='watchlist' />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="black mons">

        <div className="centerMovie">

          {/* {CAST AREA} */}

          <h1 className='white cast flex-center'>
            Cast and Crew
            <img src={next} alt="" className='' />
          </h1>

          <div className='profileArea scrollbar'>
            {cast.cast && cast.cast.map((el, index) => {
              if (index < 10) {
                return (
                  <div className='profile white' key={index}>
                    <img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} alt="profile" />
                    <h2>{el.name}</h2>
                    <h3>{el.character}</h3>
                  </div>
                )
              }
            })}

            <div className="more white">
              <div>SEE MORE</div>
              <img src={arrow} alt="arrow" className='moreArrow' />
            </div>
          </div>

          {/* {CAST AREA OVER} */}

          {/* {RECCOMENDATIONS AREA} */}

          <h1 className="cast white flex-center">
            Recommendations
            <img src={next} alt="" className='' />
          </h1>

          <div className='profileArea scrollbar'>
            {recommendations.results && recommendations.results.map((el, index) => {
              if (index < 10) {
                return (
                  <div className='rec white' key={index}>
                    <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} alt="backdrop" className='recBackdrop'/>
                    <div className="partialGrad white"></div>
                    <div className="recDesc">
                      <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt="poster" className='recPoster'/>
                      <div className="recTitle"></div>
                    </div>
                      <div className='mons white recT'>
                        {el.original_title}
                      </div>
                  </div>
                )
              }
            })}

            <div className="more white">
              <div>SEE MORE</div>
              <img src={arrow} alt="arrow" className='moreArrow' />
              
            </div>
          </div>

          {/* {RECCOMENDATIONS AREA OVER} */}

          {/* {SIMILAR AREA} */}

          <h1 className="cast white flex-center">
            Similar
            <img src={next} alt="" className='' />
          </h1>

          <div className='profileArea scrollbar'>
            {similar.results && similar.results.map((el, index) => {
              if (index < 10 && index > 0) {
                return (
                  <div className='rec white' key={index}>
                    <img src={`https://image.tmdb.org/t/p/original/${el.backdrop_path}`} alt="backdrop" className='recBackdrop'/>
                    <div className="partialGrad white"></div>
                    <div className="recDesc">
                      <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} alt="poster" className='recPoster'/>
                      <div className="recTitle"></div>
                    </div>
                      <div className='mons white recT'>
                        {el.original_title}
                      </div>
                  </div>
                )
              }
            })}

            <div className="more white">
              <div>SEE MORE</div>
              <img src={arrow} alt="arrow" className='moreArrow' />
              
            </div>
          </div>

          {/* {SIMILAR AREA OVER} */}

        </div>


      </div>
    </>
  )
}

export default Movie