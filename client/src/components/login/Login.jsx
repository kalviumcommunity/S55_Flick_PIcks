import React, { useEffect, useState } from 'react'
import './Login.css'
import login from '../../assets/login.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'

import person from '../../assets/loginPerson.png'
import lock from '../../assets/lock.png'
import { gapi } from 'gapi-script';

function loginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const [googleUserData,setGoogleUserData] = useState({})

  const onSubmit = (values) => {
    try {
      const res = axios.post('http://localhost:3000/login', values)
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            localStorage.setItem("userID",res.data._id)
            localStorage.setItem("user",true)
            navigate('/recs')
          }
          else {
            alert("Invalid Credentials")
          }
        })

    }
    catch (err) {
      alert("Invalid Credentials")
    }
  }

  async function createUserSignup() {
    const response = await axios.post(`http://localhost:3000/googleAuthSignup/${username}`, googleUserData)
      .then(response => {
        localStorage.setItem("userInfo", response.data)
        localStorage.setItem("user", true)
        console.log("LOCAL STORAGE",localStorage.getItem("userInfo"))
        navigate('/recs')
      })
      .catch(err => console.log(err))
  }

  async function handleUsername() {
    const test = await axios.post('https://s55-shaaz-capstone-flickpicks.onrender.com/userExists', { "username": username })
      .then(test => {
        console.log("TEST", test)
        if (test.status == 200) {
          createUserSignup()
        }
        else {
          alert("Username Not Available")
        }
      })
      .catch(err => console.log(err))
  }

  const [showUsername, setShowUsername] = useState(true)

  const clientID = "934760259390-idpvnt9md5ov9pr4lnoufcb0obh56eue.apps.googleusercontent.com"

  async function createUser(data) {
    setGoogleUserData(data)
    setShowUsername(false)
  }

  async function loginUser(data) {
    console.log("Login User Working")
    const response = await axios.post('https://s55-shaaz-capstone-flickpicks.onrender.com/googleAuthLogin', data)
      .then(response => {
        console.log(response)
        if (response.status === 201) {
          localStorage.setItem("userID", response.data._id)
          localStorage.setItem("user", true)
          console.log("LOCAL STORAGE",localStorage.getItem("userID"))
        }
        navigate('/recs')
      })
      .catch(err => console.log(err))
  }

  async function onSuccess(res) {
    const data = await axios.post('https://s55-shaaz-capstone-flickpicks.onrender.com/googleAuthID', res.profileObj)
      .then(data => {
        if (data.status === 200) {
          createUser(res.profileObj)
        }
        else if (data.status === 201) {
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

  const [username, setUsername] = useState('')

  const handleChange = (event) => {
    setUsername(event.target.value)
  }

  return (
    <div className='areaCenterLogin mons'>
      <img src={login} alt="" className='loginPageImg' />

      {showUsername && <form className="loginRectangle" onSubmit={handleSubmit(onSubmit)}>
        <h2>LOGIN</h2>

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
          {!errors.username && <p className='transperent'>x</p>}
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
          className='googleButtonLogin'
        >

          Continue with Google

        </GoogleLogin>


        <h4 onClick={() => navigate('/signup')}>Not a User? <span className='underline'> SIGNUP HERE
        </span>
        </h4>


        <button type='submit' value='submit' className='signupButton' >
          LOGIN
        </button>
      </form>}

      {!showUsername && <div className="loginRectangle">
        <h2>LOGIN</h2>

        <div className="inputLoginArea inputLoginArea2">
          <label htmlFor="username">
            Username
          </label>
          <input value={username} onChange={handleChange} placeholder="Enter your username" />
          <img src={person} className='userPlaceholder' />
        </div>

        <button className='submitUsername' onClick={() => handleUsername()}>
          SUBMIT
        </button>
      </div>}
    </div>
  )
}

export default loginPage