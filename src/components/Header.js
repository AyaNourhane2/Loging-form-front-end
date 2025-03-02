import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

const Header = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 200);
  }, [location]);

  const getData = async () => {
    const data = await JSON.parse(sessionStorage.getItem('userData'));
    if (data && data.isLoggedIn) {
      setUserData(data.userData);
    }
  };

  const logout = () => {
    sessionStorage.clear();
    setUserData('');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <i className="fas fa-briefcase logo-icon"></i>
        <span className="logo-text">PMS System</span>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>Jobs</Link>
        </li>
        {userData ? (
          <>
            <li className="navbar-profile">
              <Link to="/homeScreen" className={location.pathname === '/homeScreen' ? 'active' : ''}>
                <img src={require('../img1.png')} alt="Profile" className="profile-photo-circle" />
                <span className="username">{userData.name}</span>
              </Link>
            </li>
            <li>
              <i className="fas fa-sign-out-alt logo-icon" style={{ cursor: 'pointer' }} onClick={logout}></i>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            </li>
            <li>
              <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
