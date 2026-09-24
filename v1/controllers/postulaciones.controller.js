import {
  crearPostulacionService
} from "../services/postulaciones.services.js";

export const obtenerPostulaciones = (req, res) => {
  res.status(501).json({
    message: "Listado de postulaciones pendiente de implementar"
  });
};

export const obtenerPostulacionPorId = (req, res) => {
  res.status(501).json({
    message: "Consulta de postulación pendiente de implementar"
  });
};

export const crearPostulacion = async (req, res) => {
  const usuarioId = req.decoded.id;

  const postulacion = await crearPostulacionService(
    usuarioId,
    req.validatedBody
  );

  res.status(201).json(postulacion);
};

export const actualizarPostulacion = (req, res) => {
  res.status(501).json({
    message: "Actualización de postulación pendiente de implementar"
  });
};

export const eliminarPostulacion = (req, res) => {
  res.status(501).json({
    message: "Eliminación de postulación pendiente de implementar"
  });
};