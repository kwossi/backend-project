import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";

import connectDB from "./libs/database.js";
import usersRouter from "./routes/usersRouter.js";
import {
  globalErrorHandler,
  routeNotFound,
} from "./middleware/errorHandlers.js";

await connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//! to do: routes : Users, Mixtapes

app.use("/users", usersRouter);

//* error hanlders
app.use(routeNotFound);
app.use(globalErrorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
