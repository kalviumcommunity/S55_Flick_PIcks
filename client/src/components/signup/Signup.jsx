import React from 'react'
import loginWP from '../../assets/loginWP.png'
import { Link } from 'react-router-dom'

function Signup() {
    return (
        <>
            <img src={loginWP} alt="background" className="background" />

            <div className="mid">
                <div className="loginForm">
                    <h1 className='amatic loginHeading'>SIGNUP</h1>

                    <div className="fields">
                        <label className='amatic'>
                            NAME
                        </label>
                        <input type="text" />
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            USERNAME
                        </label>
                        <input type="text" />
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            PASSWORD
                        </label>
                        <input type="text" />
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            CONFIRM PASSWORD
                        </label>
                        <input type="text" />
                    </div>

                    <h2 className='amatic signupInstead'>
                        Already a user? 
                        <Link to='/login' className='goto'>
                            LOGIN
                        </Link>
                    </h2>

                    <button className="amatic loginButton">
                        SIGNUP
                    </button>
                </div>
            </div>
        </>
    )
}

export default Signup