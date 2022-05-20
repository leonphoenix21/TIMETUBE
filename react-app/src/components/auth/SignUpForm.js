import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [signupActive, setSignUpActivity] = useState(false)
  const [showPassError, setShowPassError] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      setShowPassError(false)
      const data = await dispatch(signUp(firstname, lastname, username, email, password, repeatPassword));
      if (data) {
        setErrors(data)
      }
    } else {
      setShowPassError(true)
      setPassword('')
      setRepeatPassword('')
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };
  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };
  const updateLastname = (e) => {
    setLastname(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateActivity = (e) => {
    if (password === e.target.value) {
      setSignUpActivity(false)
    } else {
      setSignUpActivity(true)
    }
  }



  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <body className='body'>
      <div className="signUpContainer">
        <div className='right-border'>
          <form onSubmit={onSignUp} className='signUpform'>
            {showPassError && <div className='eachError'>Passwords do not match</div>}
            <div className='errors'>
              {errors.map((error, ind) => (
                <div key={ind} className='eachError'>{error}</div>
              ))}
            </div>
            <h2 className="signUpheader"> Sign Up </h2>
            <div className="fullname">
              <div className='contDiv'>
                <label>First Name</label>
                <input
                  className='fullnameSign first'
                  type='text'
                  name='firstname'
                  onChange={updateFirstname}
                  value={firstname}
                  required
                ></input>
              </div >
              <div className='contDiv'>
                <label>Last Name</label>
                <input
                  className='fullnameSign last'
                  type='text'
                  name='lastname'
                  onChange={updateLastname}
                  value={lastname}
                  required
                ></input>
              </div>
            </div>

            <div className='contDiv'>
              <label>User Name</label>
              <input
                className='videofield strings'
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                required
              ></input>
            </div>
            <div className='contDiv'>
              <label>Email</label>
              <input
                className='videofield strings'
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                required
              ></input>
            </div>
            <div className='contDiv'>
              <label>Password</label>
              <input
                className='videofield strings'
                type='password text'
                name='password'
                onChange={updatePassword}
                value={password}
                required
              ></input>
            </div>
            <div className='contDiv'>
              <label>Confirm Password</label>
              <input
                className='videofield strings'
                type='password'
                name='repeat_password'
                onChange={(e) => (
                  updateRepeatPassword(e),
                  updateActivity(e)
                )}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button type='submit'
              className="signUpbtn">
              Sign Up
            </button>
            <span className='signupnav'>   <NavLink to='/sign-up' > Already have an account </NavLink></span>
          </form>
        </div>
      </div>
    </body>
  );
};

export default SignUpForm;
