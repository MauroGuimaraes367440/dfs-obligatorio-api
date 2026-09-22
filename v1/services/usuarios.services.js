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