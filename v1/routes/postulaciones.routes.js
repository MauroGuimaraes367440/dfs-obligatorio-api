import express from "express";

import {
  validarBodyMiddleware
} from "../middlewares/validarBody.middleware.js";

import {
  crearPostulacionSchema
} from "../validators/postulaciones.validator.js";

import {
  obtenerPostulaciones,
  obtenerPostulacionPorId,
  crearPostulacion,
  actualizarPostulacion,
  eliminarPostulacion
} from "../controllers/postulaciones.controller.js";

const router = express.Router();

router.get("/", obtenerPostulaciones);
router.get("/:id", obtenerPostulacionPorId);
router.post(
  "/",
  validarBodyMiddleware(crearPostulacionSchema),
  crearPostulacion
);
router.patch("/:id", actualizarPostulacion);
router.delete("/:id", eliminarPostulacion);

export default router;