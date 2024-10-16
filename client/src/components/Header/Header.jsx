// src/components/Header/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Carnet de Recettes</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/recipes">Recettes</Link></li>
          {token ? (
            <>
              <li><Link to="/create-recipe">Ajouter Recette</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Déconnexion</button></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Inscription</Link></li>
              <li><Link to="/login">Connexion</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
