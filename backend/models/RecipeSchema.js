const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String, required: true }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
