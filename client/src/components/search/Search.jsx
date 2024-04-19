import React, { useEffect, useState } from 'react'
import './Search.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import search from '../../assets/search.png'

function Search() {

  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState([])

  const [onMovie,setOnMovie] = useState(true)

  const [movieResults,setMovieResults] = useState()
  const [castResults,setCastResults] = useState()

  const MOVIE_URL = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
  const CAST_URL = `https://api.themoviedb.org/3/search/person?query=${searchInput}&include_adult=false&language=en-US&page=1`

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
        console.log(response.data)
        location(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {

    axios_request(MOVIE_URL, setMovieResults)
    axios_request(CAST_URL, setCastResults)

    console.log(searchInput)

  }, [searchInput])

  const handlePress = (event) => {
    if(event.key == 'Enter'){
      setSearchInput(event.target.value)
    }
  }

  const handleClick = () => {
      setSearchInput(event.target.value)
  }

  return (
    <div className='search mons'>
      <div className="bgBlack"></div>
      <div className="searchArea">

      <input type="text" onKeyDown={(event) => handlePress(event)} />
      <div className="searchIcon" onClick={handleClick}>
        <img src={search}/>
      </div>
      </div>

      <div className="movieButtonsArea">
        <button className={onMovie ? "selectedMovieButton" : "MovieButton"} onClick={() => setOnMovie(!onMovie)}>MOVIE</button>
        <button className={!onMovie ? "selectedMovieButton" : "MovieButton"} onClick={() => setOnMovie(!onMovie)}>CAST & CREW</button>
      </div>

      {onMovie && <div className="result">
        {movieResults && movieResults.results.map((el, index) => {
            return <div className="searchResults white" onClick={() => navigate(`/movie/${el.id}`)}>
                      <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}/>
                      <div className="searchRow">

                      <div className="searchTitle">{el.title}<span>({el.release_date.split("-")[0]})</span></div>
                      <div className="searchDesc scrollbar">{el.overview}</div>
                      </div>
                    </div>
        })}
      </div>}
      {!onMovie && <div className="castResult">
        {console.log("CR",castResults)}
        {castResults && castResults.results.map((el, index) => {
            return <div className="castSearchResults white" onClick={() => navigate(`/person/${el.id}`)}>
                      <img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`}/>
                      <div className="searchRow">

                      <div className="searchTitle">{el.name}</div>
                      <div className="castKnownFor"><span>Known for - </span>{el.known_for_department}</div>
                      {/* <div className="castKnownFor"><span>Famous works - </span>{el.known_for.map(ell => {
                        return <div>{ell.title}<br/></div>
                      })}
                      </div> */}
                      </div>
                    </div>
        })}
      </div>}
    </div>
  )
}

export default Search