require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoutes')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/recipes', recipeRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connexion reussie avec MongoDB');
    app.listen(process.env.PORT, ()=>{
        console.log(`Serveur démarré sur le port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.error('Erreur de connexion:', err);
    
})