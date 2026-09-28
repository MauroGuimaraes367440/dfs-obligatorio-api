import {
  cambiarPlanService
} from "../services/usuarios.services.js";

export const cambiarPlan = async (req, res) => {
  const usuario = await cambiarPlanService(req.decoded.id);

  res.status(200).json({
    message: "Plan actualizado a premium correctamente",
    usuario: {
      id: usuario._id,
      username: usuario.username,
      rol: usuario.rol,
      plan: usuario.plan
    }
  });
};