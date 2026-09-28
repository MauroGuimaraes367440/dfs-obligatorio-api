import {
  buscarOfertasService
} from "../services/ofertas.services.js";

export const buscarOfertas = async (req, res) => {
  const resultado = await buscarOfertasService(
    req.validatedQuery
  );

  res.status(200).json(resultado);
};