import express from "express";

import {
  registrarUsuario,
  loginUsuario,
  cambiarPlan
} from "../controllers/usuarios.controller.js";

import {
  registrarUsuarioSchema,
  loginUsuarioSchema
} from "../validators/usuarios.validator.js";

import {
  validarBodyMiddleware
} from "../middlewares/validarBody.middleware.js";

const router = express.Router();

router.post(
  "/registro",
  validarBodyMiddleware(registrarUsuarioSchema),
  registrarUsuario
);

router.post(
  "/login",
  validarBodyMiddleware(loginUsuarioSchema),
  loginUsuario
);

router.patch("/plan", cambiarPlan);

export default router;