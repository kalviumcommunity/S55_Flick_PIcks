import React from 'react'
import './Person.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Nav from '../nav/Nav';
import studio from '../../assets/studio.png'
import search from '../../assets/image.png'

function Person() {

  const navigate = useNavigate()

  const { id } = useParams()

  console.log("id", id)

  const [details, setDetails] = useState([])
  const [images, setImages] = useState([])
  const [movies, setMovies] = useState([])
  const [show, setShow] = useState([])

  const DETAILS_URL = `https://api.themoviedb.org/3/person/${id}?language=en-US`
  const IMAGES_URL = `https://api.themoviedb.org/3/person/${id}/images`
  const MOVIES_URL = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=en-US`
  const SHOW_URL = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=en-US`

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

    axios_request(DETAILS_URL, setDetails)
    axios_request(IMAGES_URL, setImages)
    axios_request(MOVIES_URL, setMovies)
    axios_request(SHOW_URL, setShow)

  }, [id])

  const [sortedMoviesCast, setSortedMoviesCast] = useState([])
  const [sortedMoviesCrew, setSortedMoviesCrew] = useState([])

  const [jobs, setJobs] = useState([])
  const [tvJobs, setTvJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState('')
  const [tvSelectedJob, setTvSelectedJob] = useState('')
  const [filteredMovies, setFileteredMovies] = useState()
  const [filteredTv, setFilteredTv] = useState('')
  const [showMovie, setShowMovie] = useState(true)

  useEffect(() => {
    if (movies && movies.cast) {
      setSortedMoviesCast(movies.cast.sort((a, b) => b.popularity - a.popularity))
      console.log(sortedMoviesCast)
    }
    if (movies && movies.crew) {
      setSortedMoviesCrew(movies.crew.sort((a, b) => b.popularity - a.popularity))
      console.log(sortedMoviesCrew)
    }
    if (movies.crew) {
      setJobs([...new Set(movies.crew.map(movie => movie.job))])
    }
  }, [movies])

  useEffect(() => {
    if (show.crew) {
      setTvJobs([...new Set(show.crew.map(movie => movie.job))])
    }
  }, [show])

  useEffect(() => {
    if (movies.crew) {
      setFileteredMovies(movies.crew.filter(movie => movie.job === selectedJob))
    }
  }, [selectedJob])

  useEffect(() => {
    if (show.crew) {
      setFilteredTv(show.crew.filter(movie => movie.job === tvSelectedJob))
    }
  }, [tvSelectedJob])

  return (
    <div>
      <nav className='white mons'>
            <div className="nav55">
                <img src={studio} alt="" className="logoImg" />
            <div className="navList">
                <div className="navLI">MOVIES</div>
                <div className="navLIS" onClick={() => navigate('/tvrecs')}>TV SHOWS</div>
                <div className="navLIS">USERS</div>
                {localStorage.getItem('userID') && <div className="navLIS">PROFILE</div>}
                <div className="navLIS" onClick={() => navigate('/search')}><img src={search} alt="" /></div>
            </div>
            </div>
        </nav>  
      {console.log("movies", movies)}

      <div className="blackBG"></div>

      <div className="centerPage white mons">
        <div className="profileAreaProfilePage">
          {details.profile_path && <img src={`https://image.tmdb.org/t/p/original/${details.profile_path}`} />}
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

      <div className="centerPerson white mons">

        <div className="anotherAnotherPersonDiv">
          <div className="optionBoxAreaPerson2">
            <div className={showMovie ? "optionBoxSelectedPerson" : "optionBoxPerson"} onClick={() => setShowMovie(true)}>MOVIES</div>
            <div className={!showMovie ? "optionBoxSelectedPerson" : "optionBoxPerson"} onClick={() => setShowMovie(false)}>TV SHOWS</div>
          </div>

          {showMovie && <div className="anotherPersonDiv">

            {jobs && <div className="optionBoxAreaPerson scrollbar">
              <div className={!selectedJob ? "optionBoxSelectedPerson" : "optionBoxPerson"} onClick={() => setSelectedJob('')}>ACTOR</div>
              {jobs.map(job => (
                <div
                  key={job}
                  className={selectedJob === job ? "optionBoxSelectedPerson" : "optionBoxPerson"}
                  onClick={() => setSelectedJob(job)}
                >
                  {job.toUpperCase()}
                </div>
              ))}
            </div>}

            {/* <hr /> */}

            <div className='personGrid'>

              {jobs && selectedJob == '' && movies && movies.cast && movies.cast.map((el, index) => {
                return <div className="container" key={index} onClick={() => navigate(`/movie/${el.id}`)}>
                  {el.poster_path ? <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image' />
                    : <div className='personPosterNa'>NA</div>}                  <div className="overlay">

                    {el.title}
                    <br />
                    ({el.release_date && el.release_date.split("-")[0]})
                  </div>

                </div>
              })}

              {selectedJob != '' && filteredMovies && filteredMovies.map((el, index) => {
                return <div className="container" key={index} onClick={() => navigate(`/movie/${el.id}`)}>
                  {el.poster_path ? <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image' />
                    : <div className='personPosterNa'>NA</div>}                  <div className="overlay">

                    {el.title}
                    <br />
                    ({el.release_date && el.release_date.split("-")[0]})
                  </div>

                </div>
              })}
            </div>


          </div>}


          {!showMovie && <div className="anotherPersonDiv">

            {tvJobs && <div className="optionBoxAreaPerson scrollbar">
              <div className={!tvSelectedJob ? "optionBoxSelectedPerson" : "optionBoxPerson"} onClick={() => setTvSelectedJob('')}>ACTOR</div>
              {tvJobs.map(job => (
                <div
                  key={job}
                  className={tvSelectedJob === job ? "optionBoxSelectedPerson" : "optionBoxPerson"}
                  onClick={() => setTvSelectedJob(job)}
                >
                  {job.toUpperCase()}
                </div>
              ))}
            </div>}

            {/* <hr /> */}

            <div className='personGrid'>

              {tvJobs && tvSelectedJob == '' && show && show.cast && show.cast.map((el, index) => {
                return <div className="container" key={index} onClick={() => navigate(`/tvshow/${el.id}`)}>
                  {el.poster_path ? <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image' />
                    : <div className='personPosterNa'>NA</div>}
                  <div className="overlay">
                    {el.name}
                  </div>

                </div>
              })}

              {tvSelectedJob != '' && filteredTv && filteredTv.map((el, index) => {
                return <div className="container" key={index} onClick={() => navigate(`/tvshow/${el.id}`)}>
                  {el.poster_path ? <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image' />
                    : <div className='personPosterNa'>NA</div>}                  <div className="overlay">
                    {el.name}
                  </div>

                </div>
              })}
            </div>

          </div>}
        </div>

      </div>
    </div>
  )
}

export default Person