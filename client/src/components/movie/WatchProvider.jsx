import React, { useState } from 'react'

function WatchProvider(props) {
    
    const [currData,setCurrData] = useState(props.data)

    return (
        <div className="watchProviders">
            {console.log("props",currData)}
            {
                currData && currData.map(el => {
                    return (
                        <img src={`https://image.tmdb.org/t/p/original/${el.logo_path}`} alt='logo' className='' />
                    )
                })
            }
        </div>
    )
}

export default WatchProvider