import Joi from "joi";

export const crearCategoriaSchema = Joi.object({
  nombre: Joi.string()
    .trim()
    .lowercase()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.base": "El nombre de la categoría debe ser un texto",
      "string.empty": "El nombre de la categoría no puede estar vacío",
      "string.min": "El nombre debe tener al menos 2 caracteres",
      "string.max": "El nombre no puede superar los 50 caracteres",
      "any.required": "El nombre de la categoría es obligatorio"
    })
}).required();

export const categoriaIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "El ID debe contener únicamente caracteres hexadecimales",
    "string.length": "El ID debe tener 24 caracteres",
    "string.empty": "El ID no puede estar vacío",
    "any.required": "El ID es obligatorio"
  })
});

export const actualizarCategoriaSchema = crearCategoriaSchema;
