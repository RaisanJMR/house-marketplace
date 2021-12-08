import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRight } from '../assets/svg/keyboardArrowRightIcon.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const { email, password, name } = formData
  const navigate = useNavigate()
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      //🌟🌟🌟 FIREBASE SYNTAX TO SIGN-UP ✌🌟🌟🌟🌟
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      console.log(user)
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      //✔ COPYING ARRAY
      const formDataCopy = { ...formData }
      //✔ REMOVING PASSWORD
      delete formDataCopy.password
       //✔ ADDING SERVER TIMESTAMP
      formDataCopy.timestamp = serverTimestamp()
       //✔ ADDING USER TO ❝USERS❞ COLLECTION IN FIREBASE ⚡
      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/')
    } catch (error) {
      toast.error('Somenthing went wrong with registration')
    }
  }
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              name=''
              value={name}
              id='name'
              onChange={onChange}
              className='nameInput'
              placeholder='Name'
            />
            <input
              type='email'
              name=''
              value={email}
              id='email'
              onChange={onChange}
              className='emailInput'
              placeholder='Email'
            />
            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot password
            </Link>
            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRight fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          {/* google auth */}
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead?
          </Link>
        </main>
      </div>
    </>
  )
}

export default SignUp
