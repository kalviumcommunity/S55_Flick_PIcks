import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import image1 from '../../assets/profile.png'
import upload from '../../assets/upload.png'
import close from '../../assets/close.png'
import axios from 'axios'
import add from '../../assets/add.png'
import search from '../../assets/search.png'
import luka from '../../assets/luka.png'
import pin from '../../assets/pin.png'
import { useNavigate } from 'react-router-dom'
import studio from '../../assets/studio.png'
import search2 from '../../assets/image.png'
import logout from '../../assets/logout.png'

function EditProfile() {

  const [loading,setLoading] = useState(true)

    async function getUserInfoForNav(){
        const ID = localStorage.getItem('userID')
        const res = axios.get(`https://studio-backend-alpha.vercel.app/userByID/${ID}`)
        .then(res => {
            navigate(`/user/${res.data.username}`)
        })
        .catch(err => console.log(err))
    }

    const navigate = useNavigate()
    
    const dummyArray = [0, 0, 0, 0]
    const dummyArray2 = [0]

    const [image, setImage] = useState()
    const [userData, setUserData] = useState()
    const [movieSearch, setMovieSearch] = useState(false)
    const [actorSearch, setActorSearch] = useState(false)
    const [directorSearch, setDirectorSearch] = useState(false)
    const [backdropSearch, setBackdropSearch] = useState(false)
    const [tvShowSearch, setTVShowSearch] = useState(false)

    const { username } = useParams()

    const getData = async () => {
        const res = await axios.get(`https://studio-backend-alpha.vercel.app/user/${username}`)
            .then(res => {
                setUserData(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [username])

    const convertToBase64 = (e) => {
        var read = new FileReader()
        read.readAsDataURL(e.target.files[0])
        read.onload = () => {
            setImage(read.result)
            setUserData((prevData) => ({
                ...prevData,
                profilePic: read.result
            }))
        }
        read.onerror = err => {
            console.log("You have an error ")
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const removeFilm = async (data) => {
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/removeFromFavMovies/${username}`, data)
            .then()
            .catch(err => console.log(err))
        getData()
    }

    const removeTVShow = async (data) => {
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/removeTVShow/${username}`, data)
            .then()
            .catch(err => console.log(err))
        getData()
    }

    const removeBackdrop = async () => {
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/rmBackdrop/${userData._id}`, {})
            .then()
            .catch(err => console.log(err))
        getData()
    }

    const removeActors = async (data) => {
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/removeFromFavActors/${username}`, data)
            .then()
            .catch(err => console.log(err))
        getData()
    }

    const removeDirectors = async (data) => {
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/removeFromFavDirectors/${username}`, data)
            .then()
            .catch(err => console.log(err))
        getData()
    }

    useEffect(() => {
        document.title = 'Edit Profile'
    }, [])

    const [movieResults, setMovieResults] = useState()
    const [castResults, setCastResults] = useState()
    const [searchInput, setSearchInput] = useState()
    const [tvShowResults, setTVShowResults] = useState()

    const MOVIE_URL = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&page=1`
    const CAST_URL = `https://api.themoviedb.org/3/search/person?query=${searchInput}&include_adult=false&language=en-US&page=1`
    const SHOW_URL = `https://api.themoviedb.org/3/search/tv?query=${searchInput}&include_adult=false&language=en-US&page=1`

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
                console.error(error);
            });
    }

    useEffect(() => {

        axios_request(MOVIE_URL, setMovieResults)
        axios_request(CAST_URL, setCastResults)
        axios_request(SHOW_URL, setTVShowResults)

    }, [searchInput])

    const [showTiles,setShowTiles] = useState(false)

    const handlePress = (event) => {
        setSearchInput(event.target.value)
        if(event.target.value == ""){
            setShowTiles(false)
        }
        else{
            setShowTiles(true)
        }
    }

    const handleClick = () => {
        setSearchInput(event.target.value)
    }

    const pushToFav = async (data) => {
        setMovieSearch(false)
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/pushToFav/${username}`, data)
            .then(res => {
            })
            .catch(err => console.log(err))
        getData()
    }

    const pushToTVShow = async (data) => {
        setTVShowSearch(false)
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/pushTVShow/${username}`, data)
            .then(res => {
            })
            .catch(err => console.log(err))
        getData()
    }

    const pushToBackdrop = async (data) => {
        setBackdropSearch(false)
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/backdrop/${userData._id}`, data)
            .then(res => {
            })
            .catch(err => console.log(err))
        getData()
    }

    const pushToFavActor = async (data) => {
        setActorSearch(false)
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/pushToFavActors/${username}`, data)
            .then(res => {
            })
            .catch(err => console.log(err))
        getData()
    }

    const pushToFavDirectors = async (data) => {
        setDirectorSearch(false)
        const res = await axios.post(`https://studio-backend-alpha.vercel.app/pushToFavDirectors/${username}`, data)
            .then(res => {
            })
            .catch(err => console.log(err))
        getData()
    }

    const saveChanges = async () => {
        const res = await axios.put(`https://studio-backend-alpha.vercel.app/saveUserChanges/${username}`, userData)
            .then(res => {
                navigate(`/user/${username}`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
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
        </div> : <div className="editProfilePage white mons ">
                <div className="EditArea ">
                    {/* <div className="editImgArea">
                        <img src={image ? image : userData.profilePic} alt="" className='editProfileImg' />
                        <div className="editImgGradient">
                            <label >
                                <img src={upload} alt="" />
                            </label>
                            <input
                                id='fileInput'
                                type="file"
                                name='file'
                                accept='image/'
                                 onChange={convertToBase64} />
                        </div>
                    </div> */}

                    <div className="userInfoArea1">
                        <div className="profilePicArea1">
                            <img src={image ? image : userData.profilePic} />
                        </div>
                        <img src={pin} className='pin' />
                        <div className="editImgGradient1">
                            <label >
                                <img src={upload} alt="" />
                            </label>
                            <input
                                id='fileInput'
                                type="file"
                                name='file'
                                accept='image/'
                                onChange={convertToBase64} />
                        </div>
                    </div>


                    <div className="df">
                        <div>

                            <div className="editInputArea">
                                <label htmlFor="Name">NAME</label>
                                <input name='name' value={userData.name} type="text" onChange={handleInputChange} />
                            </div>

                            <div className="editInputArea">
                                <label htmlFor="Username">USERNAME</label>
                                <input disabled value={userData.username} type="text" />
                            </div>
                        </div>
                        <div>
                            <div className="editInputArea">
                                <label htmlFor="Username">BIO</label>
                                <textarea name='bio' value={userData.bio} id='bioInput' type="textarea" onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            BACKDROP FILM
                        </label>
                        <hr style={{width : "100%"}}/>

                        <div className="fourFavs">
                            {userData &&  dummyArray2.map((el, index) => {
                                if (userData.backdrop) {
                                    return <div className="editFavs" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original/${userData.backdrop.poster_path}`} alt="" />
                                        <div className="editUserImgGradient">
                                            {userData.backdrop.title}
                                            <br />
                                            ({userData.backdrop.release_date && userData.backdrop.release_date.split("-")[0]})
                                        </div>
                                        <div className="movieDelete" onClick={() => removeBackdrop()}>
                                            <img src={close} alt="" />
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div className="extraFav" onClick={() => setBackdropSearch(true)}>
                                        <img src={add} alt="" />
                                    </div>
                                }
                            })}
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            FAVORITE FILMS
                        </label>
                        <hr />

                        <div className="fourFavs">
                            {userData && userData.favourites.movies && dummyArray.map((el, index) => {
                                if (userData.favourites.movies[index]) {
                                    return <div className="editFavs" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original/${userData.favourites.movies[index].poster_path}`} alt="" />
                                        <div className="editUserImgGradient">
                                            {userData.favourites.movies[index].title}
                                            <br />
                                            ({userData.favourites.movies[index].release_date && userData.favourites.movies[index].release_date.split("-")[0]})
                                        </div>
                                        <div className="movieDelete" onClick={() => removeFilm(userData.favourites.movies[index])}>
                                            <img src={close} alt="" />
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div className="extraFav" onClick={() => {setMovieSearch(true) 
                                    setSearchInput("noresultsfound")}}>
                                        <img src={add} alt="" />
                                    </div>
                                }
                            })}
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            FAVORITE TV SHOWS
                        </label>
                        <hr />

                        <div className="fourFavs">
                            {userData && userData.favourites && dummyArray.map((el, index) => {
                                if (userData.favourites.tvshow[index]) {
                                    return <div className="editFavs" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original/${userData.favourites.tvshow[index].poster_path}`} alt="" />
                                        <div className="editUserImgGradient">
                                            {userData.favourites.tvshow[index].name}
                                        </div>
                                        <div className="movieDelete" onClick={() => removeTVShow(userData.favourites.tvshow[index])}>
                                            <img src={close} alt="" />
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div className="extraFav" onClick={() => {
                                        setTVShowSearch(true) 
                                        setSearchInput("noresultsfound")
                                    }}>
                                        <img src={add} alt="" />
                                    </div>
                                }
                            })}
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            FAVORITE ACTORS
                        </label>
                        <hr />

                        <div className="fourFavs">
                            {userData && userData.favourites.actors && dummyArray.map((el, index) => {
                                if (userData.favourites.actors[index]) {
                                    return <div className="editFavs" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original/${userData.favourites.actors[index].profile_path}`} alt="" />
                                        <div className="editUserImgGradient">
                                            {userData.favourites.actors[index].name}
                                        </div>
                                        <div className="movieDelete" onClick={() => removeActors(userData.favourites.actors[index])}>
                                            <img src={close} alt="" />
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div className="extraFav" onClick={() => setActorSearch(true)}>
                                        <img src={add} alt="" />
                                    </div>
                                }
                            })}
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            FAVORITE DIRECTORS
                        </label>
                        <hr />

                        <div className="fourFavs">
                            {userData && userData.favourites.directors && dummyArray.map((el, index) => {
                                if (userData.favourites.directors[index]) {
                                    return <div className="editFavs" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original/${userData.favourites.directors[index].profile_path}`} alt="" />
                                        <div className="editUserImgGradient">
                                            {userData.favourites.directors[index].name}
                                        </div>
                                        <div className="movieDelete" onClick={() => removeDirectors(userData.favourites.directors[index])}>
                                            <img src={close} alt="" />
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div className="extraFav" onClick={() => setDirectorSearch(true)}>
                                        <img src={add} alt="" />
                                    </div>
                                }
                            })}
                        </div>
                    </div>

                    <div className="saveChangesArea">
                        <button onClick={saveChanges} className='hoverCursor'>
                            SAVE CHANGES
                        </button>
                    </div>
                </div>
            </div>}

            {(actorSearch || movieSearch || directorSearch || backdropSearch || tvShowSearch) && <div className="addFavFilm white mons">
                <div className="addFilmToFav">
                    <div className="searchAreaFav">
                        <div className="searchIconFav" onClick={handleClick}>
                            <img src={search} />
                        </div>
                        <input type="text" onChange={(event) => handlePress(event)} />
                    </div>

                    {movieSearch && <div className="FavSearchResults">
                        <h3>MOVIES</h3>
                        <hr className='red' />

                        {movieResults && movieResults.results && movieResults.results.map((el,index) => {
                            return <div className='favMovieAddResult' key={index} onClick={() => pushToFav(el)}>
                                <h3>{el.title} ({el.release_date && el.release_date.split("-")[0]})
                                </h3>
                            </div>
                        })}

                    </div>}

                    {showTiles && backdropSearch && <div className="FavSearchResults">
                        <h3>MOVIES</h3>
                        <hr className='red' />

                        {movieResults && movieResults.results && movieResults.results.map((el,index) => {
                            return <div className='favMovieAddResult' key={index} onClick={() => pushToBackdrop(el)}>
                                <h3>{el.title} ({el.release_date && el.release_date.split("-")[0]})
                                </h3>
                            </div>
                        })}

                    </div>}

                    {showTiles && tvShowSearch && <div className="FavSearchResults">
                        <h3>TV SHOWS</h3>
                        <hr className='red' />

                        {tvShowResults && tvShowResults.results && tvShowResults.results.map((el,index) => {
                            return <div className='favMovieAddResult' key={index} onClick={() => pushToTVShow(el)}>
                                <h3>{el.name} 
                                </h3>
                            </div>
                        })}

                    </div>}

                    {showTiles && actorSearch && <div className="FavSearchResults">
                        <h3>ACTOR</h3>
                        <hr className='red' />

                        {castResults && castResults.results && castResults.results.map((el,index) => {
                            return <div className='favMovieAddResult' key={index} onClick={() => pushToFavActor(el)}>
                                <h3>{el.name}</h3>
                            </div>
                        })}

                    </div>}

                    {showTiles && directorSearch && <div className="FavSearchResults">
                        <h3>DIRECTOR</h3>
                        <hr className='red' />

                        {castResults && castResults.results && castResults.results.map((el,index) => {
                            return <div className='favMovieAddResult' key={index} onClick={() => pushToFavDirectors(el)}>
                                <h3>{el.name}</h3>
                            </div>
                        })}

                    </div>}


                    <img src={close} alt="" className="AddFavClose" onClick={() => {
                        setMovieSearch(false)
                        setActorSearch(false)
                        setDirectorSearch(false)
                        setTVShowSearch(false)
                    }} />
                </div>
            </div>}
        </div>
    )
}

export default EditProfile