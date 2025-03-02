import React from 'react';
import coverImage from '../asset/cover-photo.jpg'; // Importer l'image

function Home() {
    const homeStyle = {
        backgroundImage: `url(${coverImage})`, // Définir l'image de fond
        backgroundSize: 'cover', // Ajuster la taille de l'image
        backgroundPosition: 'center', // Centrer l'image
        height: '100vh', // Prend toute la hauteur de l'écran
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Texte en blanc pour contraste
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' // Effet d'ombre sur le texte
    };

    return (
        <div style={homeStyle}>
            <h2>Welcome to our Application!!!</h2>
        </div>
    );
}

export default Home;
