import React, { useEffect, useState } from 'react'
import './Search.css'
import axios from 'axios'

function Search() {

  const [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState([])
  const [details, setDetails] = useState({})
  const [id, setid] = useState('')

  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjYxNmNlYTAzZmFiNTU0YWM1NGEyZTdlMWE4YzIwMiIsInN1YiI6IjY1ZjI4Y2MxMmZkZWM2MDE4OTIzM2E4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eccxvzxCctqBTZ8lXeSUHgTBcc5r17hhsNLVy845QA4'
    }
  };

  axios
    .request(options)
    .then(function (response) {
      setResults(response.data.results)
    })
    .catch(function (error) {
      console.error(error);
    });

  useEffect(() => {
    console.log(searchInput)
    console.log("RES", results.results)
  }, [searchInput])




  const add = (pass) => {

    const options2 = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${pass}?language=en-US`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjYxNmNlYTAzZmFiNTU0YWM1NGEyZTdlMWE4YzIwMiIsInN1YiI6IjY1ZjI4Y2MxMmZkZWM2MDE4OTIzM2E4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.eccxvzxCctqBTZ8lXeSUHgTBcc5r17hhsNLVy845QA4'
      }
    };
    axios
      .request(options2)
      .then(function (response) {
        setDetails(response.data)
        handleAxiosPost(response.data)
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  const handleAxiosPost = (details) => {
    console.log("detaild are", details)
    const res = axios.post(`http://localhost:3000/add`, details)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  const handlePress = (event) => {
    if(event.key == 'Enter'){
      setSearchInput(event.target.value)
    }
  }

  return (
    <div className='search mons'>
      <div className="bgBlack"></div>
      <input type="text" onKeyDown={(event) => handlePress(event)} />

      <div className="result">
        {results && results.map((el, index) => {
          if (index < 12) {
            return <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} onClick={() => add(el.id)} />
          }
        })}
      </div>
    </div>
  )
}

export default Search