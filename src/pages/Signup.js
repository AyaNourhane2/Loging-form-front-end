import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";
import coverImage from "../asset/image-hotel.webp";

const SignUp = () => {
  // Déclaration des états pour les valeurs du formulaire, les erreurs et le champ focalisé
  const [formValues, setFormValues] = useState(new UserModel({}));
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  // Fonction de validation du formulaire
  const validateForm = () => {
    const errors = {};
    // Validation pour le nom d'utilisateur
    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username = "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }
    // Validation pour l'email
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Please enter a valid email address";
    }
    // Validation pour le numéro de téléphone
    if (!formValues.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = "Mobile number should be 10 digits";
    }
    // Validation pour le mot de passe
    if (!formValues.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        // Envoi des données au backend pour l'enregistrement
        const response = await axios.post("http://localhost:3000/api/auth/register-user", formValues);
        if (response.data.success) {
          toast.success(response.data.message || "Registration successful!");
          setFormValues({ username: "", email: "", mobile: "", password: "" });
          setFormErrors({});
        } else {
          toast.error(response.data.message || "Registration failed!");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        toast.error(error.response?.data?.message || "Something went wrong. Please try again later.");
      }
    } else {
      setFormErrors(errors);
    }
  };

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.signUpContainer}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Génération des champs du formulaire */}
          {["username", "email", "mobile", "password"].map((field) => (
            <div className="form-group" key={field}>
              <label style={styles.label}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={`Enter your ${field}`}
                value={formValues[field]}
                onChange={handleInputChange}
                style={focusedField === field ? { ...styles.inputField, ...styles.inputFieldFocus } : styles.inputField}
                onFocus={() => setFocusedField(field)}
                onBlur={() => setFocusedField(null)}
              />
              {formErrors[field] && <span className="error-message">{formErrors[field]}</span>}
            </div>
          ))}
          <button type="submit" style={styles.submitButton}>Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/login" className="toggle-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

// Styles CSS pour la page d'inscription
const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${coverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpContainer: {
    width: "320px",
    background: "rgba(0, 119, 182, 0.7)", // Couleur de fond bleu légèrement transparent
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  title: {
    fontWeight: "bold",
    textDecoration: "underline",
    textUnderlineOffset: "5px",
    color: "#FFD700", // Jaune doré
    fontStyle: "italic",
  },
  label: {
    fontStyle: "italic",
    display: "block",
    marginBottom: "5px",
  },
  inputField: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "all 0.3s ease-in-out",
  },
  inputFieldFocus: {
    border: "2px solid #FFD700", // Couleur de la bordure lorsqu'on sélectionne le champ
    boxShadow: "0px 0px 8px rgba(255, 215, 0, 0.5)", // Ombre dorée lorsque le champ est actif
  },
  submitButton: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    backgroundColor: "#FFD700", // Couleur du bouton
    color: "#000",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
};

export default SignUp;
