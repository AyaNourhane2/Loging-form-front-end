// src/components/RoleDetails.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleDetails = () => {
    const navigate = useNavigate();

    const handleEmployeeInfoClick = () => {
        navigate('/employee-info'); // Redirection vers la page EmployeeInfo
    };

    return (
        <div>
            <h2>Détails du Rôle</h2>
            <button 
                onClick={handleEmployeeInfoClick}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#88B04B',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Information Employés
            </button>
        </div>
    );
};

export default RoleDetails;