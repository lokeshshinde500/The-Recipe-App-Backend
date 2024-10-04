import recipeModel from "../models/recipeModel.js";
import { uploadImage } from "../utils/uploadImage.js";

// 1. create Recipe
export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, description } = req.body;

    //all fields are required
    if (!title || !ingredients || !description) {
      return res
        .status(400)
        .json({ message: "All fields are reqiured!", success: false });
    }

    // image required
    const image = req.file;

    if (!image) {
      return res
        .status(400)
        .json({ message: "Image required!", success: false });
    }

    const result = await uploadImage(image.path);

    const newRecipe = {
      title,
      ingredients: ingredients?.split(","),
      description,
      image: result.secure_url,
      created_by: req.user.id,
    };

    const createRecipe = await recipeModel.create(newRecipe);

    return res.status(201).json({
      message: "Recipe created successfully.",
      recipe: createRecipe,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// 2. get Recipes
export const getRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find({ created_by: req.user.id });

    if (!recipes) {
      return res
        .status(400)
        .json({ message: "Recipes not founds!", success: false });
    }

    return res.status(200).json({ recipes: recipes, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// 3. get Recipe by id
export const getRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.recipeId);

    if (!recipe) {
      return res
        .status(400)
        .json({ message: "Recipe not founds!", success: false });
    }

    return res.status(200).json({ recipe: recipe, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// 4. update Recipe by id
export const updateRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.recipeId);

    if (!recipe) {
      return res
        .status(400)
        .json({ message: "Recipe not founds!", success: false });
    }

    const { title, description, ingredients } = req.body;

    //if new image upload
    let image = {};
    if (req.file) {
      image = await uploadImage(req.file.path);
    }

    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients?.split(",") || recipe.ingredients;
    recipe.description = description || recipe.description;
    recipe.image = image.secure_url || recipe.image;

    const updateRecipe = await recipe.save({ new: true });

    return res.status(201).json({
      message: "Recipe created successfully.",
      recipe: updateRecipe,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// 5. delete Recipe by id
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await recipeModel.findById(req.params.recipeId);

    if (!recipe) {
      return res
        .status(400)
        .json({ message: "Recipe not founds!", success: false });
    }

    await recipeModel.findByIdAndDelete(req.params.recipeId);
    return res
      .status(200)
      .json({ message: "recipe deleted successfully.", success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};
