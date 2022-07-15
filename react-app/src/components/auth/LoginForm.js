import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import './auth.css'
const LoginForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      return;
    }
    history.push("/home");
  };

  return (
    <body className='loginBody'>
      <div className='loginContainer'>
        <div className='login-right-border'>
          <form onSubmit={onLogin} className='loginForm'>
            <h2 className="logInheader"> Sign In </h2>
            <p className='logInContinue'> to continue to TimeTube</p>
            <div className='errors'>
              {errors.map((error, ind) => (
                <div key={ind} className='eachError'>{error}</div>
              ))}
            </div>
            <div className='contDiv'>
              {/* <label htmlFor='email'>Email</label> */}
              <input
                className='logField'
                style={{ marginTop: '70px' }}
                name='email'
                type='text'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='contDiv'>
              {/* <label htmlFor='password'>Password</label> */}
              <input
                className='logField '
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className='loginBtns'>

              <button type='submit'
                className="loginbtn">
                Login
              </button>
              <span style={{ fontSize: '12px', marginLeft: '-10px', marginRight: '-10px' }}>OR</span>
              <button
                className="loginbtn"
                type="submit"
                onClick={demoLogin}
              >
                Demo User
              </button>


            </div>
            <span > <NavLink to='/sign-up' className='loginnav' >  Create Account </NavLink></span>
          </form>
        </div>
      </div>
    </body>
  );
};

export default LoginForm;
