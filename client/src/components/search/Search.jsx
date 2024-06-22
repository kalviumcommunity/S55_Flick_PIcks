import React, { useEffect, useState } from 'react'
import './Search.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import search from '../../assets/search.png'
import user from '../../assets/user.png'

function Search() {

  const navigate = useNavigate()

  const [searchInput, setSearchInput] = useState("")

  const [onMovie, setOnMovie] = useState("movie")

  const [movieResults, setMovieResults] = useState()
  const [castResults, setCastResults] = useState()
  const [showResults, setShowResults] = useState()

  const [popularCastResults, setPopularCastResults] = useState()
  const [popularMovieResults, setPopularMovieResults] = useState()
  const [popularShowResults, setPopularShowResults] = useState()

  const [TvShow, setTvShow] = useState()

  const [showPopular, setShowPopular] = useState(true)

  const MOVIE_URL = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
  const CAST_URL = `https://api.themoviedb.org/3/search/person?query=${searchInput}&include_adult=false&language=en-US&page=1`
  const SHOW_URL = `https://api.themoviedb.org/3/search/tv?query=${searchInput}&include_adult=false&language=en-US&page=1`

  const POPULARCAST_URL = `https://api.themoviedb.org/3/person/popular?language=en-US&page=1`
  const POPULARMOVIE_URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
  const POPULARSHOW_URL = `https://api.themoviedb.org/3/trending/tv/day?language=en-US`


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
        // console.log(response.data)
        location(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {

    axios_request(MOVIE_URL, setMovieResults)
    axios_request(CAST_URL, setCastResults)
    axios_request(SHOW_URL, setShowResults)

    axios_request(POPULARCAST_URL, setPopularCastResults)
    axios_request(POPULARMOVIE_URL, setPopularMovieResults)
    axios_request(POPULARSHOW_URL, setPopularShowResults)

  }, [searchInput])



  useEffect(() => {
    if (searchInput == "") {
      setShowPopular(true)
    }
    else {
      setShowPopular(false)
    }
  }, [searchInput])

  const handlePress = (event) => {
    setSearchInput(event.target.value)
  }

  const handleClick = () => {
    setSearchInput(event.target.value)
  }

  const filterUsers = () => {
    return users.filter(user =>
      user.username.toLowerCase().includes(searchInput.toLowerCase())
    );
  };

  const [users, setUsers] = useState([])

  async function getData() {
    const res = await axios.get(`http://localhost:3000/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='search mons'>
      <div className="bgBlack"></div>
      <div className="searchArea">
        <div className="searchIcon" onClick={handleClick}>
          <img src={search} />
        </div>

        <input type="text" onChange={(event) => handlePress(event)} />
      </div>

      <div className="movieButtonsArea">
        <button className={onMovie == "movie" ? "selectedMovieButton" : "MovieButton"} onClick={() => setOnMovie("movie")}>MOVIE</button>
        <button className={onMovie == "tvshow" ? "selectedMovieButton" : "MovieButton"} onClick={() => setOnMovie("tvshow")}>TV SHOW</button>
        <button className={onMovie == "cast" ? "selectedMovieButton" : "MovieButton"} onClick={() => setOnMovie("cast")}>CAST & CREW</button>
        <button className={onMovie == "users" ? "selectedMovieButton" : "MovieButton"} onClick={() => setOnMovie("users")}>USERS</button>
      </div>

      {!showPopular && onMovie == "movie" && <div className="result">
        {movieResults && onMovie == "movie" && movieResults.results && movieResults.results.map((el, index) => {
          return <div className="searchResults white" onClick={() => navigate(`/movie/${el.id}`)}>
            <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} />
            <div className="searchRow">
              <div className='searchYear'>
                <div className="searchTitle">{el.title}</div><span>({el.release_date.split("-")[0]})</span>
              </div>
              <div className="searchDesc scrollbar">{el.overview}</div>
            </div>
          </div>
        })}
      </div>}
      {showPopular && onMovie == "movie" && <div className="result">
        {popularMovieResults && onMovie == "movie" && popularMovieResults.results && popularMovieResults.results.map((el, index) => {
          return <div className="searchResults white" onClick={() => navigate(`/movie/${el.id}`)}>
            <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} />
            <div className="searchRow">
              <div className='searchYear'>
                <div className="searchTitle">{el.title}</div><span>({el.release_date.split("-")[0]})</span>
              </div>
              <div className="searchDesc scrollbar">{el.overview}</div>
            </div>
          </div>
        })}
      </div>}


      {!showPopular && onMovie == "tvshow" && <div className="result">
        {showResults && onMovie == "tvshow" && showResults.results && showResults.results.map((el, index) => {
          return <div className="searchResults white" onClick={() => navigate(`/tvshow/${el.id}`)}>
            <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} />
            <div className="searchRow">
              <div className='searchYear'>
                <div className="searchTitle">{el.name}</div>
                {/* <span>({el.release_date.split("-")[0]})</span> */}
              </div>
              <div className="searchDesc scrollbar">{el.overview}</div>
            </div>
          </div>
        })}
      </div>}
      {showPopular && onMovie == "tvshow" && <div className="result">
        {popularShowResults && onMovie == "tvshow" && popularShowResults.results && popularShowResults.results.map((el, index) => {
          return <div className="searchResults white" onClick={() => navigate(`/tvshow/${el.id}`)}>
            <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} />
            <div className="searchRow">
              <div className='searchYear'>
                <div className="searchTitle">{el.name}</div>
                {/* <span>({el.release_date.split("-")[0]})</span> */}
              </div>
              <div className="searchDesc scrollbar">{el.overview}</div>
            </div>
          </div>
        })}
      </div>}



      {!showPopular && onMovie == "cast" && <div className="castResult">
        {castResults && onMovie == "cast" && castResults.results && castResults.results.map((el, index) => {
          return <div className="castSearchResults white" onClick={() => navigate(`/person/${el.id}`)}>
            {el.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} />
              : <div className='castNotFound'><img src={user} />
              </div>}
            <div className="searchRow">

              <div className="searchTitleCast">{el.name}</div>
              <div className="castKnownFor"><span>Known for - </span>{el.known_for_department}</div>
            </div>
          </div>
        })}
      </div>}
      {showPopular && onMovie == "cast" && <div className="castResult">
        {popularCastResults && onMovie == "cast" && popularCastResults.results && popularCastResults.results.map((el, index) => {
          return <div className="castSearchResults white" onClick={() => navigate(`/person/${el.id}`)}>
            {el.profile_path ? <img src={`https://image.tmdb.org/t/p/original/${el.profile_path}`} />
              : <div className='castNotFound'><img src={user} />
              </div>}
            <div className="searchRow">

              <div className="searchTitleCast">{el.name}</div>
              <div className="castKnownFor"><span>Known for - </span>{el.known_for_department}</div>
            </div>
          </div>
        })}
      </div>}



      {showPopular && onMovie == "users" && <div className="castResult">
        {users && onMovie == "users" && users.map((el, index) => {
          return <div className="userSearchResults white" onClick={() => navigate(`/user/${el.username}`)}>
            {el.profilePic ? <div className='centerMid'><img src={el.profilePic} /></div>
              : <div className='userNotFound'><img src={user} />
              </div>}
            <div className="searchRow">

              <div className="searchTitleCast">{el.username}</div>
              <div className="userUsername">{el.name}</div>
              {/* <div className="castKnownFor"><span>Known for - </span>{el.known_for_department}</div> */}
            </div>
          </div>
        })}
      </div>}
      {!showPopular && onMovie == "users" && <div className="castResult">
        {users && onMovie == "users" && filterUsers().map((el, index) => {
          return <div className="userSearchResults white" onClick={() => navigate(`/user/${el.username}`)}>
            {el.profilePic ? <img src={el.profilePic} />
              : <div className='userNotFound'><img src={user} />
              </div>}
            <div className="searchRow">

              <div className="searchTitleCast">{el.username}</div>
              <div className="userUsername">{el.name}</div>
            </div>
          </div>
        })}
      </div>}
    </div>
  )
}

export default Search