import {
  crearCategoriaService,
  obtenerCategoriasService,
  obtenerCategoriaPorIdService,
  actualizarCategoriaService
} from "../services/categorias.services.js";

export const obtenerCategorias = async (req, res) => {
  const categorias = await obtenerCategoriasService();

  res.status(200).json(categorias);
};

export const obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.validatedParams;

  const categoria = await obtenerCategoriaPorIdService(id);

  res.status(200).json(categoria);
};

export const crearCategoria = async (req, res) => {
  const categoria = await crearCategoriaService(req.validatedBody);

  res.status(201).json(categoria);
};


export const actualizarCategoria = async (req, res) => {
  const { id } = req.validatedParams;

  const categoria = await actualizarCategoriaService(
    id,
    req.validatedBody
  );

  res.status(200).json(categoria);
};

export const eliminarCategoria = (req, res) => {
  res.status(501).json({
    message: "Eliminación de categoría pendiente de implementar"
  });
};