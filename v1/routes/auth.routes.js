import express from "express";

import {
  registrarUsuario,
  loginUsuario
} from "../controllers/auth.controller.js";

import {
  registrarUsuarioSchema,
  loginUsuarioSchema
} from "../validators/auth.validator.js";

import {
  validarBodyMiddleware
} from "../middlewares/validarBody.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validarBodyMiddleware(registrarUsuarioSchema),
  registrarUsuario
);

router.post(
  "/login",
  validarBodyMiddleware(loginUsuarioSchema),
  loginUsuario
);

export default router;