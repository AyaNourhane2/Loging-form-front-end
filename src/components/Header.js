import React, { useEffect, useState } from 'react'; // Import des hooks React
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import des composants de routage
import '../App.css'; // Import des styles CSS

const Header = () => {
  // Hook pour obtenir l'emplacement actuel de la route
  const location = useLocation();
  // État pour stocker les données de l'utilisateur
  const [userData, setUserData] = useState(null);
  // Hook pour naviguer programmatiquement
  const navigate = useNavigate();

  // Effet qui s'exécute lorsque l'emplacement change
  useEffect(() => {
    // Délai pour s'assurer que les données sont disponibles
    setTimeout(() => {
      getData(); // Appel de la fonction pour récupérer les données de l'utilisateur
    }, 200);
  }, [location]); // Déclencheur : changement de l'emplacement

  // Fonction pour récupérer les données de l'utilisateur depuis le sessionStorage
  const getData = async () => {
    const data = await JSON.parse(sessionStorage.getItem('userData')); // Récupération des données
    if (data && data.isLoggedIn) {
      setUserData(data.userData); // Mise à jour de l'état avec les données de l'utilisateur
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    sessionStorage.clear(); // Suppression des données du sessionStorage
    setUserData(''); // Réinitialisation des données de l'utilisateur
    navigate('/'); // Redirection vers la page d'accueil
  };

  return (
    <nav className="navbar">
      {/* Logo de l'application */}
      <div className="navbar-logo">
        <i className="fas fa-briefcase logo-icon"></i> {/* Icône du logo */}
        <span className="logo-text">RoyelStay</span> {/* Texte du logo */}
      </div>

      {/* Liens de navigation */}
      <ul className="navbar-links">
        {/* Lien vers la page d'accueil */}
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        </li>

        {/* Lien vers la page des emplois */}
        <li>
          <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>Jobs</Link>
        </li>

        {/* Affichage conditionnel en fonction de la connexion de l'utilisateur */}
        {userData ? (
          // Si l'utilisateur est connecté
          <>
            {/* Lien vers le profil de l'utilisateur */}
            <li className="navbar-profile">
              <Link to="/homeScreen" className={location.pathname === '/homeScreen' ? 'active' : ''}>
                <img src={require('../img1.png')} alt="Profile" className="profile-photo-circle" /> {/* Photo de profil */}
                <span className="username">{userData.name}</span> {/* Nom de l'utilisateur */}
              </Link>
            </li>

            {/* Bouton de déconnexion */}
            <li>
              <i className="fas fa-sign-out-alt logo-icon" style={{ cursor: 'pointer' }} onClick={logout}></i>
            </li>
          </>
        ) : (
          // Si l'utilisateur n'est pas connecté
          <>
            {/* Lien vers la page de connexion */}
            <li>
              <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>
            </li>

            {/* Lien vers la page d'inscription */}
            <li>
              <Link to="/signup" className={location.pathname === '/signup' ? 'active' : ''}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header; // Export du composant Header