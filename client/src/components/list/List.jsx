import React, { useEffect, useState } from 'react'
import './List.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import editIcon from '../../assets/editN.png'
import editIconGreen from '../../assets/editG.png'
import del from '../../assets/del.png'
import delRed from '../../assets/delRed.png'

function List() {

    const navigate = useNavigate()

    const { username } = useParams()
    const { listid } = useParams()
    const { category } = useParams()
    console.log(username,listid)
    const ID = localStorage.getItem('userID')

    const [data,setData] = useState([])

    async function getList(){
        const res = await axios.get(`http://localhost:3000/getList/${ID}/${category}/${listid}`)
        .then(res => {
            console.log(res.data)
            setData(res.data)
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getList()
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

  return (
    <>
        {data && <div className="mainListArea white mons">
            <div className="mainList">
                <div className="mainListTitle">
                    {/* {data.title}*/}
                    David Fincher Ranked
                    <img src={edit ? editIconGreen : editIcon} onMouseEnter={mouseEnterEdit} onMouseLeave={mouseLeaveEdit} />
                    <img src={Delete ? delRed : del} onMouseEnter={mouseEnterDelete} onMouseLeave={mouseLeaveDelete} />

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
                    {/* {data.description} */}
                    David Fincher is my favourite Director and I am ranking his movies from Best to Worst. He has made many movies like F**** C***, Gone Girl, Zodiac and many more.
                </div>
                <hr className="mainListLine"/>


            </div>
        </div>}
    </>
  )
}

export default List