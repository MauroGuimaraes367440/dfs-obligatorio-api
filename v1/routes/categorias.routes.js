import express from "express";

import {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
} from "../controllers/categorias.controller.js";

const router = express.Router();

router.get("/", obtenerCategorias);
router.get("/:id", obtenerCategoriaPorId);
router.post("/", crearCategoria);
router.patch("/:id", actualizarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;