import React, { useState, useEffect } from 'react';
import presentationImage from '../asset/presentation.jpg';
import menuImage from '../asset/menu.jpg';
import chefImage from '../asset/chef.jpg';
import contactImage from '../asset/contact.jpg';
import feedbackImage from '../asset/feedback.jpg';
import experienceImage from '../asset/experience.jpg';
import serviceDisponibleImage from '../asset/service-disponible.jpg';

const LearnMore = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState([]); // État pour stocker les commentaires
  const [message, setMessage] = useState(''); // État pour afficher les messages

  // Commentaire statique
  const staticFeedback = {
    id: 0,
    user_id: 1,
    comment: "Un service exceptionnel et une cuisine délicieuse. Nous reviendrons certainement !",
    rating: 5,
  };

  // Charger les commentaires depuis l'API
  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/feedbacks/get-feedbacks');
      const data = await response.json();
      if (data.success) {
        setFeedbacks(data.feedbacks);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des feedbacks:', error);
      setMessage('Échec de la récupération des feedbacks');
    }
  };

  // Ajouter un commentaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment || rating < 1 || rating > 5) {
      setMessage('Veuillez fournir un commentaire et une note valide (1-5).');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/feedbacks/add-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: 1, // Remplacez par l'ID de l'utilisateur connecté
          comment,
          rating,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Merci pour votre feedback !');
        setComment('');
        setRating(0);
        fetchFeedbacks(); // Recharger les commentaires après l'ajout
      } else {
        setMessage('Échec de l\'ajout du feedback.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du feedback:', error);
      setMessage('Échec de l\'ajout du feedback.');
    }
  };

  // Charger les commentaires au montage du composant
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div style={containerStyle}>
      {/* Section 1 : Présentation du Restaurant */}
      <div style={sectionStyle}>
        <h2 style={titleStyle}>Présentation du Restaurant</h2>
        <img
          src={presentationImage}
          alt="Ambiance du restaurant"
          style={imageStyle}
        />
        <p style={descriptionStyle}>
          Une expérience gastronomique où saveurs exquises et cadre élégant se rencontrent.
        </p>
      </div>

      {/* Section 2 : Menu et Spécialités */}
      <div style={{ ...sectionStyle, backgroundColor: '#f9f9f9' }}>
        <h2 style={{ ...titleStyle, color: '#e74c3c' }}>Menu et Spécialités</h2>
        <img
          src={menuImage}
          alt="Plat gastronomique"
          style={{ ...imageStyle, maxWidth: '500px', border: '4px solid #e74c3c' }}
        />
        <p style={{ ...descriptionStyle, color: '#333' }}>
          Découvrez notre sélection de mets raffinés, préparés avec des ingrédients de première qualité.
        </p>
      </div>

      {/* Section 3 : Expérience Culinaire et Ambiance */}
      <div style={{ ...sectionStyle, backgroundColor: '#ecf0f1' }}>
        <h2 style={{ ...titleStyle, color: '#2980b9' }}>Expérience Culinaire et Ambiance</h2>
        <img
          src={experienceImage}
          alt="Terrasse avec vue"
          style={{ ...imageStyle, maxWidth: '400px', borderRadius: '20px' }}
        />
        <p style={{ ...descriptionStyle, fontStyle: 'italic' }}>
          Un cadre chaleureux avec une vue imprenable pour sublimer chaque repas.
        </p>
      </div>

      {/* Section 4 : Chef et Équipe */}
      <div style={{ ...sectionStyle, backgroundColor: '#fff', padding: '30px' }}>
        <h2 style={{ ...titleStyle, color: '#27ae60' }}>Chef et Équipe</h2>
        <img
          src={chefImage}
          alt="Chef en cuisine"
          style={{ ...imageStyle, maxWidth: '300px', width: '70%', margin: '0 auto' }}
        />
        <p style={{ ...descriptionStyle, fontWeight: 'bold' }}>
          Notre chef étoilé met en avant un savoir-faire d’exception pour ravir vos papilles.
        </p>
      </div>

      {/* Section 5 : Services Disponibles */}
      <div style={{ ...sectionStyle, backgroundColor: '#f1c40f', color: '#fff' }}>
        <h2 style={{ ...titleStyle, color: '#fff' }}>Services Disponibles</h2>
        <img
          src={serviceDisponibleImage}
          alt="Services disponibles"
          style={{ ...imageStyle, maxWidth: '500px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)' }}
        />
        <ul style={listStyle}>
          <li style={listItemStyle}>Wi-Fi gratuit</li>
          <li style={listItemStyle}>Service de chambre 24/7</li>
          <li style={listItemStyle}>Spa et centre de bien-être</li>
          <li style={listItemStyle}>Piscine extérieure</li>
          <li style={listItemStyle}>Restaurant et bar</li>
        </ul>
      </div>

      {/* Section 6 : Feedback */}
      <div style={{ ...sectionStyle, backgroundColor: '#9b59b6', color: '#fff' }}>
        <h2 style={{ ...titleStyle, color: '#fff' }}>Feedback</h2>
        <img
          src={feedbackImage}
          alt="Feedback des clients"
          style={{ ...imageStyle, maxWidth: '200px', borderRadius: '50%', width: '200px', height: '200px' }}
        />
        <p style={{ ...descriptionStyle, fontStyle: 'italic' }}>
          "Un service exceptionnel et une cuisine délicieuse. Nous reviendrons certainement !"
        </p>

        {/* Commentaire statique */}
        <div style={feedbackCardStyle}>
          <p style={commentStyle}>{staticFeedback.comment}</p>
          <div style={ratingStyle}>
            {Array.from({ length: staticFeedback.rating }, (_, i) => (
              <span key={i} style={starStyle}>
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Liste des commentaires ajoutés */}
        {feedbacks.map((feedback) => (
          <div key={feedback.id} style={feedbackCardStyle}>
            <p style={commentStyle}>{feedback.comment}</p>
            <div style={ratingStyle}>
              {Array.from({ length: feedback.rating }, (_, i) => (
                <span key={i} style={starStyle}>
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}

        {/* Formulaire de feedback */}
        <form onSubmit={handleSubmit} style={feedbackFormStyle}>
          <div style={starRatingStyle}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  cursor: 'pointer',
                  color: star <= rating ? '#ffc107' : '#e4e5e9',
                  fontSize: '2rem',
                }}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Écrivez votre commentaire ici..."
            style={commentBoxStyle}
          />
          <button type="submit" style={submitButtonStyle}>
            Publier
          </button>
        </form>

        {/* Message de succès ou d'erreur */}
        {message && <p style={messageStyle}>{message}</p>}
      </div>

      {/* Section 7 : Contact */}
      <div style={{ ...sectionStyle, backgroundColor: '#34495e', color: '#fff' }}>
        <h2 style={{ ...titleStyle, color: '#fff' }}>Contact</h2>
        <img
          src={contactImage}
          alt="Contactez-nous"
          style={{ ...imageStyle, maxWidth: '400px', border: '2px solid #fff' }}
        />
        <p style={descriptionStyle}>
          Email: contact@royalstay.com<br />
          Téléphone: +1 234 567 890<br />
          Adresse: 123 Rue de Luxe, Paris, France
        </p>
      </div>
    </div>
  );
};

// Styles de base
const containerStyle = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const sectionStyle = {
  padding: '40px',
  marginBottom: '30px',
  borderRadius: '10px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '2rem',
  marginBottom: '20px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  fontWeight: 'bold',
};

const descriptionStyle = {
  fontSize: '1.2rem',
  lineHeight: '1.6',
  marginBottom: '20px',
};

const imageStyle = {
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  borderRadius: '10px',
  marginBottom: '20px',
  objectFit: 'cover',
};

const feedbackFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  marginTop: '20px',
};

const starRatingStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const commentBoxStyle = {
  width: '100%',
  maxWidth: '500px',
  height: '100px',
  padding: '10px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  fontFamily: 'Arial, sans-serif',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#27ae60',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
};

const listStyle = {
  listStyleType: 'none',
  padding: '0',
  textAlign: 'left',
  display: 'inline-block',
};

const listItemStyle = {
  fontSize: '1.2rem',
  marginBottom: '10px',
  paddingLeft: '20px',
  position: 'relative',
};

const feedbackCardStyle = {
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '10px',
  marginBottom: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  color: '#000',
};

const commentStyle = {
  fontSize: '1rem',
  lineHeight: '1.6',
  marginBottom: '10px',
};

const ratingStyle = {
  display: 'flex',
  gap: '5px',
};

const starStyle = {
  fontSize: '1.5rem',
  color: '#ffc107',
};

const messageStyle = {
  textAlign: 'center',
  color: '#27ae60',
  marginTop: '10px',
};

export default LearnMore;