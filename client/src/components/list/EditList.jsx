import React, { useEffect, useState } from 'react'
import './List.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import close from '../../assets/close.png'
import add from '../../assets/add.png'
import studio from '../../assets/studio.png'
import search2 from '../../assets/image.png'

import logout from '../../assets/logout.png'
import search from '../../assets/search.png'

function EditList() {

  const [loading,setLoading] = useState(true)

    const navigate = useNavigate()

    const { username } = useParams()
    const { listid } = useParams()
    const { category } = useParams()
    const ID = localStorage.getItem('userID')

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [showAddArea, setShowAddArea] = useState(false)
    const [data, setData] = useState([])
    const [searchInput, setSearchInput] = useState()

    async function getList() {
        const res = await axios.get(`https://studio-ejn1.onrender.com/getList/${ID}/${category}/${listid}`)
            .then(res => {
                setData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

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
                console.error(error)
            });
    }

    useEffect(() => {

        axios_request(MOVIE_URL, setMovieResults)
        axios_request(CAST_URL, setCastResults)
        axios_request(SHOW_URL, setTVShowResults)

    }, [searchInput])

    const [movieResults, setMovieResults] = useState()
    const [castResults, setCastResults] = useState()
    const [tvShowResults, setTVShowResults] = useState()

    useEffect(() => {
        getList()
    }, [])


    const MOVIE_URL = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
    const CAST_URL = `https://api.themoviedb.org/3/search/person?query=${searchInput}&include_adult=false&language=en-US&page=1`
    const SHOW_URL = `https://api.themoviedb.org/3/search/tv?query=${searchInput}&include_adult=false&language=en-US&page=1`

    function stringCap(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    const [showTiles, setShowTiles] = useState(false)

    const handlePress = (event) => {
        setSearchInput(event.target.value)
        if (event.target.value == "") {
            setShowTiles(false)
        }
        else {
            setShowTiles(true)
        }
    }

    const handleClick = () => {
        setSearchInput(event.target.value)
    }

    async function addMovie(dataToPass) {
        setShowAddArea(false)
        const res = axios.put(`https://studio-ejn1.onrender.com/addItemList/${ID}/${category}/${listid}`, dataToPass)
            .then(res => {
                getList()
            })
            .catch(err => console.log(err))
    }

    async function removeMovie(dataToRemove){
        const res = axios.put(`https://studio-ejn1.onrender.com/removeItem/${ID}/${category}/${listid}`, dataToRemove)
            .then(res => {
                getList()
            })
            .catch(err => console.log(err))
    }

    async function submitChanges(){
        if(title == ""){
            alert('Enter a title')
            return
        }
        const res = axios.put(`https://studio-ejn1.onrender.com/saveList/${ID}/${category}/${listid}`, {
            "title" : title,
            "description" : description
        })
            .then(res => {
                navigate(`/user/${username}/lists/${category}/${listid}`)
            })
            .catch(err => console.log(err))
    }



    useEffect(() => {
        setTitle(data.title);
        setDescription(data.description);
    }, [data.title, data.description]);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);

    async function getUserInfoForNav(){
        const ID = localStorage.getItem('userID')
        const res = axios.get(`https://studio-ejn1.onrender.com/userByID/${ID}`)
        .then(res => {
            navigate(`/user/${res.data.username}`)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        document.title = `${data.title}`
      }, [data])

    return (
        <>
        <nav className='white mons'>
                        <div className="nav55">
                            <img src={studio} alt="" className="logoImg" onClick={() => navigate('/')}/>
                            <div className="navList">
                                <div className="navLIS" onClick={() => navigate('/recs')}>MOVIES</div>
                                <div className="navLIS" onClick={() => navigate('/tvrecs')}>TV SHOWS</div>
                                <div className="navLIS" onClick={() => navigate('/users')}>USERS</div>
                                {localStorage.getItem('userID') && <div className="navLIS" onClick={() => getUserInfoForNav()}>PROFILE</div>}
                                <div className="navLIS" onClick={() => navigate('/search')}><img src={search2} alt="" /></div>
                                {localStorage.getItem('userID') && <div className="" onClick={() => {
                                    localStorage.setItem('userID', '')
                                    location.reload()
                                }}><img src={logout} className='logoutImg' /></div>}
                                {!localStorage.getItem('userID') && <div className="loginButtonNav" onClick={() => navigate('/login')}>LOGIN / SIGNUP</div>}
                            </div>
                        </div>
                    </nav>
                    {loading ? <div className="screenBlack">
            <div className="loader mt"></div>
        </div> : <div className="mainListArea white mons">
                <div className="mainList">
                    <div className="mainListTitleEdit">
                        <label htmlFor="title">Title</label>
                        <input type="text" placeholder='Enter a Title' value={title} onChange={handleTitleChange}/>
                    </div>
                    {category && <div className="mainListDetails">
                        <span className="mainListGray">Category : </span> {stringCap(category)}
                    </div>}
                    <div className="mainListDetails">
                        <span className="mainListGray">Created By : </span>
                        {data.createdBy && data.createdBy.profilePic && <img src={data.createdBy.profilePic} />}
                        {data.createdBy && data.createdBy.name}
                    </div>
                    <div className="mainListGrayEdit">
                        <label htmlFor="description">Description</label>
                        <textarea name="" placeholder='Enter a Description' value={description} onChange={handleDescriptionChange} ></textarea>
                    </div>
                    <hr className="mainListLine" />

                    <div className="userWatchedTile">
                        {category == "movies" && data.content && data.content.map((el, index) => {
                            return <div className="container" key={index}>
                                <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image' />
                                <div className="overlay">
                                    {el.title}
                                    <br />
                                    ({el.release_date && el.release_date.split("-")[0]})
                                </div>
                                <div className="movieDelete" onClick={() => removeMovie(el)}>
                                    <img src={close} alt="" />
                                </div>
                            </div>
                        })}
                        {category == "tvshows" && data.content && data.content.map((el, index) => {
                            return <div className="container" key={index}>
                                <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image' />
                                <div className="overlay">
                                    {el.name}
                                </div>
                                <div className="movieDelete" onClick={() => removeMovie(el)}>
                                    <img src={close} alt="" />
                                </div>
                            </div>
                        })}
                        {category == "cast" && data.content && data.content.map((el, index) => {
                            return <div className="container" key={index}>
                                <img src={`https://image.tmdb.org/t/p/original${el.profile_path}`} className='image' />
                                <div className="overlay">
                                    {el.name}
                                </div>
                                <div className="movieDelete" onClick={() => removeMovie(el)}>
                                    <img src={close} alt="" />
                                </div>
                            </div>
                        })}
                        <div className="extraListBlock" onClick={() => setShowAddArea(true)} >
                            <img src={add} alt="" />
                        </div>
                    </div>

                    <div className="saveListButtonArea" onClick={() => submitChanges()}>
                        <div className="saveListButton">SAVE CHANGES</div>
                    </div>

                </div>

                {showAddArea && <div className="addFavFilm white mons">
                    <div className="addFilmToFav">
                        <div className="searchAreaFav">
                            <div className="searchIconFav" onClick={handleClick}>
                                <img src={search} />
                            </div>
                            <input type="text" onChange={(event) => handlePress(event)} />
                        </div>

                        {category == "movies" && <div className="FavSearchResults">
                            <h3>MOVIES</h3>
                            <hr className='red' />

                            {showTiles && movieResults && movieResults.results && movieResults.results.map((el, index) => {
                                return <div className='favMovieAddResult' key={index} onClick={() => addMovie(el)}>
                                    <h3>{el.title} ({el.release_date && el.release_date.split("-")[0]})
                                    </h3>
                                </div>
                            })}

                        </div>}

                        {category == "tvshows" && <div className="FavSearchResults">
                            <h3>TV SHOWS</h3>
                            <hr className='red' />

                            {showTiles && tvShowResults && tvShowResults.results && tvShowResults.results.map((el, index) => {
                                return <div className='favMovieAddResult' key={index} onClick={() => addMovie(el)}>
                                    <h3>{el.name}
                                    </h3>
                                </div>
                            })}

                        </div>}

                        {category == "cast" && <div className="FavSearchResults">
                            <h3>CAST & CREW</h3>
                            <hr className='red' />

                            {showTiles && castResults && castResults.results && castResults.results.map((el, index) => {
                                return <div className='favMovieAddResult' key={index} onClick={() => addMovie(el)}>
                                    <h3>{el.name}</h3>
                                </div>
                            })}

                        </div>}


                        <img src={close} onClick={() => setShowAddArea(false)} className="AddFavClose" />
                    </div>
                </div>}

            </div>}
        </>
    )
}

export default EditList