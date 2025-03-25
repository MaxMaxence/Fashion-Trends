import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useFavorites } from './FavoritesContext';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [outfit, setOutfit] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [usedItems, setUsedItems] = useState(new Set());
  const [lockedItems, setLockedItems] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/fashion-trends/${id}`);
        const fetchedProduct = response.data;
        setProduct({ ...fetchedProduct, isMainItem: true });

        // Définir l'image principale au chargement
        if (fetchedProduct.imageUrl) {
          setSelectedImage(fetchedProduct.imageUrl);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const outfitOrder = ['accessories', 'tops', 'jackets', 'sweaters', 'pants', 'shoes'];

  const generateOutfit = async () => {
    if (!product) return;

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/fashion-trends`);
      const allProducts = response.data;

      const selectedTypes = selectedCategories.length > 0
        ? selectedCategories
        : outfitOrder.filter(type => type !== product.type.toLowerCase());

      const compatibleItems = allProducts.filter(
        (item) =>
          item.id !== product.id &&
          selectedTypes.includes(item.type.toLowerCase()) &&
          item.season.toLowerCase() === product.season.toLowerCase() &&
          !usedItems.has(item.id) &&
          !lockedItems.some(locked => locked.id === item.id)
      );

      const newOutfit = [...lockedItems, product];

      const lockedTypes = new Set(lockedItems.map(item => item.type.toLowerCase()));

      selectedTypes.forEach((type) => {
        if (!lockedTypes.has(type)) {
          const itemsOfType = compatibleItems.filter(item => item.type.toLowerCase() === type);
          if (itemsOfType.length > 0) {
            const randomItem = itemsOfType[Math.floor(Math.random() * itemsOfType.length)];
            newOutfit.push(randomItem);
            usedItems.add(randomItem.id);
          }
        }
      });

      setOutfit([...new Map(newOutfit.map((item) => [item.id, item])).values()]);
      setUsedItems(new Set([...usedItems].slice(-10)));
    } catch (error) {
      console.error("Erreur lors de la création de la tenue :", error);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const toggleLockItem = (item, e) => {
    e.stopPropagation();
    if (item.isMainItem) return;

    setLockedItems((prev) => {
      const updatedLocks = prev.some((locked) => locked.id === item.id)
        ? prev.filter((locked) => locked.id !== item.id)
        : [...prev, item];
      return [...new Map(updatedLocks.map((item) => [item.id, item])).values()];
    });
  };

  const images = product.imageUrl
    ? [...new Set([product.imageUrl, ...(product.additionalImages || [])])].filter(img => img)
    : [];

  return (
    <div className="product-details-page">
      <h2>{product.name}</h2>
      <div className="product-details-container">
        
        {/* Galerie d'images */}
        <div className="product-images">
          <img src={selectedImage} alt={product.name} className="main-image" />

          <div className="image-thumbnails">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${product.name} vue ${index + 1}`}
                className={`thumbnail ${selectedImage === img ? "active" : ""}`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <p><strong>Prix :</strong> {product.price} €</p>
          <p><strong>Couleur :</strong> {product.color}</p>
          <p><strong>Marque :</strong> {product.brand}</p>
          <a href={product.purchaseLink} target="_blank" rel="noopener noreferrer" className="purchase-button">
            Acheter
          </a>
          <button className="favorite-button" onClick={() => toggleFavorite(product)}>
            {isFavorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris'}
          </button>

          <div className="category-selection">
            <h4>Choisissez les articles à générer :</h4>
            <div className="category-list">
              {outfitOrder
                .filter(category => category !== product.type.toLowerCase())
                .map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategories.includes(category) ? 'selected' : ''}`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
            </div>
          </div>

          <button className="create-outfit-btn" onClick={generateOutfit}>
            Générer une tenue
          </button>

          {outfit.length > 0 && (
            <div className="outfit-section">
              <h3>Tenue suggérée :</h3>
              <div className="outfit-display">
                {[...new Map(outfit.map((item) => [item.id, item])).values()].map((item) => (
                  <div 
                    key={item.id} 
                    className={`outfit-item ${lockedItems.some((locked) => locked.id === item.id) ? 'locked' : ''}`} 
                    onClick={() => handleProductClick(item.id)}
                  >
                    <img src={item.imageUrl} alt={item.name} />
                    {!item.isMainItem && (
                      <div className="lock-icon" onClick={(e) => toggleLockItem(item, e)}>
                        {lockedItems.some((locked) => locked.id === item.id) ? '🔒' : '🔓'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <button className="create-outfit-btn" onClick={generateOutfit}>
                Générer une autre tenue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
