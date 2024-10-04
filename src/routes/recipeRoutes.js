import { Router } from "express";
import {
  createRecipe,
  deleteRecipe,
  getRecipe,
  getRecipes,
  updateRecipe,
} from "../controllers/recipeController.js";
import { upload } from "../models/recipeModel.js";

const routes = Router();

// create recipe
routes.post("/", upload, createRecipe);

// get all recipes
routes.get("/", getRecipes);

// get single recipe
routes.get("/:recipeId", getRecipe);

// update recipe
routes.patch("/:recipeId", upload, updateRecipe);

// delete recipe
routes.delete("/:recipeId", deleteRecipe);

export default routes;
