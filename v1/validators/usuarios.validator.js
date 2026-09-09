import Joi from "joi";

export const registrarUsuarioSchema = Joi.object({
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