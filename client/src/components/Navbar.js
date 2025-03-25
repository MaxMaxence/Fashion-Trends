import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext'; // Import du contexte du thème
import './Navbar.css';


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme(); // Récupérer le thème actuel et la fonction pour basculer

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Bouton pour ouvrir le menu latéral */}
        <button className="hamburger" onClick={toggleMenu}>
          <span className="hamburger-icon">☰</span>
        </button>
        {/* Titre centré */}
        <div className="navbar-title">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Fashion Trends
          </Link>
        </div>
        {/* Icône de favoris */}
        <div className="navbar-favorites">
          <Link to="/favorites" style={{ color: 'white' }}>
            <FontAwesomeIcon icon={faHeart} size="lg" />
          </Link>
        </div>
      </div>

      {/* Menu latéral */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-button" onClick={toggleMenu}>
          ×
        </button>
        <ul>
          <li>
            <Link to="/" onClick={toggleMenu}>Accueil</Link>
          </li>
          <li>
            <Link to="/catalog" onClick={toggleMenu}>Catalogue</Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleMenu}>À propos</Link>
          </li>
          <li>
            <Link to="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
          <li>
            <Link to="/favorites" onClick={toggleMenu}>Favoris</Link>
          </li>
          <li>
            {/* Bouton pour basculer entre les thèmes */}
            <button className="theme-toggle" onClick={toggleTheme}>
              <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} />
              {isDarkMode ? ' Mode Clair' : ' Mode Sombre'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
