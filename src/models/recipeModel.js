import mongoose from "mongoose";
import multer from "multer";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const storage = multer.diskStorage({});

export const upload = multer({ storage: storage }).single("image");

const recipeModel = mongoose.model("Recipe", recipeSchema);

export default recipeModel;
