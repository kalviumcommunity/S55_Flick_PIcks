import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import image1 from '../../assets/profile.png'
import upload from '../../assets/upload.png'
import close from '../../assets/close.png'
import axios from 'axios'
import add from '../../assets/add.png'
import search from '../../assets/search.png'

function EditProfile() {

    const dummyArray = [0, 0, 0, 0]

    const [image, setImage] = useState()
    const [userData, setUserData] = useState()
    const [movieSearch, setMovieSearch] = useState(false)
    const [actorSearch, setActorSearch] = useState(false)
    const [directorSearch, setDirectorSearch] = useState(false)

    const { username } = useParams()

    console.log("USERNAME IS", username)

    const getData = async () => {
        const res = await axios.get(`http://localhost:3000/user/${username}`)
            .then(res => {
                console.log("res is", res.data)
                setUserData(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getData()
    }, [username])

    const convertToBase64 = (e) => {
        console.log(e)

        var read = new FileReader()
        read.readAsDataURL(e.target.files[0])
        read.onload = () => {
            console.log(read.result)
            setImage(read.result)
            setUserData((prevData) => ({
                ...prevData,
                profilePic: read.result
            }))
        }
        read.onerror = err => {
            console.log("You have an error ", err)
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
        const res = await axios.post(`http://localhost:3000/removeFromFavMovies/${username}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        getData()
    }

    const removeActors = async (data) => {
        const res = await axios.post(`http://localhost:3000/removeFromFavActors/${username}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        getData()
    }

    const removeDirectors = async (data) => {
        const res = await axios.post(`http://localhost:3000/removeFromFavDirectors/${username}`, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        getData()
    }

    const [movieResults, setMovieResults] = useState()
    const [castResults, setCastResults] = useState()
    const [searchInput, setSearchInput] = useState()

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
        if (event.key == 'Enter') {
            setSearchInput(event.target.value)
        }
    }

    const handleClick = () => {
        setSearchInput(event.target.value)
    }

    const pushToFav = async (data) => {
        const res = await axios.post(`http://localhost:3000/pushToFav/${username}`, data)
            .then(res => {
                console.log("res is", res.data)
                setMovieSearch(false)
            })
            .catch(err => console.log(err))
        getData()
    }

    const pushToFavActor = async (data) => {
        const res = await axios.post(`http://localhost:3000/pushToFavActors/${username}`, data)
            .then(res => {
                console.log("res is", res.data)
                setActorSearch(false)
            })
            .catch(err => console.log(err))
        getData()
    }

    const pushToFavDirectors = async (data) => {
        const res = await axios.post(`http://localhost:3000/pushToFavDirectors/${username}`, data)
            .then(res => {
                console.log("res is", res.data)
                setDirectorSearch(false)
            })
            .catch(err => console.log(err))
        getData()
    }

    const saveChanges = async() => {
        const res = await axios.put(`http://localhost:3000/saveUserChanges/${username}`,userData)
        .then(res => {
            console.log("save is ", res.data)
            console.log("sent data is ",userData)
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            {userData && <div className="editProfilePage white mons">
                <div className="EditArea">
                    <div className="editImgArea">
                        <img src={image ? image : userData.profilePic} alt="" className='editProfileImg' />
                        <div className="editImgGradient">
                            <label htmlFor="fileInput">
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
                            FAVORITE FILMS
                        </label>
                        <hr />

                        <div className="fourFavs">
                            {userData && userData.favourites.movies && dummyArray.map((el, index) => {
                                if (userData.favourites.movies[index]) {
                                    return <div className="editFavs">
                                        <img src={`https://image.tmdb.org/t/p/original/${userData.favourites.movies[index].poster_path}`} alt="" />
                                        <div className="editUserImgGradient">
                                            {userData.favourites.movies[index].title}
                                            <br />
                                            ({userData.favourites.movies[index].release_date.split("-")[0]})
                                        </div>
                                        <div className="movieDelete" onClick={() => removeFilm(userData.favourites.movies[index])}>
                                            <img src={close} alt="" />
                                        </div>
                                    </div>
                                }
                                else {
                                    return <div className="extraFav" onClick={() => setMovieSearch(true)}>
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
                                    return <div className="editFavs">
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
                                    return <div className="editFavs">
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
                        <button  onClick={saveChanges} className='hoverCursor'>
                            SAVE CHANGES
                        </button>
                    </div>
                </div>
            </div>}

            {(actorSearch || movieSearch || directorSearch) && <div className="addFavFilm white mons">
                <div className="addFilmToFav">
                    <div className="searchAreaFav">
                        <input type="text" onKeyDown={(event) => handlePress(event)} />
                        <div className="searchIconFav" onClick={handleClick}>
                            <img src={search} />
                        </div>
                    </div>

                    {movieSearch && <div className="FavSearchResults">
                        <h3>MOVIES</h3>
                        <hr className='red' />

                        {movieResults && movieResults.results && movieResults.results.map(el => {
                            return <div className='favMovieAddResult' onClick={() => pushToFav(el)}>
                                <h3>{el.title} ({el.release_date.split("-")[0]})
                                </h3>
                            </div>
                        })}

                    </div>}

                    {actorSearch && <div className="FavSearchResults">
                        <h3>ACTOR</h3>
                        <hr className='red' />

                        {castResults && castResults.results && castResults.results.map(el => {
                            return <div className='favMovieAddResult' onClick={() => pushToFavActor(el)}>
                                <h3>{el.name}</h3>
                            </div>
                        })}

                    </div>}

                    {directorSearch && <div className="FavSearchResults">
                        <h3>DIRECTOR</h3>
                        <hr className='red' />

                        {castResults && castResults.results && castResults.results.map(el => {
                            return <div className='favMovieAddResult' onClick={() => pushToFavDirectors(el)}>
                                <h3>{el.name}</h3>
                            </div>
                        })}

                    </div>}
                    <img src={close} alt="" className="AddFavClose" onClick={() => {
                        setMovieSearch(false)
                        setActorSearch(false)
                        setDirectorSearch(false)
                    }} />
                </div>
            </div>}
        </div>
    )
}

export default EditProfile