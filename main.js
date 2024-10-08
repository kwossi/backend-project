import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./libs/database.js";

await connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//! to do: routes

//! to do: error hanlders

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
