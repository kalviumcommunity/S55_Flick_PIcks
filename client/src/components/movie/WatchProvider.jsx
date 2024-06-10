import React, { useState } from 'react'

function WatchProvider(props) {
    
    const [currData,setCurrData] = useState(props.data)

    return (
        <div className="watchProviders">
            {
                currData && currData.map((el,index)=> {
                    return (
                        <img src={`https://image.tmdb.org/t/p/original/${el.logo_path}`} alt='logo' className='' key={index}/>
                    )
                })
            }
        </div>
    )
}

export default WatchProvider