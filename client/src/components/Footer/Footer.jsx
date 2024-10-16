// src/components/Footer/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Carnet de Recettes. Tous droits réservés.</p>
    </footer>
  );
}

export default Footer;
