import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './RecipeList.css'
const RecipeList = () => {

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRecipes = async ()=> {
    try{
      const res = await axios.get('http://localhost:5000/api/recipes')
      setRecipes(res.data)
      setLoading(false);
    }catch(err){
      console.error('Erreur lors de la récupération des recettes:', err);
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchRecipes()
  },[])

  if (loading) {
    return <div className="loading">Chargement des recettes...</div>;
  }


  return (
    <div className='recipe-list-container'>
      <h2>Nos Recettes</h2>
      <div className="recipe-grid">
        {recipes.map(recipe=>(
          <div key={recipe._id} className="recipe-card">
            {recipe.image && <img src={`http://localhost:5000${recipe.image}`} alt={recipe.title}/>}
            <div className="recipe-info">
              <h3>{recipe.title}</h3>
              <p>Par {recipe.author.username}</p>
              <Link to={`/recipes/${recipe._id}`} className='view-button'>Voir details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecipeList