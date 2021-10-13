import React, { useState, MouseEvent, FormEvent } from 'react'
import PropTypes from 'prop-types'
import * as UserServices from '../../services/user'
import { IUser } from '../../models/IUser'

import './Login.css';

interface ILoginProps {
  setToken: (user: IUser) => void
}

export default function Login(props: ILoginProps) {
  const setToken = props.setToken;
  const [mode, setMode] = useState<string>('login')

  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

  const [firstName, setFirstname] = useState<string>()
  const [lastName, setLastname] = useState<string>()
  const [confirmPassword, setConfirmPassword] = useState<string>()

  const [errorStyle, setErrorStyle] = useState<object>({ display: 'none' })
  const [formErrorMessage, setFormErrorMessage] = useState<string[]>([])

  let tempErrorMessages = []

  const handleSignUpClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormErrorMessage([])
    setMode('signup')
  }

  const handleLoginClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setFormErrorMessage([])
    setMode('login')
  }

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    tempErrorMessages = []
    try {
      e.preventDefault()

      if (username === '' || username === undefined) {
        tempErrorMessages.push('User name is blank.')
      }
      if (password === '' || username === undefined) {
        tempErrorMessages.push('Password is blank.')
      }
      if (tempErrorMessages.length > 0) {
        throw Error('Invalid')
      }

      await UserServices.loginUser({
        username,
        password
      }).then(token => setToken(token))
    } catch (err: unknown) {
      let message: string = ''
      if (typeof err === "string")
        message = err
      else if (err instanceof Error)
        message = err.message;

      if (message === 'Unauthorized') {
        setErrorStyle({ display: 'block' })
        setFormErrorMessage(['Sorry!  Login failed.', 'Let someone (me) know if you need a reset.']);
      } else if (message === 'Invalid') {
        setErrorStyle({ display: 'block' })
        setFormErrorMessage(tempErrorMessages)
      }
    }
  }

  const handleSignUpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    tempErrorMessages = []
    try {
      e.preventDefault()

      if (username === '' || username === undefined) {
        tempErrorMessages.push('User name is blank.')
      } else if (username.length < 6) {
        tempErrorMessages.push('User name must be at least 6 characters.')
      }
      if (firstName === '' || firstName === undefined) {
        tempErrorMessages.push('First name is blank.')
      }
      if (lastName === '' || lastName === undefined) {
        tempErrorMessages.push('Last name is blank')
      }
      if (password === '' || password === undefined) {
        tempErrorMessages.push('Password is blank.')
      } else if (password.length < 6) {
        tempErrorMessages.push('Password must be at least 6 characters.')
      }
      if (confirmPassword === '' || confirmPassword === undefined) {
        tempErrorMessages.push('Password confirmation is blank.')
      }
      if (password !== confirmPassword) {
        tempErrorMessages.push('Password does not match confirm password.')
      }
      if (tempErrorMessages.length > 0) {
        throw Error('Invalid')
      }

      await UserServices.createUser({
        username,
        firstName,
        lastName,
        password
      }).then(token => setToken(token))

    } catch (err: unknown) {
      let message: string = ''
      if (typeof err === "string")
        message = err
      else if (err instanceof Error)
        message = err.message;
      if (message === 'Conflict') {
        setErrorStyle({ display: 'block' })
        setFormErrorMessage(['Sorry!  That User Name already exists.'])
      } else if (message === 'Invalid') {
        setErrorStyle({ display: 'block' })
        setFormErrorMessage(tempErrorMessages)
      }
    }
  }

  if (mode === 'signup') {
    return (
      <div className="login-wrapper">
        <h3>big12pickem.com</h3>
        <form onSubmit={handleSignUpSubmit}>
          <label>
            <p>Username</p>
            <input
              placeholder="User Name / Email"
              onChange={(e) => setUsername(e.target.value)}
              type="text" />
          </label>
          <label>
            <p>First Name</p>
            <input
              placeholder="First name"
              onChange={(e) => setFirstname(e.target.value)}
              type="text" />
          </label>
          <label>
            <p>Last Name</p>
            <input
              placeholder="Last name"
              onChange={(e) => setLastname(e.target.value)}
              type="text" />
          </label>
          <label>
            <p>Password</p>
            <input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password" />
          </label>
          <label>
            <p>Confirm Password</p>
            <input
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password" />
          </label>
          <p>
            <button type="submit">Sign Up</button>
            <button
              className="toggleLogin"
              onClick={handleLoginClick}
              style={{ display: 'inline', marginLeft: '1em' }}>back to sign in</button>
          </p>
        </form>
        <div className="login-error" style={errorStyle}>
          <FormErrorMessage errorMessages={formErrorMessage} />
        </div>
      </div>
    );
  } else if (mode === 'login') {
    return (
      <div className="login-wrapper">
        <p>big12pickem.com</p>
        <form onSubmit={handleLoginSubmit}>
          <label>
            <p>Username</p>
            <input
              placeholder="User Name / Email"
              onChange={(e) => setUsername(e.target.value)}
              type="text" />
          </label>
          <label>
            <p>Password</p>
            <input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password" />
          </label>
          <p>
            <button type="submit" name="submit">Sign In</button>
            <button
              className="toggleLogin"
              onClick={handleSignUpClick}
              style={{ display: 'inline', marginLeft: '1em' }}>or sign up</button>
          </p>
        </form>
        <div className="login-error" style={errorStyle}>
          <FormErrorMessage errorMessages={formErrorMessage} />
        </div>
      </div>
    );
  }
}

interface IFormErrorMessageProps {
  errorMessages: string[];
}

function FormErrorMessage(props: IFormErrorMessageProps) {
  let errorCount = 0;
  const errorMessages = props.errorMessages.map((message: string) => {
    errorCount++;
    return <li key={errorCount}>{message}</li>
  })
  return (
    <ul className="login-error-messages">
      {errorMessages}
    </ul>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}