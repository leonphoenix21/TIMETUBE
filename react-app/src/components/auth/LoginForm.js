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
  const Homepage = () => {
    return history.push('/home')
  }

  return (
    <body className='loginBody'>
      <div className='loginContainer'>
        <div className='login-right-border'>
          <form onSubmit={onLogin} className='loginForm'>
            <div className='errors'>
              {errors.map((error, ind) => (
                <div key={ind} className='eachError'>{error}</div>
              ))}
            </div>
            <div className="timetube" onClick={Homepage}>
              <h2 >
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
            <h2 className="logInheader"> Sign In </h2>
            <p className='logInContinue'> to continue to TimeTube</p>

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
