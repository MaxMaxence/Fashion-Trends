import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section des liens de navigation */}
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a href="#home">Accueil</a>
            </li>
            <li>
              <a href="#catalog">Catalogue</a>
            </li>
            <li>
              <a href="#about">À propos</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Section des informations de contact */}
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email : <a href="mailto:contact@fashiontrends.com">contact@fashiontrends.com</a></p>
          <p>Téléphone : +33 07 66 45 03 40</p>
          <p>Adresse : 6 rue du Muguet, Le Quesnoy, France</p>
        </div>

        {/* Section des réseaux sociaux */}
        {/* Section des réseaux sociaux */}
<div className="footer-section suivez-nous">
  <h4>Suivez-nous</h4>
  <div className="social-icons">
    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
      <img src="/images/facebook-icon.svg" alt="Facebook" />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
      <img src="/images/instagram-icon.svg" alt="Instagram" />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
      <img src="/images/twitter-icon.svg" alt="Twitter" />
    </a>
  </div>
</div>

        {/* Section légale */}
        <div className="footer-section legal">
          <p>© {new Date().getFullYear()} Fashion Trends. Tous droits réservés.</p>
          <p>
            <a href="#terms">Conditions d'utilisation</a> |{" "}
            <a href="#privacy">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
