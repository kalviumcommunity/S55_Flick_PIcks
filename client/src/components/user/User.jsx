import React, { useEffect, useState } from 'react'
import './User.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import edit from '../../assets/edit.png'
import axios from 'axios'
import pin from '../../assets/pin.png'

import userTile from '../../assets/userTile.png'
import watchlistTile from '../../assets/watchlistTile.png'
import likedTile from '../../assets/likedTile.png'
import watchedTile from '../../assets/watchedTile.png'
import recommendedTile from '../../assets/recommendedTile.png'
import listTile from '../../assets/listTile.png'
import del from '../../assets/delete.png'

function User() {

    const RENDER_LINK = "https://s55-shaaz-capstone-flickpicks.onrender.com/"

    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"

    const { username } = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState()
    const [genre, setGenre] = useState("profile")
    const [mouseEnter, setMouseEnter] = useState(false)

    const getUserData = async () => {
        const res = await axios.get(`https://s55-shaaz-capstone-flickpicks.onrender.com/user/${username}`)
            .then(res => {
                setUserData(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserData()
    }, [username])

    const [selectedTile, setSelectedTile] = useState(0);

    const selectTile = (index) => {
        setSelectedTile(index);
    };

    async function delAccount(){
        const res = await axios.delete(`https://s55-shaaz-capstone-flickpicks.onrender.com/delete/${userData._id}`)
        .then(res => {
            if(res.status == 200){
                alert("User Deleted Succesfully")
                navigate('/recs')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            {userData && <div className="MainUser">
                <div className="backdrop1">
                    {userData.backdrop && <img src={`https://image.tmdb.org/t/p/original${userData.backdrop.backdrop_path}`} alt="" />}
                    <div className="userGradient1"></div>
                </div>
                <div className="userPage white mons">

                    <div className="userInfo1">
                        <div className="userInfoArea1">
                            <div className="profilePicArea1">
                                <img src={userData.profilePic} />
                            </div>
                            <div className="userName1">
                                {userData.name}
                            </div>
                            <img src={pin} className='pin' />
                        </div>

                        <div className="nameAndBio1">
                            <div className="name1">
                                {userData.username}
                                <button className="editProfile" onClick={() => navigate(`/editProfile/${username}`)}>
                                    EDIT <img src={edit}/>
                                </button>
                                <button className="delProfile"><img src={del} onClick={() => delAccount()}/></button>
                            </div>
                            <div className="bio1">
                                {userData.bio}
                            </div>
                        </div>
                    </div>

                    {genre == "profile" && userData.favourites.movies && <div className="favFilmsArea1 white mons">
                        FAVOURITE FILMS

                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="images1">
                            {userData.favourites.movies.map((el, index) => {
                                return (
                                    <div className="item1" onClick={() => navigate(`/movie/${el.id}`)} key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} alt="Image 1" />
                                        <div className="overlay1">
                                            {el.title}
                                            <br />
                                            ({el.release_date.split("-")[0]})
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}

                    {genre == "profile" && userData.favourites.tvshow && <div className="favFilmsArea2 white mons">
                        FAVOURITE TV SHOWS

                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="images1">
                            {userData.favourites.tvshow.map((el, index) => {
                                    return (
                                        <div className="item1" onClick={() => navigate(`/`)} key={index}>
                                            <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} alt="Image 1" />
                                            <div className="overlay1">
                                                {el.name}
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>}

                    {genre == "profile" && userData.favourites.actors && <div className="favFilmsArea2 white mons">
                        FAVOURITE ACTORS

                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="images1">
                            {userData.favourites.actors.map((el, index) => {
                                return (
                                    <div className="item1" key={index} onClick={() => navigate(`/person/${el.id}`)}>
                                        <img src={`https://image.tmdb.org/t/p/original${el.profile_path}`} alt="Image 1" />
                                        <div className="overlay1">{el.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}

                    {genre == "profile" && userData.favourites.directors && <div className="favFilmsArea2 white mons">
                        FAVOURITE DIRECTORS

                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="images1">
                            {userData.favourites.directors.map((el, index) => {
                                return (
                                    <div className="item1" key={index} onClick={() => navigate(`/person/${el.id}`)}>
                                        <img src={`https://image.tmdb.org/t/p/original${el.profile_path}`} alt="Image 1" />
                                        <div className="overlay1">{el.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}

                    

                    {genre == "watchlist" ? <div className='favFilmsArea1'>
                        WATCHLIST
                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="userWatchedTile">

                            {userData.watchlist && userData.watchlist.map((el, index) => {
                                return <div className="container" onClick={() => navigate(`/movie/${el.id}`)}>
                                    <img src={`${IMAGE_PATH}${el.poster_path}`} className='image' />
                                    <div className="overlay">
                                        {el.title}
                                        <br />
                                        ({el.release_date.split("-")[0]})
                                    </div>
                                </div>
                            })}
                        </div>

                        {userData.watchlist.length == 0 && <div className='center'>NO FILMS IN WATCHLIST</div>}

                    </div> : ""}

                    {genre == "watched" ? <div className='favFilmsArea1'>
                        WATCHED
                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="userWatchedTile">

                            {userData.watched && userData.watched.map((el, index) => {
                                return <div className="container" onClick={() => navigate(`/movie/${el.id}`)}>
                                    <img src={`${IMAGE_PATH}${el.poster_path}`} className='image' />
                                    <div className="overlay">
                                        {el.title}
                                        <br />
                                        ({el.release_date.split("-")[0]})
                                    </div>
                                </div>
                            })}
                        </div>

                        {userData.watched.length == 0 && <div className='center'>NO WATCHED FILMS</div>}

                    </div> : ""}

                    {genre == "liked" ? <div className='favFilmsArea1'>
                        LIKED
                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="userWatchedTile">

                            {userData.liked && userData.liked.map((el, index) => {
                                return <div className="container" onClick={() => navigate(`/movie/${el.id}`)}>
                                    <img src={`${IMAGE_PATH}${el.poster_path}`} className='image' />
                                    <div className="overlay">
                                        {el.title}
                                        <br />
                                        ({el.release_date.split("-")[0]})
                                    </div>
                                </div>
                            })}
                        </div>

                        {userData.liked.length == 0 && <div className='center'>NO LIKED FILMS</div>}


                    </div> : ""}

                </div>

                <div className={mouseEnter ? "genreBigArea1 hoverBlackBG1" : "genreBigArea1"} onMouseEnter={() => setMouseEnter(true)} onMouseLeave={() => setMouseEnter(false)}>

                    <div className="genreLogos1 white mons">
                        <div className={genre == "profile" ? "genreBlocks1 activeGenre1" : "genreBlocks1"} onClick={() => setGenre("profile")} >
                            <img src={userTile} />
                            <span>
                                PROFILE
                            </span>
                        </div>
                        <div className={genre == "watchlist" ? "genreBlocks1 activeGenre1" : "genreBlocks1"} onClick={() => setGenre("watchlist")} >
                            <img src={watchlistTile} />
                            <span>
                                WATCHLIST
                            </span>
                        </div>
                        <div className={genre == "watched" ? "genreBlocks1 activeGenre1" : "genreBlocks1"} onClick={() => setGenre("watched")} >
                            <img src={watchedTile} />
                            <span>
                                WATCHED
                            </span>
                        </div>
                        <div className={genre == "liked" ? "genreBlocks1 activeGenre1" : "genreBlocks1"} onClick={() => setGenre("liked")} >
                            <img src={likedTile} />
                            <span>
                                LIKED
                            </span>
                        </div>
                        <div className={genre == "list" ? "genreBlocks1 activeGenre1" : "genreBlocks1"} onClick={() => setGenre("list")} >
                            <img src={listTile} />
                            <span>
                                LISTS
                            </span>
                        </div>
                        <div className={genre == "recommended" ? "genreBlocks1 activeGenre1" : "genreBlocks1"} onClick={() => setGenre("recommended")} >
                            <img src={recommendedTile} />
                            <span>
                                RECOMMENDED
                            </span>
                        </div>
                    </div>

                </div>


            </div>}
        </>
    )
}

export default User