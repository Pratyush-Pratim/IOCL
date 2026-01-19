import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

// 1. Accept setisAuthenticated as a prop here
function Login({ setisAuthenticated }) { 
  const [LoginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginInfo((prev) => ({
//         ...prev,
//         [name]: value
//     }));
// };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError('email, password are required');
    }
    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(LoginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;

      if (success) {
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUser', name);


        setisAuthenticated(true); 

        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError("An error occurred during login");
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
            onChange={handleChange}
            type='email'
            name='email'
            value={LoginInfo.email}
            placeholder='Enter Your Email' 
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
            onChange={handleChange}
            type='password'
            name='password'
            value={LoginInfo.password}
            placeholder='Enter Your Password' 
          />
        </div>
        <button type='submit'>Login</button>
        <span>Don't have an Account ?
          <Link to='/signup'>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;