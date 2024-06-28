import React, { useEffect, useState } from 'react'
import './List.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import editIcon from '../../assets/editN.png'
import editIconGreen from '../../assets/editG2.png'
import del from '../../assets/deleteWhite.png'
import delRed from '../../assets/deleteRed.png'
import close from '../../assets/close.png'
import add from '../../assets/add.png'
import studio from '../../assets/studio.png'
import search2 from '../../assets/image.png'
import logout from '../../assets/logout.png'

import search from '../../assets/search.png'

function List() {

    const navigate = useNavigate()

    const { username } = useParams()
    const { listid } = useParams()
    const { category } = useParams()
    console.log(username,listid)
    const ID = localStorage.getItem('userID')
    const [user,setUser] = useState([])

    const [data,setData] = useState([])

    async function getList(passedData){
        const res = await axios.get(`https://studio-ejn1.onrender.com/getList/${passedData._id}/${category}/${listid}`)
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
        .catch(err => console.log(err))
    }

    async function getUser(){
        const res = await axios.get(`https://studio-ejn1.onrender.com/user/${username}`)
        .then(res => {
            console.log(res.data)
            getList(res.data)
            setUser(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getUser()
    },[])

    function stringCap(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [edit,setEdit] = useState(false)
    const [Delete,setDelete] = useState(false)

    function mouseEnterEdit() {
        setEdit(true)
    }

    function mouseLeaveEdit() {
        setEdit(false)
    }

    function mouseEnterDelete() {
        setDelete(true)
    }

    function mouseLeaveDelete() {
        setDelete(false)
    }

    async function deleteList(){
        const res = axios.delete(`https://studio-ejn1.onrender.com/deleteList/${user._id}/${category}/${listid}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    async function getUserInfoForNav(){
        const ID = localStorage.getItem('userID')
        const res = axios.get(`https://studio-ejn1.onrender.com/userByID/${ID}`)
        .then(res => {
            console.log(res)
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
        {data && <div className="mainListArea white mons">
            <div className="mainList">
                <div className="mainListTitle">
                    {data.title}
                    {user._id == ID && <img src={edit ? editIconGreen : editIcon} onClick={() => navigate(`/user/${data.createdBy.username}/lists/${category}/${listid}/edit`)} className='editList' onMouseEnter={mouseEnterEdit} onMouseLeave={mouseLeaveEdit} />}
                    {user._id == ID && <img src={Delete ? delRed : del} className='delList' onMouseEnter={mouseEnterDelete} onMouseLeave={mouseLeaveDelete} onClick={() => deleteList()}/> }

                </div>
                {category && <div className="mainListDetails">
                    <span className="mainListGray">Category : </span> {stringCap(category)}
                </div>}
                <div className="mainListDetails" onClick={() => navigate(`/user/${data.createdBy.username}`)}>
                    <span className="mainListGray">Created By : </span>
                    {data.createdBy && data.createdBy.profilePic && <img src={data.createdBy.profilePic} />}
                    {data.createdBy && data.createdBy.name}
                </div> 
                <div className="mainListGray">
                    {data.description}
                </div>
                <hr className="mainListLine"/>

                <div className="userWatchedTile">
                        {category == "movies" && data.content && data.content.map((el, index) => {
                            return <div className="container" key={index} onClick={() => navigate(`/movie/${el.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image'/>
                                <div className="overlay">
                                    {el.title}
                                    <br />
                                    ({el.release_date && el.release_date.split("-")[0]})
                                </div>
                                    {/* <div className="rankBox">
                                        {index + 1}
                                    </div> */}
                            </div>
                        })}
                        {category == "tvshows" && data.content && data.content.map((el, index) => {
                            return <div className="container" key={index} onClick={() => navigate(`/tvshow/${el.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/original${el.poster_path}`} className='image'/>
                                <div className="overlay">
                                    {el.name}
                                </div>      
                            </div>
                        })}
                        {category == "cast" && data.content && data.content.map((el, index) => {
                            return <div className="container" key={index} onClick={() => navigate(`/person/${el.id}`)}>
                                <img src={`https://image.tmdb.org/t/p/original${el.profile_path}`} className='image' />
                                <div className="overlay">
                                    {el.name}
                                </div>
                            </div>
                        })}
                    </div>

                {data.content && data.content.length == 0 && <div className="centerList">
                    NO ITEMS IN THIS LIST
                </div>}


            </div>
        </div>}
    </>
  )
}

export default List