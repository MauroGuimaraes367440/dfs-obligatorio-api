import express from "express";
import {
  registrarUsuario,
  loginUsuario,
  cambiarPlan
} from "../controllers/usuarios.controller.js";

const router = express.Router();

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
router.patch("/plan", cambiarPlan);

export default router;