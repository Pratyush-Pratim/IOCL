import React, { useState, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setloggedInUser] = useState('');

  useEffect(()=>{
    setloggedInUser(localStorage.getItem('loggedInUser'))
  },[])

  const navigate = useNavigate()
  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser')
    handleSuccess('user Logged out')
    setTimeout(() => {
      navigate('/login')
    }, 1000);
  }
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logut</button>

      <ToastContainer/>
    </div>
  )

}

export default Home
