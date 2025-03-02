

import axios from "axios"; // Import d'axios pour effectuer des requêtes HTTP
import React, { useState } from "react"; // Import de React et du hook useState
import { Link, useNavigate } from "react-router-dom"; // Import des composants de routage
import { toast } from "react-toastify"; // Import de toast pour afficher des notifications

import coverPhoto from "../asset/image-hotel.webp"; // Import de l'image de fond

const Login = () => {
  // États pour gérer les champs du formulaire et les erreurs
  const [email, setEmail] = useState(""); // État pour l'email
  const [password, setPassword] = useState(""); // État pour le mot de passe
  const [errors, setErrors] = useState({}); // État pour stocker les erreurs de validation
  const [focusedField, setFocusedField] = useState(null); // État pour gérer le champ en focus (non utilisé dans ce code)
  const navigate = useNavigate(); // Hook pour naviguer programmatiquement

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const errors = {}; // Objet pour stocker les erreurs
    if (!email) {
      errors.email = "Email is required"; // Erreur si l'email est vide
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"; // Erreur si l'email est invalide
    }
    if (!password) {
      errors.password = "Password is required"; // Erreur si le mot de passe est vide
    }
    return errors; // Retourne les erreurs
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const validationErrors = validateForm(); // Valide le formulaire
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Affiche les erreurs de validation
      return;
    }

    try {
      // Envoie une requête POST pour se connecter
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login successful!"); // Affiche un message de succès
        sessionStorage.setItem("authToken", response.data.token); // Stocke le token dans le sessionStorage
        navigate("/homeScreen"); // Redirige vers la page d'accueil
      } else {
        toast.error(response.data.message || "Login failed"); // Affiche un message d'erreur
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again later." // Affiche un message d'erreur générique
      );
    }
  };

  // Rendu du composant
  return (
    <div style={styles.pageContainer}>
      {/* Overlay pour assombrir l'image de fond */}
      <div style={styles.overlay}>
        {/* Conteneur du formulaire de connexion */}
        <div style={styles.loginContainer}>
          <h2 style={styles.title}>Login</h2> {/* Titre du formulaire */}
          <form onSubmit={handleSubmit}>
            {/* Champ pour l'email */}
            <div className="form-group">
              <label style={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Met à jour l'état de l'email
                style={styles.inputField}
              />
              {errors.email && <span className="error-message">{errors.email}</span>} {/* Affiche l'erreur de l'email */}
            </div>

            {/* Champ pour le mot de passe */}
            <div className="form-group">
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Met à jour l'état du mot de passe
                style={styles.inputField}
              />
              {errors.password && <span className="error-message">{errors.password}</span>} {/* Affiche l'erreur du mot de passe */}
            </div>

            {/* Bouton de soumission */}
            <button type="submit" style={styles.submitButton}>Login</button>
          </form>

          {/* Lien vers la page d'inscription */}
          <p style={{ textAlign: "center" }}>
            Don't have an account? {" "}
            <Link to="/signUp" style={styles.link}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// Styles pour le composant
const styles = {
  pageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh", // Prend toute la hauteur de la page
    backgroundImage: `url(${coverPhoto})`, // Image de fond
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay sombre
  },
  loginContainer: {
    width: "320px",
    background: "rgba(0, 119, 182, 0.7)", // Fond semi-transparent
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Ombre
    display: "flex",
    flexDirection: "column",
    color: "white",
    fontStyle: "italic",
    textDecoration: "underline",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "#28a745", // Couleur du titre
    fontSize: "24px",
    marginBottom: "15px",
    fontStyle: "italic",
    textDecoration: "underline",
  },
  label: {
    marginBottom: "5px",
    display: "block",
    fontStyle: "italic",
    textDecoration: "underline",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "10px",
    fontStyle: "italic",
    textDecoration: "underline",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#28a745", // Couleur du bouton
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
    fontStyle: "italic",
    textDecoration: "underline",
  },
  link: {
    color: "#28a745", // Couleur du lien
    textDecoration: "underline",
    fontStyle: "italic",
  },
};

export default Login; // Export du composant Login
