import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import default CSS for toastify
import UserHomeScreen from "./pages/UserHomeScreen";

// Import lazy-loaded components
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Importing the PlusInformation page
const PlusInformation = lazy(() => import("./pages/PlusInformation"));

// Importing the EmployeeInfo page
const EmployeeInfo = lazy(() => import("./pages/EmployeeInfo"));

// Importing the RoleDetails page (si nécessaire)
const RoleDetails = lazy(() => import("./pages/RoleDetails"));

const App = () => {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/homeScreen" element={<UserHomeScreen />} />
          <Route path="/plus-information" element={<PlusInformation />} /> {/* Route existante */}
          <Route path="/employee-info" element={<EmployeeInfo />} /> {/* Nouvelle route pour EmployeeInfo */}
          <Route path="/role/:role" element={<RoleDetails />} /> {/* Nouvelle route pour RoleDetails (si nécessaire) */}
          <Route path="*" element={<NotFound />} /> {/* Route pour la page 404 */}
        </Routes>
      </Suspense>
      <ToastContainer 
        position="top-center" 
        autoClose={1000} 
        hideProgressBar={true} 
        closeOnClick 
        theme="colored" 
      />
    </Router>
  );
};

export default App;