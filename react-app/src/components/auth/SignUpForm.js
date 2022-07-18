import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './auth.css'

const SignUpForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [signupActive, setSignUpActivity] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {

    if (firstname.length > 25) return setErrors(['firstname must be less than 25 characters'])
    if (lastname.length > 25) return setErrors(['lastname must be less than 25 characters'])
    if (username.length > 25) return setErrors(['username must be less than 25 characters'])
    if (lastname.trim().length === 0) return setErrors(['add lastname'])
    if (firstname.trim().length === 0) return setErrors(['add firstname'])
    if (username.trim().length === 0) return setErrors(['add username'])

    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstname, lastname, username, email, password, repeatPassword));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords do not match'])
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

  const Homepage = () => {
    return history.push('/home')
  }

  return (
    <body className='body'>
      <div className="signUpContainer">
        <form onSubmit={onSignUp} className='signUpform'>
          <div className='errors'>
            {errors.map((error, ind) => (
              <div key={ind} className='eachError'>{error}</div>
            ))}
          </div>
          <div className="timetube" style={{ marginTop: '10px', marginBottom: '-35px', marginLeft: '-10px' }} onClick={Homepage}>
            <h2 style={{ position: 'relative' }}>
              <span style={{ color: 'blue' }}>t</span>
              <span style={{ color: 'rgb(255, 3, 238)', marginLeft: '1px' }}>i</span>
              <span style={{ color: 'green', marginLeft: '1px' }}>m</span>
              <span style={{ color: 'black', marginLeft: '1px' }}>e</span>
              <span style={{ color: 'red', marginLeft: '1px' }}>t</span>
              <span style={{ color: 'orange', marginLeft: '1px' }}>u</span>
              <span style={{ color: 'rgb(10, 189, 254)', marginLeft: '1px' }}>b</span>
              <span style={{ color: 'orange', marginLeft: '1px' }}>e</span>
            </h2>
          </div>
          <h2 className="signUpheader"> Sign Up </h2>
          <p className='logInContinue'> to continue to TimeTube</p>
          <div className="fullname">
            <div className='contDiv' >
              <label className='inputLabel' >First Name</label>
              <input
                // className=' fullnameSign first signFullnameInput'
                style={{ marginRight: '10px' }}
                className=' signFullnameInput'
                type='text'
                name='firstname'
                onChange={updateFirstname}
                value={firstname}
                required
              ></input>
            </div >
            <div className='contDiv'>
              <label className='inputLabel' >Last Name</label>
              <input
                // className='fullnameSign last'
                className=' signFullnameInput'
                type='text'
                name='lastname'
                onChange={updateLastname}
                value={lastname}
                required
              ></input>
            </div>
          </div>

          <div className='contDiv'>
            <label className='inputLabel' >Channel Name</label>
            <input
              className='signField'
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              required
            ></input>
          </div>
          <div className='contDiv'>
            <label className='inputLabel' >Email</label>
            <input
              className='signField'
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className='contDiv'>
            <label className='inputLabel' >Password</label>
            <input
              className='signField'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className='contDiv'>
            <label className='inputLabel' >Confirm Password</label>
            <input
              className='signField'
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
          <span ><NavLink to='/login' className='toLogin' >
            <span className="haveAccount">have an account?
            </span> Sign In </NavLink> </span>
        </form>
      </div>
    </body>
  );
};

export default SignUpForm;
