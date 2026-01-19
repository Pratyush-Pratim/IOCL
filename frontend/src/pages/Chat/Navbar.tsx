import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../../utils';

interface NavbarProps {
  onMenuClick: () => void
}

function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    
    handleSuccess('Logged out successfully');

    setTimeout(() => {
        navigate('/login');
        window.location.reload();
    }, 1000);
  };

  return (
   <header className="navbar">
  <div className="menu-btn" id="openMenu" 
    title='SideMenu'
    onClick={onMenuClick}>
    <i className="fa-solid fa-list" aria-hidden="true" />
    <span className="sr-only">Toggle menu</span>
  </div>

 <div className="navbar-logo-container">
        <img 
          src="/logo.svg"  
          alt="IOCL Logo" 
          className="navbar-logo-img" 
        />
      </div>

  <div
    className="acc"
    aria-label="Logout"
    title = "Logout"
    onClick={handleLogout}
    style={{ cursor: 'pointer' }}
  >
    <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
  </div>
</header>

  )
}

export default Navbar