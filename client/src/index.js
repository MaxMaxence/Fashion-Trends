import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css'; // si tu as un fichier CSS
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Assure-toi que 'root' correspond à l'ID dans index.html
);
if (process.env.NODE_ENV === "production") {
  console.error = () => {}; // Cache les erreurs en prod
}

