import './Login.css'
import React from 'react'
import loginWP from '../../assets/loginWP.png'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const { register , handleSubmit , formState : {errors}} = useForm()

    const navigate = useNavigate()

    const onSubmit =(values) =>{
        try{
            const res = axios.post('https://s55-shaaz-capstone-flickpicks.onrender.com/login',values)
            .then((res)=>{

                if(res.status == 200){
                    sessionStorage.setItem('username',values.username)
                    navigate('/recs')
                    console.log("Login Successfull")
                }
                else{
                    alert("Invalid Credentials")
                }
            })    
            
        }
        catch(err){
            alert("Invalid Credentials")
        }
    }

    return (
        <>
            <img src={loginWP} alt="background" className="background" />

            <div className="mid">
                <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='amatic loginHeading'>LOGIN</h1>

                    <div className="fields">
                        <label className='amatic'>
                            USERNAME
                        </label>
                        <input type="text" name='username'
                        {...register("username", { required: 'username is Required!' })}/>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            PASSWORD
                        </label>
                        <input type="password" name='password'
                        {...register("password", { required: 'Password is Required!' })} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <h2 className='amatic signupInstead'>
                        Not a user? 
                        <Link to='/signup' className='goto'>
                                SIGNUP
                        </Link>
                    </h2>

                    <button type='submit' value='submit' className="amatic loginButton">
                        LOGIN
                    </button>
                </form>
            </div>
        </>
    )
}

export default Login