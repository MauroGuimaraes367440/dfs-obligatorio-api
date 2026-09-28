import express from "express";
import authRoutes from "./routes/auth.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";
import postulacionesRoutes from "./routes/postulaciones.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import ofertasRoutes from "./routes/ofertas.routes.js";

import {
  authenticateMiddleware
} from "./middlewares/authenticate.middleware.js";



const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "API versión 1 funcionando correctamente"
  });
});

// Rutas públicas
router.use("/auth", authRoutes);

//  token válido
router.use(authenticateMiddleware);

// Rutas protegidas
router.use("/usuarios", usuariosRoutes);
router.use("/postulaciones", postulacionesRoutes);
router.use("/categorias", categoriasRoutes);
router.use("/ofertas", ofertasRoutes);

export default router;