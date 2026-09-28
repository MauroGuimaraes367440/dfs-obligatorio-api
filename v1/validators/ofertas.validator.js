import Joi from "joi";

export const buscarOfertasSchema = Joi.object({
  busqueda: Joi.string().trim().min(2).max(100).required(),

  ubicacion: Joi.string().trim().min(2).max(100)
    .required(),

  page: Joi.number().integer().min(1).default(1)
}).messages({
  "any.required": "El campo {#label} es obligatorio",
  "string.base": "El campo {#label} debe ser un texto",
  "string.empty": "El campo {#label} no puede estar vacío",
  "string.min": "El campo {#label} debe tener al menos {#limit} caracteres",
  "string.max": "El campo {#label} no puede superar {#limit} caracteres",
  "number.base": "El campo {#label} debe ser un número",
  "number.integer": "El campo {#label} debe ser un número entero",
  "number.min": "El campo {#label} debe ser al menos {#limit}",
  "object.unknown": "El parámetro {#label} no está permitido"
});