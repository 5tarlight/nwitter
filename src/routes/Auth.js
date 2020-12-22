import React, { useState } from 'react'
import { authService, firebaseInstance } from "../fbase";

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState('')

  const onChange = e => {
    const { target: { name, value } } = e
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }
  const onSubmit = async event => {
    event.preventDefault()

    try {
      if (newAccount) {
        const data = await authService.createUserWithEmailAndPassword(email, password)
        console.log(data)
      } else {
        // Log in
        const data = await authService.signInWithEmailAndPassword(email, password)
        console.log(data)
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleAccount = () => {
    setError('')
    setNewAccount(prev => !prev)
  }

  const onSocialClick = async event => {
    const { target: { name } } = event

    let provider
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider()
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider()
    }

    const data = await authService.signInWithPopup(provider)
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name='email'
          type='text'
          placeholder='Email'
          required
          value={email}
          onChange={onChange}
        />
        <input
          name='password'
          type='password'
          placeholder='Password'
          required
          value={password}
          onChange={onChange}
        />
        <input type='submit' value={newAccount ? 'Create Account' : 'Log in'}/>
        {error}
      </form>

      <span onClick={toggleAccount}>{newAccount ? 'Log In' : 'Create Account'}</span>

      <div>
        <button onClick={onSocialClick} name='google'>Continue with Google</button>
        <button onClick={onSocialClick} name='github'>Continue with Github</button>
      </div>
    </div>
  )
}

export default Auth
