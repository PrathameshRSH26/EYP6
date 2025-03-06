const deleteRecipe = async (index) => {
    try {
      const recipeId = recipes[index]._id; // Get the recipe ID
      await axios.delete(`http://localhost:3001/recipes/${recipeId}`);
  
      // Fetch updated recipes
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };