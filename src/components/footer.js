import React from "react";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom
import "../components/footer.css"; 

// Importez les images
import facebook from "../asset/facebook.svg";
import instagram from "../asset/instagram.svg";
import linkedin from "../asset/linkedin.svg";
import twitter from "../asset/twitter.svg";
import awardLogo from "../asset/Award Logo.webp"; // Importez Award Logo
import certificationLogo from "../asset/Certification Logo.webp"; // Importez Certification Logo

const Footer1 = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section copyright">
                    <p>&copy; 2023 Hotel. All rights reserved.</p>
                </div>
                
                <div className="footer-section contact-info">
                    <h4>Contact Information</h4>
                    <p>Address: 123 Hotel St, City, Country</p>
                    <p>Phone: +123 456 7890</p>
                    <p>Email: contact@hotel.com</p>
                </div>
                
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-media">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook} alt="Facebook"/></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={instagram} alt="Instagram"/></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedin} alt="LinkedIn"/></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="Twitter"/></a>
                    </div>
                </div>

                <div className="footer-section newsletter">
                    <h4>Newsletter</h4>
                    <form>
                        <input type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>

                <div className="footer-section quick-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/homeScreen">Profile</Link></li>
                    </ul>
                </div>

                <div className="footer-section legal">
                    <h4>Legal</h4>
                    <a href="/privacy-policy">Privacy Policy</a>
                    <a href="/terms-of-service">Terms of Service</a>
                </div>

                <div className="footer-section booking-info">
                    <h4>Booking</h4>
                    <a href="/booking">Book Now</a>
                </div>

                <div className="footer-section map">
                    <h4>Our Location</h4>
                    <iframe
                        title="hotel-location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.3083357460355!2d-122.08400008468116!3d37.42199977982461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7607597d23b%3A0x7a5752bfe85f482!2sGoogle!5e0!3m2!1sen!2sus!4v1611549129984!5m2!1sen!2sus"
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex="0"
                    ></iframe>
                </div>

                <div className="footer-section awards">
                    <h4>Awards & Certifications</h4>
                    <div className="award-item">
                        <img src={awardLogo} alt="Award Logo" />
                        <span>Best Hotel Award 2023</span> {/* Nom du prix */}
                    </div>
                    <div className="award-item">
                        <img src={certificationLogo} alt="Certification Logo" />
                        <span>Eco-Friendly Certification</span> {/* Nom de la certification */}
                    </div>
                </div>

                <div className="footer-section language-currency">
                    <h4>Language & Currency</h4>
                    <select>
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Arabic</option>
                    </select>
                    <select>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                        <option value="gbp">GBP</option>
                    </select>
                </div>
            </div>
        </footer>
    );
};

export default Footer1;