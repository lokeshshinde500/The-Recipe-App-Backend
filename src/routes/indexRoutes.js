import { Router } from "express";
import authRoutes from "./authRoutes.js";
import recipeRoutes from "./recipeRoutes.js";
import { authenticate } from "../middleware/authenticate.js";

const routes = Router();

// auth Routes
routes.use("/auth", authRoutes);

// recipe Routes
routes.use("/recipe", authenticate, recipeRoutes);

export default routes;
