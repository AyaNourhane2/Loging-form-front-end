import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import coverPhoto from "../asset/cover-photo.jpg"; // Importation de l'image

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  // Validation function for email and password
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Login successful!");
        const token = response.data.token;
        sessionStorage.setItem("authToken", token);
        navigate("/homeScreen");
        fetchUserDetails();
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again later."
      );
    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = sessionStorage.getItem("authToken");

      if (!token) {
        return;
      }

      const response = await axios.get("http://localhost:3000/api/auth/get-userDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log(response.data.user);
      } else {
        console.log(response.data.message || "Failed to fetch user details");
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Section image de fond */}
      <div style={styles.imageContainer}></div>

      {/* Section formulaire */}
      <div style={styles.loginContainer}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={
                focusedField === "email"
                  ? { ...styles.inputField, ...styles.inputFieldFocus }
                  : styles.inputField
              }
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={
                focusedField === "password"
                  ? { ...styles.inputField, ...styles.inputFieldFocus }
                  : styles.inputField
              }
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          <button type="submit" style={styles.submitButton}>
            Login
          </button>
        </form>

        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/signUp" className="toggle-link" style={styles.link}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Styles pour l'alignement et l'image de fond
const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
  },
  imageContainer: {
    flex: 1,
    backgroundImage: `url(${coverPhoto})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  loginContainer: {
    width: "350px",
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "50px",
  },
  title: {
    color: "green",
    fontStyle: "italic",
    textDecoration: "underline",
  },
  label: {
    fontStyle: "italic",
    textDecoration: "underline",
    display: "block",
    marginBottom: "5px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "5px",
    outline: "none",
    transition: "all 0.3s ease-in-out",
  },
  inputFieldFocus: {
    border: "2px solid #007BFF",
    boxShadow: "0px 0px 8px rgba(0, 123, 255, 0.5)",
    transform: "scale(1.02)",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    fontStyle: "italic",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  link: {
    color: "#007BFF",
    textDecoration: "underline",
    fontStyle: "italic",
  },
};

export default Login;