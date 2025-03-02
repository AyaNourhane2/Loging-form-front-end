import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserModel from "../model/userModel";
import coverImage from "../asset/cover-photo.jpg";

const SignUp = () => {
  const [formValues, setFormValues] = useState(new UserModel({}));
  const [formErrors, setFormErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const errors = {};
    if (!formValues.username) {
      errors.username = "Username is required";
    } else if (!/^[A-Za-z0-9_]{3,15}$/.test(formValues.username)) {
      errors.username = "Username should be 3-15 characters long and can only contain letters, numbers, and underscores.";
    }
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formValues.mobile) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formValues.mobile)) {
      errors.mobile = "Mobile number should be 10 digits";
    }
    if (!formValues.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.imageContainer}></div>
      <div style={styles.signUpContainer}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
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

const styles = {
  pageContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
  },
  imageContainer: {
    flex: 1,
    backgroundImage: `url(${coverImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  signUpContainer: {
    width: "350px",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "50px",
  },
  title: {
    fontWeight: "bold",
    textDecoration: "underline",
    textUnderlineOffset: "5px",
    textDecorationStyle: "solid",
    color: "green",
    fontStyle: "italic",
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
    fontStyle: "italic",
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
};

export default SignUp;