import Categoria from "../models/categoria.model.js";

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