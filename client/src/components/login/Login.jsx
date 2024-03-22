import './Login.css'
import React from 'react'
import loginWP from '../../assets/loginWP.png'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <>
            <img src={loginWP} alt="background" className="background" />

            <div className="mid">
                <div className="loginForm">
                    <h1 className='amatic loginHeading'>LOGIN</h1>

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
                        <input type="password" />
                    </div>

                    <h2 className='amatic signupInstead'>
                        Not a user? 
                        <Link to='/signup' className='goto'>
                                SIGNUP
                        </Link>
                    </h2>

                    <button className="amatic loginButton">
                        LOGIN
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login