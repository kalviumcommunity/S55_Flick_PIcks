import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import './Movie.css'
import Watchlist from '../../assets/watchlist.png'

function Movie() {

    const [data,setData] = useState([])
    const [cast,setCast] = useState([])

    useEffect(()=>{
        const options = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/15821?language=en-US',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjYxNmNlYTAzZmFiNTU0YWM1NGEyZTdlMWE4YzIwMiIsInN1YiI6IjY1ZjI4Y2MxMmZkZWM2MDE4OTIzM2E4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eccxvzxCctqBTZ8lXeSUHgTBcc5r17hhsNLVy845QA4'
            }
          };

          const cast = {
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/15821/credits?language=en-US',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjYxNmNlYTAzZmFiNTU0YWM1NGEyZTdlMWE4YzIwMiIsInN1YiI6IjY1ZjI4Y2MxMmZkZWM2MDE4OTIzM2E4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eccxvzxCctqBTZ8lXeSUHgTBcc5r17hhsNLVy845QA4'
            }
          };

          axios
            .request(cast)
            .then(function (response) {
              console.log(response.data);
              setCast(response.data)
            })
            .catch(function (error) {
              console.error(error);
            });
          
          axios
            .request(options)
            .then(function (response) {
              console.log(response.data);
              setData(response.data)
            })
            .catch(function (error) {
              console.error(error);
            });

    },[])


  return (
    <>
        <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}` }alt="" className='backdrop'  />  
        <div className="gradient">
          <div className="description">
            <div className="descArea mons white">
              <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}` } alt="poster" className="poster" />
              <div className="movieInfo">
                <div className="title">{data.original_title}</div>
                <div className="general">
                  <span>{data.release_date && data.release_date.split("-")[0]}</span>
                  <span>{data.runtime}M</span>
                  {
                    data.genres && data.genres.map((el,index) => {
                      if(index<3){
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
                  <img src={Watchlist} alt="watchlist logo" className='watchlist'/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="black mons">
          <h1 className='white cast'>
            Cast and Crew 
          </h1>
          <div className='profileArea'>
            {cast.cast && cast.cast.map((el,index) =>{
              if(index<6){
                return (
                  <div className='profile white'>
                    <img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} alt="profile"/>
                    <h2>{el.name}</h2>
                    <h3>{el.character}</h3>
                  </div>
                )
              }
             })}
          </div>
        </div>
    </>
  )
}

export default Movie