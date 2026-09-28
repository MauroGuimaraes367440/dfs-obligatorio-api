import {
  crearCategoriaService,
  obtenerCategoriasService,
  obtenerCategoriaPorIdService,
  actualizarCategoriaService,
  eliminarCategoriaService,
  subirImagenCategoriaService
} from "../services/categorias.services.js";

import {
  upload
} from "../middlewares/multer.middleware.js";

import {
  runMulterSingle
} from "../utils/multer.util.js";

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

export const eliminarCategoria = async (req, res) => {
  const { id } = req.validatedParams;

  await eliminarCategoriaService(id);

  res.status(200).json({
    message: "Categoría eliminada correctamente"
  });
};

export const subirImagenCategoria = async (req, res) => {
  const { id } = req.validatedParams;

  try {
    await runMulterSingle(upload, "imagen", req, res);
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      const errorTamano = new Error(
        "La imagen no puede superar los 3 MiB"
      );
      errorTamano.status = 413;
      throw errorTamano;
    }

    const errorArchivo = new Error(
      "Debe enviar un único archivo en el campo imagen usando form-data"
    );
    errorArchivo.status = 400;
    throw errorArchivo;
  }

  const categoria = await subirImagenCategoriaService(
    id,
    req.file
  );

  res.status(200).json({
    message: "Imagen de categoría guardada correctamente",
    categoria
  });
};