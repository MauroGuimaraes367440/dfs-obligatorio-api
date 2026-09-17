import express from "express";
import { cambiarPlan } from "../controllers/usuarios.controller.js";

const router = express.Router();

router.patch("/plan", cambiarPlan);

export default router;