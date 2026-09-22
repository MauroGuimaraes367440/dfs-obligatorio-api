import Postulacion from "../models/postulacion.model.js";

import {
  obtenerUsuarioPorIdService
} from "./usuarios.services.js";

import {
  obtenerCategoriaPorIdService
} from "./categorias.services.js";

export const crearPostulacionService = async (
  usuarioId,
  postulacionData
) => {
  const usuario = await obtenerUsuarioPorIdService(usuarioId);

  if (usuario.rol !== "usuario") {
    const error = new Error(
      "El administrador no gestiona postulaciones personales"
    );
    error.status = 403;
    throw error;
  }

  if (usuario.plan === "plus") {
    const cantidad = await Postulacion.countDocuments({
      usuario: usuarioId
    });

    if (cantidad >= 4) {
      const error = new Error(
        "Alcanzaste el límite de 4 postulaciones del plan plus"
      );
      error.status = 403;
      throw error;
    }
  }

  await obtenerCategoriaPorIdService(postulacionData.categoria);

  const postulacion = new Postulacion({
    ...postulacionData,
    usuario: usuarioId
  });

  await postulacion.save();

  return postulacion;
};