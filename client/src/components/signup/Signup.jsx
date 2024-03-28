import React from 'react'
import loginWP from '../../assets/loginWP.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Signup() {

    const { register, handleSubmit, setError, formState: { errors } } = useForm()

    const navigate = useNavigate()

    const onSubmit = async(values) => {
        if (values.password != values.confirmPassword) {
            setError("confirmPassword", {
                type: "manual",
                message: "Confirm Password and password must match"
            });
            return;
        }
        else {
            try {
                const test = await axios.post('https://s55-shaaz-capstone-flickpicks.onrender.com/userExists', values)
                    .then((test) => {
                        console.log(test)
                        if (test.status == 200) {
                            try {
                                const res = axios.post('https://s55-shaaz-capstone-flickpicks.onrender.com/newUser', values)
                                    .then(res => console.log(res))
                            }
                            catch (err) {
                                console.log(err)
                            }
                            sessionStorage.setItem('username',values.username)
                            console.log("Signup Successfull")
                            navigate('/main')
                        }
                        else{
                            alert("USERNAME EXISTS!")
                        }
                    })
                }
                catch (err) {
                console.log(err)
            }
        }
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
                            {...register("name", { required: "Name is required" })} />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            USERNAME
                        </label>
                        <input type="text" name='username'
                            {...register("username", { required: "username is required" })} />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            PASSWORD
                        </label>
                        <input type="password" name='password'
                            {...register("password", { required: "password is required" })} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className="fields">
                        <label className='amatic'>
                            CONFIRM PASSWORD
                        </label>
                        <input type="password" name='confirmPasssword'
                            {...register("confirmPassword", { required: "confirmPassword is required" })} />
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