import React from "react";
import "./Contact.css";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contactez-nous</h1>
      <p className="contact-subtitle">Une question ? Besoin d'aide ? Contactez-nous !</p>

      <div className="contact-info">
        <p><FaEnvelope className="icon" /> Email : <a href="mailto:info@fashiontrends.com">info@fashiontrends.com</a></p>
        <p><FaPhone className="icon" /> Téléphone : <a href="tel:+33766450340">+33 7 66 45 03 40</a></p>
        <p><FaMapMarkerAlt className="icon" /> Adresse : 6 Rue du Muguet, Le Quesnoy, France</p>
      </div>

      <form className="contact-form">
        <input type="text" placeholder="Votre nom" required />
        <input type="email" placeholder="Votre email" required />
        <textarea placeholder="Votre message" rows="4" required></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
