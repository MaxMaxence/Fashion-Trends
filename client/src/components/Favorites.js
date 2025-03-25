import React from 'react';
import { useFavorites } from './FavoritesContext';
import ProductCard from './ProductCard'; // Importer le composant ProductCard
import './Favorites.css';

const Favorites = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="no-favorites-container">
        <h1>Aucun favori pour le moment.</h1>
        <p>Explorez notre catalogue pour ajouter vos articles préférés.</p>
        <a href="/catalog" className="explore-button">
          Explorer le Catalogue
        </a>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">Vos Favoris</h2>
      <div className="favorites-grid"> {/* Utiliser une grille similaire au catalogue */}
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} /> // Utiliser ProductCard
        ))}
      </div>
    </div>
  );
};

export default Favorites;
