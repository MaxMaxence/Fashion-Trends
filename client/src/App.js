import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Catalog from './components/Catalog';
import About from './components/About';
import Contact from './components/Contact';
import ProductDetails from './components/ProductDetails';
import Favorites from './components/Favorites'; 
import { FavoritesProvider } from './components/FavoritesContext';
import { ThemeProvider } from './components/ThemeContext';
import Footer from './components/Footer'; // Import du Footer


import './styles.css';

function App() {
  return (
    <FavoritesProvider>
      <ThemeProvider>
        <Router>
          <div className="app-container">
            {/* Navbar */}
            <Navbar />

            {/* Contenu principal */}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/favorites" element={<Favorites />} />
              </Routes>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </FavoritesProvider>
  );
}

export default App;
