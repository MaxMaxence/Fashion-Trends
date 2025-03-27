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
  const [allProducts, setAllProducts] = useState([]);
  const [seasonTypes, setSeasonTypes] = useState([]);
  const [typeWarnings, setTypeWarnings] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [selectedImage, setSelectedImage] = useState("");

  const allKnownTypes = ['accessories', 'tops', 'cardigan', 'jackets', 'sweaters', 'pants', 'shorts', 'shoes'];

  const normalizeSeason = (season) => {
    if (!season) return "";
    return season
      .normalize("NFD")
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .toLowerCase()
      .trim();
  };

  useEffect(() => {
    const fetchProductAndTypes = async () => {
      try {
        const productRes = await axios.get(`${process.env.REACT_APP_API_URL}/fashion-trends/${id}`);
        const productData = { ...productRes.data, isMainItem: true };
        setProduct(productData);
        if (productData.imageUrl) setSelectedImage(productData.imageUrl);

        const allRes = await axios.get(`${process.env.REACT_APP_API_URL}/fashion-trends`);
        const allItems = allRes.data;
        setAllProducts(allItems);

        const currentSeason = normalizeSeason(productData.season);
        const typesForSeason = [
          ...new Set(
            allItems
              .filter(item => item.type && item.season && normalizeSeason(item.season).includes(currentSeason))
              .map(item => item.type.toLowerCase().trim())
          )
        ];

        setSeasonTypes(typesForSeason);
        setSelectedCategories(typesForSeason);
      } catch (err) {
        console.error("Erreur chargement produit ou types:", err);
      }
    };

    fetchProductAndTypes();
  }, [id]);

  if (!product) return <div>Chargement...</div>;

  const isFavorite = favorites.some(fav => fav.id === product.id);

  const generateOutfit = async () => {
    try {
      const season = normalizeSeason(product.season);
      const selectedTypes = selectedCategories.length > 0 ? selectedCategories : seasonTypes;

      const compatibleItemsByType = {};
      const missingTypes = [];

      for (let type of selectedTypes) {
        const matches = allProducts.filter((item) => {
          const itemType = item.type?.toLowerCase().trim();
          const matchesSeason = normalizeSeason(item.season).includes(season);
          const isLocked = lockedItems.some(l => l.id === item.id);
          const isUsed = usedItems.has(item.id);

          if (type === "pants") {
            return ["pants", "short", "shorts"].includes(itemType) && matchesSeason && !isLocked && !isUsed;
          }
          if (type === "shorts") {
            return ["short", "shorts"].includes(itemType) && matchesSeason && !isLocked && !isUsed;
          }

          return matchesSeason && itemType === type && !isLocked && !isUsed;
        });

        if (matches.length === 0) {
          missingTypes.push(type);
        }

        compatibleItemsByType[type] = matches;
      }

      setTypeWarnings(missingTypes);

      const newOutfit = [...lockedItems];
      const lockedTypes = new Set(lockedItems.map(item => item.type.toLowerCase().trim()));

      if (!lockedTypes.has(product.type.toLowerCase().trim())) {
        newOutfit.push(product);
        lockedTypes.add(product.type.toLowerCase().trim());
      }

      selectedTypes.forEach((type) => {
        if (!lockedTypes.has(type)) {
          const items = compatibleItemsByType[type];
          if (items && items.length > 0) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            newOutfit.push(randomItem);
            usedItems.add(randomItem.id);
          }
        }
      });

      setOutfit([...new Map(newOutfit.map(item => [item.id, item])).values()]);
      setUsedItems(new Set([...usedItems].slice(-10)));
    } catch (err) {
      console.error("Erreur génération tenue:", err);
    }
  };

  const handleCategorySelect = (category) => {
    if (!seasonTypes.includes(category)) return;
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
      const updated = prev.some(lock => lock.id === item.id)
        ? prev.filter(lock => lock.id !== item.id)
        : [...prev, item];
      return [...new Map(updated.map(i => [i.id, i])).values()];
    });
  };

  const images = product.imageUrl
    ? [...new Set([product.imageUrl, ...(product.additionalImages || [])])].filter(img => img)
    : [];

  return (
    <div className="product-details-page">
      <h2>{product.name}</h2>
      <div className="product-details-container">
        <div className="product-images">
          <img src={selectedImage} alt={product.name} className="main-image" />
          <div className="image-thumbnails">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} vue ${i + 1}`}
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
              {allKnownTypes.map(type => {
                const isAvailable = seasonTypes.includes(type);
                return (
                  <button
                    key={type}
                    className={`category-btn ${selectedCategories.includes(type) ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`}
                    onClick={() => handleCategorySelect(type)}
                    disabled={!isAvailable}
                  >
                    {type === 'shorts' ? 'Short' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>

          <button className="create-outfit-btn" onClick={generateOutfit}>
            Générer une tenue
          </button>

          {typeWarnings.length > 0 && (
            <div className="type-warnings">
              <p>Aucun article disponible pour : <strong>{typeWarnings.join(', ')}</strong></p>
            </div>
          )}

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
