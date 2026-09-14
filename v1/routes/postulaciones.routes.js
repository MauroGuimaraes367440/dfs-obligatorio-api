import express from "express";

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
router.post("/", crearPostulacion);
router.patch("/:id", actualizarPostulacion);
router.delete("/:id", eliminarPostulacion);

export default router;