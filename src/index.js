import express from "express";
import cors from "cors";

import constant from "./config/constant.js";
import db from "./config/db.js";
import indexRoutes from "./routes/indexRoutes.js";

const app = express();
const port = constant.PORT;

// cors
app.use(cors());

// json and url encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// creating server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  db();
});

// routes
app.use("/api", indexRoutes);

