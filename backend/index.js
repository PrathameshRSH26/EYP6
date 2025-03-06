const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./models/Users");
const Recipe = require("./models/RecipeSchema");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const SECRET_KEY = "mySuperSecureSecretKey123!";

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/Users_info", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// User Registration
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "❌ All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "❌ User already exists! Please log in." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();
    res.json({ message: "✅ Registration Successful!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error registering user", error: error.message });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "❌ Email and password are required!" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "❌ Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Invalid email or password!" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user._id, name: user.name }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ message: "✅ Login Successful!", token, username: user.name });
  } catch (error) {
    res.status(500).json({ message: "❌ Error logging in", error: error.message });
  }
});

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "❌ No token provided!" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "❌ Unauthorized!" });

    req.user = decoded;
    next();
  });
};

// Add Recipe (Protected)
app.post("/add-recipe", verifyToken, async (req, res) => {
  const { name, ingredients, instructions, image } = req.body;
  const username = req.user.name;

  if (!name || !ingredients || !instructions || !image) {
    return res.status(400).json({ message: "❌ All fields are required!" });
  }

  try {
    const newRecipe = new Recipe({ username, name, ingredients, instructions, image });
    await newRecipe.save();
    res.json({ message: "✅ Recipe added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error adding recipe", error: error.message });
  }
});

// Get All Recipes
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching recipes", error: error.message });
  }
});

// Delete Recipe (Protected)
app.delete("/recipes/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ message: "❌ Recipe not found!" });

    // Check if user is owner
    if (recipe.username !== req.user.name) {
      return res.status(403).json({ message: "❌ You can only delete your own recipes!" });
    }

    await Recipe.findByIdAndDelete(id);
    res.json({ message: "✅ Recipe deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error deleting recipe", error: error.message });
  }
});

// Start Server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});