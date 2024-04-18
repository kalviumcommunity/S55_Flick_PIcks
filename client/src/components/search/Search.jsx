import React, { useEffect, useState } from 'react'
import './Search.css'
import axios from 'axios'

import search from '../../assets/search.png'

function Search() {

  const [results, setResults] = useState([])
  const [searchInput, setSearchInput] = useState([])

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
    console.log(results)
  }, [results])

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

      <div className="result">
        {results && results.map((el, index) => {
          if (index < 12) {
            // return <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`} onClick={() => add(el.id)} />
            return <div className="searchResults white">
                      <img src={`https://image.tmdb.org/t/p/original/${el.poster_path}`}/>
                      <div className="searchRow">

                      <div className="searchTitle">{el.title}<span>({el.release_date.split("-")[0]})</span></div>
                      <div className="searchDesc scrollbar">{el.overview}</div>
                      </div>
                    </div>
          }

          
        })}
      </div>
    </div>
  )
}

export default Search