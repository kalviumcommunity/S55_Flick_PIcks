import React, { useState,useEffect } from 'react'
import './Signup.css'
import signup from '../../assets/signup.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script';

import person from '../../assets/loginPerson.png'
import lock from '../../assets/lock.png'

function loginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const [click, setClick] = useState(true)

  const onSubmit = async (values) => {
    if (values.password != values.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Confirm Password and password must match"
      });
      return;
    }
    else if (click) {
      try {
        setClick(false)
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
              sessionStorage.setItem('username', values.username)
              navigate('/recs')
            }
            else {
              alert("Username already exists.")
            }
          })
      }
      catch (err) {
        console.log(err)
      }
    }
  }

  const clientID = "934760259390-idpvnt9md5ov9pr4lnoufcb0obh56eue.apps.googleusercontent.com"

  async function createUser(data){
    console.log("Create User Working")
    const response = await axios.post('http://localhost:3000/googleAuthSignup', data)
    .then(response => {
      console.log(response)
      if(response.status === 201){
        localStorage.setItem("useInfo",response.data)
        localStorage.setItem("user",true)
      }
      navigate('/recs')
    })
      .catch(err => console.log(err))
  }

  async function loginUser(data){
    console.log("Login User Working")
    const response = await axios.post('http://localhost:3000/googleAuthLogin', data)
      .then(response => {
        console.log(response)
        if(response.status === 201){
          localStorage.setItem("useInfo",response.data)
          localStorage.setItem("user",true)
        }
        navigate('/recs')
      })
      .catch(err => console.log(err))
  }

  async function onSuccess(res) {
    console.log("Login Success, Current user -> ", res.profileObj)

    const data = await axios.post('http://localhost:3000/googleAuthID', res.profileObj)
    .then(data => {
      if(data.status === 200){
        createUser(res.profileObj)
      }
      else if(data.status === 201){
        loginUser(res.profileObj)
      }
    })
    .catch(err => console.log(err))
  }

  function onFailure(res) {
    console.log("Login Failed, Res -> ", res)
  }

  useEffect(() => {
    function start() {
        gapi.client.init({
            clientId: clientID,
            scope: "email"
        }).then(() => {
            console.log('Google API client initialized')
        }, (error) => {
            console.error('Error initializing Google API client:', error)
        })
    }

    gapi.load('client:auth2', start)
}, [])

  return (
    <div className='areaCenterLogin mons'>

      <form className="signupRectangle" onSubmit={handleSubmit(onSubmit)}>
        <h2>SIGNUP</h2>

        <div className="inputLoginArea">
          <label htmlFor="username">
            Name
          </label>
          <input type="text" name='name' placeholder='Enter your Name'
            {...register("name", { required: 'Name is Required' })} />
          <img src={person} className='userPlaceholder' />
          {errors.name && <p className='red'>{errors.name.message}</p>}
          {!errors.name && <p className='transperent'>x</p>}
        </div>

        <div className="inputLoginArea">
          <label htmlFor="username">
            Username
          </label>
          <input type="text" name='username' placeholder='Enter your Username'
            {...register("username", { required: 'Username is Required' })} />
          <img src={person} className='userPlaceholder' />
          {errors.username && <p className='red'>{errors.username.message}</p>}
          {!errors.username && <p className='transperent'>x</p>}
        </div>

        <div className="inputLoginArea">
          <label htmlFor="username">
            Password
          </label>
          <input type="password" name='password' placeholder='Enter your Password'
            {...register("password", { required: 'Password is Required' })} />
          <img src={lock} className='userPlaceholder' />
          {errors.password && <p className='red'>{errors.password.message}</p>}
          {!errors.password && <p className='transperent'>x</p>}
        </div>

        <div className="inputLoginArea">
          <label htmlFor="username">
            Confirm Password
          </label>
          <input type="password" name='confirmPassword' placeholder='Confirm your Password'
            {...register("confirmPassword", { required: 'Confirm your Password' })} />
          <img src={lock} className='userPlaceholder' />
          {errors.confirmPassword && <p className='red'>{errors.confirmPassword.message}</p>}
          {!errors.confirmPassword && <p className='transperent'>x</p>}
        </div>

        <div class="line-container">
          <div class="myLine"></div>
          <div class="or">OR</div>
          <div class="myLine"></div>
        </div>

        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
          className='googleButton'
        >

          Continue with Google

        </GoogleLogin>

        <h4 onClick={() => navigate('/login')}>Already a User?
          <span className='underline'> LOGIN HERE
          </span></h4>

        <button type='submit' value='submit' className='signupButton'>
          SIGNUP
        </button>
      </form>


      <img src={signup} alt="" className='loginPageImg' />
    </div>
  )
}

export default loginPage