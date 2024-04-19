import React, { useState } from 'react'
import image1 from '../../assets/profile.png'
import upload from '../../assets/upload.png'
import close from '../../assets/close.png'

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

function EditProfile() {

    const [image, setImage] = useState()

    const convertToBase64 = (e) => {
        console.log(e)

        var read = new FileReader()
        read.readAsDataURL(e.target.files[0])
        read.onload = () => {
            console.log(read.result)
            setImage(read.result)
        }
        read.onerror = err => {
            console.log("You have an error ", err)
        }
    }

    return (
        <div>
            <div className="editProfilePage white mons">
                <div className="EditArea">
                    <div className="editImgArea">
                        <img src={image1} alt="" className='editProfileImg' />
                        <div className="editImgGradient">
                            <label htmlFor="fileInput">
                                <img src={upload} alt="" />
                            </label>
                            <input
                                id='fileInput'
                                type="file"
                                name='file'
                                accept='image/'
                                onChange={convertToBase64}/>
                        </div>

                    </div>
                    <div className="df">
                        <div>

                            <div className="editInputArea">
                                <label htmlFor="Name">NAME</label>
                                <input type="text" />
                            </div>

                            <div className="editInputArea">
                                <label htmlFor="Username">USERNAME</label>
                                <input type="text" />
                            </div>
                        </div>
                        <div>
                            <div className="editInputArea">
                                <label htmlFor="Username">BIO</label>
                                <textarea id='bioInput' type="textarea" />
                            </div>
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            FAVORITE FILMS  
                        </label>
                        <hr/>

                        <div className="fourFavs">
                            <div className="editFavs">
                                <img src={m1} alt="" />
                                <div className="editUserImgGradient">
                                    INTERSTELLAR
                                    (2014)
                                </div>
                                <div className="movieDelete">
                                    <img src={close} alt="" />
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={m2} alt="" />
                                <div className="editUserImgGradient">
                                    GONE GIRL
                                    (2014)
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={m3} alt="" />
                                <div className="editUserImgGradient">
                                    KISS KISS BANG BANG
                                    (2005)
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={m4} alt="" />
                                <div className="editUserImgGradient">
                                    THE SOCIAL NETWROK
                                    (2010)
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            FAVORITE ACTORS  
                        </label>
                        <hr/>

                        <div className="fourFavs">
                            <div className="editFavs">
                                <img src={a1} alt="" />
                                <div className="editUserImgGradient">
                                    BRAD PITT
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={a2} alt="" />
                                <div className="editUserImgGradient">
                                    CHRISTIAN BALE
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={a3} alt="" />
                                <div className="editUserImgGradient">
                                    EMMA STONE
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={a4} alt="" />
                                <div className="editUserImgGradient">
                                    JENNIFER LAWRENCE
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="editFavFilmsArea">
                        <label className='fontColor'>
                            FAVORITE DIRECTORS  
                        </label>
                        <hr/>

                        <div className="fourFavs">
                            <div className="editFavs">
                                <img src={d1} alt="" />
                                <div className="editUserImgGradient">
                                    DAVID FINCHER
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={d2} alt="" />
                                <div className="editUserImgGradient">
                                    CHRISTOPHER NOLAN
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={d3} alt="" />
                                <div className="editUserImgGradient">
                                    DENIS VILLENUVE
                                </div>
                            </div>
                            <div className="editFavs">
                                <img src={d4} alt="" />
                                <div className="editUserImgGradient">
                                    DAMIEN CHEZELLE
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="saveChangesArea">
                        <button>
                            SAVE CHANGES
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile