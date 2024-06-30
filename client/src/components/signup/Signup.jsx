import React, { useState,useEffect } from 'react'
import './Signup.css'
import signup from '../../assets/signup.png'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import { gapi } from 'gapi-script';

import person from '../../assets/loginPerson.png'
import lock from '../../assets/lock.png'

function loginPage() {

  useEffect(() => {
    document.title = `Signup - STUDIO`
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const [googleUserData,setGoogleUserData] = useState({})

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
        const test = await axios.post('https://studio-ejn1.onrender.com/userExists', values)
          .then((test) => {
            if (test.status == 200) {
              try {
                const res = axios.post('https://studio-ejn1.onrender.com/newUser', values)
                  .then(res => {
                    localStorage.setItem("userID",res.data._id)
                    navigate('/recs')
                  })
              }
              catch (err) {
                console.log(err)
              }
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

  const [click, setClick] = useState(true)


  const [done, setDone] = useState(false)

  async function createUserSignup() {
      const response = await axios.post(`https://studio-ejn1.onrender.com/googleAuthSignup/${username}`, googleUserData)
      .then(response => {
        localStorage.setItem("userID", response.data._id)
        localStorage.setItem("user", true)
        navigate('/recs')
      })
      .catch(err => console.log(err))
  }

  async function handleUsername() {
    setDone(true)
    const test = await axios.post('https://studio-ejn1.onrender.com/userExists', { "username": username })
      .then(test => {
        if (test.status == 200) {
          createUserSignup()
        }
        else {
          setDone(false)
          alert("Username Not Available")
        }
      })
      .catch(err => console.log(err))
  }

  const [showUsername, setShowUsername] = useState(true)

  const clientID = "934760259390-idpvnt9md5ov9pr4lnoufcb0obh56eue.apps.googleusercontent.com"

  async function createUser(data) {
    console.log("Create User Working")
    setGoogleUserData(data)
    setShowUsername(false)
  }

  async function loginUser(data) {
    const response = await axios.post('https://studio-ejn1.onrender.com/googleAuthLogin', data)
      .then(response => {
        if (response.status === 201) {
          localStorage.setItem("userID", response.data._id)
          localStorage.setItem("user", true)
        }
        navigate('/recs')
      })
      .catch(err => console.log(err))
  }

  async function onSuccess(res) {
    const decoded = jwtDecode(res.credential)
    const data = await axios.post('https://studio-ejn1.onrender.com/googleAuthID', decoded)
      .then(data => {
        if (data.status === 200) {
          createUser(decoded)
        }
        else if (data.status === 201) {
          loginUser(decoded)
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
      {showUsername && <form className="signupRectangle" onSubmit={handleSubmit(onSubmit)}>
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

        <div className="line-container">
          <div className="myLine"></div>
          <div className="or">OR</div>
          <div className="myLine"></div>
        </div>

        <div className="custom-google-signup-button">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          className='padding'
          text="continue_with"
          size='medium'
          width='250'
        />
      </div>

        <h4 onClick={() => navigate('/login')}>Already a User?
          <span className='underline'> LOGIN HERE
          </span></h4>

        <button type='submit' value='submit' className='signupButton'>
          SIGNUP
        </button>
      </form>}

      {!showUsername && <div className="signupRectangle">
        <h2>SIGNUP</h2>

        <div className="inputLoginArea inputLoginArea2">
          <label htmlFor="username">
            Username
          </label>
          <input value={username} onChange={handleChange} placeholder="Enter a username" />
          <img src={person} className='userPlaceholder' />
        </div>

        {done ? <button className='submitUsername'>
          SUBMIT
        </button> : <button className='submitUsername' onClick={() => handleUsername()}>
          SUBMIT
        </button>}
      </div>}


      <img src={signup} alt="" className='loginPageImg' />
    </div>
  )
}

export default loginPage