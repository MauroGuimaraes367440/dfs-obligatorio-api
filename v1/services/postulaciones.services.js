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

export const obtenerPostulacionesService = async (
  usuarioId,
  filtros
) => {
  const usuario = await obtenerUsuarioPorIdService(usuarioId);

  if (usuario.rol !== "usuario") {
    const error = new Error(
      "El administrador no gestiona postulaciones personales"
    );
    error.status = 403;
    throw error;
  }

  const { page, limit, estado, categoria } = filtros;

  const consulta = {
    usuario: usuarioId
  };

  if (estado) {
    consulta.estado = estado;
  }

  if (categoria) {
    consulta.categoria = categoria;
  }

  const skip = (page - 1) * limit;

  const total = await Postulacion.countDocuments(consulta);

  const postulaciones = await Postulacion.find(consulta)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .populate("categoria", "nombre");

  return {
    postulaciones,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  };
};

export const obtenerPostulacionPorIdService = async (
  usuarioId,
  postulacionId
) => {
  await obtenerUsuarioPorIdService(usuarioId);

  const postulacion = await Postulacion.findOne({
    _id: postulacionId,
    usuario: usuarioId
  }).populate("categoria", "nombre");

  if (!postulacion) {
    const error = new Error("La postulación no existe");
    error.status = 404;
    throw error;
  }

  return postulacion;
};

export const actualizarPostulacionService = async (
  usuarioId,
  postulacionId,
  postulacionData
) => {
  const postulacion = await obtenerPostulacionPorIdService(
    usuarioId,
    postulacionId
  );

  if (postulacionData.categoria !== undefined) {
    await obtenerCategoriaPorIdService(postulacionData.categoria);
    postulacion.categoria = postulacionData.categoria;
  }

  if (postulacionData.puesto !== undefined) {
    postulacion.puesto = postulacionData.puesto;
  }

  if (postulacionData.empresa !== undefined) {
    postulacion.empresa = postulacionData.empresa;
  }

  if (postulacionData.descripcion !== undefined) {
    postulacion.descripcion = postulacionData.descripcion;
  }

  if (postulacionData.estado !== undefined) {
    postulacion.estado = postulacionData.estado;
  }

  if (postulacionData.enlace !== undefined) {
    postulacion.enlace = postulacionData.enlace;
  }

  if (postulacionData.notas !== undefined) {
    postulacion.notas = postulacionData.notas;
  }

  await postulacion.save();

  await postulacion.populate("categoria", "nombre");

  return postulacion;
};

export const eliminarPostulacionService = async (
  usuarioId,
  postulacionId
) => {
  await obtenerPostulacionPorIdService(
    usuarioId,
    postulacionId
  );

  const postulacion = await Postulacion.findByIdAndDelete(
    postulacionId
  );

  if (!postulacion) {
    const error = new Error("La postulación no existe");
    error.status = 404;
    throw error;
  }

  return postulacion;
};

