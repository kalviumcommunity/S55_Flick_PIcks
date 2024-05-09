import React from 'react'
import './Person.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';

function Person() {

  const navigate = useNavigate()

  const { id } = useParams()

  console.log("id",id)

  const [details,setDetails] = useState([])
  const [images,setImages] = useState([])
  const [movies,setMovies] = useState([])

  const DETAILS_URL = `https://api.themoviedb.org/3/person/${id}?language=en-US`
  const IMAGES_URL = `https://api.themoviedb.org/3/person/${id}/images`
  const MOVIES_URL = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`

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

    axios_request(DETAILS_URL,setDetails)
    axios_request(IMAGES_URL,setImages)
    axios_request(MOVIES_URL,setMovies)

  },[id])

  const [sortedMoviesCast,setSortedMoviesCast] = useState([])
  const [sortedMoviesCrew,setSortedMoviesCrew] = useState([])

  useEffect(() => {
    if(movies && movies.cast){
      setSortedMoviesCast(movies.cast.sort((a, b) => b.popularity - a.popularity))
      console.log(sortedMoviesCast)
    }
    if(movies && movies.crew){
      setSortedMoviesCrew(movies.crew.sort((a, b) => b.popularity - a.popularity))
      console.log(sortedMoviesCrew)
    }
  },[movies])

  return (
    <div>

      {console.log("details",details)}
      {console.log("images",images)}
      {console.log("movies",movies)}

      <div className="blackBG"></div>
        <Nav></Nav>

      <div className="centerPage white mons">
        
        <div className="profileAreaProfilePage">
          {details.profile_path && <img src={`https://image.tmdb.org/t/p/original/${details.profile_path}`}/>}  
          <div className="righActorArea">
            <div className="actorName">
              {details.name}
            </div>
            <div className="actorOverview">
              {details.biography}
            </div>
          </div>
        </div>

      </div>

      <div className="actorCenter white mons">
        <h1>Cast</h1>
        <div className="actorMovieArea">
          {sortedMoviesCast && sortedMoviesCast.map(el => {
            return (
              <div className='actorMovieItem' onClick={() => navigate(`/movie/${el.id}`)}>
                {el.poster_path && <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}/>} 
                <div className="actorMovieHover">
                    <div>
                      {el.title}
                    </div>
                    <div className='year'>
                      ({el.release_date && el.release_date.split("-")[0]})
                    </div>
                </div> 
              </div>
            )
          })}
        </div>

        <h1>Crew</h1>
        <div className="actorMovieArea">
          {sortedMoviesCrew && sortedMoviesCrew.map(el => {
            return (
              <div className='actorMovieItem' onClick={() => navigate(`/movie/${el.id}`)}>
                {el.poster_path && <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}/>} 
                <div className="actorMovieHover">
                    <div>
                      {el.title}
                    </div>
                    <div className='year'>
                      ({el.release_date && el.release_date.split("-")[0]})
                    </div>
                </div> 
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Person