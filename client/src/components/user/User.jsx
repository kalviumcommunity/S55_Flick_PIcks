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
import luka from '../../assets/luka.png'
import axios from 'axios'
import pin from '../../assets/pin.png'
import backdropIMG from '../../assets/backdrop.png'

function User() {

    const RENDER_LINK = "https://s55-shaaz-capstone-flickpicks.onrender.com/"

    const IMAGE_PATH = "https://image.tmdb.org/t/p/original"

    const { username } = useParams()
    const navigate = useNavigate()
    const [userData, setUserData] = useState()

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
                                    EDIT <img src={edit} alt="" />
                                </button>
                            </div>
                            <div className="bio1">
                                {userData.bio}
                            </div>
                        </div>
                    </div>


                    {userData.favourites.movies && <div className="favFilmsArea1 white mons">
                        FAVOURITE FILMS

                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="images1">
                            {userData.favourites.movies.map((el, index) => {
                                return (
                                    <div className="item1" onClick={() => navigate(`/movie/${el.id}`)} key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} alt="Image 1" />
                                        <div className="overlay1">
                                            {el.title}
                                            <br/>
                                            ({el.release_date.split("-")[0]})
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}

                    {userData.favourites.actors && <div className="favFilmsArea2 white mons">
                        FAVOURITE ACTORS

                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="images1">
                            {userData.favourites.actors.map((el, index) => {
                                return (
                                    <div className="item1" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original${el.profile_path}`} alt="Image 1" />
                                        <div className="overlay1">{el.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}

                    {userData.favourites.directors && <div className="favFilmsArea2 white mons">
                        FAVOURITE DIRECTORS

                        <div style={{ height: '1px', backgroundColor: 'white', width: '100%', marginTop: "5px" }} />

                        <div className="images1">
                            {userData.favourites.directors.map((el, index) => {
                                return (
                                    <div className="item1" key={index}>
                                        <img src={`https://image.tmdb.org/t/p/original${el.profile_path}`} alt="Image 1" />
                                        <div className="overlay1">{el.name}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>}
                </div>


            </div>}
        </>
    )
}

export default User