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
    return <Redirect to='/' />;
  }

  const demoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
    if (data) {
      setErrors(data);
      return;
    }
    history.push("/");
  };

  return (
    <div className='loginContainer'>
      <div className='left-Border'>
      </div>
      <div className='right-border'>
        <form onSubmit={onLogin} className='loginForm'>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='contDiv'>
            {/* <label htmlFor='email'>Email</label> */}
            <input
              className='videofield strings'
              name='email'
              type='text'
              placeholder='email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='contDiv'>
            {/* <label htmlFor='password'>Password</label> */}
            <input
              className='videofield strings'
              name='password'
              type='password'
              placeholder='password'
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div className='loginBtns contDiv'>
            <button type='submit'
              className="submitLoginBtn">
              Login
            </button>
            <button
              className="submitLoginBtn"
              type="submit"
              id="demoUserBtn"
              onClick={demoLogin}
            >
              Demo User
            </button>
          </div>
          <span className='navlinks loginnav'>   <NavLink to='/sign-up' > Already have an account </NavLink></span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
