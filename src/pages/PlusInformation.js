import React, { useState, useEffect } from 'react';
import presentationImage from '../asset/presentation.jpg';
import menuImage from '../asset/menu.jpg';
import chefImage from '../asset/chef.jpg';
import contactImage from '../asset/contact.jpg';
import feedbackImage from '../asset/feedback.jpg';
import experienceImage from '../asset/experience.jpg';
import serviceDisponibleImage from '../asset/service-disponible.jpg';
import './LearnMore.css'; // Importez le fichier CSS

const LearnMore = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [message, setMessage] = useState('');
  const [isClicked, setIsClicked] = useState(null); // État pour suivre la carte cliquée

  const staticFeedback = {
    id: 0,
    user_id: 1,
    comment: "Un service exceptionnel et une cuisine délicieuse. Nous reviendrons certainement !",
    rating: 5,
  };

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
          user_id: 1,
          comment,
          rating,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Merci pour votre feedback !');
        setComment('');
        setRating(0);
        fetchFeedbacks();
      } else {
        setMessage('Échec de l\'ajout du feedback.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du feedback:', error);
      setMessage('Échec de l\'ajout du feedback.');
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Gestion du clic sur une carte
  const handleCardClick = (index) => {
    setIsClicked(index);
    setTimeout(() => setIsClicked(null), 300); // Réinitialiser après l'animation
  };

  return (
    <div className="container">
      {/* Section 1 : Présentation du Restaurant */}
      <div className="grid-container">
        <div
          className={`card ${isClicked === 0 ? 'clicked' : ''}`}
          onClick={() => handleCardClick(0)}
        >
          <div className="image-icon-container">
            <img src={presentationImage} alt="Ambiance du restaurant" className="circle-image" />
            <div className="icon-circle">
              <i className="fas fa-utensils"></i> {/* Icône spécifique */}
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">Présentation du Restaurant</h2>
            <p className="card-description">
              Une expérience gastronomique où saveurs exquises et cadre élégant se rencontrent.
            </p>
          </div>
        </div>

        <div
          className={`card ${isClicked === 1 ? 'clicked' : ''}`}
          onClick={() => handleCardClick(1)}
        >
          <div className="image-icon-container">
            <img src={menuImage} alt="Plat gastronomique" className="circle-image" />
            <div className="icon-circle">
              <i className="fas fa-book-open"></i> {/* Icône spécifique */}
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">Menu et Spécialités</h2>
            <p className="card-description">
              Découvrez notre sélection de mets raffinés, préparés avec des ingrédients de première qualité.
            </p>
          </div>
        </div>
      </div>

      {/* Section 2 : Expérience Culinaire et Ambiance */}
      <div className="grid-container">
        <div
          className={`card ${isClicked === 2 ? 'clicked' : ''}`}
          onClick={() => handleCardClick(2)}
        >
          <div className="image-icon-container">
            <img src={experienceImage} alt="Terrasse avec vue" className="circle-image" />
            <div className="icon-circle">
              <i className="fas fa-eye"></i> {/* Icône spécifique */}
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">Expérience Culinaire et Ambiance</h2>
            <p className="card-description">
              Un cadre chaleureux avec une vue imprenable pour sublimer chaque repas.
            </p>
          </div>
        </div>

        <div
          className={`card ${isClicked === 3 ? 'clicked' : ''}`}
          onClick={() => handleCardClick(3)}
        >
          <div className="image-icon-container">
            <img src={chefImage} alt="Chef en cuisine" className="circle-image" />
            <div className="icon-circle">
              <i className="fas fa-user-chef"></i> {/* Icône spécifique */}
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">Chef et Équipe</h2>
            <p className="card-description">
              Notre chef étoilé met en avant un savoir-faire d’exception pour ravir vos papilles.
            </p>
          </div>
        </div>
      </div>

      {/* Section 3 : Services Disponibles */}
      <div className="grid-container">
        <div
          className={`card ${isClicked === 4 ? 'clicked' : ''}`}
          onClick={() => handleCardClick(4)}
        >
          <div className="image-icon-container">
            <img src={serviceDisponibleImage} alt="Services disponibles" className="circle-image" />
            <div className="icon-circle">
              <i className="fas fa-concierge-bell"></i> {/* Icône spécifique */}
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">Services Disponibles</h2>
            <ul className="list">
              <li className="list-item">Wi-Fi gratuit</li>
              <li className="list-item">Service de chambre 24/7</li>
              <li className="list-item">Spa et centre de bien-être</li>
              <li className="list-item">Piscine extérieure</li>
              <li className="list-item">Restaurant et bar</li>
            </ul>
          </div>
        </div>

        <div
          className={`card ${isClicked === 5 ? 'clicked' : ''}`}
          onClick={() => handleCardClick(5)}
        >
          <div className="image-icon-container">
            <img src={feedbackImage} alt="Feedback des clients" className="circle-image" />
            <div className="icon-circle">
              <i className="fas fa-comments"></i> {/* Icône spécifique */}
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">Feedback</h2>
            <p className="card-description">
              "Un service exceptionnel et une cuisine délicieuse. Nous reviendrons certainement !"
            </p>
            <div className="feedback-card">
              <p className="comment">{staticFeedback.comment}</p>
              <div className="rating">
                {Array.from({ length: staticFeedback.rating }, (_, i) => (
                  <span key={i} className="star">
                    ★
                  </span>
                ))}
              </div>
            </div>
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-card">
                <p className="comment">{feedback.comment}</p>
                <div className="rating">
                  {Array.from({ length: feedback.rating }, (_, i) => (
                    <span key={i} className="star">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="star-rating">
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
                className="comment-box"
              />
              <button type="submit" className="submit-button">
                Publier
              </button>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
      </div>

      {/* Section 4 : Contact (centrée) */}
      <div className="grid-container center">
        <div className="card contact-card">
          <div className="image-icon-container">
            <img src={contactImage} alt="Contactez-nous" className="circle-image" />
            <div className="icon-circle">
              <i className="fas fa-envelope"></i> {/* Icône spécifique */}
            </div>
          </div>
          <div className="card-content">
            <h2 className="card-title">Contact</h2>
            <p className="card-description">
              Email: contact@royalstay.com<br />
              Téléphone: +1 234 567 890<br />
              Adresse: 123 Rue de Luxe, Paris, France
            </p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;