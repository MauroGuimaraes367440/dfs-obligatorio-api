import express from "express";
import cors from "cors";
import routes from "./v1/v1.routes.js";
import notFoundMiddleware from "./v1/middlewares/notFound.middleware.js";
import dotenv from "dotenv";
import connectDB from "./v1/config/db.config.js";
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";

dotenv.config();

connectDB();
const app = express();

// Orígenes (frontends) que pueden consumir la API desde el navegador
const origenesPermitidos = [
  "http://localhost:5173",
  process.env.FRONTEND_URL
];

app.use(cors({ origin: origenesPermitidos }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;