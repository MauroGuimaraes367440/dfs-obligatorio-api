import {
  crearPostulacionService,
  obtenerPostulacionesService,
  obtenerPostulacionPorIdService,
  actualizarPostulacionService,
  eliminarPostulacionService
} from "../services/postulaciones.services.js";

import {
  generarPreparacionService
} from "../services/groq.services.js";


export const obtenerPostulaciones = async (req, res) => {
  const resultado = await obtenerPostulacionesService(
    req.decoded.id,
    req.validatedQuery
  );

  res.status(200).json(resultado);
};

export const obtenerPostulacionPorId = async (req, res) => {
  const { id } = req.validatedParams;

  const postulacion = await obtenerPostulacionPorIdService(
    req.decoded.id,
    id
  );

  res.status(200).json(postulacion);
};

export const crearPostulacion = async (req, res) => {
  const usuarioId = req.decoded.id;

  const postulacion = await crearPostulacionService(
    usuarioId,
    req.validatedBody
  );

  res.status(201).json(postulacion);
};

export const actualizarPostulacion = async (req, res) => {
  const { id } = req.validatedParams;

  const postulacion = await actualizarPostulacionService(
    req.decoded.id,
    id,
    req.validatedBody
  );

  res.status(200).json(postulacion);
};

export const eliminarPostulacion = async (req, res) => {
  const { id } = req.validatedParams;

  await eliminarPostulacionService(req.decoded.id, id);

  res.status(200).json({
    message: "Postulación eliminada correctamente"
  });
};

export const generarPreparacion = async (req, res) => {
  const usuarioId = req.decoded.id;
  const { id } = req.validatedParams;

  const postulacion = await obtenerPostulacionPorIdService(
    usuarioId,
    id
  );

  const preparacion = await generarPreparacionService(postulacion);

  res.status(200).json({
    postulacionId: postulacion._id,
    preparacion
  });
};