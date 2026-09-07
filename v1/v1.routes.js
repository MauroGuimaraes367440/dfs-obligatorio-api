import express from "express";
import usuariosRoutes from "./routes/usuarios.routes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "API versión 1 funcionando correctamente"
  });
});

router.use("/usuarios", usuariosRoutes);

export default router;