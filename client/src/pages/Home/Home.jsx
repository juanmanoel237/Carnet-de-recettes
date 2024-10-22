import React from 'react'
import { Link } from 'react-router-dom'
import homeImage from '../../assets/images/i103208-photo-de-pot-au-feu.webp'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <div className="home-content">
        <h1>Bienvenue dans votre carnet de recettes</h1>
        <p>Créez, partagez et explorez des recettes facilement !</p>
        <Link to='/recipes' className='btn'>Voir les recettes</Link>
      </div>
      <div className="home-image">
        <img src={homeImage} alt="Recettes" />
      </div>
    </div>
  )
}

export default Home