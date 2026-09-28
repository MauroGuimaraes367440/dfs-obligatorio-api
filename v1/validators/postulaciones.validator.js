import Joi from "joi";

export const crearPostulacionSchema = Joi.object({
  puesto: Joi.string().trim().min(2).max(100).required(),

  empresa: Joi.string().trim().min(2).max(100).required(),

  descripcion: Joi.string().trim().min(10).max(5000).required(),

  categoria: Joi.string().hex().length(24).required(),

  estado: Joi.string()
    .valid(
      "guardada",
      "enviada",
      "entrevista",
      "aceptada",
      "rechazada"
    )
    .default("guardada"),

  enlace: Joi.string()
    .trim()
    .uri({ scheme: ["http", "https"] })
    .max(2000)
    .allow(""),

  notas: Joi.string().trim().max(2000).allow("")
})
  .required()
  .messages({
    "any.required": "El campo {#label} es obligatorio",
    "any.only": "El campo {#label} tiene un valor no permitido",
    "string.base": "El campo {#label} debe ser un texto",
    "string.empty": "El campo {#label} no puede estar vacío",
    "string.min": "El campo {#label} debe tener al menos {#limit} caracteres",
    "string.max": "El campo {#label} no puede superar los {#limit} caracteres",
    "string.hex": "El campo {#label} debe ser un ID hexadecimal válido",
    "string.length": "El campo {#label} debe tener {#limit} caracteres",
    "string.uri": "El campo {#label} debe ser una URL válida",
    "string.uriCustomScheme": "El campo {#label} debe ser una URL HTTP o HTTPS",
    "object.unknown": "El campo {#label} no está permitido",
    "object.base": "Debe enviar un objeto JSON"
  });

  export const listarPostulacionesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),

  limit: Joi.number().integer().min(1).max(50).default(10),

  estado: Joi.string().valid(
    "guardada",
    "enviada",
    "entrevista",
    "aceptada",
    "rechazada"
  ),

  categoria: Joi.string().hex().length(24)
}).messages({
  "number.base": "El campo {#label} debe ser un número",
  "number.integer": "El campo {#label} debe ser un número entero",
  "number.min": "El campo {#label} debe ser al menos {#limit}",
  "number.max": "El campo {#label} no puede superar {#limit}",
  "any.only": "El campo {#label} tiene un valor no permitido",
  "string.base": "El campo {#label} debe ser un texto",
  "string.empty": "El campo {#label} no puede estar vacío",
  "string.hex": "El campo {#label} debe ser un ID hexadecimal válido",
  "string.length": "El campo {#label} debe tener {#limit} caracteres",
  "object.unknown": "El parámetro {#label} no está permitido"
});

export const postulacionIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.base": "El ID debe ser un texto",
    "string.hex": "El ID debe contener únicamente caracteres hexadecimales",
    "string.length": "El ID debe tener 24 caracteres",
    "string.empty": "El ID no puede estar vacío",
    "any.required": "El ID es obligatorio"
  })
});

export const actualizarPostulacionSchema = Joi.object({
  puesto: Joi.string().trim().min(2).max(100),

  empresa: Joi.string().trim().min(2).max(100),

  descripcion: Joi.string().trim().min(10).max(5000),

  categoria: Joi.string().hex().length(24),

  estado: Joi.string().valid(
    "guardada",
    "enviada",
    "entrevista",
    "aceptada",
    "rechazada"
  ),

  enlace: Joi.string()
    .trim()
    .uri({ scheme: ["http", "https"] })
    .max(2000)
    .allow(""),

  notas: Joi.string().trim().max(2000).allow("")
})
  .min(1)
  .required()
  .messages({
    "object.min": "Debe enviar al menos un campo para actualizar",
    "object.base": "Debe enviar un objeto JSON",
    "object.unknown": "El campo {#label} no está permitido",
    "any.required": "Debe enviar los datos para actualizar",
    "any.only": "El campo {#label} tiene un valor no permitido",
    "string.base": "El campo {#label} debe ser un texto",
    "string.empty": "El campo {#label} no puede estar vacío",
    "string.min": "El campo {#label} debe tener al menos {#limit} caracteres",
    "string.max": "El campo {#label} no puede superar los {#limit} caracteres",
    "string.hex": "El campo {#label} debe ser un ID hexadecimal válido",
    "string.length": "El campo {#label} debe tener {#limit} caracteres",
    "string.uri": "El campo {#label} debe ser una URL válida",
    "string.uriCustomScheme": "El campo {#label} debe ser una URL HTTP o HTTPS"
  });