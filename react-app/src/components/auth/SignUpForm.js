import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
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
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(firstname, lastname, username, email, password));
      if (data) {
        setErrors(data)
      }
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

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className="signUpContainer">
      <div className='left-Border-sign'></div>
      <div className='right-border'>

        <form onSubmit={onSignUp} className='signUpform'>
          <div >
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="fullname">
            <div className='contDiv'>
              <label>First Name</label>
              <input
                className='fullnameSign first'
                type='text'
                name='firstname'
                onChange={updateFirstname}
                value={firstname}
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
            ></input>
          </div>
          <div className='contDiv'>
            <label>Password</label>
            <input
              className='videofield strings'
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div className='contDiv'>
            <label>Confirm Password</label>
            <input
              className='videofield strings'
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit'
            className="submitLoginBtn">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
