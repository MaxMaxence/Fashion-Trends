import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from './FavoritesContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Empêche la redirection
    toggleFavorite(product); // Ajoute/retire des favoris
  };

  return (
    <div className="product-card">
      {/* Icône du cœur pour gérer les favoris */}
      <div
        className="favorite-icon"
        onClick={handleFavoriteClick} // Gestion du clic
      >
        <span
          style={{
            color: isFavorite ? 'red' : '#ccc',
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          ♥
        </span>
      </div>
      {/* Lien cliquable pour accéder aux détails */}
      <Link to={`/product/${product.id}`} className="product-link">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price} €</p>
      </Link>
    </div>
  );
};

export default ProductCard;
