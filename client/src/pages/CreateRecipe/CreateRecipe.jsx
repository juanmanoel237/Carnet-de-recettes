import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './CreateRecipe.css'

const CreateRecipe = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    image: null
  })

  const [error, setError] = useState('')
  const { title, ingredients, instructions, image } = formData

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] }) // Correction ici
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const data = new FormData()
    data.append('title', title)
    data.append('ingredients', ingredients)
    data.append('instructions', instructions)
    if (image) {
      data.append('image', image)
    }

    try {
      await axios.post('http://localhost:5000/api/recipes', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      navigate('/recipes')
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de la recette.')
    }
  }

  return (
    <div className="create-recipe-container">
      <form className="create-recipe-form" onSubmit={handleSubmit}>
        <h2>Ajouter une Nouvelle Recette</h2>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            name="title"
            onChange={handleChange}
            required
            placeholder="Entrez le titre de la recette"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingrédients</label>
          <input
            type="text"
            id="ingredients"
            value={ingredients}
            name="ingredients"
            onChange={handleChange}
            required
            placeholder="Entrez les ingrédients de la recette"
          />
        </div>
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <input
            type="text"
            id="instructions"
            value={instructions}
            name="instructions"
            onChange={handleChange}
            required
            placeholder="Entrez les étapes de la recette"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (optionnel)</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn">Ajouter la Recette</button>
      </form>
    </div>
  )
}

export default CreateRecipe
