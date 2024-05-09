import React from 'react'
import next from '../../../assets/next.png'
import arrow from '../../../assets/arrow.png'
import axios from 'axios'
import user from '../../../assets/user.png'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../../nav/Nav'

function Cast() {

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [cast, setCast] = useState([])

  const { id } = useParams()

  const MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
  const CREDIS_URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`


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
        location(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {

    axios_request(MOVIE_URL, setData)
    axios_request(CREDIS_URL, setCast)

  }, [id])
  
  return (
    <div className=" mons">
      <Nav/>

<div className="castBackArea">

      <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} className='movieCastBackdrop' />
    <div className="castGradient"></div>
</div>
      <div className="castCenterMovie">

        {/* {CAST AREA} */}


<div className="flex-end" onClick={() => navigate(`/movie/${id}`)}>
        <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} alt="poster" className="" />
        <div className="title white">{data.original_title}</div>
</div>

        <h1 className='white cast flex-center'>
          Cast and Crew
        </h1>

        <div className='castPage'>
        {cast.cast && cast.cast.map((el, index) => {
                  return (
                    <div className='profile white' key={index} onClick={() => navigate(`/person/${el.id}`)}>
                      {el.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`}/>
                      : <div className='noPhoto'> <img src={user} /></div>}
                      <h2>{el.name}</h2>
                      <h3>{el.character}</h3>
                    </div>
                  )
                })}
        </div>
      </div>
    </div>
  )
}

export default Cast