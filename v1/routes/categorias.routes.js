import express from "express";

import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  subirImagenCategoria
} from "../controllers/categorias.controller.js";

import {
  authorizeMiddleware
} from "../middlewares/authorize.middleware.js";

import {
  validarBodyMiddleware
} from "../middlewares/validarBody.middleware.js";

import {
  validarParamsMiddleware
} from "../middlewares/validarParams.middleware.js";

import {
  crearCategoriaSchema,
  categoriaIdParamSchema,
  actualizarCategoriaSchema
} from "../validators/categorias.validators.js";
const router = express.Router();

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  validarParamsMiddleware(categoriaIdParamSchema),
  obtenerCategoriaPorId
);

router.post(
  "/",
  authorizeMiddleware("admin"),
  validarBodyMiddleware(crearCategoriaSchema),
  crearCategoria
);

router.patch(
  "/:id",
  authorizeMiddleware("admin"),
  validarParamsMiddleware(categoriaIdParamSchema),
  validarBodyMiddleware(actualizarCategoriaSchema),
  actualizarCategoria
);

router.delete(
  "/:id",
  authorizeMiddleware("admin"),
  validarParamsMiddleware(categoriaIdParamSchema),
  eliminarCategoria
);

router.post(
  "/:id/imagen",
  authorizeMiddleware("admin"),
  validarParamsMiddleware(categoriaIdParamSchema),
  subirImagenCategoria
);

export default router;