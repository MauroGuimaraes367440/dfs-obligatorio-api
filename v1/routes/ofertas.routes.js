import express from "express";

import {
  buscarOfertas
} from "../controllers/ofertas.controller.js";

import {
  buscarOfertasSchema
} from "../validators/ofertas.validator.js";

import {
  validarQueryMiddleware
} from "../middlewares/validarQuery.middleware.js";

const router = express.Router();

router.get(
  "/",
  validarQueryMiddleware(buscarOfertasSchema),
  buscarOfertas
);

export default router;