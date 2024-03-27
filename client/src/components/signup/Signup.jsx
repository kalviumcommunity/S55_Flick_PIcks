import React from 'react'
import loginWP from '../../assets/loginWP.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

function Signup() {

    const {register , handleSubmit , formState : {errors}} = useForm()

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <>
            <img src={loginWP} alt="background" className="background" />

            <div className="mid">
                <form onSubmit={handleSubmit(onSubmit)} className="loginForm">
                    <h1 className='amatic loginHeading'>SIGNUP</h1>

                    <div className="fields">
                        <label className='amatic'>
                            NAME
                        </label>
                        <input type="text" name='name'
                        {...register("name",{required : "Name is required"})}/>
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            USERNAME
                        </label>
                        <input type="text" name='username'
                        {...register("username",{required : "username is required"})}/>
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            PASSWORD
                        </label>
                        <input type="password" name='password'
                        {...register("password",{required : "password is required"})}/>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            CONFIRM PASSWORD
                        </label>
                        <input type="password" name='confirmPasssword' 
                        {...register("confirmPassword",{required : "confirmPassword is required"})}/>
                        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                    </div>

                    <h2 className='amatic signupInstead'>
                        Already a user? 
                        <Link to='/login' className='goto'>
                            LOGIN
                        </Link>
                    </h2>

                    <button type='submit' value='submit' className="amatic loginButton">
                        SIGNUP
                    </button>
                </form>
            </div>
        </>
    )
}

export default Signup