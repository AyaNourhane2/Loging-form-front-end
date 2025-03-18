import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null); // Suppression des variables inutilisées
  const location = useLocation();
  const navigate = useNavigate();

  // Récupérer les données de l'utilisateur lorsque l'emplacement change
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 200);
  }, [location]);

  // Fonction pour récupérer les données de l'utilisateur depuis le sessionStorage
  const getData = async () => {
    const data = await JSON.parse(sessionStorage.getItem('userData'));
    if (data && data.isLoggedIn) {
      setUserData(data.userData);
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    sessionStorage.clear();
    setUserData(null);
    navigate('/');
  };

  // Fonction pour changer la couleur de fond des liens au survol
  const handleLinkMouseEnter = (event) => {
    event.target.style.backgroundColor = '#8a2be2'; // Changement de couleur au survol
  };

  // Fonction pour réinitialiser la couleur de fond des liens
  const handleLinkMouseLeave = (event) => {
    event.target.style.backgroundColor = 'transparent'; // Retour à la couleur d'origine
  };

  // Fonction pour changer la couleur de fond des liens au clic
  const handleLinkClick = (event) => {
    event.target.style.backgroundColor = '#6a5acd'; // Changement de couleur au clic
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img src={require('../asset/Hotel logo.webp')} alt="Hotel Logo" />
            <span>RoyelStay</span> {/* Nom de l'hôtel */}
          </Link>
        </div>

        {/* Menu de navigation */}
        <nav className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
                onMouseEnter={handleLinkMouseEnter} // Événement de survol
                onMouseLeave={handleLinkMouseLeave} // Événement de sortie du survol
                onClick={handleLinkClick} // Événement de clic
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className={location.pathname === '/jobs' ? 'active' : ''}
                onMouseEnter={handleLinkMouseEnter}
                onMouseLeave={handleLinkMouseLeave}
                onClick={handleLinkClick}
              >
                Jobs
              </Link>
            </li>
            {userData ? (
              <>
                <li className="navbar-profile">
                  <Link
                    to="/homeScreen"
                    className={location.pathname === '/homeScreen' ? 'active' : ''}
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                    onClick={handleLinkClick}
                  >
                    <img src={require('../img1.png')} alt="Profile" className="profile-photo-circle" />
                    <span className="username">{userData.name}</span>
                  </Link>
                </li>
                <li>
                  <i
                    className="fas fa-sign-out-alt logo-icon"
                    style={{ cursor: 'pointer' }}
                    onClick={logout}
                  ></i>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={location.pathname === '/login' ? 'active' : ''}
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className={location.pathname === '/signup' ? 'active' : ''}
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                    onClick={handleLinkClick}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Bouton de menu mobile */}
        <div
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
      </div>
    </header>
  );
};

export default Header;