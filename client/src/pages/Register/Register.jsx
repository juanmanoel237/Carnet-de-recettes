import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:''
  })

  const [error, setError] = useState('');
  const {username, email, password} = formData

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
    const res = await axios.post('http://localhost:5000/api/auth/register', formData)
    localStorage.setItem('token', res.data.token)
    navigate('/recipes');
    }
    catch(err){
      setError(err.response?.data?.message,'Erreur lors de l\'inscription.')
    }
  }

  return (
    <div className='register-container'>
      <form className='register-form' onSubmit={handleSubmit}>
        <h2>Inscription</h2>
        {error && <div className='error'>{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            required
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>
        <div className='form-group'>
          <label htmlFor="email">Adresse Email</label>
          <input 
          type="text"
          id='email'
          name='email'
          value={email}
          onChange={handleChange}
          required
          placeholder='Entrez votre adresse mail'
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de Passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <button type='submit' className='btn'>S'inscrire</button>
      </form>
    </div>
  )
}

export default Register