import React from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la navigation
import coverImage from '../asset/image2.jpg'; // Importer l'image

function Home() {
    const navigate = useNavigate(); // Hook pour la navigation vers une autre page
    
    const homeStyle = {
        backgroundImage: `url(${coverImage})`, // Définir l'image de fond
        backgroundSize: 'cover', // Ajuster la taille de l'image
        backgroundPosition: 'center', // Centrer l'image
        height: '100vh', // Prend toute la hauteur de l'écran
        display: 'flex',
        flexDirection: 'column', // Empiler les éléments verticalement
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Texte en blanc pour contraste
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Effet d'ombre sur le texte
        textAlign: 'center' // Centrer le texte
    };

    // Fonction pour naviguer vers la page Plus Information
    const handleLearnMoreClick = () => {
        navigate('/plus-information'); // Naviguer vers la page Plus Information
    };

    return (
        <div style={homeStyle}>
            <h2>
                <strong style={{ fontSize: '3rem' }}>RoyalStay</strong> {/* Nom de l'hôtel en gras et agrandi */}
            </h2>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Bienvenue à RoyalStay – Élégance, confort et service sur mesure pour un séjour inoubliable.</h3> {/* Description en h3 */}
           
            <button 
                onClick={handleLearnMoreClick} 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#ff8c00',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                Learn More
            </button> {/* Bouton "Learn More" */}
        </div>
    );
}

export default Home;
