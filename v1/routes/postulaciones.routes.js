import express from "express";

import {
  validarBodyMiddleware
} from "../middlewares/validarBody.middleware.js";

import {
  validarQueryMiddleware
} from "../middlewares/validarQuery.middleware.js";

import {
  validarParamsMiddleware
} from "../middlewares/validarParams.middleware.js";

import {
  crearPostulacionSchema,
  listarPostulacionesSchema,
  postulacionIdParamSchema,
  actualizarPostulacionSchema
} from "../validators/postulaciones.validator.js";

import {
  obtenerPostulaciones,
  obtenerPostulacionPorId,
  crearPostulacion,
  actualizarPostulacion,
  eliminarPostulacion,
  generarPreparacion
} from "../controllers/postulaciones.controller.js";

const router = express.Router();

router.get(
  "/",
  validarQueryMiddleware(listarPostulacionesSchema),
  obtenerPostulaciones
);

router.get(
  "/:id",
  validarParamsMiddleware(postulacionIdParamSchema),
  obtenerPostulacionPorId
);

router.post(
  "/",
  validarBodyMiddleware(crearPostulacionSchema),
  crearPostulacion
);

router.patch(
  "/:id",
  validarParamsMiddleware(postulacionIdParamSchema),
  validarBodyMiddleware(actualizarPostulacionSchema),
  actualizarPostulacion
);

router.delete(
  "/:id",
  validarParamsMiddleware(postulacionIdParamSchema),
  eliminarPostulacion
);

router.post(
  "/:id/preparacion",
  validarParamsMiddleware(postulacionIdParamSchema),
  generarPreparacion
);

export default router;