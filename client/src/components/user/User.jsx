import React, { useEffect, useState } from 'react'
import './User.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import edit from '../../assets/edit.png'

import backdrop from '../../assets/backdrop.jpg'
import profilePic from '../../assets/profile.png'
import m1 from '../../assets/m1.jpg'
import m2 from '../../assets/m2.jpg'
import m3 from '../../assets/m3.jpg'
import m4 from '../../assets/m4.jpeg'
import a1 from '../../assets/a1.jpg'
import a2 from '../../assets/a2.jpg'
import a3 from '../../assets/a3.jpg'
import a4 from '../../assets/a4.jpg'
import d1 from '../../assets/d1.jpg'
import d2 from '../../assets/d2.webp'
import d3 from '../../assets/d3.jpg'
import d4 from '../../assets/d4.jpg'
import userProfile from '../../assets/userProfileBlue.png'
import watchlistBlue from '../../assets/watchlistBlue.png'
import heartBlue from '../../assets/heartBlue.png'
import recsBlue from '../../assets/recsBlue.png'
import watchedBlue from '../../assets/watchedBlue.png'
import axios from 'axios'

function User() {
    
    const RENDER_LINK = "https://s55-shaaz-capstone-flickpicks.onrender.com/"

    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"

    const { username } = useParams()
    const navigate  = useNavigate()
    const [userData, setUserData] = useState()

    const getUserData = async () => {
        const res = await axios.get(`https://s55-shaaz-capstone-flickpicks.onrender.com/user/${username}`)
            .then(res => {
                console.log("USER DATA IS", res.data)
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

    return (
        <div className="MainUser">

            {/* <div className="userNav white mons">

                    <div className="tile ">
                        <div className="tileWhite">
                            <img src={userProfile} alt="" />
                        </div>
                        <div>
                            PROFILE
                        </div>
                    </div>

                    <div className="tile selectedTile">
                        <div className="tileWhite">
                            <img src={watchedBlue} alt="" />
                        </div>
                        WATCHED
                    </div>

                    <div className="tile">
                        <div className="tileWhite">
                            <img src={watchlistBlue} alt="" />
                        </div>
                        WATCHLIST
                    </div>

                    <div className="tile">
                        <div className="tileWhite">
                            <img src={heartBlue} alt="" />
                        </div>
                        LIKED
                    </div>

                    <div className="tile">
                        <div className="tileWhite">
                            <img src={recsBlue} alt="" />
                        </div>
                        RECOMMENDED
                    </div>
            </div> */}
            <div className="userPage white mons">

                <div className="userInfoArea">
                    <div className="userBackdropArea">
                        <div id="outer">
                            <img src={backdrop} alt="" />
                            <div id="inner"></div>
                        </div>
                    </div>

                </div>

                <div className="userProfilePic">
                    {userData && userData.profilePic && <img src={ userData.profilePic} />}
                    <div className="userProfileName">
                        <h1>{userData && userData.name}</h1>
                        <h3>{userData && userData.username}</h3>
                    </div>
                    <button className="editProfile" onClick={() => navigate(`/editProfile/${username}`)}>
                        <img src={edit} alt="" />
                    </button>
                </div>

                <div className="selectBar">
                    <div className={selectedTile === 0 ? "selectBarTile selectedBarTile" : "selectBarTile"} onClick={() => selectTile(0)}>
                        PROFILE
                    </div>
                    <div className={selectedTile === 1 ? "selectBarTile selectedBarTile" : "selectBarTile"} onClick={() => selectTile(1)}>
                        WATCHED
                    </div>
                    <div className={selectedTile === 2 ? "selectBarTile selectedBarTile" : "selectBarTile"} onClick={() => selectTile(2)}>
                        WATCHLIST
                    </div>
                    <div className={selectedTile === 3 ? "selectBarTile selectedBarTile" : "selectBarTile"} onClick={() => selectTile(3)}>
                        LIKED
                    </div>
                    <div className={selectedTile === 4 ? "selectBarTile selectedBarTile" : "selectBarTile"} onClick={() => selectTile(4)}>
                        RECOMMENDED
                    </div>
                </div>

                {selectedTile == 0 ? <div className="userProfileTile">

                    <div className="userFavFilms">
                        <h5>FAVOURITE FILMS</h5>
                        <hr />
                        <div className="fourFavs">
                            <div className="imgArea">
                                <img src={m1} alt="" />
                                <div className="userImgGradient">
                                    INTERSTELLAR
                                    (2014)
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={m2} alt="" />
                                <div className="userImgGradient">
                                    GONE GIRL
                                    (2014)
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={m3} alt="" />
                                <div className="userImgGradient">
                                    KISS KISS BANG BANG
                                    (2005)
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={m4} alt="" />
                                <div className="userImgGradient">
                                    THE SOCIAL NETWROK
                                    (2010)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="userFavFilms">
                        <h5>FAVOURITE ACTORS</h5>
                        <hr />
                        <div className="fourFavs">
                            <div className="imgArea">
                                <img src={a1} alt="" />
                                <div className="userImgGradient">
                                    BRAD PITT
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={a2} alt="" />
                                <div className="userImgGradient">
                                    CHRISTIAN BALE
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={a3} alt="" />
                                <div className="userImgGradient">
                                    EMMA STONE
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={a4} alt="" />
                                <div className="userImgGradient">
                                    JENNIFER LAWRENCE
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="userFavFilms">
                        <h5>FAVOURITE DIRECTORS</h5>
                        <hr />
                        <div className="fourFavs">
                            <div className="imgArea">
                                <img src={d1} alt="" />
                                <div className="userImgGradient">
                                    DAVID FINCHER
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={d2} alt="" />
                                <div className="userImgGradient">
                                    CHRISTOPHER NOLAN
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={d3} alt="" />
                                <div className="userImgGradient">
                                    DENIS VILLENUEVE
                                </div>
                            </div>
                            <div className="imgArea">
                                <img src={d4} alt="" />
                                <div className="userImgGradient">
                                    DAMIEN CHEZELLE
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : ''}

                {selectedTile == 1 ? <div className="userWatchedTile">
                    {userData.watched && userData.watched.map(el => {
                        return <div className="container" onClick={() => navigate(`/movie/${el.id}`)}>
                            <img src={`${IMAGE_PATH}${el.poster_path}`} className='image' />
                            <div className="overlay">
                                {el.title}
                                <br />
                                ({el.release_date.split("-")[0]})
                            </div>
                        </div>
                    })}
                </div> : ''}

                {selectedTile == 2 ? <div className="userWatchedTile">
                {userData.watchlist && userData.watchlist.map(el => {
                        return <div className="container" onClick={() => navigate(`/movie/${el.id}`)}>
                            <img src={`${IMAGE_PATH}${el.poster_path}`} className='image' />
                            <div className="overlay">
                                {el.title}
                                <br />
                                ({el.release_date.split("-")[0]})
                            </div>
                        </div>
                    })}
                </div> : ''}

                {selectedTile == 3 ? <div className="userWatchedTile">
                {userData.liked && userData.liked.map(el => {
                        return <div className="container" onClick={() => navigate(`/movie/${el.id}`)}>
                            <img src={`${IMAGE_PATH}${el.poster_path}`} className='image' />
                            <div className="overlay">
                                {el.title}
                                <br />
                                ({el.release_date.split("-")[0]})
                            </div>
                        </div>
                    })}
                </div> : ''}

                {selectedTile == 4 ? <div className="userRecommendedTile">
                    recs
                </div> : ''}

            </div>

        </div>
    )
}

export default User