const Recipe = require('../models/Recipe')

exports.createRecipe = async (req, res) =>{
    const {title, ingredients, instructions} = req.body
    const image = req.file? `/uploads/${req.file.filename}`: undefined

    try{
        const recipe = new Recipe({title, ingredients, instructions, image, author: req.user._id})
        await recipe.save()
        res.status(201).json(recipe)
    }
    catch(err){
        res.status(500).json({message:'Erreur lors de la création de la recette.'})
    }
}

exports.getAllRecipe = async (req, res) => {
   try{
    const recipes = await Recipe.find().populate('author', 'username email')
    res.json(recipes)
   }
   catch(err){
    res.status(500).json({message:''})
   }
}

exports.getRecipeById = async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id).populate('author', 'username email')
        if(!recipe){
            return res.status(404).json({message:'Recette non trouvée'})
        }
    }
    catch(err){
        res.status(500).json({message:'Erreur lors de la récupération de la recette'})
    }
}

exports.updateRecipe = async (req, res) => {
    const {title, ingredients, instructions} = req.body
    const image = req.file? `/uploads/${req.file.filename}`: undefined

    try{
        const recipe = Recipe.findById(req.params.id)
        if(!recipe){
            return res.status(404).json({message:'Recette non trouvée'})
        }

        if(recipe.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message:'Accès refusé'})
        }

        recipe.title = title || recipe.title
        recipe.ingredients = ingredients || recipe.ingredients
        recipe.instructions = instructions || recipe.instructions
        if(image) recipe.image = image

        await recipe.save()
        res.json(recipe)
    }
    catch(err){
        res.status(500).json({message:'Erreur lors de la mise à jour de la recette'})
    }
}

exports.deleteRecipe = async (req, res) => {
    try{
        const recipe = await Recipe.findById(req.params.id)

        if(!recipe){
            return res.status(404).json({message:'Recette introuvable'})
        }

        if(recipe.author.toString() !== req.user._id.toString()){
            return res.status(403).json({message:'Accès refusé'})
        }

        await recipe.remove()
        res.status(200).json({message:'Recette supprimmée avec succès'})
    }
    catch(err){
        res.status(500).json({message:'Erreur lors de la suppression'})
    }
}