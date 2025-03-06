import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const RecipeDashboard = ({ isLoggedIn }) => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  // Fetch all recipes
  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:3001/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  // Handle image upload for the recipe
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewRecipe({ ...newRecipe, image: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a new recipe to the database
  const addRecipe = async () => {
    if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.instructions || !newRecipe.image) {
      alert("Please fill in all fields and add an image.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.post("http://localhost:3001/add-recipe", newRecipe, {
        headers: {
          Authorization: token, // Send token in headers
        },
      });
      
      // Fetch latest recipes after adding
      getRecipes();

      // Reset form and close modal
      setNewRecipe({ name: "", ingredients: "", instructions: "", image: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  // Delete a recipe from the database
  const deleteRecipe = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      await axios.delete(`http://localhost:3001/recipes/${id}`, {
        headers: {
          Authorization: token, // Send token in headers
        },
      });
      
      // Fetch updated recipes after deleting
      getRecipes();

      setShowDetails(false);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Recipe Dashboard</h2>

      {isLoggedIn && (
        <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>
          Add Recipe
        </button>
      )}

      <div className="row">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="col-md-4 mb-3">
            <div className="card">
              {recipe.image && (
                <img src={recipe.image} className="card-img-top" alt={recipe.name} style={{ height: "200px", objectFit: "cover" }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <button className="btn btn-primary me-2" onClick={() => { setSelectedRecipe(recipe); setShowDetails(true); }}>Explore</button>
                {isLoggedIn && (
                  <button className="btn btn-danger" onClick={() => deleteRecipe(recipe._id)}>Delete</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Recipe Form */}
      {showForm && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Recipe</h5>
                <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
              </div>
              <div className="modal-body">
                <input type="text" name="name" value={newRecipe.name} onChange={handleInputChange} className="form-control mb-2" placeholder="Recipe Name" />
                <textarea name="ingredients" value={newRecipe.ingredients} onChange={handleInputChange} className="form-control mb-2" placeholder="Ingredients"></textarea>
                <textarea name="instructions" value={newRecipe.instructions} onChange={handleInputChange} className="form-control mb-2" placeholder="Instructions"></textarea>
                <input type="file" onChange={handleImageUpload} className="form-control mb-2" accept="image/*" />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={addRecipe}>Save</button>
                <button className="btn btn-danger" onClick={() => setShowForm(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explore Recipe */}
      {showDetails && selectedRecipe && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedRecipe.name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowDetails(false)}></button>
              </div>
              <div className="modal-body">
                {selectedRecipe.image && (
                  <img 
                    src={selectedRecipe.image} 
                    alt={selectedRecipe.name} 
                    className="img-fluid mb-3"
                    style={{ borderRadius: "10px", maxHeight: "300px", objectFit: "cover" }}
                  />
                )}
                <p><strong>Ingredients:</strong> {selectedRecipe.ingredients}</p>
                <p><strong>Instructions:</strong> {selectedRecipe.instructions}</p>
              </div>
              <div className="modal-footer">
                {isLoggedIn && (
                  <button className="btn btn-danger" onClick={() => deleteRecipe(selectedRecipe._id)}>Delete</button>
                )}
                <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDashboard;