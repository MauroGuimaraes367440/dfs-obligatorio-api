import Usuario from "../models/usuario.model.js";

export const obtenerUsuarioPorIdService = async (id) => {
  const usuario = await Usuario.findById(id);

  if (!usuario) {
    const error = new Error("El usuario de la sesión ya no existe");
    error.status = 401;
    throw error;
  }

  return usuario;
};

export const cambiarPlanService = async (usuarioId) => {
  const usuario = await obtenerUsuarioPorIdService(usuarioId);

  if (usuario.rol !== "usuario") {
    const error = new Error(
      "El administrador no gestiona planes"
    );
    error.status = 403;
    throw error;
  }

  if (usuario.plan !== "plus") {
    const error = new Error(
      "El usuario ya tiene el plan premium"
    );
    error.status = 409;
    throw error;
  }

  usuario.plan = "premium";

  await usuario.save();

  return usuario;
};