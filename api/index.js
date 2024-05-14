import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { routers } from "./src/router.js";
import { handleError } from "./src/middleware/handleError.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routers);
app.use(handleError);

app.listen(process.env.PORT || 3580, () => {
  console.log("Executando a API");
});
