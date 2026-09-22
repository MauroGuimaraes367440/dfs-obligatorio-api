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