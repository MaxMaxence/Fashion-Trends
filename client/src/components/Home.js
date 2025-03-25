import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';



const Home = () => {
  return (
    <div className="home-page">
      <h1 className="welcome-title">
        Bienvenue sur <span>Fashion Trends</span>
      </h1>
      <p className="welcome-description">
        Découvrez les dernières tendances adaptées à chaque saison et composez votre style en toute simplicité !
      </p>

      <div className="seasons-container">
        <Link
          to="/catalog?season=Hiver"
          className="season-card"
          style={{ backgroundImage: `url('/images/hiver.png')` }}
        >
          <h2>Hiver</h2>
        </Link>
        <Link
          to="/catalog?season=Printemps"
          className="season-card"
          style={{ backgroundImage: `url('/images/printemps.png')` }}
        >
          <h2>Printemps</h2>
        </Link>
        <Link
          to="/catalog?season=Été"
          className="season-card"
          style={{ backgroundImage: `url('/images/été.png')` }}
        >
          <h2>Été</h2>
        </Link>
        <Link
          to="/catalog?season=Automne"
          className="season-card"
          style={{ backgroundImage: `url('/images/automne.png')` }}
        >
          <h2>Automne</h2>
        </Link>
      </div>

      <div className="explore-button-container">
        <Link to="/catalog" className="explore-btn">
          Explorer les tendances
        </Link>
      </div>
    </div>
  );
};

export default Home;
