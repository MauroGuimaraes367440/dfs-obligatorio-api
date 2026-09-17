import Joi from "joi";

export const registrarUsuarioSchema = Joi.object({
username: Joi.string().trim().lowercase().min(3).max(30).required().messages({
  "string.base": "El nombre de usuario debe ser un texto",
  "string.empty": "El nombre de usuario no puede estar vacío",
  "string.min": "El nombre de usuario debe tener al menos 3 caracteres",
  "string.max": "El nombre de usuario no puede superar los 30 caracteres",
  "any.required": "El nombre de usuario es obligatorio"
}),

password: Joi.string().min(6).max(30).required().messages({
  "string.base": "La contraseña debe ser un texto",
  "string.empty": "La contraseña no puede estar vacía",
  "string.min": "La contraseña debe tener al menos 6 caracteres",
  "string.max": "La contraseña no puede superar los 30 caracteres",
  "any.required": "La contraseña es obligatoria"
})
}).required();

export const loginUsuarioSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "El nombre de usuario debe ser un texto",
    "string.empty": "El nombre de usuario no puede estar vacío",
    "any.required": "El nombre de usuario es obligatorio"
  }),

  password: Joi.string().required().messages({
    "string.base": "La contraseña debe ser un texto",
    "string.empty": "La contraseña no puede estar vacía",
    "any.required": "La contraseña es obligatoria"
  })
}).required();