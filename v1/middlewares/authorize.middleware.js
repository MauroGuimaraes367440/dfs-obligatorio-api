import {
  obtenerUsuarioPorIdService
} from "../services/usuarios.services.js";

export const authorizeMiddleware = (...rolesPermitidos) => {
  return async (req, res, next) => {
    const usuario = await obtenerUsuarioPorIdService(req.decoded.id);

    if (!rolesPermitidos.includes(usuario.rol)) {
      return res.status(403).json({
        message: "No tenés permisos para realizar esta operación"
      });
    }

    next();
  };
};