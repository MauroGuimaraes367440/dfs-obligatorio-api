import Categoria from "../models/categoria.model.js";
import Postulacion from "../models/postulacion.model.js";
import cloudinary from "../config/cloudinary.js";

import {
  uploadBufferToCloudinary
} from "../utils/cloudinary.util.js";

export const crearCategoriaService = async (categoriaData) => {
  const categoriaExistente = await Categoria.findOne({
    nombre: categoriaData.nombre
  });

  if (categoriaExistente) {
    const error = new Error("La categoría ya existe");
    error.status = 409;
    throw error;
  }

  const categoria = new Categoria(categoriaData);

  try {
    await categoria.save();
  } catch (error) {
    if (error.code === 11000) {
      const errorDuplicado = new Error("La categoría ya existe");
      errorDuplicado.status = 409;
      throw errorDuplicado;
    }

    throw error;
  }

  return categoria;
};

export const obtenerCategoriasService = async () => {
  const categorias = await Categoria.find().sort({ nombre: 1 });

  return categorias;
};

export const obtenerCategoriaPorIdService = async (id) => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    const error = new Error("La categoría no existe");
    error.status = 404;
    throw error;
  }

  return categoria;
};

export const actualizarCategoriaService = async (id, categoriaData) => {
  const categoria = await obtenerCategoriaPorIdService(id);

  categoria.nombre = categoriaData.nombre;

  try {
    await categoria.save();
  } catch (error) {
    if (error.code === 11000) {
      const errorDuplicado = new Error("La categoría ya existe");
      errorDuplicado.status = 409;
      throw errorDuplicado;
    }

    throw error;
  }

  return categoria;
};

export const eliminarCategoriaService = async (id) => {
  await obtenerCategoriaPorIdService(id);

  const cantidad = await Postulacion.countDocuments({
    categoria: id
  });

  if (cantidad > 0) {
    const error = new Error(
      "No se puede eliminar una categoría con postulaciones asociadas"
    );
    error.status = 409;
    throw error;
  }

  const categoria = await Categoria.findByIdAndDelete(id);

  if (!categoria) {
    const error = new Error("La categoría no existe");
    error.status = 404;
    throw error;
  }

  return categoria;
};

export const subirImagenCategoriaService = async (id, archivo) => {
  const categoria = await obtenerCategoriaPorIdService(id);

  if (!archivo) {
    const error = new Error("Debe enviar una imagen");
    error.status = 400;
    throw error;
  }

  const tiposPermitidos = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!tiposPermitidos.includes(archivo.mimetype)) {
    const error = new Error(
      "La imagen debe ser JPG, PNG o WEBP"
    );
    error.status = 400;
    throw error;
  }

  let resultado;

  try {
    resultado = await uploadBufferToCloudinary(
      cloudinary,
      archivo.buffer,
      {
        resource_type: "image",
        folder: "proximo-paso/categorias"
      }
    );
  } catch (error) {
    const errorServicio = new Error(
      "No se pudo subir la imagen. Intentá nuevamente más tarde"
    );
    errorServicio.status = 503;
    throw errorServicio;
  }

  categoria.imagenUrl = resultado.secure_url;

  await categoria.save();

  return categoria;
};